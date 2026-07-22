#!/usr/bin/env python3
"""Generate knowledge-pipe-*.png — piping knowledge diagrams (EN primary / ZH secondary)."""

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
# 1. Piping roles in the cycle
# ---------------------------------------------------------------------------


def draw_cycle():
    im, d = new_canvas()
    bi_title(d, F, "Refrigerant piping roles in the cycle", "循环中的制冷剂管路角色")

    # Cycle boxes
    comp = (392, 70, 632, 155)
    cond = (700, 200, 960, 310)
    expv = (392, 380, 632, 470)
    evap = (64, 200, 304, 310)

    round_rect(d, comp, 12, LIGHT_GREEN, GREEN, 3)
    bi_in_box(d, F, comp, "Compressor", "压缩机", GREEN, title=True)
    round_rect(d, cond, 12, LIGHT_RED, RED, 3)
    bi_in_box(d, F, cond, "Condenser / outdoor", "冷凝器/室外", RED, title=True)
    round_rect(d, expv, 12, LIGHT_PURPLE, PURPLE, 3)
    bi_in_box(d, F, expv, "Expansion", "膨胀", PURPLE, title=True)
    round_rect(d, evap, 12, LIGHT_BLUE, BLUE, 3)
    bi_in_box(d, F, evap, "Evaporator / indoor", "蒸发器/室内", BLUE, title=True)

    # Line labels as colored paths
    arrow(d, (632, 112), (830, 112), RED)
    arrow(d, (830, 112), (830, 200), RED)
    bilingual_center(d, (730, 92), "Discharge · dP / vibration", "排气管 · 压降/振动", F.xs, F.zxs, RED, RED, gap=1)

    arrow(d, (830, 310), (632, 425), GREEN)
    bilingual_center(d, (780, 360), "Liquid · flash risk", "液管 · 闪发风险", F.xs, F.zxs, GREEN, GREEN, gap=1)

    arrow(d, (392, 425), (184, 310), BLUE)
    arrow(d, (184, 200), (184, 112), TEAL)
    arrow(d, (184, 112), (392, 112), TEAL)
    bilingual_center(d, (280, 92), "Suction · oil return", "吸气管 · 回油", F.xs, F.zxs, TEAL, TEAL, gap=1)

    # Three role cards
    roles = [
        ((64, 500, 320, 538), ORANGE, "Pressure drop", "压降"),
        ((352, 500, 672, 538), TEAL, "Oil return", "回油"),
        ((704, 500, 960, 538), PURPLE, "Vibration & stress", "振动与应力"),
    ]
    for box, col, en, zh in roles:
        round_rect(d, box, 8, CARD, col, 2)
        bi_in_box(d, F, box, en, zh, col)

    bi_foot(
        d,
        F,
        "Treat piping as flow, oil-return, and vibration path — not afterthought routing",
        "管路是流动、回油与振动路径——不是事后走线",
    )
    save_png(im, "knowledge-pipe-cycle.png")


# ---------------------------------------------------------------------------
# 2. Sizing geometry
# ---------------------------------------------------------------------------


