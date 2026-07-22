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
    for p in _LATIN_BOLD if bold else _LATIN_REG:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except OSError:
                continue
    # Fall back to CJK face (also covers Latin)
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
    bilingual_center(draw, xy, en, zh, f_en, f_zh, fill_en, fill_zh, gap=3)


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
        self.title = font_latin(22, True)
        self.h = font_latin(16, True)
        self.b = font_latin(13, True)
        self.n = font_latin(12)
        self.s = font_latin(11)
        self.xs = font_latin(10)
        self.ztitle = font_cjk(14)
        self.zh = font_cjk(12)
        self.zb = font_cjk(11)
        self.zn = font_cjk(10)
        self.zs = font_cjk(9)
        self.zxs = font_cjk(8)


def new_canvas(w: int = W, h: int = H, bg=BG):
    from PIL import Image, ImageDraw

    im = Image.new("RGB", (w, h), bg)
    return im, ImageDraw.Draw(im)


def round_rect(draw, xy, r, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)


def bi_title(draw, fonts: Fonts, en: str, zh: str, y: float = 28, w: int = W):
    bilingual_title(draw, (w / 2, y), en, zh, fonts.title, fonts.ztitle, INK, MUTED)


def bi_foot(draw, fonts: Fonts, en: str, zh: str, y: float = 548, w: int = W):
    bilingual_center(draw, (w / 2, y), en, zh, fonts.n, fonts.zs, MUTED, MUTED, gap=2)


def save_png(im, name: str, out: Path | None = None) -> None:
    dest = (out or IMAGES_OUT) / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "PNG", optimize=True)
    print("wrote", name)


def card(draw, box, fill=CARD, outline=GRID, r=12, width=2):
    round_rect(draw, box, r, fill, outline, width)


def bi_in_box(draw, fonts: Fonts, box, en: str, zh: str, fill=INK, title=False):
    cx = (box[0] + box[2]) / 2
    cy = (box[1] + box[3]) / 2
    if title:
        bilingual_center(draw, (cx, cy), en, zh, fonts.h, fonts.zh, fill, fill, gap=2)
    else:
        bilingual_center(draw, (cx, cy), en, zh, fonts.b, fonts.zb, fill, fill, gap=2)
