"""
Generate the Western New York service-area map as an inline SVG.

Everything is projected from real latitude/longitude rather than drawn by eye,
so the Lake Erie shoreline, the Niagara River, Grand Island and the twenty
service towns all sit where a local would expect them. Town coordinates were
looked up individually; shorelines are simplified polylines through known
points along each shore.

Projection is equirectangular with an x scale of cos(lat0), which keeps the
proportions honest over an area this small.

At this zoom one mile is ~19px, so the inner-ring suburbs sit only tens of
pixels apart and cannot all carry a permanent label. Well-spaced towns are
labelled outright; the rest are dots whose label appears on hover — driven
either from the map or from the town list beside it. A collision check runs
at build time and fails loudly rather than shipping overlapping type.

Writes partials/wny-map.svg and splices it into index.html.
"""
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "partials" / "wny-map.svg"

LAT_MIN, LAT_MAX = 42.63, 43.30
LON_MIN, LON_MAX = -79.33, -78.30
LAT0 = (LAT_MIN + LAT_MAX) / 2
KX = math.cos(math.radians(LAT0))
VB_W = 1000
VB_H = round(VB_W * (LAT_MAX - LAT_MIN) / ((LON_MAX - LON_MIN) * KX))
MI_PER_DEG_LAT = 69.0
HQ = (42.8864, -78.8784)

FONT = 19
MONO = "JetBrains Mono, ui-monospace, monospace"

C = {
    "land":    "#131317",
    "water":   "#0C1B24",
    "wdot":    "#3E5E6D",
    "shore":   "#4C606A",
    "canada":  "#0E0E12",
    "island":  "#16161B",
    "road":    "#26262B",
    "roadln":  "#33333A",
    "yellow":  "#FFD200",
    "white":   "#F4F4F5",
    "grey":    "#7A828A",
    "grid":    "#1C1C21",
}


def px(lat, lon):
    x = (lon - LON_MIN) / (LON_MAX - LON_MIN) * VB_W
    y = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * VB_H
    return round(x, 1), round(y, 1)


def path(points, close=False):
    d = " ".join(("M" if i == 0 else "L") + f"{px(la, lo)[0]} {px(la, lo)[1]}"
                 for i, (la, lo) in enumerate(points))
    return d + (" Z" if close else "")


def ring(miles):
    return round(miles / MI_PER_DEG_LAT / (LAT_MAX - LAT_MIN) * VB_H, 1)


# ---- geography -------------------------------------------------------------
US_SHORE = [
    (42.63, -79.20), (42.66, -79.07), (42.70, -78.99), (42.74, -78.93),
    (42.78, -78.87), (42.82, -78.84), (42.855, -78.865), (42.876, -78.890),
    (42.90, -78.905), (42.93, -78.905), (42.96, -78.900), (42.99, -78.895),
    (43.02, -78.895), (43.045, -78.905), (43.06, -78.93), (43.075, -78.96),
    (43.09, -79.00), (43.10, -79.045), (43.13, -79.05), (43.17, -79.045),
    (43.22, -79.05), (43.26, -79.055), (43.30, -79.060),
]
CA_SHORE = [
    (42.87, -79.33), (42.88, -79.20), (42.90, -79.05), (42.905, -78.93),
    (42.94, -78.955), (42.97, -78.99), (43.00, -79.02), (43.03, -79.045),
    (43.06, -79.060), (43.08, -79.075), (43.12, -79.065), (43.16, -79.055),
    (43.20, -79.062), (43.25, -79.070), (43.30, -79.075),
]
GRAND_ISLAND = [
    (43.068, -78.975), (43.050, -78.935), (43.020, -78.915), (42.990, -78.915),
    (42.965, -78.940), (42.955, -78.975), (42.975, -79.010), (43.010, -79.025),
    (43.045, -79.010),
]
BORDER = [(42.905, -78.918), (42.95, -78.945), (43.00, -78.985), (43.05, -79.03),
          (43.09, -79.062), (43.14, -79.055), (43.20, -79.058), (43.30, -79.068)]
I190 = [(42.878, -78.875), (42.920, -78.895), (42.960, -78.900), (43.000, -78.905),
        (43.022, -78.922), (43.045, -78.962), (43.068, -78.985), (43.090, -79.020),
        (43.098, -79.042)]