def draw_sizing():
    im, d = new_canvas()
    bi_title(d, F, "Diameter, slope, risers & support spacing", "管径、坡度、立管与支撑间距")

    # Schematic zone
    card(d, (48, 70, 620, 360), fill=CARD, outline=GRID, r=14, width=2)

    # Horizontal pipe
    d.line([(80, 220), (420, 200)], fill=BLUE, width=8)
    bilingual_center(d, (250, 175), "Slope ≥ 1% with flow", "坡度 ≥ 1% 顺流", F.s, F.zs, BLUE, BLUE, gap=1)

    # Supports
    for x in (120, 250, 380):
        d.line([(x, 150), (x, 210)], fill=MUTED, width=3)
        d.ellipse([x - 8, 140, x + 8, 156], outline=MUTED, width=2)
    bilingual_center(d, (250, 125), "Support spacing 1.5–2.0 m", "支撑间距 1.5–2.0 m", F.xs, F.zxs, MUTED, MUTED, gap=1)

    # Oil trap + riser
    trap = [(420, 200), (440, 260), (470, 260), (490, 200), (490, 120)]
    for i in range(len(trap) - 1):
        d.line([trap[i], trap[i + 1]], fill=TEAL, width=8)
    bilingual_center(d, (455, 290), "Oil trap", "油弯", F.b, F.zb, TEAL, TEAL, gap=1)
    bilingual_center(d, (540, 150), "Riser", "立管", F.b, F.zb, ORANGE, ORANGE, gap=1)
    arrow(d, (490, 120), (490, 95), ORANGE, width=3)
    # Diameter mark
    d.line([(510, 140), (560, 140)], fill=ORANGE, width=2)
    d.line([(510, 180), (560, 180)], fill=ORANGE, width=2)
    d.line([(535, 140), (535, 180)], fill=ORANGE, width=2)
    bilingual_center(d, (580, 160), "Ø", "管径", F.s, F.zs, ORANGE, ORANGE, gap=1)

    # Right cards
    tips = [
        ((660, 70, 984, 160), BLUE, LIGHT_BLUE, "Diameter & velocity", "管径与流速", "dP + oil at min mass flow", "压降 + 最小流量回油"),
        ((660, 175, 984, 265), TEAL, (220, 242, 242), "Slope & drainage", "坡度与疏排", "Avoid silent oil traps", "避免静默积油"),
        ((660, 280, 984, 370), ORANGE, LIGHT_ORANGE, "Risers & traps", "立管与油弯", "Lift > 6 m → trap base", "提升 > 6 m → 底部油弯"),
    ]
    for box, col, fill, en, zh, se, sz in tips:
        round_rect(d, box, 12, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 32), en, zh, F.b, F.zb, col, col, gap=2)
        bilingual_center(d, (cx, box[1] + 70), se, sz, F.s, F.zxs, MUTED, MUTED, gap=1)

    # Spacing table strip
    card(d, (48, 385, 984, 500), fill=LIGHT_BLUE, outline=BLUE, r=12, width=2)
    rows = [
        ("≤ 28 mm", "1.2–1.5 m", "≤ 1-1/8 in", "4–5 ft"),
        ("29–54 mm", "1.5–2.0 m", "1-1/8–2-1/8", "5–6.5 ft"),
        ("55–108 mm", "2.0–2.5 m", "2-1/8–4-1/8", "6.5–8 ft"),
    ]
    bilingual_center(d, (W / 2, 410), "Nominal Ø → support spacing (typical)", "公称管径 → 支撑间距（典型）", F.b, F.zb, BLUE, BLUE, gap=1)
    for i, (a, b, c, e) in enumerate(rows):
        x = 80 + i * 300
        bilingual_center(d, (x + 100, 460), f"{a} → {b}", f"{c} → {e}", F.s, F.zxs, INK, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "Prove the low-speed corner — not only design-load diameter",
        "验证低速角——不要只按设计负荷选管径",
    )
    save_png(im, "knowledge-pipe-sizing.png")


# ---------------------------------------------------------------------------
# 3. Supports, isolation, expansion
# ---------------------------------------------------------------------------


