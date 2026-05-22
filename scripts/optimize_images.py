"""
Resize source JPGs and emit WebP variants at 1600w and 800w for responsive use.
Also emits the mascot PNGs at half-size as compact WebP for the launcher/CTAs.
"""
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "images"

# Photos to process (excluding logo + mascots, which we handle separately).
PHOTOS = [
    "auto-shop-parking-lot-after.jpg",
    "auto-shop-parking-lot-before.jpg",
    "commercial-parking-lot-striping-1.jpg",
    "commercial-parking-lot-striping-2.jpg",
    "commercial-parking-lot-striping-3.jpg",
    "commercial-storefront-sealcoating.jpg",
    "country-driveway-sealcoating-after.jpg",
    "country-driveway-sealcoating-before.jpg",
    "luxury-home-driveway-sealcoating-1.jpg",
    "luxury-home-driveway-sealcoating-2.jpg",
    "luxury-home-driveway-sealcoating-3.jpg",
    "parking-lot-line-striping-night.jpg",
    "parking-lot-striping-after.jpg",
    "parking-lot-striping-before.jpg",
    "residential-driveway-sealcoating-1.jpg",
    "residential-driveway-sealcoating-2.jpg",
    "residential-garage-driveway-after.jpg",
    "residential-garage-driveway-before.jpg",
    "residential-parking-lot-sealcoating.jpg",
    "school-driveway-sealcoating.jpg",
    "school-parking-lot-ada-striping.jpg",
]

WIDTHS = [1600, 800]


def webp_variants(src_name: str):
    src = IMG / src_name
    img = Image.open(src).convert("RGB")
    stem = src.stem  # filename without extension
    sizes = []
    for w in WIDTHS:
        if img.width <= w:
            resized = img
        else:
            h = round(img.height * (w / img.width))
            resized = img.resize((w, h), Image.LANCZOS)
        out = IMG / f"{stem}-{w}.webp"
        resized.save(out, "WEBP", quality=80, method=6)
        sizes.append((w, out.stat().st_size // 1024))
    sz = ", ".join(f"{w}w={kb}KB" for w, kb in sizes)
    print(f"  {src_name}  [{img.width}x{img.height}]  -> {sz}")


def mascot_webp():
    """Smaller WebP versions of transparent mascot PNGs for the launcher / CTA."""
    for v in ("v1", "v2", "v3", "v4"):
        src = IMG / f"mascot-{v}.png" if v != "v1" else IMG / "Mascot_V1.png"
        if not src.exists():
            continue
        img = Image.open(src).convert("RGBA")
        for w in (600, 240):
            if img.width <= w:
                resized = img
            else:
                h = round(img.height * (w / img.width))
                resized = img.resize((w, h), Image.LANCZOS)
            out = IMG / f"mascot-{v}-{w}.webp"
            resized.save(out, "WEBP", quality=88, method=6)
            print(f"  mascot-{v}-{w}.webp  ({out.stat().st_size // 1024} KB)")


def main():
    print("Photos -> WebP @ 1600w + 800w:")
    for p in PHOTOS:
        webp_variants(p)
    print("\nMascot WebP variants (transparent):")
    mascot_webp()
    print("\nDone.")


if __name__ == "__main__":
    main()
