#!/usr/bin/env python3
"""Generate knowledge-valve-*.png — valve knowledge diagrams (EN primary / ZH secondary)."""

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
# 1. Cycle highlighting expansion + 4-way
# ---------------------------------------------------------------------------


def draw_cycle():
    im, d = new_canvas()
    bi_title(d, F, "Refrigerant circuit — expansion & reversing valves", "制冷剂回路——膨胀阀与四通阀")

    comps = [
        ((392, 70, 632, 165), GREEN, False, "Compressor", "压缩机"),
        ((700, 70, 960, 165), TEAL, True, "4-way valve", "四通阀"),
        ((700, 230, 960, 340), RED, False, "Condenser / outdoor", "冷凝器/室外"),
        ((392, 390, 632, 510), PURPLE, True, "Expansion valve", "膨胀阀"),
        ((64, 230, 304, 340), BLUE, False, "Evaporator / indoor", "蒸发器/室内"),
    ]
    for box, col, hi, en, zh in comps:
        fill = LIGHT_PURPLE if hi and col == PURPLE else (LIGHT_ORANGE if hi else CARD)
        if hi and col == TEAL:
            fill = (220, 242, 242)
        round_rect(d, box, 12, fill, col, 4 if hi else 2)
        bi_in_box(d, F, box, en, zh, col, title=True)

    arrow(d, (632, 117), (700, 117), GREEN)
    arrow(d, (830, 165), (830, 230), TEAL)
    arrow(d, (830, 340), (632, 450), RED)
    arrow(d, (392, 450), (184, 340), PURPLE)
    arrow(d, (184, 230), (392, 117), BLUE)
    # reverse path hint from 4-way to evaporator
    arrow(d, (700, 140), (304, 260), TEAL, width=2)

    bilingual_center(d, (512, 200), "reversing path", "换向通路", F.xs, F.zxs, TEAL, TEAL, gap=1)
    bilingual_center(d, (512, 360), "throttle", "节流", F.xs, F.zxs, PURPLE, PURPLE, gap=1)

    bi_foot(
        d,
        F,
        "Expansion sets low-side feed; 4-way swaps which HX is evaporator vs condenser",
        "膨胀阀设定低压侧供液；四通阀交换蒸发器与冷凝器角色",
    )
    save_png(im, "knowledge-valve-cycle.png")


# ---------------------------------------------------------------------------
# 2. Valve families grid
# ---------------------------------------------------------------------------


def draw_types():
    im, d = new_canvas()
    bi_title(d, F, "Valve families in HVAC / heat-pump plant", "暖通/热泵装置中的阀门族")

    items = [
        ("TXV", "热力膨胀阀", "Bulb + spring", "感温包+弹簧", ORANGE, LIGHT_ORANGE),
        ("EEV", "电子膨胀阀", "Stepper / PWM", "步进/PWM", PURPLE, LIGHT_PURPLE),
        ("Solenoid", "电磁阀", "On / off isolate", "通断隔离", BLUE, LIGHT_BLUE),
        ("4-way", "四通阀", "Reversing cycle", "循环换向", TEAL, (220, 242, 242)),
        ("Check", "止回阀", "One-way flow", "单向流通", GREEN, LIGHT_GREEN),
        ("Safety", "安全阀", "Relieve over-P", "超压泄放", RED, LIGHT_RED),
        ("Ball", "球阀", "Service shut-off", "检修关断", GOLD, (252, 244, 220)),
    ]
    # 4 + 3 layout
    gap = 16
    y_row1, y_row2 = 75, 300
    h = 190
    # Row 1: 4
    cw1 = (W - 2 * 36 - 3 * gap) / 4
    for i, (en, zh, se, sz, col, fill) in enumerate(items[:4]):
        x = 36 + i * (cw1 + gap)
        box = (x, y_row1, x + cw1, y_row1 + h)
        round_rect(d, box, 12, fill, col, 3)
        cx = x + cw1 / 2
        bilingual_center(d, (cx, y_row1 + 50), en, zh, F.h, F.zh, col, col, gap=2)
        round_rect(d, (x + 30, y_row1 + 90, x + cw1 - 30, y_row1 + 125), 6, CARD, col, 2)
        bilingual_center(d, (cx, y_row1 + 155), se, sz, F.s, F.zxs, MUTED, MUTED, gap=1)

    # Row 2: 3 centered
    cw2 = (W - 2 * 100 - 2 * gap) / 3
    for i, (en, zh, se, sz, col, fill) in enumerate(items[4:]):
        x = 100 + i * (cw2 + gap)
        box = (x, y_row2, x + cw2, y_row2 + h)
        round_rect(d, box, 12, fill, col, 3)
        cx = x + cw2 / 2
        bilingual_center(d, (cx, y_row2 + 50), en, zh, F.h, F.zh, col, col, gap=2)
        round_rect(d, (x + 30, y_row2 + 90, x + cw2 - 30, y_row2 + 125), 6, CARD, col, 2)
        bilingual_center(d, (cx, y_row2 + 155), se, sz, F.s, F.zxs, MUTED, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "Refrigerant valves ≠ hydronic valves — media, ΔP and materials differ",
        "制冷剂阀 ≠ 水侧阀——介质、压差与材料均不同",
    )
    save_png(im, "knowledge-valve-types.png")


