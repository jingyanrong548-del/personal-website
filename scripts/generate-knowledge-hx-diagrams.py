#!/usr/bin/env python3
"""Generate knowledge-hx-*.png schematics (EN primary / ZH secondary), 1024×576."""

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


def draw_hx_cycle(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Vapor-compression cycle — heat exchangers", "蒸汽压缩循环 — 突出换热器")

    # Layout: Comp top, Cond right, Exp bottom, Evap left
    evap = (48, 200, 280, 360)
    cond = (744, 200, 976, 360)
    comp = (380, 78, 644, 168)
    expv = (380, 400, 644, 490)

    round_rect(d, evap, 14, LIGHT_BLUE, BLUE, 3)
    bilingual_center(d, ((evap[0] + evap[2]) / 2, 248), "Evaporator", "蒸发器", fonts.h, fonts.zh, BLUE, BLUE, gap=2)
    bilingual_center(d, ((evap[0] + evap[2]) / 2, 300), "Low P · absorbs heat", "低压 · 吸热", fonts.s, fonts.zxs, INK, MUTED, gap=1)
    bilingual_center(d, ((evap[0] + evap[2]) / 2, 340), "HEAT IN", "热量进入", fonts.b, fonts.zb, BLUE, BLUE, gap=1)

    round_rect(d, cond, 14, LIGHT_RED, RED, 3)
    bilingual_center(d, ((cond[0] + cond[2]) / 2, 248), "Condenser / gas cooler", "冷凝器 / 气冷器", fonts.h, fonts.zh, RED, RED, gap=2)
    bilingual_center(d, ((cond[0] + cond[2]) / 2, 300), "High P · rejects heat", "高压 · 放热", fonts.s, fonts.zxs, INK, MUTED, gap=1)
    bilingual_center(d, ((cond[0] + cond[2]) / 2, 340), "HEAT OUT", "热量排出", fonts.b, fonts.zb, RED, RED, gap=1)

    card(d, comp, fill=(236, 240, 244), outline=MUTED, r=12, width=2)
    bi_in_box(d, fonts, comp, "Compressor", "压缩机", fill=MUTED)

    card(d, expv, fill=(236, 240, 244), outline=MUTED, r=12, width=2)
    bi_in_box(d, fonts, expv, "Expansion valve", "膨胀阀", fill=MUTED)

    # Arrows: evap→comp→cond→exp→evap
    arrow(d, (164, 200), (164, 123), TEAL, 3)
    arrow(d, (164, 123), (380, 123), TEAL, 3)
    bilingual_center(d, (250, 108), "suction", "吸气", fonts.xs, fonts.zxs, TEAL, TEAL, gap=1)

    arrow(d, (644, 123), (860, 123), TEAL, 3)
    arrow(d, (860, 123), (860, 200), TEAL, 3)
    bilingual_center(d, (754, 108), "discharge", "排气", fonts.xs, fonts.zxs, TEAL, TEAL, gap=1)

    arrow(d, (860, 360), (860, 445), RED, 3)
    arrow(d, (860, 445), (644, 445), RED, 3)

    arrow(d, (380, 445), (164, 445), BLUE, 3)
    arrow(d, (164, 445), (164, 360), BLUE, 3)

    card(d, (220, 510, 804, 538), fill=LIGHT_ORANGE, outline=GOLD, r=8, width=2)
    bilingual_center(
        d,
        (W / 2, 524),
        "Optional: IHX / economizer between liquid & suction",
        "可选：液管与吸气管之间的 IHX / 经济器",
        fonts.s,
        fonts.zxs,
        ORANGE,
        ORANGE,
        gap=1,
    )
    bi_foot(d, fonts, "Heating contracts → condenser side · Cooling contracts → evaporator", "制热考核冷凝侧 · 制冷考核蒸发侧")
    save_png(im, "knowledge-hx-cycle.png")


def draw_hx_types(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Heat-exchanger structural families", "换热器结构家族")

    families = [
        ("Plate", "板式", "Brazed / gasketed", "钎焊 / 可拆", "Refrigerant–water", "制冷剂–水", "Packaged HP water side", "机组水侧主力", BLUE, LIGHT_BLUE),
        ("Shell & tube", "壳管", "Flooded / DX", "满液 / 干式", "Process & chillers", "工艺与冷水机", "Industrial / HTHP sinks", "工业 / HTHP 热汇", GREEN, LIGHT_GREEN),
        ("Fin-tube", "翅片管", "Air coil", "空气盘管", "Refrigerant–air", "制冷剂–空气", "Outdoor / indoor coils", "室外 / 室内盘管", ORANGE, LIGHT_ORANGE),
        ("Microchannel", "微通道", "Flat tubes", "扁管", "Low charge", "低充注", "A2L / R290 platforms", "A2L / R290 平台", PURPLE, LIGHT_PURPLE),
        ("Coaxial", "套管", "Tube-in-tube", "管中管", "Compact water", "紧凑水路", "Small water HP packs", "小型水路机组", TEAL, (220, 240, 240)),
    ]
    gap = 14
    left = 28
    usable = W - 2 * left - 4 * gap
    bw = usable / 5
    top, bot = 78, 470
    for i, (en, zh, en2, zh2, en3, zh3, en4, zh4, col, fill) in enumerate(families):
        x0 = left + i * (bw + gap)
        box = (x0, top, x0 + bw, bot)
        round_rect(d, box, 12, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, 118), en, zh, fonts.h, fonts.zh, col, col, gap=2)
        bilingual_center(d, (cx, 190), en2, zh2, fonts.b, fonts.zb, INK, MUTED, gap=2)
        bilingual_center(d, (cx, 270), en3, zh3, fonts.s, fonts.zs, MUTED, MUTED, gap=2)
        bilingual_center(d, (cx, 360), en4, zh4, fonts.s, fonts.zs, INK, MUTED, gap=2)
        # simple family glyph
        gy = 420
        if i == 0:  # plates
            for k in range(4):
                d.line([(cx - 28, gy - 18 + k * 8), (cx + 28, gy - 18 + k * 8)], fill=col, width=2)
        elif i == 1:  # shell
            d.ellipse([cx - 36, gy - 22, cx + 36, gy + 10], outline=col, width=2)
            d.line([(cx - 20, gy - 6), (cx + 20, gy - 6)], fill=col, width=2)
        elif i == 2:  # fin
            for k in range(5):
                d.line([(cx - 30 + k * 15, gy - 20), (cx - 30 + k * 15, gy + 8)], fill=col, width=2)
            d.line([(cx - 32, gy - 6), (cx + 32, gy - 6)], fill=col, width=2)
        elif i == 3:  # microchannel
            for k in range(3):
                round_rect(d, (cx - 30, gy - 18 + k * 12, cx + 30, gy - 10 + k * 12), 2, None, col, 2)
        else:  # coaxial
            d.ellipse([cx - 28, gy - 18, cx + 28, gy + 10], outline=col, width=2)
            d.ellipse([cx - 14, gy - 8, cx + 14, gy], outline=col, width=2)

    bi_foot(
        d,
        fonts,
        "Filter by family, then confirm with OEM software at your Tin/Tout & flows",
        "先按家族筛选，再用厂家软件按进出口温度与流量确认",
    )
    save_png(im, "knowledge-hx-types.png")


def draw_hx_duty(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Reading a heat-exchanger duty point", "如何读换热器工况点")

    hx = (380, 170, 644, 340)
    round_rect(d, hx, 14, CARD, INK, 3)
    bi_in_box(d, fonts, hx, "Heat exchanger", "换热器", title=True)

    # Primary (refrigerant) left
    prim = (40, 120, 300, 400)
    card(d, prim, fill=LIGHT_RED, outline=RED, r=12, width=2)
    bilingual_center(d, (170, 150), "Primary · refrigerant", "一次侧 · 制冷剂", fonts.b, fonts.zb, RED, RED, gap=2)
    for y, en, zh in [
        (210, "Tin / Tout", "进出口温度"),
        (260, "Mass flow ṁ", "质量流量 ṁ"),
        (310, "Allowable ΔP", "允许压降 ΔP"),
        (360, "Oil presence", "含油情况"),
    ]:
        bilingual_center(d, (170, y), en, zh, fonts.s, fonts.zs, INK, MUTED, gap=1)

    # Secondary right
    sec = (724, 120, 984, 400)
    card(d, sec, fill=LIGHT_BLUE, outline=BLUE, r=12, width=2)
    bilingual_center(d, (854, 150), "Secondary · air / water", "二次侧 · 空气 / 水", fonts.b, fonts.zb, BLUE, BLUE, gap=2)
    for y, en, zh in [
        (210, "Tin / Tout", "进出口温度"),
        (260, "Flow · density", "流量 · 密度"),
        (310, "Allowable ΔP", "允许压降 ΔP"),
        (360, "Fouling factor", "污垢系数"),
    ]:
        bilingual_center(d, (854, y), en, zh, fonts.s, fonts.zs, INK, MUTED, gap=1)

    arrow(d, (300, 255), (380, 255), RED, 3)
    arrow(d, (644, 255), (724, 255), BLUE, 3)

    warn = (120, 430, 904, 510)
    card(d, warn, fill=LIGHT_ORANGE, outline=ORANGE, r=10, width=2)
    bilingual_center(
        d,
        (W / 2, 458),
        "Catalog kW is one point — change Tin/Tout or flow and Q moves",
        "样本 kW 只是一个点——进出口温度或流量一变，换热量就变",
        fonts.n,
        fonts.zs,
        ORANGE,
        ORANGE,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 492),
        "Lock both sides before comparing quotes",
        "比价前先锁定两侧边界条件",
        fonts.s,
        fonts.zxs,
        MUTED,
        MUTED,
        gap=1,
    )
    bi_foot(d, fonts, "Same UA story, different Tin/Tout → different kW", "同一 UA 故事，不同 Tin/Tout → 不同 kW")
    save_png(im, "knowledge-hx-duty.png")


def draw_hx_lmtd(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Counterflow profiles · LMTD & approach", "逆流温谱 · LMTD 与接近温度")

    # Chart axes
    ox, oy, ax, ay = 80, 430, 520, 100
    d.line([(ox, oy), (ox, ay)], fill=INK, width=2)
    d.line([(ox, oy), (ox + ax, oy)], fill=INK, width=2)
    text_center(d, (ox - 28, (oy + ay) / 2), "T", fonts.b, INK)
    bilingual_center(d, (ox + ax / 2, oy + 22), "Length / path", "流程长度", fonts.xs, fonts.zxs, MUTED, MUTED, gap=1)

    # Hot stream (descending left→right in counterflow: hot enters right)
    # Counterflow: hot from right (high) to left (lower), cold from left (low) to right (higher)
    hot = [(ox + 40, 160), (ox + ax - 40, 280)]
    cold = [(ox + 40, 360), (ox + ax - 40, 220)]
    d.line([hot[0], hot[1]], fill=RED, width=4)
    d.line([cold[0], cold[1]], fill=BLUE, width=4)
    d.ellipse([hot[0][0] - 5, hot[0][1] - 5, hot[0][0] + 5, hot[0][1] + 5], fill=RED)
    d.ellipse([hot[1][0] - 5, hot[1][1] - 5, hot[1][0] + 5, hot[1][1] + 5], fill=RED)
    d.ellipse([cold[0][0] - 5, cold[0][1] - 5, cold[0][0] + 5, cold[0][1] + 5], fill=BLUE)
    d.ellipse([cold[1][0] - 5, cold[1][1] - 5, cold[1][0] + 5, cold[1][1] + 5], fill=BLUE)

    bilingual_center(d, (ox + 90, 140), "Hot out", "热侧出", fonts.xs, fonts.zxs, RED, RED, gap=1)
    bilingual_center(d, (ox + ax - 70, 260), "Hot in", "热侧进", fonts.xs, fonts.zxs, RED, RED, gap=1)
    bilingual_center(d, (ox + 90, 380), "Cold in", "冷侧进", fonts.xs, fonts.zxs, BLUE, BLUE, gap=1)
    bilingual_center(d, (ox + ax - 70, 200), "Cold out", "冷侧出", fonts.xs, fonts.zxs, BLUE, BLUE, gap=1)

    # Approach bracket at cold-out / hot-in end (right)
    rx = ox + ax - 40
    d.line([(rx + 18, 220), (rx + 18, 280)], fill=GOLD, width=2)
    d.line([(rx + 12, 220), (rx + 24, 220)], fill=GOLD, width=2)
    d.line([(rx + 12, 280), (rx + 24, 280)], fill=GOLD, width=2)
    bilingual_center(d, (rx + 55, 250), "approach", "接近温度", fonts.xs, fonts.zxs, GOLD, GOLD, gap=1)

    # ΔT1 / ΔT2 labels
    d.line([(ox + 40, 160), (ox + 40, 360)], fill=GRID, width=1)
    bilingual_center(d, (ox + 75, 250), "ΔT₁", "ΔT₁", fonts.s, fonts.zs, MUTED, MUTED, gap=1)
    bilingual_center(d, (ox + ax - 95, 300), "ΔT₂", "ΔT₂", fonts.s, fonts.zs, MUTED, MUTED, gap=1)

    # Side panels
    p1 = (640, 90, 990, 240)
    card(d, p1, fill=LIGHT_GREEN, outline=GREEN, r=12, width=2)
    bilingual_center(d, (815, 125), "LMTD", "对数平均温差", fonts.h, fonts.zh, GREEN, GREEN, gap=2)
    bilingual_center(
        d,
        (815, 175),
        "LMTD = (ΔT₁ − ΔT₂) / ln(ΔT₁/ΔT₂)",
        "两端温差的对数平均",
        fonts.s,
        fonts.zs,
        INK,
        MUTED,
        gap=2,
    )
    bilingual_center(d, (815, 215), "Q = U · A · LMTD", "换热量 = U·A·LMTD", fonts.b, fonts.zb, GREEN, GREEN, gap=1)

    p2 = (640, 260, 990, 420)
    card(d, p2, fill=LIGHT_ORANGE, outline=ORANGE, r=12, width=2)
    bilingual_center(d, (815, 295), "Flow arrangement", "流路布置", fonts.h, fonts.zh, ORANGE, ORANGE, gap=2)
    bilingual_center(d, (815, 345), "Counterflow → max LMTD", "逆流 → 最大 LMTD", fonts.s, fonts.zs, INK, MUTED, gap=2)
    bilingual_center(d, (815, 385), "Air coils usually crossflow", "空气盘管多为叉流", fonts.s, fonts.zs, INK, MUTED, gap=2)

    bi_foot(
        d,
        fonts,
        "Closer approach helps COP only if UA cost & ΔP still win",
        "更小接近温度只有在 UA 造价与压降仍划算时才提升 COP",
    )
    save_png(im, "knowledge-hx-lmtd.png")


def draw_hx_reliability(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Reliability risks — fouling, frost, oil, freeze", "可靠性风险 — 结垢·结霜·油膜·冻结")

    risks = [
        ("Frost / defrost", "结霜 / 除霜", "Outdoor evaporators ice", "室外蒸发器结冰", "Defrost energy matters", "除霜能耗很关键", "Residual water & climate", "残水与气候", BLUE, LIGHT_BLUE),
        ("Fouling / scale", "结垢 / 污垢", "Scale & biofilm cut UA", "水垢生物膜降 UA", "Need cleanability", "需要可清洗性", "Water quality discipline", "水质纪律", ORANGE, LIGHT_ORANGE),
        ("Oil film / hold-up", "油膜 / 积油", "Oil in evaporators hurts Q", "蒸发器积油伤换热", "Starves compressor", "饿死压缩机", "Geometry & velocity", "几何与流速", PURPLE, LIGHT_PURPLE),
        ("Freeze / materials", "冻结 / 材料", "Low flow freezes water", "低流量冻水路", "Cu / SS / Al differ", "铜/不锈钢/铝不同", "A2L & natural fluids", "A2L 与自然工质", RED, LIGHT_RED),
    ]
    gap = 16
    left = 28
    usable = W - 2 * left - 3 * gap
    bw = usable / 4
    top, bot = 78, 470
    for i, (en, zh, a, az, b, bz, c, cz, col, fill) in enumerate(risks):
        x0 = left + i * (bw + gap)
        box = (x0, top, x0 + bw, bot)
        round_rect(d, box, 12, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        # number badge
        d.ellipse([cx - 16, 100, cx + 16, 132], fill=col)
        text_center(d, (cx, 116), str(i + 1), fonts.b, CARD)
        bilingual_center(d, (cx, 170), en, zh, fonts.h, fonts.zh, col, col, gap=2)
        bilingual_center(d, (cx, 250), a, az, fonts.s, fonts.zs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, 320), b, bz, fonts.s, fonts.zs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, 390), c, cz, fonts.s, fonts.zs, INK, MUTED, gap=2)

    bi_foot(
        d,
        fonts,
        "Many “undersized HX” complaints are fouling, frost, oil, or freeze",
        "很多「换热器偏小」投诉其实是结垢、结霜、积油或冻结",
    )
    save_png(im, "knowledge-hx-reliability.png")


def draw_hx_hthp(fonts: Fonts):
    im, d = new_canvas()
    bi_title(d, fonts, "Comfort A2W vs industrial HTHP exchangers", "舒适型 A2W vs 工业高温热泵换热器")

    left = (40, 80, 490, 470)
    right = (534, 80, 984, 470)
    round_rect(d, left, 14, LIGHT_BLUE, BLUE, 3)
    round_rect(d, right, 14, LIGHT_ORANGE, ORANGE, 3)

    bilingual_center(d, (265, 115), "Comfort A2W", "舒适型空气–水", fonts.h, fonts.zh, BLUE, BLUE, gap=2)
    bilingual_center(d, (759, 115), "Industrial HTHP", "工业高温热泵", fonts.h, fonts.zh, ORANGE, ORANGE, gap=2)

    # A2W boxes
    outdoor = (70, 160, 250, 260)
    indoor = (280, 160, 460, 260)
    card(d, outdoor, fill=CARD, outline=BLUE, r=10, width=2)
    bi_in_box(d, fonts, outdoor, "Outdoor fin coil", "室外翅片盘管")
    card(d, indoor, fill=CARD, outline=TEAL, r=10, width=2)
    bi_in_box(d, fonts, indoor, "Indoor water plate", "室内水路板换")
    arrow(d, (250, 210), (280, 210), MUTED, 2)

    for y, en, zh in [
        (300, "Frost & defrost dominate O&M", "结霜与除霜主导运维"),
        (350, "Mild-climate ratings ≠ cold hours", "温和样本 ≠ 严寒小时"),
        (400, "Approach vs fan ΔP trade-off", "接近温度 vs 风机压降"),
        (440, "Brazed plates common on water", "水侧常见钎焊板换"),
    ]:
        bilingual_center(d, (265, y), en, zh, fonts.s, fonts.zs, INK, MUTED, gap=1)

    # HTHP boxes
    sink = (564, 160, 744, 260)
    gc = (774, 160, 954, 260)
    card(d, sink, fill=CARD, outline=RED, r=10, width=2)
    bi_in_box(d, fonts, sink, "High-T sink HX", "高温热汇换热器")
    card(d, gc, fill=CARD, outline=PURPLE, r=10, width=2)
    bi_in_box(d, fonts, gc, "CO₂ gas cooler", "CO₂ 气冷器")
    arrow(d, (744, 210), (774, 210), MUTED, 2)

    for y, en, zh in [
        (300, "Large lift already stresses compressor", "大温升已压迫压缩机"),
        (350, "Ultra-tight approach may explode CAPEX", "过紧接近温度可能爆造价"),
        (400, "Shell & tube / process exchangers", "壳管 / 工艺换热器"),
        (440, "Materials & codes early", "尽早确认材料与规范"),
    ]:
        bilingual_center(d, (759, y), en, zh, fonts.s, fonts.zs, INK, MUTED, gap=1)

    bi_foot(
        d,
        fonts,
        "Lift and approach pull opposite ways — match language to the plant",
        "温升与接近温度彼此拉扯——用语要对准机组类型",
    )
    save_png(im, "knowledge-hx-hthp.png")


def main():
    fonts = Fonts()
    draw_hx_cycle(fonts)
    draw_hx_types(fonts)
    draw_hx_duty(fonts)
    draw_hx_lmtd(fonts)
    draw_hx_reliability(fonts)
    draw_hx_hthp(fonts)


if __name__ == "__main__":
    main()
