"""
Build production brand assets from the recovered legacy originals.

Sources (never modified):
  audit/legacy-site-assets/curated/seal-team-six-shield-logo-original.png
  audit/legacy-site-assets/curated/seal-team-six-script-wordmark-original.png

Output -> images/brand/

Treatment: the shield is kept FAITHFUL to the mark customers already know —
only the outer background is removed, and the white field is toned from pure
white to the site's road-white so it does not glare against asphalt black.

Removing the background is not a plain flood fill: the shield's interior field
leaks out to the exterior through the gap where the name banner overlaps the
hexagon's lower edge, so a border flood drains the whole inside. Instead the
ink is morphologically closed to seal that gap, holes are filled to recover the
true silhouette, and alpha is taken from that.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[1]
CURATED = ROOT / "audit" / "legacy-site-assets" / "curated"
OUT = ROOT / "images" / "brand"
OUT.mkdir(parents=True, exist_ok=True)

SHIELD_SRC = CURATED / "seal-team-six-shield-logo-original.png"
WORDMARK_SRC = CURATED / "seal-team-six-script-wordmark-original.png"

ROAD_WHITE = (244, 244, 245)

# Near-white cutoff for background/field detection. High enough that the gray
# inner chevron and the silver vest stripes are never caught.
WHITE_CUT = 238
# Radius used to bridge the banner/hexagon gap before filling holes.
SEAL_RADIUS = 9

SCRATCH = Path(
    r"C:\Users\danhe\AppData\Local\Temp\claude"
    r"\R--Documents-Claude-Projects-SealTeamSix"
    r"\9a9024cd-fdb1-49bd-8146-21b3e3968be1\scratchpad"
)


def _luma(arr: np.ndarray) -> np.ndarray:
    return arr[..., 0] * 0.299 + arr[..., 1] * 0.587 + arr[..., 2] * 0.114


def disk(r: int) -> np.ndarray:
    y, x = np.ogrid[-r:r + 1, -r:r + 1]
    return (x * x + y * y) <= r * r


def build_shield() -> Image.Image:
    src = Image.open(SHIELD_SRC).convert("RGB")
    rgb = np.array(src).astype(np.uint8)

    near_white = np.all(rgb >= WHITE_CUT, axis=-1)
    ink = ~near_white

    # Seal the leak, then recover the full silhouette including its white field.
    sealed = ndimage.binary_closing(ink, structure=disk(SEAL_RADIUS))
    shield = ndimage.binary_fill_holes(sealed)
    # Closing can bulge the silhouette outward; pull it back to real ink where
    # the original had background, but keep interior field pixels.
    shield &= ndimage.binary_dilation(ink, structure=disk(2)) | ndimage.binary_erosion(
        shield, structure=disk(SEAL_RADIUS + 2)
    )

    coverage = shield.mean() * 100
    print(f"  silhouette covers {coverage:.1f}% of canvas")

    # Tone the field off pure white so it does not glare on asphalt black.
    out = rgb.copy()
    field = near_white & shield
    out[field] = ROAD_WHITE

    alpha = np.where(shield, 255, 0).astype(np.float32)
    alpha = np.clip(ndimage.gaussian_filter(alpha, 0.5), 0, 255).astype(np.uint8)
    return Image.fromarray(np.dstack([out, alpha]), "RGBA")


def build_wordmark() -> Image.Image:
    """Script 'Seal.Team.Six.' swoosh — drop the flat gray plate behind it."""
    src = Image.open(WORDMARK_SRC).convert("RGB")
    rgb = np.array(src).astype(np.uint8)
    plate = rgb[2, 2].astype(np.int16)
    diff = np.abs(rgb.astype(np.int16) - plate).max(axis=-1)
    # Generous tolerance so the plate's anti-aliased edge goes too and does
    # not leave a gray halo once the mark sits on asphalt black.
    plate_mask = diff <= 30

    lab, n = ndimage.label(plate_mask)
    edge = np.concatenate([lab[0, :], lab[-1, :], lab[:, 0], lab[:, -1]])
    keep = [int(v) for v in np.unique(edge) if v != 0]
    bg = np.isin(lab, keep) if keep else np.zeros_like(plate_mask)

    # The swoosh is black, so on a dark footer it would read as a floating
    # script with no body. A road-white keyline restores the silhouette.
    solid = ~bg
    ring = ndimage.binary_dilation(solid, structure=disk(4)) & ~solid
    out = rgb.copy()
    out[ring] = ROAD_WHITE

    keepmask = solid | ring
    # The source carries a few stray specks outside the swoosh; drop anything
    # too small to be part of the mark so they cannot skew the trim box.
    lab2, n2 = ndimage.label(keepmask)
    if n2:
        sizes = ndimage.sum(keepmask, lab2, range(1, n2 + 1))
        small = {i for i, s in enumerate(sizes, start=1) if s < 500}
        if small:
            keepmask &= ~np.isin(lab2, list(small))

    alpha = np.where(keepmask, 255, 0).astype(np.float32)
    alpha = np.clip(ndimage.gaussian_filter(alpha, 0.6), 0, 255).astype(np.uint8)
    return Image.fromarray(np.dstack([out, alpha]), "RGBA")


def trim(img: Image.Image) -> Image.Image:
    bbox = img.getchannel("A").getbbox()
    return img.crop(bbox) if bbox else img


def export(img: Image.Image, stem: str, widths):
    for wpx in widths:
        if wpx >= img.width:
            out, tag = img, ""
        else:
            out = img.resize((wpx, round(img.height * wpx / img.width)), Image.LANCZOS)
            tag = f"-{wpx}"
        out.save(OUT / f"{stem}{tag}.png", optimize=True)
        out.save(OUT / f"{stem}{tag}.webp", quality=92, method=6)
        kb = (OUT / f"{stem}{tag}.webp").stat().st_size / 1024
        print(f"  {stem}{tag}  {out.width}x{out.height}  webp {kb:.1f}KB")


def preview(img: Image.Image, name: str, bg=(11, 11, 13)):
    SCRATCH.mkdir(parents=True, exist_ok=True)
    plate = Image.new("RGB", img.size, bg)
    plate.paste(img, (0, 0), img)
    plate.save(SCRATCH / name)


def build_crest(shield: Image.Image) -> Image.Image:
    """Hexagon only, for the nav lockup.

    The hexagon's side walls run x=136..1114 and terminate at ~56.5% height,
    where the name banner takes over. Cutting exactly there gives a closed,
    flat-bottomed crest instead of a shape that looks sliced through the road.
    """
    w, h = shield.size
    left = round(136 / 1250 * w)
    right = round(1115 / 1250 * w)
    return trim(shield.crop((left, 0, right, int(h * 0.565))))


def build_worker(shield: Image.Image, box720, name: str, edges=("top", "left", "right")):
    """Lift one crew member (and his rig) out of the shield scene.

    A plain rectangular crop is not enough: the hexagon frame runs behind both
    figures, and the sprayer's hose actually merges into the right-hand frame
    bar, chaining him to the chevron. So each crop is labelled, components
    touching the named edges (the frame, never the figure) are dropped, and the
    largest survivor is taken — which discards loose scenery like the spray fan
    and the centre-line dashes. Returns (colour cutout, pale silhouette).
    """
    sx = shield.width / 720.0
    box = tuple(round(v * sx) for v in box720)
    crop = shield.crop(box).convert("RGBA")
    arr = np.array(crop)
    rgb, a = arr[..., :3], arr[..., 3]

    ink = (~np.all(rgb >= WHITE_CUT, axis=-1)) & (a > 60)

    # The hexagon's gray inner chevron runs straight into the back of the
    # sprayer's helmet, so no purely topological rule can free him. It is
    # separable by colour though: strip the desaturated mid-gray runs that
    # reach a frame edge. The vest's reflective bands are the same gray but
    # sit inland, so they survive — and fill_holes restores them anyway.
    lum = _luma(rgb)
    spread = rgb.max(axis=-1).astype(np.int16) - rgb.min(axis=-1).astype(np.int16)
    grayish = (lum > 80) & (lum < 215) & (spread < 40) & (a > 60)
    glab, gn = ndimage.label(grayish)
    if gn:
        gstrips = {"top": glab[0, :], "bottom": glab[-1, :],
                   "left": glab[:, 0], "right": glab[:, -1]}
        gedge = set()
        for e in edges:
            gedge |= {int(v) for v in np.unique(gstrips[e]) if v}
        if gedge:
            ink &= ~np.isin(glab, list(gedge))

    lab, n = ndimage.label(ink)
    if n == 0:
        raise ValueError(f"{name}: nothing found in {box}")

    strips = {"top": lab[0, :], "bottom": lab[-1, :],
              "left": lab[:, 0], "right": lab[:, -1]}
    edge_labels = set()
    for e in edges:
        edge_labels |= {int(v) for v in np.unique(strips[e]) if v}

    sizes = ndimage.sum(ink, lab, range(1, n + 1))
    candidates = [i for i in range(1, n + 1) if i not in edge_labels]
    if not candidates:
        raise ValueError(
            f"{name}: every component touched {edges} — widen the crop so the "
            f"rig/hose has margin (sizes={sorted(sizes)[-4:]})")
    best = max(candidates, key=lambda i: sizes[i - 1])
    print(f"  {name}: figure is component {best} "
          f"({int(sizes[best - 1])}px) of {n}")
    mask = ndimage.binary_fill_holes(lab == best)

    alpha = np.clip(
        ndimage.gaussian_filter(np.where(mask, 255, 0).astype(np.float32), 0.5),
        0, 255).astype(np.uint8)
    colour = Image.fromarray(np.dstack([rgb, alpha]), "RGBA")

    flat = np.zeros_like(arr)
    flat[..., 0], flat[..., 1], flat[..., 2] = ROAD_WHITE
    flat[..., 3] = alpha
    return trim(colour), trim(Image.fromarray(flat, "RGBA"))


def build_favicons(crest: Image.Image):
    """Rounded asphalt tile carrying the crest.

    The site no longer renders an 'STS' monogram anywhere, so the previous
    monogram favicons would point at a mark that no longer exists.
    """
    assets = ROOT / "assets"
    assets.mkdir(exist_ok=True)
    for size in (32, 180, 512):
        tile = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        radius = max(2, round(size * 0.18))
        plate = Image.new("RGBA", (size, size), (11, 11, 13, 255))
        mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(mask).rounded_rectangle(
            [0, 0, size - 1, size - 1], radius=radius, fill=255
        )
        tile.paste(plate, (0, 0), mask)

        inset = round(size * 0.04)
        cw = size - inset * 2
        ch = max(1, round(crest.height * cw / crest.width))
        if ch > size - inset * 2:
            ch = size - inset * 2
            cw = max(1, round(crest.width * ch / crest.height))
        small = crest.resize((cw, ch), Image.LANCZOS)
        tile.paste(small, ((size - cw) // 2, (size - ch) // 2), small)
        tile.save(assets / f"favicon-{size}.png", optimize=True)
        print(f"  favicon-{size}.png")

    ico = Image.open(assets / "favicon-512.png")
    ico.save(assets / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("  favicon.ico (16/32/48)")


def main():
    print("Shield:")
    shield = trim(build_shield())
    # Only ship sizes the page actually requests; the untouched masters live
    # in audit/legacy-site-assets/curated/.
    export(shield, "shield", [720, 360])
    preview(shield, "prev_shield.png")

    print("Crest:")
    crest = build_crest(shield)
    export(crest, "crest", [240, 120])
    preview(crest, "prev_crest.png")

    print("Crew cutouts:")
    # Boxes are in the 720px-wide reference frame and left deliberately loose:
    # the rig and the hose must not touch an edge or they would be culled with
    # the frame.
    # The sprayer's crop stops just inside the right frame bar, and so cannot
    # use the right-edge rule — his hose legitimately runs off that side.
    for label, box, edges in [
        ("worker-striper", (126, 26, 354, 302), ("top", "left", "right")),
        ("worker-sprayer", (330, 52, 616, 302), ("top", "left")),
    ]:
        colour, flat = build_worker(shield, box, label, edges)
        export(colour, label, [520, 260])
        export(flat, f"{label}-silhouette", [520])
        preview(colour, f"prev_{label}.png")
        preview(flat, f"prev_{label}_flat.png", bg=(30, 30, 34))

    print("Wordmark:")
    wm = trim(build_wordmark())
    export(wm, "script-wordmark", [480])
    preview(wm, "prev_wordmark.png")

    print("Favicons:")
    build_favicons(crest)

    print("\nDone ->", OUT)


if __name__ == "__main__":
    main()
