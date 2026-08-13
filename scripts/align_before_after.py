"""
Align before/after photo pairs so the comparison slider reads as one viewpoint.

The pairs were shot handheld minutes or days apart, so the camera moves between
frames. Dragging the slider then looks like the scene jumps rather than the
pavement changing. This registers the BEFORE onto the AFTER using SIFT features
on the surroundings — houses, trees, fences, kerbs — because the pavement itself
changes colour completely and matches nothing.

A similarity transform (scale + rotation + translation) is used rather than a
full homography: the scenes are not planar, and a homography visibly skews the
buildings. Both frames are then cropped to the largest rectangle that is fully
covered by both, and finally to a common 4:3.

Usage: python scripts/align_before_after.py
"""
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "images"
JUSTIN = ROOT / "incoming-assets" / "Justin_SMS_2026-08-13"
SCRATCH = Path(
    r"C:\Users\danhe\AppData\Local\Temp\claude"
    r"\R--Documents-Claude-Projects-SealTeamSix"
    r"\9a9024cd-fdb1-49bd-8146-21b3e3968be1\scratchpad"
)

TARGET_W = 2000
ASPECT = 4 / 3
MIN_EDGE_SCORE = 0.26
VERBOSE = True

# (slug, before path, after path)
PAIRS = [
    ("residential-driveway-clarence", JUSTIN / "01_4338.jpg", JUSTIN / "02_4339.jpg"),
    ("country-driveway", IMG / "country-driveway-sealcoating-before.jpg",
     IMG / "country-driveway-sealcoating-after.jpg"),
    ("auto-shop-lot", IMG / "auto-shop-parking-lot-before.jpg",
     IMG / "auto-shop-parking-lot-after.jpg"),
]
# Deliberately excluded after review:
#   driveway-apron (21/22) — the "after" still shows chalk lines and work
#     stakes, and the "before" is shadowed and soft.
#   garage-driveway (the previous hero) — only 3 feature inliers, i.e. the two
#     frames genuinely do not share a viewpoint, and the source is 720x540.


def largest_inscribed_rect(mask):
    """Largest axis-aligned all-true rectangle, via the histogram method."""
    h, w = mask.shape
    heights = np.zeros(w, dtype=np.int32)
    best = (0, 0, 0, 0, 0)  # area, x0, y0, x1, y1
    for y in range(h):
        heights = np.where(mask[y], heights + 1, 0)
        stack = []
        for x in range(w + 1):
            cur = heights[x] if x < w else 0
            start = x
            while stack and stack[-1][1] >= cur:
                sx, sh = stack.pop()
                area = sh * (x - sx)
                if area > best[0]:
                    best = (area, sx, y - sh + 1, x, y + 1)
                start = sx
            stack.append((start, cur))
    return best[1:]


