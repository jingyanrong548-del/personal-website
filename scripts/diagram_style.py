"""Shared fonts and bilingual (EN primary / ZH secondary) label helpers for diagram generators."""

from __future__ import annotations

import os
import sys
from pathlib import Path

from PIL import ImageFont

# macOS + common Linux CJK / Unicode faces
_CJK_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    "/Library/Fonts/Arial Unicode.ttf",
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/System/Library/Fonts/STHeiti Medium.ttc",
    "/System/Library/Fonts/STHeiti Light.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJKsc-Regular.otf",
    "/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc",
    "/usr/share/fonts/truetype/wqy/wqy-microhei.ttc",
]

# Prefer Unicode-complete faces. Plain Arial / Arial Bold lack subscript digits
# (₁ ₂ …) and render them as □ — seen on LMTD and CO₂ labels.
_LATIN_UNICODE = [
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    "/Library/Fonts/Arial Unicode.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf",
]
_LATIN_UNICODE_BOLD = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf",
]
# Last-resort Latin-only faces (incomplete Unicode — avoid when possible)
_LATIN_BOLD = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
]
_LATIN_REG = [
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/Library/Fonts/Arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]

_cjk_path: str | None = None


def require_cjk_font() -> str:
    """Resolve a CJK-capable font path or exit with install hints."""
    global _cjk_path
    if _cjk_path:
        return _cjk_path
    for p in _CJK_CANDIDATES:
        if os.path.exists(p):
            try:
                ImageFont.truetype(p, 16, index=0)
                _cjk_path = p
                return p
            except OSError:
                continue
    print(
        "ERROR: No CJK-capable font found. Diagrams need Chinese glyphs.\n"
        "  macOS: system fonts (Arial Unicode / Hiragino Sans GB / STHeiti) are usually enough.\n"
        "  Linux: sudo apt install fonts-noto-cjk   (or fonts-wqy-microhei)\n"
        "Then re-run: npm run generate:diagrams",
        file=sys.stderr,
    )
    sys.exit(1)


