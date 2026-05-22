"""
Chroma-key the solid green background out of Mascot_V2/V3/V4.
Saves transparent PNGs as images/mascot-v2.png, mascot-v3.png, mascot-v4.png.
Preserves the yellow outline glow.
"""
from PIL import Image
import numpy as np
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMG_DIR = ROOT / "images"

SOURCES = ["Mascot_V2.png", "Mascot_V3.png", "Mascot_V4.png"]

def chroma_key(src_path: Path, dst_path: Path):
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img).astype(np.float32)
    r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

    # Green-dominance score: green much higher than red AND blue.
    green_dom = g - np.maximum(r, b)
    # Saturation-ish guard: don't kill near-neutrals (the seal is gray).
    chroma = g - (r + b) / 2.0

    # Build a soft mask: where green strongly dominates, alpha -> 0.
    # Tuned for the bright chroma green in the source.
    full_key = (green_dom > 60) & (chroma > 40) & (g > 110)
    soft_key = (green_dom > 20) & (chroma > 15) & (g > 90) & ~full_key

    # Apply alpha.
    new_a = a.copy()
    new_a[full_key] = 0.0
    # For the soft transition band, fade based on how green it is.
    falloff = np.clip((green_dom[soft_key] - 20) / 40.0, 0.0, 1.0)
    new_a[soft_key] = a[soft_key] * (1.0 - falloff)

    # Spill suppression ONLY on edge pixels (partial alpha). Don't touch
    # the fully-opaque interior — that's where the safety-yellow vest lives,
    # and yellow has G > B too, so we'd turn it orange.
    edge = (new_a > 0) & (new_a < 255) & (g > r) & (g > b)
    rb_avg = (r + b) / 2.0
    new_g = g.copy()
    new_g[edge] = np.minimum(g[edge], rb_avg[edge] + 12.0)

    out = np.stack([r, new_g, b, new_a], axis=-1)
    out = np.clip(out, 0, 255).astype(np.uint8)

    Image.fromarray(out, mode="RGBA").save(dst_path, optimize=True)
    print(f"  {src_path.name} -> {dst_path.name}  ({dst_path.stat().st_size // 1024} KB)")


def main():
    for name in SOURCES:
        src = IMG_DIR / name
        dst = IMG_DIR / name.lower().replace("_", "-")
        chroma_key(src, dst)
    print("Done.")


if __name__ == "__main__":
    main()
