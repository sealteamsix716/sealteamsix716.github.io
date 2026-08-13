"""
Produce the web assets for the Our Work section.

Two jobs:
  1. Take the registered before/after pairs from images/ba/ and emit display
     (1600w) and thumbnail (480w) variants as WebP + JPEG.
  2. Import the curated new gallery photographs from the recovered Wix archive
     and the Justin hand-off, renamed descriptively and resized.

Run scripts/align_before_after.py first — it writes the registered pairs.
"""
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "images"
BA = IMG / "ba"
JUSTIN = ROOT / "incoming-assets" / "Justin_SMS_2026-08-13"
WIX = ROOT / "audit" / "legacy-site-assets" / "downloads" / "wix-media-library"

PAIR_SLUGS = ["residential-driveway-clarence", "country-driveway", "auto-shop-lot"]
# The slider fetches two full images at once, so it gets a mobile size too.
PAIR_WIDTHS = [1600, 800]
THUMB_W = 480
# Asphalt grain and foliage hide compression well; 76 keeps these comfortably
# under the heaviest photographs already on the site.
QUALITY = 76

# New gallery photographs: (source, output stem, optional crop box as fractions)
GALLERY_IMPORTS = [
    (JUSTIN / "04_3604.jpg", "tree-lined-driveway-sealcoating", None),
    # Cropped to the stall layout: the wide frame includes a named tenant's
    # storefront, and permission to feature a client by name is an owner
    # decision, not one to make here. The detail is the better showcase anyway.
    (JUSTIN / "12_3472.jpg", "ada-stall-layout-striping", (0.0, 0.30, 1.0, 1.0)),
    (WIX / "cl.jpg", "luxury-estate-driveway-sealcoating", None),
]


def emit(img, stem, out_dir, widths, quality=QUALITY, jpeg=True):
    """Write sized variants. `jpeg` off for gallery frames, whose <picture>
    negotiates WebP and falls back to a single unsized .jpg."""
    out_dir.mkdir(parents=True, exist_ok=True)
    for w in widths:
        if img.width <= w:
            resized = img
            tag = ""
        else:
            resized = img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)
            tag = f"-{w}"
        base = out_dir / f"{stem}{tag}"
        resized.save(base.with_suffix(".webp"), quality=quality, method=6)
        note = f"webp {base.with_suffix('.webp').stat().st_size / 1024:.0f}KB"
        if jpeg:
            resized.save(base.with_suffix(".jpg"), quality=quality, optimize=True,
                         progressive=True)
            note += f" / jpg {base.with_suffix('.jpg').stat().st_size / 1024:.0f}KB"
        print(f"    {stem}{tag}  {resized.width}x{resized.height}  {note}")


def main():
    print("Before/after pairs:")
    for slug in PAIR_SLUGS:
        for side in ("before", "after"):
            src = BA / f"{slug}-{side}.jpg"
            if not src.exists():
                print(f"    MISSING {src.name} — run align_before_after.py")
                continue
            img = Image.open(src).convert("RGB")
            emit(img, f"{slug}-{side}", BA, PAIR_WIDTHS)
        # Thumbnail comes from the after frame.
        after = BA / f"{slug}-after.jpg"
        if after.exists():
            emit(Image.open(after).convert("RGB"), f"{slug}-thumb", BA, [THUMB_W],
                 quality=78)

    print("\nGallery imports:")
    for src, stem, crop in GALLERY_IMPORTS:
        if not src.exists():
            print(f"    MISSING {src}")
            continue
        img = Image.open(src).convert("RGB")
        if crop:
            w, h = img.size
            x0, y0, x1, y1 = crop
            img = img.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1)))
        img.save(IMG / f"{stem}.jpg", quality=80, optimize=True, progressive=True)
        # Gallery frames are large and lazy; 70 keeps them in line with the
        # heaviest photographs already shipping.
        emit(img, stem, IMG, [1600, 800], quality=70, jpeg=False)

    # The registered full-size frames are intermediates; drop them so only the
    # sized variants ship.
    for slug in PAIR_SLUGS:
        for side in ("before", "after"):
            (BA / f"{slug}-{side}.jpg").unlink(missing_ok=True)
    print("\nDone.")


if __name__ == "__main__":
    main()
