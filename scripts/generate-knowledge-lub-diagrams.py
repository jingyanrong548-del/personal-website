#!/usr/bin/env python3
"""Generate knowledge-lub-*.png — lubricant knowledge diagrams (EN primary / ZH secondary)."""

from __future__ import annotations

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from diagram_style import (  # noqa: E402
    BG,
    CARD,
    INK,
    MUTED,
    BLUE,
    GREEN,
    RED,
    PURPLE,
    ORANGE,
    TEAL,
    GOLD,
    GRID,
    LIGHT_BLUE,
    LIGHT_GREEN,
    LIGHT_RED,
    LIGHT_PURPLE,
    LIGHT_ORANGE,
    Fonts,
    new_canvas,
    round_rect,
    bi_title,
    bi_foot,
    save_png,
    card,
    bi_in_box,
    bilingual_center,
    text_center,
    W,
    H,
    IMAGES_OUT,
)

F: Fonts | None = None


def arrow(draw, p1, p2, color=INK, width=3):
    draw.line([p1, p2], fill=color, width=width)
    x1, y1 = p1
    x2, y2 = p2
    ang = math.atan2(y2 - y1, x2 - x1)
    L = 11
    a1 = (x2 - L * math.cos(ang - 0.4), y2 - L * math.sin(ang - 0.4))
    a2 = (x2 - L * math.cos(ang + 0.4), y2 - L * math.sin(ang + 0.4))
    draw.polygon([p2, a1, a2], fill=color)


# ---------------------------------------------------------------------------
# 1. Oil path in the vapor-compression cycle
# ---------------------------------------------------------------------------


def draw_cycle():
    im, d = new_canvas()
    bi_title(d, F, "Oil path in the vapor-compression cycle", "蒸气压缩循环中的油路")

    comps = [
        ((380, 70, 644, 155), GREEN, LIGHT_GREEN, "Compressor + sump", "压缩机 + 油池"),
        ((700, 70, 960, 155), ORANGE, LIGHT_ORANGE, "Oil separator", "油分离器"),
        ((700, 220, 960, 320), RED, LIGHT_RED, "Condenser", "冷凝器"),
        ((380, 380, 644, 470), PURPLE, LIGHT_PURPLE, "Expansion", "膨胀装置"),
        ((64, 220, 304, 320), BLUE, LIGHT_BLUE, "Evaporator", "蒸发器"),
        ((64, 70, 304, 155), TEAL, (220, 242, 242), "Oil return", "回油"),
    ]
    for box, col, fill, en, zh in comps:
        round_rect(d, box, 12, fill, col, 3)
        bi_in_box(d, F, box, en, zh, col, title=True)

    # High-pressure refrigerant + oil mist
    arrow(d, (644, 112), (700, 112), ORANGE)
    bilingual_center(d, (672, 92), "oil mist", "油雾", F.xs, F.zxs, ORANGE, ORANGE, gap=1)

    # Clean refrigerant to condenser
    arrow(d, (830, 155), (830, 220), RED)
    bilingual_center(d, (900, 188), "clean gas", "净气", F.xs, F.zxs, RED, RED, gap=1)

    # Liquid path
    arrow(d, (830, 320), (644, 425), PURPLE)
    arrow(d, (380, 425), (184, 320), BLUE)

    # Suction + oil film return
    arrow(d, (184, 220), (184, 155), TEAL)
    arrow(d, (184, 112), (380, 112), TEAL)
    bilingual_center(d, (280, 92), "suction + film", "吸气+油膜", F.xs, F.zxs, TEAL, TEAL, gap=1)

    # Metered oil return
    arrow(d, (700, 112), (304, 112), ORANGE, width=2)
    bilingual_center(d, (500, 188), "metered return", "计量回油", F.s, F.zs, ORANGE, ORANGE, gap=1)

    # Hold-up callout
    card(d, (340, 250, 640, 340), fill=CARD, outline=ORANGE, r=10, width=2)
    bilingual_center(
        d,
        (490, 295),
        "Evaporator oil hold-up risk",
        "蒸发器积油风险",
        F.b,
        F.zb,
        ORANGE,
        ORANGE,
        gap=2,
    )

    bi_foot(
        d,
        F,
        "Separator reclaim + return geometry decide whether oil comes home",
        "油分回收与回油几何决定油能否回家",
    )
    save_png(im, "knowledge-lub-cycle.png")