def align(before_path, after_path, slug):
    a = cv2.imread(str(before_path))
    b = cv2.imread(str(after_path))
    if a is None or b is None:
        raise FileNotFoundError(f"{before_path} / {after_path}")

    # Work at a common scale; register onto the AFTER frame.
    scale = TARGET_W / b.shape[1]
    b = cv2.resize(b, (TARGET_W, round(b.shape[0] * scale)), interpolation=cv2.INTER_AREA)
    a = cv2.resize(a, (TARGET_W, round(a.shape[0] * TARGET_W / a.shape[1])),
                   interpolation=cv2.INTER_AREA)

    sift = cv2.SIFT_create(4000)
    ka, da = sift.detectAndCompute(cv2.cvtColor(a, cv2.COLOR_BGR2GRAY), None)
    kb, db = sift.detectAndCompute(cv2.cvtColor(b, cv2.COLOR_BGR2GRAY), None)
    if da is None or db is None:
        return None, None, "no features"

    matches = cv2.BFMatcher().knnMatch(da, db, k=2)
    good = [m for m, n in matches if m.distance < 0.75 * n.distance]
    if len(good) < 12:
        return None, None, f"only {len(good)} good matches"

    src = np.float32([ka[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
    dst = np.float32([kb[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)

    h, w = b.shape[:2]
    # RANSAC is stochastic and a similarity fit can collapse to a degenerate
    # translation. Try several models and judge them objectively instead of
    # trusting the inlier count alone.
    candidates = []
    for label, est in (
        ("similarity", lambda: cv2.estimateAffinePartial2D(
            src, dst, method=cv2.RANSAC, ransacReprojThreshold=3.0,
            maxIters=20000, confidence=0.999)),
        ("affine", lambda: cv2.estimateAffine2D(
            src, dst, method=cv2.RANSAC, ransacReprojThreshold=3.0,
            maxIters=20000, confidence=0.999)),
    ):
        for _ in range(3):
            M, inl = est()
            if M is not None:
                candidates.append((label, M, int(inl.sum()) if inl is not None else 0))

    Hm, hinl = cv2.findHomography(src, dst, cv2.RANSAC, 3.0, maxIters=20000,
                                  confidence=0.999)
    if Hm is not None:
        candidates.append(("homography", Hm, int(hinl.sum()) if hinl is not None else 0))

    if not candidates:
        return None, None, "no transform"

    def warp_with(M):
        if M.shape[0] == 3:
            return (cv2.warpPerspective(a, M, (w, h), flags=cv2.INTER_LANCZOS4),
                    cv2.warpPerspective(np.full(a.shape[:2], 255, np.uint8), M, (w, h)))
        return (cv2.warpAffine(a, M, (w, h), flags=cv2.INTER_LANCZOS4),
                cv2.warpAffine(np.full(a.shape[:2], 255, np.uint8), M, (w, h)))

    def structure_score(warped_img, cover_mask):
        """Edge correlation above the pavement line, where the scene is stable."""
        top = int(h * 0.55)
        m = (cover_mask[:top] > 200)
        if m.sum() < top * w * 0.25:
            return -1.0
        def edges(img):
            g = cv2.cvtColor(img[:top], cv2.COLOR_BGR2GRAY).astype(np.float32)
            gx = cv2.Sobel(g, cv2.CV_32F, 1, 0, ksize=3)
            gy = cv2.Sobel(g, cv2.CV_32F, 0, 1, ksize=3)
            return cv2.magnitude(gx, gy)
        ea, eb = edges(warped_img)[m], edges(b)[m]
        ea = ea - ea.mean(); eb = eb - eb.mean()
        denom = float(np.linalg.norm(ea) * np.linalg.norm(eb))
        return float((ea @ eb) / denom) if denom else -1.0

    best = None
    seen = []
    for label, M, n in candidates:
        wi, cm = warp_with(M)
        s = structure_score(wi, cm)
        seen.append(f"{label}:{s:.2f}/{n}")
        if best is None or s > best[0]:
            best = (s, label, M, n, wi, cm)
    if VERBOSE:
        print("      candidates:", " ".join(seen))

    score, label, M, n_in, warped, cover = best
    # Calibrated against pairs verified by eye: a genuinely registered pair on
    # this material scores ~0.30+, a visibly ghosted one ~0.20 or below.
    if score < MIN_EDGE_SCORE:
        return None, None, f"alignment too weak (edge score {score:.2f}, {label})"

    # Trim to the region both frames actually cover, then to a common 4:3.
    valid = cover > 200
    x0, y0, x1, y1 = largest_inscribed_rect(valid)
    cw, ch = x1 - x0, y1 - y0
    if cw < w * 0.4 or ch < h * 0.4:
        return None, None, f"overlap too small ({cw}x{ch})"

    if cw / ch > ASPECT:
        nw = int(ch * ASPECT); nh = ch
        x0 += (cw - nw) // 2
    else:
        nh = int(cw / ASPECT); nw = cw
        y0 += (ch - nh) // 2

    crop_b = warped[y0:y0 + nh, x0:x0 + nw]
    crop_a = b[y0:y0 + nh, x0:x0 + nw]

    note = (f"{label}, edge score {score:.2f}, {n_in} inliers, crop {nw}x{nh}")
    return crop_b, crop_a, note


def main():
    SCRATCH.mkdir(parents=True, exist_ok=True)
    out = ROOT / "images" / "ba"
    out.mkdir(parents=True, exist_ok=True)
    for slug, bp, ap in PAIRS:
        try:
            cb, ca, note = align(bp, ap, slug)
        except Exception as exc:  # noqa: BLE001
            print(f"  {slug}: ERROR {exc}")
            continue
        if cb is None:
            print(f"  {slug}: SKIP — {note}")
            continue
        cv2.imwrite(str(out / f"{slug}-before.jpg"), cb,
                    [cv2.IMWRITE_JPEG_QUALITY, 94])
        cv2.imwrite(str(out / f"{slug}-after.jpg"), ca,
                    [cv2.IMWRITE_JPEG_QUALITY, 94])
        # QA strip: before | after | 50% blend, so misregistration is obvious.
        blend = cv2.addWeighted(cb, 0.5, ca, 0.5, 0)
        strip = np.hstack([cb, ca, blend])
        strip = cv2.resize(strip, (1800, int(strip.shape[0] * 1800 / strip.shape[1])))
        cv2.imwrite(str(SCRATCH / f"qa_{slug}.jpg"), strip,
                    [cv2.IMWRITE_JPEG_QUALITY, 88])
        print(f"  {slug}: {note}")


if __name__ == "__main__":
    main()