# ---------------------------------------------------------------------------
# 3. TXV vs EEV
# ---------------------------------------------------------------------------


def draw_txv_eev():
    im, d = new_canvas()
    bi_title(d, F, "TXV vs EEV — control comparison", "热力膨胀阀 vs 电子膨胀阀")

    panels = [
        (
            (40, 70, 490, 480),
            ORANGE,
            LIGHT_ORANGE,
            "TXV",
            "热力膨胀阀",
            [
                ("Sensing bulb on suction", "感温包贴吸气管"),
                ("Mechanical feedback", "机械反馈"),
                ("Superheat set by spring", "弹簧设定过热度"),
                ("No power required", "无需供电"),
                ("Slower / hunting risk", "响应慢 / 易振荡"),
            ],
        ),
        (
            (534, 70, 984, 480),
            PURPLE,
            LIGHT_PURPLE,
            "EEV",
            "电子膨胀阀",
            [
                ("Controller + sensors", "控制器+传感器"),
                ("Stepper or PWM drive", "步进或PWM驱动"),
                ("Flexible SH / level logic", "灵活过热/液位逻辑"),
                ("Needs power & tuning", "需供电与整定"),
                ("Fast · wide map", "快速 · 宽工况"),
            ],
        ),
    ]
    for box, col, fill, en, zh, lines in panels:
        round_rect(d, box, 14, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 40), en, zh, F.h, F.zh, col, col, gap=2)
        # valve glyph
        round_rect(d, (cx - 50, box[1] + 75, cx + 50, box[1] + 125), 8, CARD, col, 2)
        text_center(d, (cx, box[1] + 100), "◇", F.h, col)
        y = box[1] + 165
        for le, lz in lines:
            bilingual_center(d, (cx, y), le, lz, F.n, F.zs, INK, MUTED, gap=1)
            y += 52

    # VS badge
    round_rect(d, (470, 250, 554, 300), 10, CARD, GRID, 2)
    text_center(d, (512, 275), "VS", F.h, INK)

    bi_foot(
        d,
        F,
        "Same job: meter liquid into evaporator — different sensing & actuation",
        "同一任务：向蒸发器计量供液——传感与执行不同",
    )
    save_png(im, "knowledge-valve-txv-eev.png")


# ---------------------------------------------------------------------------
# 4. Reversing — heating vs cooling
# ---------------------------------------------------------------------------


