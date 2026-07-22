#!/usr/bin/env python3
"""Generate knowledge-vessel-*.png schematics (EN primary / ZH secondary), 1024×576."""

from __future__ import annotations

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from diagram_style import (  # noqa: E402
    BG,
    BLUE,
    CARD,
    Fonts,
    GOLD,
    GREEN,
    GRID,
    H,
    INK,
    LIGHT_BLUE,
    LIGHT_GREEN,
    LIGHT_ORANGE,
    LIGHT_PURPLE,
    LIGHT_RED,
    MUTED,
    ORANGE,
    PURPLE,
    RED,
    TEAL,
    W,
    bi_foot,
    bi_in_box,
    bi_title,
    bilingual_center,
    card,
    new_canvas,
    round_rect,
    save_png,
    text_center,
)

assert (W, H) == (1024, 576) and BG


def arrow(draw, p1, p2, color=INK, width=3):
    draw.line([p1, p2], fill=color, width=width)
    x1, y1 = p1
    x2, y2 = p2
    ang = math.atan2(y2 - y1, x2 - x1)
    L = 11
    a1 = (x2 - L * math.cos(ang - 0.4), y2 - L * math.sin(ang - 0.4))
    a2 = (x2 - L * math.cos(ang + 0.4), y2 - L * math.sin(ang + 0.4))
    draw.polygon([p2, a1, a2], fill=color)


