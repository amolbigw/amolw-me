"""
Anonymise the fullthrottle.ai platform screenshot used by the Trajectory.

public/trajectory/ftplatform.jpg is served publicly, at full resolution, and
indexed. What has to come out of it depends on what the client has cleared, so
the scope is a switch:

    --scope identity   client name, URL and campaign titles only (default).
                       Ad creative and all figures are left as captured. Use
                       when the client has cleared their data for publication
                       but the page should not read as a named case study.

    --scope full       the above, plus the ad creative blurred and every spend,
                       delivery and attribution figure masked. Use when there
                       is no clearance.

Note what --scope identity does NOT do: the ad creative carries the client's
own branding, so leaving it in identifies them at full resolution regardless of
the replaced header. It only reads as anonymous at the size the page displays
it. Choose it knowing that.

Under --scope full the figures are masked rather than replaced with plausible
ones on purpose: invented numbers on a public page read as a performance claim.

Run from public/trajectory/ against a fresh capture, then read the output back
at full resolution and confirm what you expected to go is gone. The pixel
regions below are specific to the 1400x796 campaigns view — a new capture at a
different size or a changed layout needs them re-measured, not reused.

    cd public/trajectory && python3 ../../scripts/anonymise-platform-screenshot.py --scope identity

Requires Pillow. Overwrites in place, so keep the original outside the repo
until you are satisfied with the result.
"""
import argparse
from PIL import Image, ImageDraw, ImageFont, ImageFilter

_ap = argparse.ArgumentParser(description=__doc__)
_ap.add_argument("--scope", choices=("identity", "full"), default="identity")
_ap.add_argument("--src", default="ftplatform.jpg")
SCOPE = _ap.parse_args().scope
SRC = OUT = _ap.parse_args().src

HEADER = (52, 61, 76)
WHITE = (255, 255, 255)
PILL = (242, 241, 246)
INK = (0, 0, 0)
GREEN = (143, 193, 68)

B = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
R = "/System/Library/Fonts/Supplemental/Arial.ttf"
f = lambda p, s: ImageFont.truetype(p, s)

im = Image.open(SRC).convert("RGB")
d = ImageDraw.Draw(im)


def swap(box, bg, text, font, colour, align="left", pad=2):
    """Cover a region with its own background, then set replacement text in it."""
    d.rectangle(box, fill=bg)
    if not text:
        return
    x0, y0, x1, y1 = box
    w = d.textlength(text, font=font)
    asc, desc = font.getmetrics()
    y = y0 + ((y1 - y0) - (asc + desc)) / 2
    x = x0 + pad if align == "left" else (x0 + x1 - w) / 2
    d.text((x, y), text, font=font, fill=colour)


def mask(box, bg, colour, weight=None):
    """Withhold a figure: clear it and leave a rule where the number was."""
    d.rectangle(box, fill=bg)
    x0, y0, x1, y1 = box
    h = weight or max(2, int((y1 - y0) * 0.09))
    cy = (y0 + y1) / 2
    w = min((x1 - x0) * 0.42, 62)
    cx = (x0 + x1) / 2
    d.rectangle([cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2], fill=colour)


def blur(box, radius=22):
    region = im.crop(box).filter(ImageFilter.GaussianBlur(radius))
    im.paste(region, box)


# --- client identity ------------------------------------------------------
# The dot sat tight against the old, much longer name, so the whole lockup is
# cleared and rebuilt as one centred unit rather than leaving the dot stranded.
d.rectangle((188, 6, 476, 44), fill=HEADER)
_name, _nf = "DEMO DEALERSHIP", f(B, 14)
_w = d.textlength(_name, font=_nf)
_x = 331 - (_w + 16) / 2
d.ellipse([_x, 13, _x + 10, 23], fill=(124, 191, 74))
d.text((_x + 16, 10), _name, font=_nf, fill=WHITE)
swap((188, 28, 474, 43), HEADER, "HTTPS://WWW.EXAMPLE.COM/", f(R, 10), (200, 206, 214), "center")
swap((775, 124, 985, 150), PILL, "Demo Dealership", f(R, 14), (33, 37, 41), "left", 4)
swap((342, 199, 1065, 227), WHITE,
     "171216: Demo Dealership - Awareness + Traffic - July 2026", f(B, 20), INK)
swap((342, 512, 1072, 540), WHITE,
     "168335: Demo Dealership - Awareness + Traffic - June 2026", f(B, 20), INK)

if SCOPE == "full":
    # The ad creative carries the client's own branding and vehicle photography.
    blur((137, 194, 319, 352))
    blur((137, 507, 319, 665))

    # --- performance figures ----------------------------------------------
    for box in [(1218, 230, 1334, 248), (1213, 543, 1334, 561), (1067, 543, 1124, 561),
                (392, 284, 436, 302), (392, 597, 438, 615),
                (420, 317, 466, 335), (420, 630, 464, 648)]:
        mask(box, WHITE, (173, 181, 189), weight=3)

    for box in [(905, 348, 1015, 402), (1150, 348, 1275, 402),
                (905, 661, 1015, 715), (1150, 661, 1275, 715)]:
        mask(box, WHITE, (73, 80, 87), weight=7)

    for box in [(898, 406, 1024, 444), (1138, 406, 1290, 444),
                (898, 719, 1024, 757), (1138, 719, 1290, 757)]:
        mask(box, WHITE, GREEN, weight=6)

im.save(OUT, quality=92, optimize=True)
print(f"wrote {OUT} {im.size} scope={SCOPE}")