def draw_reversing():
    im, d = new_canvas()
    bi_title(d, F, "4-way reversing: cooling vs heating", "四通换向：制冷 vs 制热")

    modes = [
        (
            (40, 70, 490, 500),
            BLUE,
            LIGHT_BLUE,
            "Cooling mode",
            "制冷模式",
            "Indoor = evaporator",
            "室内=蒸发器",
            "Outdoor = condenser",
            "室外=冷凝器",
        ),
        (
            (534, 70, 984, 500),
            RED,
            LIGHT_RED,
            "Heating mode",
            "制热模式",
            "Indoor = condenser",
            "室内=冷凝器",
            "Outdoor = evaporator",
            "室外=蒸发器",
        ),
    ]
    for box, col, fill, te, tz, a1e, a1z, a2e, a2z in modes:
        round_rect(d, box, 14, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 35), te, tz, F.h, F.zh, col, col, gap=2)

        # Mini cycle schematic
        # Compressor
        round_rect(d, (cx - 55, box[1] + 80, cx + 55, box[1] + 130), 8, CARD, GREEN, 2)
        bilingual_center(d, (cx, box[1] + 105), "Comp", "压缩机", F.xs, F.zxs, GREEN, GREEN, gap=1)
        # 4-way
        round_rect(d, (cx - 55, box[1] + 150, cx + 55, box[1] + 195), 8, CARD, TEAL, 2)
        bilingual_center(d, (cx, box[1] + 172), "4-way", "四通阀", F.xs, F.zxs, TEAL, TEAL, gap=1)

        # Indoor / outdoor
        left = (box[0] + 30, box[1] + 230, box[0] + 200, box[1] + 320)
        right = (box[2] - 200, box[1] + 230, box[2] - 30, box[1] + 320)
        if col == BLUE:
            round_rect(d, left, 8, CARD, BLUE, 2)
            bilingual_center(d, ((left[0] + left[2]) / 2, (left[1] + left[3]) / 2), "Indoor (E)", "室内(蒸发)", F.s, F.zxs, BLUE, BLUE, gap=1)
            round_rect(d, right, 8, CARD, RED, 2)
            bilingual_center(d, ((right[0] + right[2]) / 2, (right[1] + right[3]) / 2), "Outdoor (C)", "室外(冷凝)", F.s, F.zxs, RED, RED, gap=1)
            arrow(d, (cx, box[1] + 195), ((left[0] + left[2]) / 2, left[1]), BLUE, width=2)
            arrow(d, (cx, box[1] + 195), ((right[0] + right[2]) / 2, right[1]), RED, width=2)
        else:
            round_rect(d, left, 8, CARD, RED, 2)
            bilingual_center(d, ((left[0] + left[2]) / 2, (left[1] + left[3]) / 2), "Indoor (C)", "室内(冷凝)", F.s, F.zxs, RED, RED, gap=1)
            round_rect(d, right, 8, CARD, BLUE, 2)
            bilingual_center(d, ((right[0] + right[2]) / 2, (right[1] + right[3]) / 2), "Outdoor (E)", "室外(蒸发)", F.s, F.zxs, BLUE, BLUE, gap=1)
            arrow(d, (cx, box[1] + 195), ((left[0] + left[2]) / 2, left[1]), RED, width=2)
            arrow(d, (cx, box[1] + 195), ((right[0] + right[2]) / 2, right[1]), BLUE, width=2)

        # Expansion at bottom
        round_rect(d, (cx - 70, box[1] + 350, cx + 70, box[1] + 400), 8, CARD, PURPLE, 2)
        bilingual_center(d, (cx, box[1] + 375), "Expansion", "膨胀阀", F.s, F.zxs, PURPLE, PURPLE, gap=1)
        arrow(d, ((right[0] + right[2]) / 2, right[3]), (cx + 40, box[1] + 350), MUTED, width=2)
        arrow(d, (cx - 40, box[1] + 350), ((left[0] + left[2]) / 2, left[3]), MUTED, width=2)

        bilingual_center(d, (cx, box[1] + 435), a1e, a1z, F.n, F.zs, INK, MUTED, gap=1)
        bilingual_center(d, (cx, box[1] + 470), a2e, a2z, F.n, F.zs, INK, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "Same hardware — 4-way porting decides which coil absorbs vs rejects heat",
        "同一套硬件——四通阀接管决定哪侧盘管吸热/放热",
    )
    save_png(im, "knowledge-valve-reversing.png")


# ---------------------------------------------------------------------------
# 5. Hydronic valves around HP package
# ---------------------------------------------------------------------------


def draw_water():
    im, d = new_canvas()
    bi_title(d, F, "Hydronic valves around a heat-pump package", "热泵机组周边的水侧阀门")

    # Central HP package
    round_rect(d, (380, 200, 644, 360), 14, LIGHT_GREEN, GREEN, 3)
    bilingual_center(d, (512, 255), "Heat-pump package", "热泵机组", F.h, F.zh, GREEN, GREEN, gap=2)
    bilingual_center(d, (512, 310), "HX · compressor · controls", "换热器·压缩机·控制", F.s, F.zxs, MUTED, MUTED, gap=1)

    # Source side (left)
    round_rect(d, (40, 120, 280, 220), 10, LIGHT_BLUE, BLUE, 2)
    bilingual_center(d, (160, 150), "Source loop", "源侧环路", F.b, F.zb, BLUE, BLUE, gap=1)
    bilingual_center(d, (160, 190), "well / tower / air", "地源/塔/空气", F.xs, F.zxs, MUTED, MUTED, gap=1)

    # Load side (right)
    round_rect(d, (744, 120, 984, 220), 10, LIGHT_RED, RED, 2)
    bilingual_center(d, (864, 150), "Load loop", "负荷环路", F.b, F.zb, RED, RED, gap=1)
    bilingual_center(d, (864, 190), "AHU / floor / process", "空调/地暖/工艺", F.xs, F.zxs, MUTED, MUTED, gap=1)

    # Valves around package
    valves = [
        ((100, 280, 250, 350), GOLD, "Ball / gate", "球阀/闸阀", "isolate"),
        ((100, 380, 250, 450), TEAL, "Check", "止回阀", "anti-reverse"),
        ((774, 280, 924, 350), ORANGE, "2-way / 3-way", "二通/三通", "modulate"),
        ((774, 380, 924, 450), PURPLE, "Balancing", "平衡阀", "flow set"),
        ((400, 400, 624, 470), RED, "Safety / PRV", "安全/泄压", "protect"),
    ]
    for box, col, en, zh, note in valves:
        round_rect(d, box, 8, CARD, col, 2)
        cx = (box[0] + box[2]) / 2
        cy = (box[1] + box[3]) / 2
        bilingual_center(d, (cx, cy - 10), en, zh, F.s, F.zxs, col, col, gap=1)
        text_center(d, (cx, cy + 22), note, F.xs, MUTED)

    arrow(d, (280, 170), (380, 240), BLUE, width=2)
    arrow(d, (644, 240), (744, 170), RED, width=2)
    arrow(d, (250, 315), (380, 300), GOLD, width=2)
    arrow(d, (644, 300), (774, 315), ORANGE, width=2)

    bi_foot(
        d,
        F,
        "Water valves: isolation, check, control, balance, safety — plan service access",
        "水阀：隔离、止回、调节、平衡、安全——预留检修空间",
    )
    save_png(im, "knowledge-valve-water.png")


