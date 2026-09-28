"""
The ecosystem page's JAZ Chocolate backdrop: the waterfront table, thrown out of focus.

Every platform on the ecosystem page opens on a full-bleed photograph. JAZ Chocolate's only picture
in the golden-hour set is the table from the entertainment contact sheet, and that exists at card
size alone (~585px), so at full bleed it would read as a soft enlargement. This script makes the
softness the point instead: it enlarges the table and puts it through a lens blur, a disc kernel
with the highlights lifted before the blur so the lantern and the promenade lights open into
bokeh, and the page sets the sharp card-sized original beside it as a detail.

It writes the full cut and the 880px card cut, and prints the 20px blur-up for `src/lib/media.ts`.
A proper full-size photograph for JAZ Chocolate replaces all of this with a one-line change there.
Run from the repository root:

    python3 -m venv .venv && .venv/bin/pip install numpy scipy pillow
    .venv/bin/python scripts/soft-plate.py
"""
import base64
import io

import numpy as np
from PIL import Image
from scipy.ndimage import convolve, gaussian_filter

SRC = 'public/ds/img/ent-dining-sm.webp'
NAME = 'ent-dining-soft'
WIDTH = 1600
# The disc's radius at the full cut, in pixels: shallow focus, but the table still reads.
RADIUS = 10

image = Image.open(SRC).convert('RGB')
height = round(WIDTH * image.height / image.width)
I = np.asarray(image.resize((WIDTH, height), Image.LANCZOS)).astype(np.float32) / 255.0


def disc(r):
    """A lens's aperture: a flat disc, its rim softened by a fraction of a pixel."""
    y, x = np.mgrid[-r : r + 1, -r : r + 1]
    k = gaussian_filter((x * x + y * y <= r * r).astype(np.float32), 0.6)
    return k / k.sum()


def lens_blur(img, r, gain=2.4, knee=0.72):
    """Blur in linear light, lifting the highlights first so that points of light bloom into discs."""
    linear = img**2.2
    luma = linear.mean(-1, keepdims=True)
    lift = 1 + gain * np.clip((luma - knee**2.2) / (1 - knee**2.2), 0, 1) ** 2
    kernel = disc(r)
    out = np.stack([convolve(linear[..., c] * lift[..., 0], kernel, mode='reflect') for c in range(3)], -1)
    out /= 1 + 0.35 * (lift.mean() - 1)
    return np.clip(out, 0, 1) ** (1 / 2.2)


soft = Image.fromarray((lens_blur(I, RADIUS) * 255 + 0.5).astype(np.uint8))
soft.save(f'public/ds/img/{NAME}.webp', 'WEBP', quality=80, method=6)
soft.resize((880, round(880 * height / WIDTH)), Image.LANCZOS).save(
    f'public/ds/img/{NAME}-sm.webp', 'WEBP', quality=76, method=6
)
tiny = io.BytesIO()
soft.resize((20, round(20 * height / WIDTH)), Image.LANCZOS).save(tiny, 'WEBP', quality=40)
print(f'{NAME}: data:image/webp;base64,{base64.b64encode(tiny.getvalue()).decode()}')
