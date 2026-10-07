"""
IBM Plex Mono's zero without its dot.

Plex Mono draws a dot inside its zero to tell it from the letter O, and the client wants the zero
plain wherever it shows: the phone number, the index numbers, 2030. Sora and IBM Plex Sans already
draw it plain. This script takes the dot out of the zero in the two Plex Mono cuts the site serves,
and out of the numerator and denominator zeros, so nothing on the site can still set one; every
other glyph is left as it was. A zero that is already plain is skipped, so running it twice is
harmless.

Fresh Plex Mono files bring the dot back; run this again after replacing them. Run from the
repository root:

    python3 -m venv .venv && .venv/bin/pip install fonttools brotli
    .venv/bin/python scripts/plain-zero.py
"""
import io

from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._g_l_y_f import GlyphCoordinates

FONTS = ['public/ds/fonts/ibm-plex-mono-400.woff2', 'public/ds/fonts/ibm-plex-mono-500.woff2']
# Each is drawn as three contours: the ring, its counter and the dot.
ZEROS = ['zero', 'zero.numr', 'zero.dnom']


def contours(glyph):
    """The [start, end) point range of each contour."""
    start = 0
    for end in glyph.endPtsOfContours:
        yield start, end + 1
        start = end + 1


def area(points):
    xs, ys = zip(*points)
    return (max(xs) - min(xs)) * (max(ys) - min(ys))


for path in FONTS:
    # Only the zeros change: the header tables keep their stored values.
    font = TTFont(path, recalcBBoxes=False, recalcTimestamp=False)
    glyf = font['glyf']
    for name in ZEROS:
        glyph = glyf[name]
        if glyph.numberOfContours != 3:
            continue
        # The dot is the smallest of the three.
        start, end = min(contours(glyph), key=lambda c: area(glyph.coordinates[c[0] : c[1]]))
        keep = [i for i in range(len(glyph.coordinates)) if not start <= i < end]
        glyph.coordinates = GlyphCoordinates([glyph.coordinates[i] for i in keep])
        glyph.flags = bytearray(glyph.flags[i] for i in keep)
        glyph.endPtsOfContours = [e if e < start else e - (end - start) for e in glyph.endPtsOfContours if not start <= e < end]
        glyph.numberOfContours = 2
        glyph.recalcBounds(glyf)
        print(f'{path}: {name} drawn without its dot')
    out = io.BytesIO()
    font.save(out)
    with open(path, 'wb') as f:
        f.write(out.getvalue())