# ---------------------------------------------------------------------------
# 2. Lubricant families
# ---------------------------------------------------------------------------


def draw_families():
    im, d = new_canvas()
    bi_title(d, F, "Lubricant families & refrigerant pairing", "润滑油家族与工质配对")

    items = [
        ("MO", "矿物油", "Legacy HCFC / HC", "传统 HCFC / 碳氢", "Low hygroscopy", "吸湿性低", GOLD, (252, 244, 220)),
        ("AB", "烷基苯", "HCFC / retrofit", "HCFC / 改造", "Better solvency", "溶解性更好", ORANGE, LIGHT_ORANGE),
        ("POE", "多元醇酯", "HFC / HFO / HP", "HFC / HFO / 热泵", "Hygroscopic!", "强吸湿！", GREEN, LIGHT_GREEN),
        ("PAG", "聚烷撑二醇", "Auto A/C · CO₂*", "汽车空调 · CO₂*", "Do not swap casually", "不可随意对换", BLUE, LIGHT_BLUE),
        ("PVE", "聚乙烯醚", "Selected HFC/HFO", "部分 HFC/HFO", "Often less wet", "往往更不吸湿", PURPLE, LIGHT_PURPLE),
    ]
    gap = 14
    left = 28
    usable = W - 2 * left - 4 * gap
    bw = usable / 5
    top, bot = 78, 470
    for i, (abbr, zh, fe, fz, ne, nz, col, fill) in enumerate(items):
        x0 = left + i * (bw + gap)
        box = (x0, top, x0 + bw, bot)
        round_rect(d, box, 12, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, 130), abbr, zh, F.h, F.zh, col, col, gap=2)
        round_rect(d, (x0 + 12, 175, x0 + bw - 12, 255), 8, CARD, col, 2)
        bilingual_center(d, (cx, 215), fe, fz, F.s, F.zxs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, 320), ne, nz, F.b, F.zb, col, col, gap=2)
        bilingual_center(d, (cx, 410), "OEM approve", "厂家认可", F.xs, F.zxs, MUTED, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "Always read the compressor oil approval for your exact refrigerant",
        "务必按具体工质读取压缩机油品认可表",
    )
    save_png(im, "knowledge-lub-families.png")


# ---------------------------------------------------------------------------
# 3. Viscosity vs temperature
# ---------------------------------------------------------------------------