def draw_supports():
    im, d = new_canvas()
    bi_title(d, F, "Supports, vibration isolation & expansion", "支撑、隔振与热膨胀")

    panels = [
        (
            (40, 70, 340, 470),
            BLUE,
            LIGHT_BLUE,
            "Rigid supports",
            "刚性支撑",
            [
                ("Clevis / saddle / channel", "吊架 / 管卡 / 槽钢"),
                ("Hold geometry & slope", "保持几何与坡度"),
                ("Cradle insulated lines", "保温管需托架"),
            ],
        ),
        (
            (362, 70, 662, 470),
            ORANGE,
            LIGHT_ORANGE,
            "Vibration isolation",
            "隔振",
            [
                ("Near compressor source", "靠近压缩机源"),
                ("Flex / spring / rubber", "软接 / 弹簧 / 橡胶"),
                ("Avoid re-couple to frame", "勿再耦合到机架"),
            ],
        ),
        (
            (684, 70, 984, 470),
            PURPLE,
            LIGHT_PURPLE,
            "Thermal expansion",
            "热膨胀",
            [
                ("Loops / offsets / joints", "膨胀弯 / 偏置 / 接头"),
                ("Hot discharge grows", "热排气管伸长"),
                ("Cold suction shrinks", "冷吸气管收缩"),
            ],
        ),
    ]
    for box, col, fill, en, zh, lines in panels:
        round_rect(d, box, 14, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 45), en, zh, F.h, F.zh, col, col, gap=2)
        # glyph
        gy = box[1] + 110
        if col == BLUE:
            d.line([(cx - 40, gy), (cx + 40, gy)], fill=col, width=4)
            for dx in (-30, 0, 30):
                d.line([(cx + dx, gy), (cx + dx, gy + 25)], fill=MUTED, width=3)
        elif col == ORANGE:
            d.line([(cx - 50, gy + 10), (cx - 20, gy + 10)], fill=col, width=4)
            d.arc([cx - 20, gy - 5, cx + 20, gy + 25], 0, 180, fill=col, width=3)
            d.line([(cx + 20, gy + 10), (cx + 50, gy + 10)], fill=col, width=4)
        else:
            # U-loop
            pts = [(cx - 40, gy), (cx - 40, gy + 30), (cx + 40, gy + 30), (cx + 40, gy)]
            for i in range(len(pts) - 1):
                d.line([pts[i], pts[i + 1]], fill=col, width=4)
        y = box[1] + 200
        for se, sz in lines:
            bilingual_center(d, (cx, y), se, sz, F.s, F.zs, INK, MUTED, gap=2)
            y += 55

    bi_foot(
        d,
        F,
        "Missing any one turns a tidy rack into a leak factory",
        "缺一不可——否则整洁机架几季后变漏点工厂",
    )
    save_png(im, "knowledge-pipe-supports.png")


# ---------------------------------------------------------------------------
# 4. Corrosion risks
# ---------------------------------------------------------------------------


def draw_corrosion():
    im, d = new_canvas()
    bi_title(d, F, "Piping corrosion risks", "管路腐蚀风险")

    items = [
        ("Galvanic couple", "电偶腐蚀", "Dissimilar metals", "异种金属接触", "Isolate / compatible fittings", "隔离 / 相容管件", ORANGE, LIGHT_ORANGE),
        ("Coastal salt", "沿海盐雾", "Outdoor copper / steel", "室外铜 / 钢", "Coatings · drainage", "涂层 · 排水", TEAL, (220, 242, 242)),
        ("Condensate drip", "冷凝水滴落", "Sweat onto joints", "结露滴到接头", "Slope · drip edges", "坡度 · 滴水边", BLUE, LIGHT_BLUE),
        ("CUI", "保温下腐蚀", "Wet barrier under lag", "保温下湿汽", "Seal vapor barrier", "密封隔汽层", RED, LIGHT_RED),
    ]
    gap = 16
    left = 36
    usable = W - 2 * left - 3 * gap
    bw = usable / 4
    for i, (en, zh, se, sz, te, tz, col, fill) in enumerate(items):
        x0 = left + i * (bw + gap)
        box = (x0, 78, x0 + bw, 470)
        round_rect(d, box, 12, fill, col, 3)
        cx = x0 + bw / 2
        bilingual_center(d, (cx, 140), en, zh, F.h, F.zh, col, col, gap=2)
        round_rect(d, (x0 + 16, 200, x0 + bw - 16, 280), 8, CARD, col, 2)
        bilingual_center(d, (cx, 240), se, sz, F.s, F.zxs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, 360), te, tz, F.b, F.zb, col, col, gap=2)

    bi_foot(
        d,
        F,
        "Material, coating, and drainage beat paint-over-rust",
        "材料、涂层与排水胜过「刷漆盖锈」",
    )
    save_png(im, "knowledge-pipe-corrosion.png")