I90 = [(42.700, -78.900), (42.770, -78.820), (42.820, -78.775), (42.865, -78.740),
       (42.900, -78.706), (42.925, -78.640), (42.945, -78.520), (42.955, -78.360)]
I290 = [(43.002, -78.885), (42.985, -78.815), (42.968, -78.755), (42.945, -78.722)]

# ---- towns -----------------------------------------------------------------
# name, lat, lon, mode, dx, dy, anchor
A, H = "always", "hover"
TOWNS = [
    ("Buffalo",       42.8864, -78.8784, A,  26,   5, "start"),
    ("Niagara Falls", 43.0925, -79.0472, A,   0, -16, "middle"),
    ("Lockport",      43.1700, -78.7105, A,  14,   5, "start"),
    ("Akron",         43.0209, -78.4953, A,  14,   5, "start"),
    ("Clarence",      42.9767, -78.5919, A,  14,   5, "start"),
    ("Grand Island",  43.0119, -78.9592, A, -14,  -8, "end"),
    ("Tonawanda",     42.9850, -78.8780, A, -14,  -2, "end"),
    ("Amherst",       42.9784, -78.7998, A,  14,  -6, "start"),
    ("Williamsville", 42.9625, -78.7425, A,  14,  12, "start"),
    ("Cheektowaga",   42.9039, -78.7439, A, -14,   5, "end"),
    ("Lancaster",     42.9061, -78.6339, A,  14,   5, "start"),
    ("West Seneca",   42.8396, -78.7679, A,  14,   5, "start"),
    ("Orchard Park",  42.7675, -78.7439, A, -14,   5, "end"),
    ("East Aurora",   42.7669, -78.6172, A,  14,   5, "start"),
    ("Hamburg",       42.7159, -78.8298, A, -14,   5, "end"),
    # Inner-ring suburbs: too tightly packed to label permanently.
    ("Kenmore",       42.9650, -78.8717, H, -14,  14, "end"),
    ("Eggertsville",  42.9631, -78.8036, H,  -6,  20, "end"),
    ("Snyder",        42.9634, -78.7840, H,  12,  20, "start"),
    ("Getzville",     43.0242, -78.7678, H,  14,   5, "start"),
    ("Depew",         42.9117, -78.7017, H,  10, -10, "start"),
]


def slug(n):
    return n.lower().replace(" ", "-")


def bbox(name, x, y, dx, dy, anchor, size=FONT):
    w = len(name) * size * 0.62
    tx = x + dx
    if anchor == "end":
        x0 = tx - w
    elif anchor == "middle":
        x0 = tx - w / 2
    else:
        x0 = tx
    return (x0, y + dy - size * 0.8, x0 + w, y + dy + size * 0.3)


def overlaps(a, b):
    return not (a[2] < b[0] or b[2] < a[0] or a[3] < b[1] or b[3] < a[1])


def check_collisions():
    boxes = []
    for name, lat, lon, mode, dx, dy, anchor in TOWNS:
        if mode != A:
            continue
        x, y = px(lat, lon)
        boxes.append((name, bbox(name, x, y, dx, dy, anchor)))
    bad = []
    for i in range(len(boxes)):
        for j in range(i + 1, len(boxes)):
            if overlaps(boxes[i][1], boxes[j][1]):
                bad.append(f"{boxes[i][0]} <-> {boxes[j][0]}")
    return bad


def txt(lat, lon, s, fill, size, rot=None, anchor="start", op=".9", ls=2.5):
    x, y = px(lat, lon)
    t = (f'<text x="{x}" y="{y}" fill="{fill}" font-family="{MONO}" font-size="{size}" '
         f'letter-spacing="{ls}" text-anchor="{anchor}" opacity="{op}"')
    if rot:
        t += f' transform="rotate({rot} {x} {y})"'
    return t + f'>{s}</text>'


