#!/usr/bin/env python3
"""
Overlay bilingual EN/ZH labels on public/images/hthp-configs/config-{a..i}.webp.

Strategy:
  1. Paint small white patches over known English label zones and redraw bilingual text.
  2. Append a ~48px legend strip at the bottom (expand canvas) so C/E and Heat sink/source
     remain readable even if a patch miss-fires — without covering the p-h chart.

Re-run is idempotent: if height is already original+LEGEND_H the file is skipped.
To re-patch from scratch, restore originals from git first.
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from diagram_style import (  # noqa: E402
    HTHP_OUT,
    INK,
    MUTED,
    bilingual_center,
    font_cjk,
    font_latin,
    require_cjk_font,
)

LEGEND_H = 48
WEBP_QUALITY = 85
WHITE = (255, 255, 255)

# Original asset sizes — used to skip / refuse a second expand.
ORIGINAL_SIZE: dict[str, tuple[int, int]] = {
    "a": (676, 555),
    "b": (692, 596),
    "c": (735, 573),
    "d": (716, 641),
    "e": (705, 625),
    "f": (729, 610),
    "g": (580, 723),
    "h": (800, 791),
    "i": (723, 817),
}

# Combined bounding boxes for stacked "Heat" / "sink|source" (or side-by-side on h).
# Coordinates measured on the original webp assets (left schematic).
PATCHES: dict[str, list[tuple[tuple[int, int, int, int], str, str]]] = {
    # (box, en, zh)
    "a": [
        ((20, 10, 110, 92), "Heat sink", "热汇"),
        ((228, 328, 348, 412), "Heat source", "热源"),
    ],
    "b": [
        ((24, 14, 114, 95), "Heat sink", "热汇"),
        ((210, 450, 340, 510), "Heat source", "热源"),
    ],
    "c": [
        ((60, 14, 150, 98), "Heat sink", "热汇"),
        ((232, 428, 372, 516), "Heat source", "热源"),
    ],
    "d": [
        ((32, 14, 124, 98), "Heat sink", "热汇"),
        ((226, 484, 348, 570), "Heat source", "热源"),
    ],
    "e": [
        ((26, 16, 116, 100), "Heat sink", "热汇"),
        ((210, 460, 345, 518), "Heat source", "热源"),
    ],
    "f": [
        ((18, 12, 108, 96), "Heat sink", "热汇"),
        ((230, 445, 350, 532), "Heat source", "热源"),
    ],
    "g": [
        ((12, 140, 120, 175), "Steam", "蒸汽"),
        ((400, 140, 520, 175), "Steam", "蒸汽"),
    ],
    "h": [
        ((165, 698, 380, 738), "Heat source", "热源"),
        ((285, 72, 400, 110), "Steam", "蒸汽"),
    ],
    "i": [
        ((100, 8, 220, 48), "Heat sink", "热汇"),
        ((250, 720, 390, 775), "Heat source", "热源"),
        ((270, 145, 385, 180), "Steam", "蒸汽"),
    ],
}

def _patch_label(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    en: str,
    zh: str,
    f_en,
    f_zh,
) -> None:
    x0, y0, x1, y1 = box
    # Keep patch inside image; pad slightly for glyph overhang.
    draw.rectangle([x0 - 2, y0 - 2, x1 + 2, y1 + 2], fill=WHITE)
    cx = (x0 + x1) / 2
    cy = (y0 + y1) / 2
    # Compact stacked bilingual inside the cleared zone.
    bilingual_center(draw, (cx, cy), en, zh, f_en, f_zh, INK, MUTED, gap=2)


def _legend_text(letter: str) -> tuple[str, str]:
    if letter == "g":
        return (
            "Steam = 蒸汽 · Low temp. → heat source side · High temp. → heat sink side",
            "蒸汽 · 低温侧≈热源 · 高温侧≈热汇 · C/E 不适用开式蒸汽压缩",
        )
    return (
        "Heat sink = 热汇 · Heat source = 热源 · C = Condenser/冷凝器 · E = Evaporator/蒸发器",
        "热汇/热源 · C=冷凝器 · E=蒸发器 · FT=闪蒸罐 · 经济器/引射器/复叠见示意图",
    )


def process_one(path: Path, letter: str, f_en, f_zh, f_leg, f_leg_z) -> None:
    im = Image.open(path).convert("RGB")
    ow, oh = ORIGINAL_SIZE.get(letter, (0, 0))
    if ow and im.size == (ow, oh + LEGEND_H):
        print(f"skip {path.name} (already overlaid)")
        return
    if ow and im.size != (ow, oh):
        print(
            f"WARN {path.name}: size {im.size} ≠ original {(ow, oh)}; "
            "restore from git before re-running",
            file=sys.stderr,
        )

    draw = ImageDraw.Draw(im)

    for box, en, zh in PATCHES.get(letter, []):
        # Clamp to image
        w, h = im.size
        x0, y0, x1, y1 = box
        box_c = (max(0, x0), max(0, y0), min(w - 1, x1), min(h - 1, y1))
        if box_c[2] - box_c[0] < 20 or box_c[3] - box_c[1] < 12:
            continue
        _patch_label(draw, box_c, en, zh, f_en, f_zh)

    # Expand canvas with legend strip
    w, h = im.size
    out = Image.new("RGB", (w, h + LEGEND_H), WHITE)
    out.paste(im, (0, 0))
    d2 = ImageDraw.Draw(out)
    # Soft top rule
    d2.line([(8, h + 1), (w - 8, h + 1)], fill=(220, 220, 220), width=1)
    en, zh = _legend_text(letter)
    bilingual_center(d2, (w / 2, h + LEGEND_H / 2), en, zh, f_leg, f_leg_z, MUTED, MUTED, gap=2)

    out.save(path, "WEBP", quality=WEBP_QUALITY, method=6)
    print(f"wrote {path.name} ({w}×{h + LEGEND_H})")


def main() -> None:
    require_cjk_font()
    f_en = font_latin(11, True)
    f_zh = font_cjk(10)
    # Legend lines mix Latin + CJK — must use a CJK-capable face for both.
    f_leg = font_cjk(9)
    f_leg_z = font_cjk(8)

    if not HTHP_OUT.is_dir():
        print(f"ERROR: missing {HTHP_OUT}", file=sys.stderr)
        sys.exit(1)

    for letter in "abcdefghi":
        path = HTHP_OUT / f"config-{letter}.webp"
        if not path.exists():
            print(f"skip missing {path.name}")
            continue
        process_one(path, letter, f_en, f_zh, f_leg, f_leg_z)

    print(f"done — overlays in {HTHP_OUT}")


if __name__ == "__main__":
    main()