def draw_vessel_cycle(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Vapor-compression cycle — vessels highlighted", "蒸汽压缩循环 — 突出容器")

    # Muted core: Comp top, Cond right, EXV bottom, Evap lower-left
    comp = (400, 78, 560, 148)
    cond = (790, 200, 970, 280)
    expv = (400, 420, 560, 490)
    evap = (54, 280, 220, 360)

    card(d, comp, fill=(236, 240, 244), outline=MUTED, r=10, width=2)
    bi_in_box(d, fonts, comp, "Compressor", "压缩机", fill=MUTED)
    card(d, cond, fill=(236, 240, 244), outline=MUTED, r=10, width=2)
    bi_in_box(d, fonts, cond, "Condenser", "冷凝器", fill=MUTED)
    card(d, expv, fill=(236, 240, 244), outline=MUTED, r=10, width=2)
    bi_in_box(d, fonts, expv, "Expansion", "膨胀阀", fill=MUTED)
    card(d, evap, fill=(236, 240, 244), outline=MUTED, r=10, width=2)
    bi_in_box(d, fonts, evap, "Evaporator", "蒸发器", fill=MUTED)

    # Vessels: Oil on discharge, Accum on suction (above Evap), Recv after Cond, Flash mid
    oil = (600, 78, 760, 148)
    recv = (790, 310, 970, 390)
    flash = (250, 400, 380, 490)
    accum = (54, 150, 220, 230)

    round_rect(d, oil, 10, LIGHT_GREEN, TEAL, 3)
    bi_in_box(d, fonts, oil, "1 Oil sep.", "1 油分", fill=TEAL)
    round_rect(d, recv, 10, LIGHT_ORANGE, GOLD, 3)
    bi_in_box(d, fonts, recv, "3 Receiver", "3 贮液器", fill=GOLD)
    round_rect(d, flash, 10, LIGHT_BLUE, BLUE, 3)
    bi_in_box(d, fonts, flash, "4 Flash", "4 闪发罐", fill=BLUE)
    round_rect(d, accum, 10, LIGHT_PURPLE, PURPLE, 3)
    bi_in_box(d, fonts, accum, "2 Accum.", "2 气分", fill=PURPLE)

    # HP: Comp → Oil → Cond → Recv → Flash → EXV
    arrow(d, (560, 113), (600, 113), RED, 3)
    arrow(d, (760, 113), (880, 113), RED, 3)
    arrow(d, (880, 113), (880, 200), RED, 3)
    arrow(d, (880, 280), (880, 310), RED, 3)
    arrow(d, (790, 350), (315, 350), RED, 3)
    arrow(d, (315, 350), (315, 400), RED, 3)
    arrow(d, (380, 455), (400, 455), RED, 3)

    # LP: EXV → Evap (bottom in) → Accum (top out) → Comp
    arrow(d, (400, 455), (137, 455), BLUE, 3)
    arrow(d, (137, 455), (137, 360), BLUE, 3)
    arrow(d, (137, 280), (137, 230), BLUE, 3)
    arrow(d, (220, 190), (300, 190), BLUE, 3)
    arrow(d, (300, 190), (300, 113), BLUE, 3)
    arrow(d, (300, 113), (400, 113), BLUE, 3)

    # Injection: Flash → Comp
    arrow(d, (315, 400), (315, 200), TEAL, 2)
    arrow(d, (315, 200), (400, 160), TEAL, 2)
    bilingual_center(d, (355, 188), "injection", "补气", fonts.xs, fonts.zxs, TEAL, TEAL, gap=1)

    # Oil return
    d.line([(680, 148), (680, 175), (480, 175), (480, 148)], fill=GREEN, width=2)
    arrow(d, (480, 148), (480, 140), GREEN, 2)
    bilingual_center(d, (580, 163), "oil return", "回油", fonts.xs, fonts.zxs, GREEN, GREEN, gap=1)

    bilingual_center(d, (180, 52), "① Oil on discharge", "① 排气油分", fonts.xs, fonts.zxs, TEAL, TEAL, gap=1)
    bilingual_center(d, (880, 52), "③ Receiver after cond.", "③ 冷凝后贮液", fonts.xs, fonts.zxs, GOLD, GOLD, gap=1)
    bilingual_center(d, (180, 520), "② Accum. on suction", "② 吸气气分", fonts.xs, fonts.zxs, PURPLE, PURPLE, gap=1)
    bilingual_center(d, (880, 520), "④ Flash / economizer", "④ 闪发 / 经济器", fonts.xs, fonts.zxs, BLUE, BLUE, gap=1)

    bi_foot(
        d,
        fonts,
        "Start diagnostics at oil return and liquid management before blaming the compressor",
        "先查回油与液位管理，再怀疑压缩机",
    )
    save_png(im, "knowledge-vessel-cycle.png")


def draw_vessel_types(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Refrigeration vessel families", "制冷容器家族")

    families = [
        ("Oil separator", "油分", "Strip discharge mist", "分离排气油雾", "Compressor discharge", "压缩机排气口", "Carry-over · clogged return", "携出 · 回油堵塞", TEAL, LIGHT_GREEN),
        ("Suction accumulator", "气分 / 吸气贮液", "Hold liquid · protect suction", "存液 · 保护吸气", "Evaporator → suction", "蒸发器→吸气", "Too small · oil trap", "过小 · 存油", PURPLE, LIGHT_PURPLE),
        ("Liquid receiver", "贮液器", "Store charge · pump-down", "贮充注 · 泵出", "After condenser", "冷凝器之后", "Undersize · blind level", "容积不足 · 无液位", GOLD, LIGHT_ORANGE),
        ("Flash / economizer", "闪发罐 / 经济器", "Intermediate flash · injection", "中间闪发 · 补气", "Between expansion stages", "膨胀级间", "Level · wet carry-over", "液位 · 带液", BLUE, LIGHT_BLUE),
    ]
    gap = 18
    left = 32
    usable = W - 2 * left - 3 * gap
    bw = usable / 4
    top, bot = 78, 470
    for i, (en, zh, a, az, b, bz, c, cz, col, fill) in enumerate(families):
        x0 = left + i * (bw + gap)
        box = (x0, top, x0 + bw, bot)
        round_rect(d, box, 12, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        d.ellipse([cx - 16, 100, cx + 16, 132], fill=col)
        text_center(d, (cx, 116), str(i + 1), fonts.b, CARD)
        bilingual_center(d, (cx, 175), en, zh, fonts.h, fonts.zh, col, col, gap=2)
        bilingual_center(d, (cx, 255), a, az, fonts.s, fonts.zs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, 325), b, bz, fonts.s, fonts.zs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, 395), c, cz, fonts.s, fonts.zs, INK, MUTED, gap=2)
        # vessel glyph
        round_rect(d, (cx - 22, 430, cx + 22, 455), 8, CARD, col, 2)

    bi_foot(
        d,
        fonts,
        "Quote the functional duty — not the catalog nickname alone",
        "按功能职责报价——不要只按样本昵称",
    )
    save_png(im, "knowledge-vessel-types.png")


def draw_vessel_receiver(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Liquid receiver — charge storage & pump-down", "贮液器 — 充注贮存与泵出")

    # Condenser → receiver → EXV
    cond = (60, 180, 240, 280)
    recv = (380, 120, 644, 420)
    expv = (784, 180, 964, 280)

    card(d, cond, fill=(236, 240, 244), outline=MUTED, r=10, width=2)
    bi_in_box(d, fonts, cond, "Condenser", "冷凝器", fill=MUTED)

    round_rect(d, recv, 14, LIGHT_ORANGE, GOLD, 3)
    bilingual_center(d, (512, 155), "Liquid receiver", "贮液器", fonts.h, fonts.zh, GOLD, GOLD, gap=2)
    # liquid level
    d.line([(400, 300), (624, 300)], fill=ORANGE, width=2)
    d.rectangle([400, 300, 624, 400], fill=(255, 230, 200))
    bilingual_center(d, (512, 250), "vapor headspace", "气相空间", fonts.s, fonts.zs, MUTED, MUTED, gap=1)
    bilingual_center(d, (512, 350), "liquid charge", "液态充注", fonts.s, fonts.zs, ORANGE, ORANGE, gap=1)

    card(d, expv, fill=(236, 240, 244), outline=MUTED, r=10, width=2)
    bi_in_box(d, fonts, expv, "Expansion", "膨胀阀", fill=MUTED)

    arrow(d, (240, 230), (380, 230), RED, 3)
    bilingual_center(d, (310, 210), "from cond.", "自冷凝器", fonts.xs, fonts.zxs, RED, RED, gap=1)
    arrow(d, (644, 230), (784, 230), RED, 3)
    bilingual_center(d, (714, 210), "to liquid line", "至液管", fonts.xs, fonts.zxs, RED, RED, gap=1)

    # Relief
    relief = (560, 70, 720, 110)
    card(d, relief, fill=LIGHT_RED, outline=RED, r=8, width=2)
    bilingual_center(d, (640, 90), "Safety relief", "安全泄压", fonts.s, fonts.zs, RED, RED, gap=1)
    arrow(d, (640, 110), (580, 120), RED, 2)

    # Side notes
    notes = [
        (60, 320, 300, 460, "Pump-down stores charge", "泵出把充注存入贮液器", "Mode / season headroom", "工况/季节余量"),
        (724, 320, 964, 460, "Level indication matters", "液位指示很重要", "Blind → overcharge risk", "盲罐 → 过充风险"),
    ]
    for box, a, az, b, bz in [
        (notes[0][:4], notes[0][4], notes[0][5], notes[0][6], notes[0][7]),
        (notes[1][:4], notes[1][4], notes[1][5], notes[1][6], notes[1][7]),
    ]:
        card(d, box, fill=CARD, outline=GRID, r=10, width=2)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, 360), a, az, fonts.s, fonts.zs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, 420), b, bz, fonts.s, fonts.zs, INK, MUTED, gap=2)

    bi_foot(
        d,
        fonts,
        "Volume is a charge-management tool — relief follows code",
        "容积是充注管理工具——泄压按规范",
    )
    save_png(im, "knowledge-vessel-receiver.png")