# ---------------------------------------------------------------------------
# 5. Insulation & vapor barrier
# ---------------------------------------------------------------------------


def draw_insulation():
    im, d = new_canvas()
    bi_title(d, F, "Pipe insulation & vapor barrier", "管路保温与隔汽层")

    # Cross-section schematic
    card(d, (48, 70, 480, 470), fill=CARD, outline=GRID, r=14, width=2)
    bilingual_center(d, (264, 105), "Cold suction cross-section", "冷吸气管截面", F.b, F.zb, BLUE, BLUE, gap=2)

    cx, cy = 264, 280
    # Outer jacket
    d.ellipse([cx - 120, cy - 120, cx + 120, cy + 120], outline=MUTED, width=3)
    # Vapor barrier
    d.ellipse([cx - 100, cy - 100, cx + 100, cy + 100], outline=PURPLE, width=4)
    # Insulation
    d.ellipse([cx - 80, cy - 80, cx + 80, cy + 80], fill=LIGHT_BLUE, outline=BLUE, width=2)
    # Pipe wall
    d.ellipse([cx - 36, cy - 36, cx + 36, cy + 36], fill=(200, 210, 220), outline=INK, width=2)
    # Bore
    d.ellipse([cx - 22, cy - 22, cx + 22, cy + 22], fill=LIGHT_BLUE, outline=TEAL, width=2)

    bilingual_center(d, (cx, cy - 145), "Jacket", "护套", F.xs, F.zxs, MUTED, MUTED, gap=1)
    bilingual_center(d, (cx + 130, cy - 40), "Vapor barrier", "隔汽层", F.xs, F.zxs, PURPLE, PURPLE, gap=1)
    bilingual_center(d, (cx + 115, cy + 50), "Insulation", "保温层", F.xs, F.zxs, BLUE, BLUE, gap=1)
    bilingual_center(d, (cx, cy), "Pipe", "钢管/铜管", F.xs, F.zxs, INK, MUTED, gap=1)

    # Right callouts
    notes = [
        ((520, 70, 984, 175), PURPLE, LIGHT_PURPLE, "Continuous vapor barrier", "连续隔汽层", "Cuts at joints → dew-point sweat", "接头切开 → 露点结露"),
        ((520, 195, 984, 300), BLUE, LIGHT_BLUE, "Thickness for dew point", "按露点选厚度", "Ambient RH + surface T", "环境湿度 + 表面温度"),
        ((520, 320, 984, 425), ORANGE, LIGHT_ORANGE, "Hot discharge differ", "热排气管不同", "Touch protection / heat loss", "防烫 / 热损失"),
        ((520, 445, 984, 520), RED, LIGHT_RED, "CUI warning", "保温下腐蚀警示", "Wet lag destroys metal quietly", "潮湿保温悄然毁金属"),
    ]
    for box, col, fill, en, zh, se, sz in notes:
        round_rect(d, box, 10, fill, col, 2)
        cx2 = (box[0] + box[2]) / 2
        cy2 = (box[1] + box[3]) / 2
        bilingual_center(d, (cx2, cy2 - 14), en, zh, F.b, F.zb, col, col, gap=1)
        bilingual_center(d, (cx2, cy2 + 16), se, sz, F.xs, F.zxs, MUTED, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "Metal and insulation fail as a pair — seal the vapor barrier",
        "金属与保温成对失效——密封隔汽层",
    )
    save_png(im, "knowledge-pipe-insulation.png")


def main():
    global F
    F = Fonts()
    assert IMAGES_OUT and W and H and BG
    draw_cycle()
    draw_sizing()
    draw_supports()
    draw_corrosion()
    draw_insulation()
    print(f"done — {W}×{H} → {IMAGES_OUT}")


if __name__ == "__main__":
    main()
