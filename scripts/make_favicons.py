"""
Generate favicons + Open Graph card.
- favicon.ico (16/32/48 sizes embedded)
- favicon-32.png
- favicon-180.png (Apple touch)
- og-image.jpg (1200x630) using a hero photo + brand overlay
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "images"
ASSETS = ROOT / "assets"
ASSETS.mkdir(exist_ok=True)

YELLOW = (255, 210, 0, 255)
BLACK = (11, 11, 13, 255)


def shield_polygon(size, padding=2):
    """STS hexagon shield matching the design comp's logo mark."""
    s = size
    p = padding
    # Polygon: (0,0)-(s,0)-(s,0.7s)-(0.5s,s)-(0,0.7s)
    return [
        (p, p),
        (s - p, p),
        (s - p, int(s * 0.70)),
        (s / 2, s - p),
        (p, int(s * 0.70)),
    ]


def draw_shield(size, sts_size=None):
    """Render the STS shield mark at the given size on a transparent canvas."""
    if sts_size is None:
        sts_size = int(size * 0.45)
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    poly = shield_polygon(size)
    # Black fill with yellow border.
    d.polygon(poly, fill=BLACK, outline=YELLOW)
    # Manually thicken outline (PIL outline is 1px).
    border = max(1, size // 24)
    for i in range(1, border):
        d.polygon(
            [(x + (1 if x < size / 2 else -1) * 0 + (i if j == 0 else -i), y) for j, (x, y) in enumerate(poly)],
            outline=YELLOW,
        )
    # Center "STS" text.
    try:
        font = ImageFont.truetype("arialbd.ttf", sts_size)
    except OSError:
        font = ImageFont.load_default()
    text = "STS"
    bbox = d.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = (size - tw) / 2 - bbox[0]
    ty = (size - th) / 2 - bbox[1] - size * 0.05  # shift up slightly because shield narrows at bottom
    d.text((tx, ty), text, fill=YELLOW, font=font)
    return img


def make_favicons():
    # PNG variants
    for sz in (32, 180, 512):
        img = draw_shield(sz)
        img.save(ASSETS / f"favicon-{sz}.png", optimize=True)
        print(f"  favicon-{sz}.png")
    # ICO with multiple resolutions
    ico = draw_shield(48)
    ico.save(
        ASSETS / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    print("  favicon.ico (16/32/48)")


def make_og_image():
    """1200x630 OG card: hero photo + black gradient + headline."""
    base = Image.open(IMG / "parking-lot-line-striping-night.jpg").convert("RGB")
    # Crop / resize to 1200x630
    target_w, target_h = 1200, 630
    src_w, src_h = base.size
    src_ratio = src_w / src_h
    tgt_ratio = target_w / target_h
    if src_ratio > tgt_ratio:
        # source wider — crop sides
        new_w = int(src_h * tgt_ratio)
        x0 = (src_w - new_w) // 2
        base = base.crop((x0, 0, x0 + new_w, src_h))
    else:
        new_h = int(src_w / tgt_ratio)
        y0 = (src_h - new_h) // 2
        base = base.crop((0, y0, src_w, y0 + new_h))
    base = base.resize((target_w, target_h), Image.LANCZOS)

    # Darken with a left-to-right gradient
    overlay = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for x in range(target_w):
        alpha = int(220 * (1 - x / target_w) ** 0.7 + 70)
        draw.line([(x, 0), (x, target_h)], fill=(11, 11, 13, alpha))
    composed = Image.alpha_composite(base.convert("RGBA"), overlay)

    # Text
    d = ImageDraw.Draw(composed)
    try:
        font_big = ImageFont.truetype("arialbd.ttf", 92)
        font_mid = ImageFont.truetype("arialbd.ttf", 40)
        font_small = ImageFont.truetype("arial.ttf", 28)
    except OSError:
        font_big = font_mid = font_small = ImageFont.load_default()

    # Eyebrow
    d.text((64, 70), "SEAL TEAM SIX · BUFFALO, NY", fill=YELLOW, font=font_small)
    # Headline
    d.text((64, 140), "BUFFALO'S DRIVEWAYS,", fill=(244, 244, 245, 255), font=font_big)
    d.text((64, 240), "LOCKED DOWN.", fill=YELLOW, font=font_big)
    # Subhead
    d.text(
        (64, 380),
        "Sealcoating · Crack Filling · Line Striping",
        fill=(191, 196, 201, 255),
        font=font_mid,
    )
    d.text(
        (64, 440),
        "Residential & Commercial · Across Western New York",
        fill=(154, 160, 166, 255),
        font=font_small,
    )
    # Phone footer
    d.text(
        (64, 540),
        "716-907-8259  ·  sealteamsix716.github.io",
        fill=YELLOW,
        font=font_small,
    )

    # Save
    composed.convert("RGB").save(ASSETS / "og-image.jpg", quality=88)
    print("  og-image.jpg (1200x630)")


def main():
    print("Favicons:")
    make_favicons()
    print("\nOG image:")
    make_og_image()


if __name__ == "__main__":
    main()