def draw_vessel_accum(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Suction accumulator — liquid slug protection", "气分 / 吸气贮液 — 液击防护")

    evap = (60, 200, 220, 300)
    accum = (380, 100, 644, 440)
    comp = (804, 200, 964, 300)

    card(d, evap, fill=(236, 240, 244), outline=MUTED, r=10, width=2)
    bi_in_box(d, fonts, evap, "Evaporator", "蒸发器", fill=MUTED)

    round_rect(d, accum, 14, LIGHT_PURPLE, PURPLE, 3)
    bilingual_center(d, (512, 130), "Suction accumulator", "吸气贮液器 / 气分", fonts.h, fonts.zh, PURPLE, PURPLE, gap=2)
    # baffle + liquid
    d.line([(400, 180), (560, 180)], fill=PURPLE, width=2)
    bilingual_center(d, (480, 165), "inlet baffle", "进口挡板", fonts.xs, fonts.zxs, MUTED, MUTED, gap=1)
    d.rectangle([400, 320, 624, 400], fill=(230, 220, 245))
    bilingual_center(d, (512, 360), "liquid hold-up", "存液容积", fonts.s, fonts.zs, PURPLE, PURPLE, gap=1)
    # U-bend
    d.arc([480, 280, 560, 360], 0, 180, fill=TEAL, width=3)
    d.line([(520, 280), (520, 200)], fill=TEAL, width=3)
    bilingual_center(d, (580, 300), "U-bend oil return", "U 弯回油", fonts.xs, fonts.zxs, TEAL, TEAL, gap=1)

    card(d, comp, fill=(236, 240, 244), outline=MUTED, r=10, width=2)
    bi_in_box(d, fonts, comp, "Compressor", "压缩机", fill=MUTED)

    arrow(d, (220, 250), (380, 200), BLUE, 3)
    bilingual_center(d, (290, 210), "wet risk", "带液风险", fonts.xs, fonts.zxs, BLUE, BLUE, gap=1)
    arrow(d, (644, 200), (804, 250), BLUE, 3)
    bilingual_center(d, (724, 210), "dry vapor + oil film", "干气 + 油膜", fonts.xs, fonts.zxs, BLUE, BLUE, gap=1)

    card(d, (60, 340, 300, 460), fill=CARD, outline=GRID, r=10, width=2)
    bilingual_center(d, (180, 380), "Buffers mode / defrost surges", "缓冲工况/除霜液涌", fonts.s, fonts.zs, INK, MUTED, gap=2)
    bilingual_center(d, (180, 430), "Not a license to ignore EXV", "不能代替膨胀阀控制", fonts.s, fonts.zs, INK, MUTED, gap=2)

    card(d, (724, 340, 964, 460), fill=CARD, outline=GRID, r=10, width=2)
    bilingual_center(d, (844, 380), "Leaving SH is the contract", "出口过热度是合同点", fonts.s, fonts.zs, INK, MUTED, gap=2)
    bilingual_center(d, (844, 430), "Wrong orifice → oil trap", "孔径不对 → 存油", fonts.s, fonts.zs, INK, MUTED, gap=2)

    bi_foot(
        d,
        fonts,
        "Size for worst-case liquid dump — oil must leave with vapor",
        "按最恶劣液涌选型——油必须随蒸汽带走",
    )
    save_png(im, "knowledge-vessel-accum.png")


def draw_vessel_flash(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Flash tank / economizer vessel", "闪发罐 / 经济器容器")

    tank = (360, 100, 664, 420)
    round_rect(d, tank, 14, LIGHT_BLUE, BLUE, 3)
    bilingual_center(d, (512, 130), "Flash / economizer", "闪发罐 / 经济器", fonts.h, fonts.zh, BLUE, BLUE, gap=2)
    d.line([(380, 260), (644, 260)], fill=BLUE, width=2)
    bilingual_center(d, (512, 200), "vapor to injection / stage", "蒸汽→补气 / 级间", fonts.s, fonts.zs, TEAL, TEAL, gap=1)
    d.rectangle([380, 260, 644, 390], fill=(210, 230, 248))
    bilingual_center(d, (512, 325), "liquid to lower expansion", "液体→下级膨胀", fonts.s, fonts.zs, BLUE, BLUE, gap=1)

    # Inlets / outlets
    hp = (60, 160, 260, 240)
    card(d, hp, fill=LIGHT_ORANGE, outline=ORANGE, r=10, width=2)
    bi_in_box(d, fonts, hp, "HP liquid in", "高压液进")
    arrow(d, (260, 200), (360, 200), ORANGE, 3)

    inj = (760, 120, 964, 200)
    card(d, inj, fill=LIGHT_GREEN, outline=TEAL, r=10, width=2)
    bi_in_box(d, fonts, inj, "Injection / inter-stage", "补气 / 中间级")
    arrow(d, (664, 160), (760, 160), TEAL, 3)

    low = (760, 300, 964, 380)
    card(d, low, fill=LIGHT_BLUE, outline=BLUE, r=10, width=2)
    bi_in_box(d, fonts, low, "To lower EXV / evap", "至下级膨胀 / 蒸发")
    arrow(d, (664, 340), (760, 340), BLUE, 3)

    # Level control callout
    card(d, (60, 300, 280, 420), fill=CARD, outline=GRID, r=10, width=2)
    bilingual_center(d, (170, 340), "Level control", "液位控制", fonts.b, fonts.zb, INK, MUTED, gap=2)
    bilingual_center(d, (170, 390), "Keep vapor dry", "保持蒸汽干燥", fonts.s, fonts.zs, MUTED, MUTED, gap=1)

    card(d, (360, 440, 664, 510), fill=LIGHT_RED, outline=RED, r=10, width=2)
    bilingual_center(
        d,
        (512, 475),
        "Wet carry-over → compressor reliability event",
        "带液携出 → 压缩机可靠性事件",
        fonts.s,
        fonts.zs,
        RED,
        RED,
        gap=2,
    )

    bi_foot(
        d,
        fonts,
        "Critical for high-lift / economized maps — including many HTHP plants",
        "对大温升 / 经济器工况图关键——含大量高温热泵机组",
    )
    save_png(im, "knowledge-vessel-flash.png")


def draw_vessel_oil(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Oil separator — reclaim & metered return", "油分 — 回收与计量回油")

    comp = (60, 160, 240, 280)
    sep = (360, 100, 664, 400)
    cond = (784, 160, 964, 280)

    card(d, comp, fill=(236, 240, 244), outline=MUTED, r=10, width=2)
    bi_in_box(d, fonts, comp, "Compressor", "压缩机", fill=MUTED)

    round_rect(d, sep, 14, LIGHT_GREEN, TEAL, 3)
    bilingual_center(d, (512, 130), "Oil separator", "油分离器", fonts.h, fonts.zh, TEAL, TEAL, gap=2)
    # stages
    for i, (en, zh, y) in enumerate(
        [
            ("Centrifugal", "离心", 190),
            ("Coalescing", "聚结", 250),
            ("Filter (opt.)", "过滤（可选）", 310),
        ]
    ):
        box = (400, y - 22, 624, y + 22)
        card(d, box, fill=CARD, outline=TEAL, r=8, width=2)
        bi_in_box(d, fonts, box, en, zh, fill=TEAL)
    d.rectangle([400, 350, 624, 385], fill=(200, 230, 210))
    bilingual_center(d, (512, 367), "oil sump", "油池", fonts.s, fonts.zs, GREEN, GREEN, gap=1)

    card(d, cond, fill=(236, 240, 244), outline=MUTED, r=10, width=2)
    bi_in_box(d, fonts, cond, "To condenser", "至冷凝器", fill=MUTED)

    arrow(d, (240, 200), (360, 200), RED, 3)
    bilingual_center(d, (300, 180), "discharge mist", "排气油雾", fonts.xs, fonts.zxs, RED, RED, gap=1)
    arrow(d, (664, 200), (784, 200), RED, 3)
    bilingual_center(d, (724, 180), "cleaner vapor", "较干净蒸汽", fonts.xs, fonts.zxs, RED, RED, gap=1)

    # Oil return capillary
    d.line([(512, 385), (512, 460), (150, 460), (150, 280)], fill=GREEN, width=3)
    arrow(d, (150, 280), (150, 270), GREEN, 3)
    bilingual_center(d, (320, 448), "return capillary / orifice", "回油毛细管 / 节流孔", fonts.s, fonts.zs, GREEN, GREEN, gap=1)

    card(d, (724, 320, 964, 460), fill=CARD, outline=GRID, r=10, width=2)
    bilingual_center(d, (844, 360), "Prove at inverter floor", "在变频器最低速验证", fonts.s, fonts.zs, INK, MUTED, gap=2)
    bilingual_center(d, (844, 420), "Clogged return ≈ bearing fail", "回油堵 ≈ 轴承损坏", fonts.s, fonts.zs, INK, MUTED, gap=2)

    bi_foot(
        d,
        fonts,
        "Efficiency is not one catalog % — mass flow, viscosity & miscibility matter",
        "效率不是单一样本百分比——流量、黏度与互溶性都重要",
    )
    save_png(im, "knowledge-vessel-oil.png")


def main():
    fonts = Fonts()
    draw_vessel_cycle(fonts)
    draw_vessel_types(fonts)
    draw_vessel_receiver(fonts)
    draw_vessel_accum(fonts)
    draw_vessel_flash(fonts)
    draw_vessel_oil(fonts)


if __name__ == "__main__":
    main()