# ---------------------------------------------------------------------------
# 6. Fault chain — cause → symptom → plant → blamed
# ---------------------------------------------------------------------------


def draw_faults():
    im, d = new_canvas()
    bi_title(d, F, "Valve fault chain: cause → symptom → plant → blamed", "阀门故障链：原因→表象→机组→被归咎")

    headers = [
        ("Cause", "原因", ORANGE),
        ("Symptom", "表象", BLUE),
        ("Plant effect", "机组影响", PURPLE),
        ("Often blamed", "常被归咎", RED),
    ]
    x0, gap = 28, 14
    cw = (W - 2 * x0 - 3 * gap) / 4
    y_h = 70

    for i, (en, zh, col) in enumerate(headers):
        x = x0 + i * (cw + gap)
        box = (x, y_h, x + cw, y_h + 55)
        round_rect(d, box, 8, CARD, col, 3)
        bilingual_center(d, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), en, zh, F.b, F.zb, col, col, gap=1)

    rows = [
        (
            ("TXV bulb loose", "感温包松脱"),
            ("Unstable SH", "过热不稳"),
            ("Flood / starve", "液击/缺液"),
            ("Compressor", "压缩机"),
        ),
        (
            ("EEV steps lost", "EEV丢步"),
            ("Wrong opening", "开度异常"),
            ("Low capacity", "出力不足"),
            ("Refrigerant charge", "充注量"),
        ),
        (
            ("4-way stuck", "四通阀卡滞"),
            ("Wrong mode", "模式错误"),
            ("No heat / cool", "不制热/冷"),
            ("Controls / sensors", "控制/传感器"),
        ),
        (
            ("Solenoid stuck", "电磁阀卡死"),
            ("No flow / bypass", "无流/旁通"),
            ("Trip / ice", "跳机/结冰"),
            ("Pump / filter", "泵/过滤器"),
        ),
    ]
    colors = [ORANGE, BLUE, PURPLE, RED]
    fills = [LIGHT_ORANGE, LIGHT_BLUE, LIGHT_PURPLE, LIGHT_RED]

    for r, row in enumerate(rows):
        y = 145 + r * 90
        for c, (en, zh) in enumerate(row):
            x = x0 + c * (cw + gap)
            box = (x, y, x + cw, y + 75)
            round_rect(d, box, 8, fills[c], colors[c], 2)
            bilingual_center(d, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), en, zh, F.n, F.zs, colors[c], colors[c], gap=1)
        # arrows between columns
        if r == 0:
            for c in range(3):
                x1 = x0 + c * (cw + gap) + cw
                x2 = x0 + (c + 1) * (cw + gap)
                mid_y = y_h + 28
                # only draw once near header area as flow hint
                arrow(d, (x1 + 2, mid_y), (x2 - 2, mid_y), MUTED, width=2)

    bi_foot(
        d,
        F,
        "Trace the chain before swapping the compressor — valves often sit upstream",
        "换压缩机前先沿链条排查——阀门往往在上游",
    )
    save_png(im, "knowledge-valve-faults.png")


def main():
    global F
    F = Fonts()
    assert IMAGES_OUT and W and H and BG
    draw_cycle()
    draw_types()
    draw_txv_eev()
    draw_reversing()
    draw_water()
    draw_faults()
    print(f"done — {W}×{H} → {IMAGES_OUT}")


if __name__ == "__main__":
    main()
