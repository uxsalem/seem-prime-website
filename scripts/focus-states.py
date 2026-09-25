"""
The strategy page's focus pull: two depth-of-field states of one photograph.

`riyadh-tech-horizon` is a desk before the Riyadh skyline. This script writes it twice more:
`-far` holds the skyline sharp and lets the laptop, the holograms and the desk go soft (the
vision); `-near` holds the desk sharp and lets the city go soft (the mission). The near plane is
traced by hand below, on the full-size frame, and each plane is blurred with only its own
colours (a normalised blur), so neither bleeds into the other at the edges.

Each state is written as the three cuts every photograph ships (full, 1280 and 880 wide), and
its 20px blur-up is printed for `src/lib/media.ts`.

Re-shooting the subject means re-tracing `NEAR`. Run from the repository root:

    python3 -m venv .venv && .venv/bin/pip install numpy scipy pillow
    .venv/bin/python scripts/focus-states.py
"""
import base64
import io

import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import gaussian_filter

SRC = 'public/ds/img/riyadh-tech-horizon.webp'
image = Image.open(SRC).convert('RGB')
W, H = image.size
I = np.asarray(image).astype(np.float32) / 255.0

# --- The near plane, on the 1672 x 941 frame ---------------------------------------------------
mask = Image.new('L', (W, H), 0)
d = ImageDraw.Draw(mask)
# The desk and everything on it, from the sill forward.
d.polygon([(0, 636), (238, 632), (330, 690), (1110, 688), (1672, 694), (1672, 941), (0, 941)], fill=255)
# The window mullions and the plant on the left: the room, not the view.
d.polygon([(0, 0), (238, 0), (246, 300), (214, 420), (200, 640), (0, 640)], fill=255)
# The laptop: screen and base.
d.polygon([(224, 316), (694, 362), (784, 698), (1130, 740), (1114, 790), (622, 836), (328, 794), (318, 712)], fill=255)
# Headphones, phone and the mug at the right edge.
d.polygon([(1098, 640), (1160, 612), (1330, 604), (1440, 620), (1468, 700), (1468, 740), (1098, 740)], fill=255)
d.rectangle([1572, 580, 1672, 750], fill=255)
# The holograms hang in the room, in front of the glass, and so do the lines between them.
for box in [(198, 100, 428, 284), (482, 74, 696, 254), (518, 252, 686, 382), (706, 140, 1006, 400), (988, 246, 1138, 404), (716, 408, 856, 520)]:
    d.rounded_rectangle(box, radius=10, fill=255)
d.line([(420, 214), (492, 236)], fill=255, width=10)
d.line([(690, 196), (760, 200)], fill=255, width=10)
# The spire between the globe and the brain stands behind the glass: it belongs to the view.
d.polygon([(994, 300), (1009, 300), (1013, 378), (1016, 700), (974, 700), (977, 392), (989, 378)], fill=0)

NEAR = np.asarray(mask).astype(np.float32) / 255.0
# A hairline of softness at every boundary, so no cut reads as a cut-out.
EDGE = gaussian_filter(NEAR, 2.2)


def masked_blur(img, weight, sigma):
    """Blur only the pixels `weight` selects, without pulling in the colours of the other plane."""
    num = np.stack([gaussian_filter(img[..., c] * weight, sigma) for c in range(3)], -1)
    den = gaussian_filter(weight, sigma)[..., None]
    return num / np.maximum(den, 1e-4)


def focused(near_sigma, far_sigma):
    out = I.copy()
    if far_sigma > 0:
        # The skyline goes soft behind sharp foreground edges.
        out = out * EDGE[..., None] + masked_blur(I, 1.0 - NEAR, far_sigma) * (1.0 - EDGE[..., None])
    if near_sigma > 0:
        # A foreground out of focus spreads past its own outline, over whatever is behind it.
        spread = np.clip(gaussian_filter(NEAR, near_sigma * 0.55) * 1.15, 0, 1)[..., None]
        out = out * (1.0 - spread) + masked_blur(I, NEAR, near_sigma) * spread
    return Image.fromarray((np.clip(out, 0, 1) * 255 + 0.5).astype(np.uint8))


def write(img, name):
    img.save(f'public/ds/img/{name}.webp', 'WEBP', quality=80, method=6)
    for width, suffix, quality in [(1280, 'md', 78), (880, 'sm', 76)]:
        cut = img.resize((width, round(width * H / W)), Image.LANCZOS)
        cut.save(f'public/ds/img/{name}-{suffix}.webp', 'WEBP', quality=quality, method=6)
    tiny = io.BytesIO()
    img.resize((20, round(20 * H / W)), Image.LANCZOS).save(tiny, 'WEBP', quality=40)
    print(f'{name}: data:image/webp;base64,{base64.b64encode(tiny.getvalue()).decode()}')


write(focused(near_sigma=9.0, far_sigma=0), 'riyadh-tech-horizon-far')
write(focused(near_sigma=0, far_sigma=5.5), 'riyadh-tech-horizon-near')