def draw_viscosity():
    im, d = new_canvas()
    bi_title(d, F, "Viscosity vs temperature — ISO VG window", "粘度–温度 — ISO VG 窗口")

    # Chart card
    chart = (48, 70, 620, 470)
    round_rect(d, chart, 14, CARD, GRID, 2)

    # Axes
    ox, oy = 100, 420
    ax_r, ay_t = 580, 110
    d.line([(ox, oy), (ax_r, oy)], fill=INK, width=2)
    d.line([(ox, oy), (ox, ay_t)], fill=INK, width=2)
    bilingual_center(d, (340, 450), "Temperature °C", "温度 °C", F.xs, F.zxs, MUTED, MUTED, gap=1)
    text_center(d, (70, 260), "ν", F.h, MUTED)

    # Window band
    win_top, win_bot = 220, 320
    d.rectangle([ox + 2, win_top, ax_r - 2, win_bot], fill=LIGHT_GREEN)
    bilingual_center(d, (200, 270), "OEM viscosity window", "厂家粘度窗口", F.s, F.zs, GREEN, GREEN, gap=1)

    # Cold / hot zones
    d.rectangle([ox + 2, ay_t + 2, 180, oy - 2], fill=LIGHT_BLUE)
    d.rectangle([480, ay_t + 2, ax_r - 2, oy - 2], fill=LIGHT_RED)
    bilingual_center(d, (140, 150), "Cold start", "冷启动", F.xs, F.zxs, BLUE, BLUE, gap=1)
    bilingual_center(d, (530, 150), "Hot discharge", "高温排气", F.xs, F.zxs, RED, RED, gap=1)

    # Curves (schematic)
    def curve(pts, col):
        for i in range(len(pts) - 1):
            d.line([pts[i], pts[i + 1]], fill=col, width=3)

    curve([(120, 140), (220, 200), (340, 260), (460, 310), (560, 360)], BLUE)
    curve([(120, 180), (220, 240), (340, 300), (460, 350), (560, 390)], TEAL)
    bilingual_center(d, (400, 200), "ISO VG 68", "ISO VG 68", F.s, F.zxs, BLUE, BLUE, gap=1)
    bilingual_center(d, (400, 360), "ISO VG 32", "ISO VG 32", F.s, F.zxs, TEAL, TEAL, gap=1)

    # Right cards
    cards = [
        ((660, 70, 984, 180), BLUE, LIGHT_BLUE, "Too thick", "过稠", "Starved ports · high torque", "孔口饥饿 · 扭矩大"),
        ((660, 200, 984, 320), GREEN, LIGHT_GREEN, "In window", "窗口内", "Film + return credible", "油膜+回油可信"),
        ((660, 340, 984, 470), RED, LIGHT_RED, "Too thin", "过稀", "Metal contact risk", "金属接触风险"),
    ]
    for box, col, fill, en, zh, se, sz in cards:
        round_rect(d, box, 12, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        cy = (box[1] + box[3]) / 2
        bilingual_center(d, (cx, cy - 18), en, zh, F.h, F.zh, col, col, gap=2)
        bilingual_center(d, (cx, cy + 22), se, sz, F.s, F.zxs, MUTED, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "Refrigerant dissolution thins the film — pair VG with miscibility maps",
        "制冷剂溶入会稀释油膜——粘度等级须与互溶图一并选型",
    )
    save_png(im, "knowledge-lub-viscosity.png")


# ---------------------------------------------------------------------------
# 4. Charge & contamination control
# ---------------------------------------------------------------------------


def draw_contamination():
    im, d = new_canvas()
    bi_title(d, F, "Oil charge & contamination control", "油充注与污染控制")

    steps = [
        ("1", "New oil drum", "新油桶", "Sealed · OEM type", "密封 · 厂家油型", GREEN, LIGHT_GREEN),
        ("2", "Dry vacuum", "干燥真空", "≤ moisture target", "达水分目标", BLUE, LIGHT_BLUE),
        ("3", "Operating circuit", "运行油路", "Level · return", "油位 · 回油", TEAL, (220, 242, 242)),
        ("4", "Contaminants", "污染物", "H₂O · acid · debris", "水分 · 酸 · 碎屑", ORANGE, LIGHT_ORANGE),
        ("5", "Filter / change", "干燥过滤/换油", "Recover · recharge", "恢复 · 再充", PURPLE, LIGHT_PURPLE),
    ]
    gap = 14
    left = 28
    usable = W - 2 * left - 4 * gap
    bw = usable / 5
    top, bot = 78, 420
    for i, (n, en, zh, se, sz, col, fill) in enumerate(steps):
        x0 = left + i * (bw + gap)
        box = (x0, top, x0 + bw, bot)
        round_rect(d, box, 12, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        round_rect(d, (cx - 18, top + 18, cx + 18, top + 54), 8, CARD, col, 2)
        text_center(d, (cx, top + 36), n, F.h, col)
        bilingual_center(d, (cx, 180), en, zh, F.b, F.zb, col, col, gap=2)
        bilingual_center(d, (cx, 280), se, sz, F.s, F.zxs, INK, MUTED, gap=2)
        if i < len(steps) - 1:
            arrow(d, (x0 + bw + 2, 250), (x0 + bw + gap - 2, 250), MUTED, width=2)

    card(d, (48, 450, 976, 520), fill=LIGHT_RED, outline=RED, r=10, width=2)
    bilingual_center(
        d,
        (W / 2, 485),
        "Burnout = system cleanup — filters, driers, possibly multiple oil changes",
        "烧毁 = 系统清理——过滤器、干燥器，可能多次换油",
        F.s,
        F.zs,
        RED,
        RED,
        gap=2,
    )

    bi_foot(
        d,
        F,
        "Vacuum, leak-tightness, and filter-driers protect oil chemistry",
        "真空、气密与干燥过滤器保护油品化学",
    )
    save_png(im, "knowledge-lub-contamination.png")


def main():
    global F
    F = Fonts()
    assert IMAGES_OUT and W and H and BG
    draw_cycle()
    draw_families()
    draw_viscosity()
    draw_contamination()
    print(f"done — {W}×{H} → {IMAGES_OUT}")


if __name__ == "__main__":
    main()