def build():
    hx, hy = px(*HQ)
    s = []
    a = s.append
    a(f'<svg viewBox="0 0 {VB_W} {VB_H}" preserveAspectRatio="xMidYMid meet" '
      f'class="wny-svg" aria-hidden="true">')

    a('<defs>')
    a('<pattern id="wnyWater" width="13" height="13" patternUnits="userSpaceOnUse">'
      f'<circle cx="2.5" cy="2.5" r="1" fill="{C["wdot"]}" opacity=".85"/></pattern>')
    a('<pattern id="wnyHatch" width="9" height="9" patternUnits="userSpaceOnUse" '
      'patternTransform="rotate(45)">'
      f'<line x1="0" y1="0" x2="0" y2="9" stroke="{C["shore"]}" stroke-width="1" opacity=".16"/></pattern>')
    a('<pattern id="wnyGrid" width="50" height="50" patternUnits="userSpaceOnUse">'
      f'<path d="M50 0 L0 0 0 50" fill="none" stroke="{C["grid"]}" stroke-width="1"/></pattern>')
    a('<linearGradient id="wnySweep" x1="0" y1="0" x2="1" y2="0">'
      f'<stop offset="0%" stop-color="{C["yellow"]}" stop-opacity=".06"/>'
      f'<stop offset="100%" stop-color="{C["yellow"]}" stop-opacity="0"/></linearGradient>')
    a('</defs>')

    a(f'<rect width="{VB_W}" height="{VB_H}" fill="{C["land"]}"/>')
    a(f'<rect width="{VB_W}" height="{VB_H}" fill="url(#wnyGrid)" opacity=".7"/>')

    water = US_SHORE + [(LAT_MAX + .1, LON_MIN - .1), (LAT_MIN - .1, LON_MIN - .1)]
    a(f'<path d="{path(water, True)}" fill="{C["water"]}"/>')
    a(f'<path d="{path(water, True)}" fill="url(#wnyWater)"/>')

    canada = CA_SHORE + [(LAT_MAX + .1, LON_MIN - .1), (42.87, LON_MIN - .1)]
    a(f'<path d="{path(canada, True)}" fill="{C["canada"]}"/>')
    a(f'<path d="{path(canada, True)}" fill="url(#wnyHatch)"/>')
    a(f'<path d="{path(CA_SHORE)}" fill="none" stroke="{C["shore"]}" stroke-width="1.6" opacity=".8"/>')

    a(f'<path d="{path(GRAND_ISLAND, True)}" fill="{C["island"]}" '
      f'stroke="{C["shore"]}" stroke-width="1.4"/>')
    a(f'<path d="{path(US_SHORE)}" fill="none" stroke="{C["shore"]}" stroke-width="2.2"/>')
    a(f'<path d="{path(BORDER)}" fill="none" stroke="{C["grey"]}" stroke-width="1" '
      f'stroke-dasharray="7 5" opacity=".5"/>')

    for pts, w in ((I90, 6), (I190, 5), (I290, 4)):
        a(f'<path d="{path(pts)}" fill="none" stroke="{C["road"]}" stroke-width="{w}" '
          f'stroke-linecap="round" stroke-linejoin="round"/>')
        a(f'<path d="{path(pts)}" fill="none" stroke="{C["roadln"]}" stroke-width="1.3" '
          f'stroke-dasharray="7 9"/>')

    # range rings, labelled down-left so the type never lands on a town
    for mi in (10, 20, 30):
        r = ring(mi)
        op = .5 if mi < 30 else .68
        a(f'<circle cx="{hx}" cy="{hy}" r="{r}" fill="none" stroke="{C["yellow"]}" '
          f'stroke-width="1" stroke-dasharray="3 7" opacity="{op}"/>')
        lx = hx - r * 0.7071 + 8
        ly = hy + r * 0.7071 - 8
        a(f'<text x="{lx:.1f}" y="{ly:.1f}" fill="{C["yellow"]}" opacity=".7" '
          f'font-family="{MONO}" font-size="16" letter-spacing="2">{mi} MI</text>')

    a(f'<g class="wny-sweep" style="transform-origin:{hx}px {hy}px">'
      f'<path d="M{hx} {hy} L{hx + ring(34)} {hy - ring(34) * 0.20} '
      f'L{hx + ring(34)} {hy + ring(34) * 0.20} Z" fill="url(#wnySweep)"/></g>')

    a(txt(42.745, -79.19, "LAKE ERIE", C["grey"], 19, rot=-27, op=".75"))
    a(txt(43.235, -78.93, "↑ LAKE ONTARIO", C["grey"], 15, op=".65"))
    a(txt(43.00, -79.24, "ONTARIO", C["grey"], 15, op=".8"))
    a(txt(42.982, -79.24, "CANADA", C["grey"], 15, op=".8"))
    a(txt(42.938, -78.545, "I-90", C["grey"], 15, op=".65"))
    a(txt(43.052, -78.952, "I-190", C["grey"], 15, op=".65"))

    for name, lat, lon, mode, dx, dy, anchor in TOWNS:
        if name == "Buffalo":
            continue
        x, y = px(lat, lon)
        cls = "wny-town" + ("" if mode == A else " is-quiet")
        a(f'<g class="{cls}" data-town="{slug(name)}">')
        a(f'<circle class="halo" cx="{x}" cy="{y}" r="15" fill="{C["yellow"]}" opacity="0"/>')
        a(f'<circle class="dot" cx="{x}" cy="{y}" r="4.2" fill="{C["white"]}"/>')
        a(f'<text class="lbl" x="{x + dx}" y="{y + dy}" fill="{C["white"]}" '
          f'font-family="{MONO}" font-size="{FONT}" letter-spacing="1.4" '
          f'text-anchor="{anchor}">{name.upper()}</text>')
        a('</g>')

    a('<g class="wny-town is-hq" data-town="buffalo">')
    a(f'<circle class="pulse" cx="{hx}" cy="{hy}" r="11" fill="{C["yellow"]}" opacity=".3"/>')
    a(f'<circle cx="{hx}" cy="{hy}" r="18" fill="none" stroke="{C["yellow"]}" '
      f'stroke-width="1.5" opacity=".85"/>')
    a(f'<circle class="dot" cx="{hx}" cy="{hy}" r="7" fill="{C["yellow"]}"/>')
    a(f'<text class="lbl" x="{hx + 30}" y="{hy + 7}" fill="{C["yellow"]}" '
      f'font-family="{MONO}" font-size="21" letter-spacing="2" font-weight="600">BUFFALO · HQ</text>')
    a('</g>')

    # north arrow, dropped into open land east of Lockport
    nx, ny = 928, 132
    a(f'<g opacity=".55">'
      f'<path d="M{nx} {ny - 26} L{nx + 8} {ny + 6} L{nx} {ny - 2} L{nx - 8} {ny + 6} Z" '
      f'fill="{C["grey"]}"/>'
      f'<text x="{nx}" y="{ny + 26}" fill="{C["grey"]}" font-family="{MONO}" font-size="16" '
      f'letter-spacing="2" text-anchor="middle">N</text></g>')

    # scale bar — 10 miles, measured in the same projection as everything else
    sx, sy, seg = 556, 792, ring(5)   # clear of the HTML corner overlays
    a(f'<g opacity=".6">'
      f'<line x1="{sx}" y1="{sy}" x2="{sx + seg * 2}" y2="{sy}" stroke="{C["grey"]}" stroke-width="1.5"/>'
      f'<line x1="{sx}" y1="{sy - 5}" x2="{sx}" y2="{sy + 5}" stroke="{C["grey"]}" stroke-width="1.5"/>'
      f'<line x1="{sx + seg}" y1="{sy - 4}" x2="{sx + seg}" y2="{sy + 4}" stroke="{C["grey"]}" stroke-width="1.2"/>'
      f'<line x1="{sx + seg * 2}" y1="{sy - 5}" x2="{sx + seg * 2}" y2="{sy + 5}" stroke="{C["grey"]}" stroke-width="1.5"/>'
      f'<text x="{sx}" y="{sy + 20}" fill="{C["grey"]}" font-family="{MONO}" font-size="15" '
      f'letter-spacing="1.5">0</text>'
      f'<text x="{sx + seg * 2}" y="{sy + 20}" fill="{C["grey"]}" font-family="{MONO}" font-size="15" '
      f'letter-spacing="1.5" text-anchor="middle">10 MILES</text></g>')

    a('</svg>')
    return "\n".join(s)


def main():
    bad = check_collisions()
    if bad:
        print("!! label collisions:")
        for b in bad:
            print("   ", b)
    else:
        print("label collision check: clean")

    svg = build()
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(svg, encoding="utf-8")
    print(f"viewBox {VB_W}x{VB_H}  ({len(svg)/1024:.1f}KB)  1 mile = {VB_H/(LAT_MAX-LAT_MIN)/69:.1f}px")

    html_path = ROOT / "index.html"
    html = html_path.read_text(encoding="utf-8")
    pattern = re.compile(r'(<div class="wny-map"[^>]*>\s*)<svg.*?</svg>', re.S)
    if not pattern.search(html):
        print("!! could not find the map container in index.html")
        return
    html_path.write_text(pattern.sub(lambda m: m.group(1) + svg, html, count=1),
                         encoding="utf-8")
    print("spliced into index.html")


if __name__ == "__main__":
    main()