def _load(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    try:
        return ImageFont.truetype(path, size, index=index)
    except OSError:
        return ImageFont.truetype(path, size)


def font_latin(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    """Latin labels with full symbol coverage (subscripts, Δ, arrows, …).

    Do not prefer Arial/Arial Bold: missing glyphs become hollow □ boxes.
    """
    order = (
        (_LATIN_UNICODE_BOLD + _LATIN_UNICODE + _LATIN_BOLD + _LATIN_REG)
        if bold
        else (_LATIN_UNICODE + _LATIN_REG)
    )
    for p in order:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except OSError:
                continue
    # Fall back to CJK face (also covers Latin + most symbols)
    return _load(require_cjk_font(), size)


def font_cjk(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    return _load(require_cjk_font(), size)


def text_center(draw, xy, text: str, f, fill) -> None:
    bbox = draw.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((xy[0] - tw / 2, xy[1] - th / 2), text, font=f, fill=fill)


def text_left(draw, xy, text: str, f, fill) -> None:
    draw.text(xy, text, font=f, fill=fill)


def bilingual_center(
    draw,
    xy,
    en: str,
    zh: str,
    f_en,
    f_zh,
    fill_en,
    fill_zh,
    gap: float = 4,
) -> None:
    """Draw English above Chinese, both centered on xy (midpoint of the pair)."""
    be = draw.textbbox((0, 0), en, font=f_en)
    bz = draw.textbbox((0, 0), zh, font=f_zh)
    eh, zh_h = be[3] - be[1], bz[3] - bz[1]
    total = eh + gap + zh_h
    y0 = xy[1] - total / 2
    text_center(draw, (xy[0], y0 + eh / 2), en, f_en, fill_en)
    text_center(draw, (xy[0], y0 + eh + gap + zh_h / 2), zh, f_zh, fill_zh)


def bilingual_title(draw, xy, en: str, zh: str, f_en, f_zh, fill_en, fill_zh) -> None:
    bilingual_center(draw, xy, en, zh, f_en, f_zh, fill_en, fill_zh, gap=4)


def bilingual_block_lines(
    draw,
    cx: float,
    y_start: float,
    lines: list[tuple[str, str, object, object, tuple]],
    line_gap: float = 18,
) -> None:
    """lines: (en, zh, f_en, f_zh, fill) stacked from y_start; zh under each en with small gap."""
    y = y_start
    for en, zh, f_en, f_zh, fill in lines:
        text_center(draw, (cx, y), en, f_en, fill)
        be = draw.textbbox((0, 0), en, font=f_en)
        eh = be[3] - be[1]
        y += eh / 2 + 2
        text_center(draw, (cx, y + 6), zh, f_zh, fill if fill != (26, 35, 50) else (90, 100, 115))
        bz = draw.textbbox((0, 0), zh, font=f_zh)
        y += 6 + (bz[3] - bz[1]) / 2 + line_gap


# Shared light theme palette (cycles diagrams)
BG = (245, 247, 250)
CARD = (255, 255, 255)
INK = (26, 35, 50)
MUTED = (90, 100, 115)
BLUE = (59, 125, 216)
GREEN = (46, 125, 79)
RED = (196, 75, 75)
PURPLE = (123, 94, 167)
ORANGE = (210, 120, 40)
TEAL = (40, 140, 140)
GOLD = (180, 140, 40)
GRID = (210, 216, 224)
LIGHT_BLUE = (220, 232, 248)
LIGHT_GREEN = (220, 240, 228)
LIGHT_RED = (248, 228, 228)
LIGHT_PURPLE = (236, 228, 245)
LIGHT_ORANGE = (252, 236, 220)

ROOT = Path(__file__).resolve().parents[1]
IMAGES_OUT = ROOT / "public" / "images"
HTHP_OUT = ROOT / "public" / "images" / "hthp-configs"

W, H = 1024, 576


class Fonts:
    """Lazy-init Latin + CJK font bundle for 1024×576 knowledge diagrams."""

    def __init__(self) -> None:
        require_cjk_font()
        # Sizes tuned for screen readability at ~980px display width
        # (CJK below ~11px reads as muddy / “ghosted” after browser scaling).
        self.title = font_latin(24, True)
        self.h = font_latin(17, True)
        self.b = font_latin(14, True)
        self.n = font_latin(13)
        self.s = font_latin(12)
        self.xs = font_latin(11)
        self.ztitle = font_cjk(16)
        self.zh = font_cjk(13)
        self.zb = font_cjk(12)
        self.zn = font_cjk(12)
        self.zs = font_cjk(11)
        self.zxs = font_cjk(10)


def new_canvas(w: int = W, h: int = H, bg=BG):
    from PIL import Image, ImageDraw

    im = Image.new("RGB", (w, h), bg)
    return im, ImageDraw.Draw(im)


def round_rect(draw, xy, r, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)


def bi_title(draw, fonts: Fonts, en: str, zh: str, y: float = 28, w: int = W):
    bilingual_title(draw, (w / 2, y), en, zh, fonts.title, fonts.ztitle, INK, MUTED)


def bi_foot(draw, fonts: Fonts, en: str, zh: str, y: float = 548, w: int = W):
    bilingual_center(draw, (w / 2, y), en, zh, fonts.n, fonts.zn, MUTED, MUTED, gap=3)


def save_png(im, name: str, out: Path | None = None, *, downscale: bool = True) -> None:
    """Save PNG. If downscale and image is larger than W×H, LANCZOS to W×H.

    Pass downscale=False to keep a hires canvas (better on retina displays).
    """
    from PIL import Image as PILImage

    dest = (out or IMAGES_OUT) / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    if downscale and (im.size[0] > W or im.size[1] > H):
        im = im.resize((W, H), PILImage.Resampling.LANCZOS)
    im.save(dest, "PNG", optimize=True)
    print("wrote", name, im.size)


def new_canvas_hires(scale: int = 2, bg=BG):
    """Draw at scale× resolution; pair with save_png which downscales to W×H."""
    from PIL import Image, ImageDraw

    im = Image.new("RGB", (W * scale, H * scale), bg)
    return im, ImageDraw.Draw(im), scale


def scale_fonts(fonts: Fonts, scale: int) -> Fonts:
    """Return a Fonts-like bundle with sizes multiplied by scale (for hires drawing)."""
    require_cjk_font()

    class _Scaled:
        pass

    s = _Scaled()
    # Slightly larger than 1× base so text stays bold after CSS shrink-to-fit
    s.title = font_latin(26 * scale, True)
    s.h = font_latin(18 * scale, True)
    s.b = font_latin(15 * scale, True)
    s.n = font_latin(14 * scale)
    s.s = font_latin(13 * scale)
    s.xs = font_latin(12 * scale)
    s.ztitle = font_cjk(17 * scale)
    s.zh = font_cjk(14 * scale)
    s.zb = font_cjk(13 * scale)
    s.zn = font_cjk(13 * scale)
    s.zs = font_cjk(12 * scale)
    s.zxs = font_cjk(11 * scale)
    return s  # type: ignore[return-value]


def card(draw, box, fill=CARD, outline=GRID, r=12, width=2):
    round_rect(draw, box, r, fill, outline, width)


def bi_in_box(draw, fonts: Fonts, box, en: str, zh: str, fill=INK, title=False):
    cx = (box[0] + box[2]) / 2
    cy = (box[1] + box[3]) / 2
    if title:
        bilingual_center(draw, (cx, cy), en, zh, fonts.h, fonts.zh, fill, fill, gap=2)
    else:
        bilingual_center(draw, (cx, cy), en, zh, fonts.b, fonts.zb, fill, fill, gap=2)


# Left plot + right tip-stack layout (matches compressor "performance maps" style)
PLOT_BOX = (56, 72, 630, 505)  # outer card for main diagram
SIDE_X0, SIDE_X1 = 650, 1004
SIDE_Y0 = 74
SIDE_CARD_H = 96
SIDE_STEP = 106


def sidebar_tips(
    draw,
    fonts: Fonts,
    tips: list[tuple[str, str, str, str]],
    x0: int = SIDE_X0,
    x1: int = SIDE_X1,
    y0: int = SIDE_Y0,
    card_h: int | None = None,
    step: int | None = None,
    scale: int = 1,
) -> None:
    """Stacked tip cards: (en_title, zh_title, en_sub, zh_sub).

    Uses larger bilingual type + wider EN/ZH gap so labels stay sharp on screen.
    Pass scale=2 (and scale_fonts) when drawing on a hires canvas.
    """
    n = len(tips)
    if n <= 0:
        return
    if card_h is None or step is None:
        if n == 3:
            card_h, step = 118 * scale, 136 * scale
        elif n == 4:
            card_h, step = 96 * scale, 106 * scale
        elif n >= 5:
            card_h, step = 78 * scale, 86 * scale
        else:
            card_h, step = SIDE_CARD_H * scale, SIDE_STEP * scale
    gap = max(3, 3 * scale)
    # Tip title: both EN/ZH in dark ink (MUTED ZH + tiny gap looked like ghosting).
    tip_zh = fonts.zh if hasattr(fonts, "zh") else fonts.zb
    for i, (te, tz, se, sz) in enumerate(tips):
        y = y0 + i * step
        box = (x0, y, x1, y + card_h)
        round_rect(draw, box, max(6, 10 * scale // 2 + 4), CARD, GRID, max(1, scale))
        cx = (x0 + x1) / 2
        bilingual_center(draw, (cx, y + card_h * 0.32), te, tz, fonts.b, tip_zh, INK, INK, gap=gap)
        bilingual_center(draw, (cx, y + card_h * 0.70), se, sz, fonts.s, fonts.zs, MUTED, MUTED, gap=gap)


def plot_card(draw, box=PLOT_BOX, fill=CARD, outline=GRID, r=10, width=1):
    """Outer card framing the left-hand main diagram."""
    round_rect(draw, box, r, fill, outline, width)
