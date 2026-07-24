#!/usr/bin/env python3
"""Generate knowledge-cycles-*.png — left plot + right tip cards (performance-map style).

Drawn at 2× then LANCZOS-downscaled so bilingual labels stay sharp on screen.
"""

from __future__ import annotations

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from diagram_style import (  # noqa: E402
    BLUE,
    CARD,
    GOLD,
    GREEN,
    INK,
    LIGHT_BLUE,
    LIGHT_GREEN,
    LIGHT_RED,
    MUTED,
    ORANGE,
    PURPLE,
    RED,
    TEAL,
    Fonts,
    H,
    PLOT_BOX,
    SIDE_X0,
    SIDE_X1,
    SIDE_Y0,
    W,
    bi_foot,
    bi_title,
    bilingual_center,
    new_canvas,
    plot_card,
    round_rect,
    save_png,
    scale_fonts,
    sidebar_tips,
    text_center,
)

SCALE = 2
F = None  # scaled Fonts bundle


def S(v: float | int) -> int:
    return int(round(v * SCALE))


def Sp(p):
    return (S(p[0]), S(p[1]))


def Sbox(box):
    return tuple(S(c) for c in box)


def arrow(draw, p1, p2, color=INK, width=3):
    w = max(1, S(width))
    a, b = Sp(p1), Sp(p2)
    draw.line([a, b], fill=color, width=w)
    x1, y1 = a
    x2, y2 = b
    ang = math.atan2(y2 - y1, x2 - x1)
    L = S(11)
    a1 = (x2 - L * math.cos(ang - 0.4), y2 - L * math.sin(ang - 0.4))
    a2 = (x2 - L * math.cos(ang + 0.4), y2 - L * math.sin(ang + 0.4))
    draw.polygon([b, a1, a2], fill=color)


def draw_dome(d, peak, left_base, right_base, mid_y):
    lx, by = Sp(left_base)
    rx, _ = Sp(right_base)
    px, py = Sp(peak)
    mid = S(mid_y)
    pts = [
        (lx, by),
        (lx + (px - lx) * 0.35, mid + S(40)),
        (lx + (px - lx) * 0.7, py + S(30)),
        (px, py),
        (px + (rx - px) * 0.3, py + S(30)),
        (px + (rx - px) * 0.65, mid + S(40)),
        (rx, by),
    ]
    d.line(pts, fill=MUTED, width=S(2))
    return peak


def _dot(d, p, lab=None):
    x, y = Sp(p)
    r = S(6)
    d.ellipse([x - r, y - r, x + r, y + r], fill=INK)
    if lab is not None:
        d.text((x + S(8), y - S(16)), lab, font=F.b, fill=INK)


def save_cycles(im, name: str):
    """Keep 2× canvas (2048×1152) — matches retina clarity of compressor maps."""
    save_png(im, name, downscale=False)


def _canvas():
    return new_canvas(W * SCALE, H * SCALE)


def _title(d, en, zh):
    bi_title(d, F, en, zh, y=S(28), w=W * SCALE)


def _foot(d, en, zh):
    bi_foot(d, F, en, zh, y=S(548), w=W * SCALE)


def _plot(d):
    plot_card(d, box=Sbox(PLOT_BOX), r=S(10), width=max(1, SCALE))


def _tips(d, tips):
    sidebar_tips(
        d,
        F,
        tips,
        x0=S(SIDE_X0),
        x1=S(SIDE_X1),
        y0=S(SIDE_Y0),
        scale=SCALE,
    )


def bi(d, xy, en, zh, f_en, f_zh, fill_en=INK, fill_zh=MUTED, gap=3):
    bilingual_center(d, Sp(xy), en, zh, f_en, f_zh, fill_en, fill_zh, gap=S(gap))


# Inner plot area (logical 1× coords)
PL, PR, PT, PB = 90, 600, 105, 470


# ---------------------------------------------------------------------------
# 0. Cycle family map
# ---------------------------------------------------------------------------


def draw_map():
    im, d = _canvas()
    _title(d, "Refrigeration & heat-pump cycle families", "制冷与热泵循环族系")
    _plot(d)

    families = [
        ((80, 100, 250, 195), GOLD, "Carnot", "逆卡诺"),
        ((270, 100, 440, 195), TEAL, "Brayton", "逆布雷顿"),
        ((460, 100, 620, 195), GREEN, "Subcrit VCC", "亚临界 VCC"),
        ((80, 220, 250, 315), ORANGE, "Transcrit", "跨临界 CO₂"),
        ((270, 220, 440, 315), PURPLE, "Absorption", "吸收式"),
        ((460, 220, 620, 315), RED, "MVR / steam", "开式蒸汽"),
        ((270, 340, 440, 435), MUTED, "Stirling·ORC*", "斯特林·ORC*"),
    ]
    for box, col, en, zh in families:
        round_rect(d, Sbox(box), S(10), CARD, col, S(2))
        cx = (box[0] + box[2]) / 2
        cy = (box[1] + box[3]) / 2
        bi(d, (cx, cy), en, zh, F.b, F.zb, col, col, gap=3)

    bi(
        d,
        (350, 485),
        "Pick family by fluid, drive & lift — then read Flow / P-h / T-s",
        "按工质、驱动与升程选族系，再用 Flow / P-h / T-s 读图",
        F.s,
        F.zs,
        MUTED,
        MUTED,
        gap=3,
    )
    _tips(
        d,
        [
            ("Flow diagram", "流程图", "Connections & ports", "连接与接口"),
            ("P-h chart", "P-h 图", "Enthalpy & throttle", "焓变与节流"),
            ("T-s chart", "T-s 图", "Irreversibility vs Carnot", "相对卡诺的不可逆"),
            ("ORC / power*", "ORC / 动力侧*", "Cousin — not covered here", "近亲——本站暂不专章"),
        ],
    )
    _foot(d, "Seven families at a glance — VCC is the industrial workhorse", "七类族系一览——工业主力仍是蒸汽压缩")
    save_cycles(im, "knowledge-cycles-map.png")


# ---------------------------------------------------------------------------
# 1. Reverse Carnot on T-s
# ---------------------------------------------------------------------------


def draw_carnot_ts():
    im, d = _canvas()
    _title(d, "Reverse Carnot cycle on T-s", "T-s 图上的逆卡诺循环")
    _plot(d)

    ox, oy = PL + 30, PB - 10
    ax_top = PT + 20
    d.line([Sp((ox, oy)), Sp((ox, ax_top))], fill=INK, width=S(2))
    d.line([Sp((ox, oy)), Sp((PR - 20, oy))], fill=INK, width=S(2))
    text_center(d, Sp((ox - 22, (oy + ax_top) / 2)), "T", F.b, INK)
    text_center(d, Sp(((ox + PR - 20) / 2, oy + 18)), "s", F.b, INK)

    th_y, tc_y = PT + 55, PB - 80
    d.line([Sp((ox + 20, th_y)), Sp((PR - 40, th_y))], fill=RED, width=max(1, SCALE))
    d.line([Sp((ox + 20, tc_y)), Sp((PR - 40, tc_y))], fill=BLUE, width=max(1, SCALE))
    d.text(Sp((PR - 50, th_y - 16)), "Th", font=F.n, fill=RED)
    d.text(Sp((PR - 50, tc_y - 16)), "Tc", font=F.n, fill=BLUE)

    s1, s2 = ox + 100, ox + 300
    pts = [(s1, tc_y), (s2, tc_y), (s2, th_y), (s1, th_y)]
    d.polygon([Sp(p) for p in pts], outline=GREEN, fill=LIGHT_GREEN)
    d.line([Sp(pts[0]), Sp(pts[1])], fill=BLUE, width=S(4))
    d.line([Sp(pts[1]), Sp(pts[2])], fill=PURPLE, width=S(4))
    d.line([Sp(pts[2]), Sp(pts[3])], fill=RED, width=S(4))
    d.line([Sp(pts[3]), Sp(pts[0])], fill=TEAL, width=S(4))
    for p, lab in zip(pts, ["4", "1", "2", "3"]):
        _dot(d, p, lab)

    _tips(
        d,
        [
            ("4→1 absorb Qc", "4→1 吸热 Qc", "Isothermal at Tc", "Tc 等温"),
            ("1→2 compress", "1→2 压缩", "Isentropic", "等熵"),
            ("2→3 reject Qh", "2→3 放热 Qh", "Isothermal at Th", "Th 等温"),
            ("COPc = Tc/(Th−Tc)", "COPc = Tc/(Th−Tc)", "Larger lift → lower ceiling", "温差越大上限越低"),
        ],
    )
    _foot(d, "Ideal rectangle on T-s — the COP ceiling for a given lift", "T-s 上的理想矩形——给定升程下的 COP 上限")
    save_cycles(im, "knowledge-cycles-carnot-ts.png")


# ---------------------------------------------------------------------------
# 2. Carnot vs real
# ---------------------------------------------------------------------------


def draw_carnot_vs_real():
    im, d = _canvas()
    _title(d, "Ideal reverse Carnot vs real VCC", "理想逆卡诺 vs 实际蒸汽压缩")
    _plot(d)

    ox, oy = PL + 20, PB - 10
    d.line([Sp((ox, oy)), Sp((ox, PT + 15))], fill=INK, width=S(2))
    d.line([Sp((ox, oy)), Sp((PR - 15, oy))], fill=INK, width=S(2))
    text_center(d, Sp((ox - 20, (oy + PT + 15) / 2)), "T", F.b, INK)
    text_center(d, Sp(((ox + PR) / 2, oy + 18)), "s", F.b, INK)

    c = [(ox + 90, oy - 70), (ox + 320, oy - 70), (ox + 320, PT + 50), (ox + 90, PT + 50)]
    d.line([Sp(p) for p in c] + [Sp(c[0])], fill=GREEN, width=S(3))

    r = [(ox + 120, oy - 95), (ox + 280, oy - 90), (ox + 300, PT + 85), (ox + 130, PT + 95)]
    d.line([Sp(r[0]), Sp(r[1])], fill=BLUE, width=S(3))
    d.line([Sp(r[1]), Sp(r[2])], fill=ORANGE, width=S(3))
    d.line([Sp(r[2]), Sp(r[3])], fill=RED, width=S(3))
    d.line([Sp(r[3]), Sp(r[0])], fill=PURPLE, width=S(3))
    for p in r:
        _dot(d, p)

    d.line([Sp((ox + 40, PT + 200)), Sp((ox + 100, PT + 200))], fill=GREEN, width=S(3))
    bi(d, (ox + 190, PT + 200), "Carnot", "逆卡诺", F.s, F.zs, GREEN, GREEN)
    d.line([Sp((ox + 40, PT + 240)), Sp((ox + 100, PT + 240))], fill=ORANGE, width=S(3))
    bi(d, (ox + 190, PT + 240), "Real VCC", "实际 VCC", F.s, F.zs, ORANGE, ORANGE)

    _tips(
        d,
        [
            ("Finite ΔT in HX", "换热器有限温差", "Needs larger lift", "实际升程更大"),
            ("Throttle ≠ expand", "节流≠等熵膨胀", "Lost work opportunity", "损失可回收功"),
            ("Compressor loss", "压缩机不可逆", "Entropy rise on 1→2", "1→2 熵增"),
            ("Gap = budget", "间隙=预算", "Irreversibility room", "不可逆余量"),
        ],
    )
    _foot(d, "Real cycles sit inside the Carnot rectangle", "实际循环落在卡诺矩形内侧")
    save_cycles(im, "knowledge-cycles-carnot-vs-real.png")


# ---------------------------------------------------------------------------
# 3. Reverse Brayton
# ---------------------------------------------------------------------------


def draw_brayton():
    im, d = _canvas()
    _title(d, "Reverse Brayton (gas) cycle", "逆布雷顿（气体）循环")
    _plot(d)

    boxes = [
        ((100, 120, 280, 210), GREEN, "Compressor", "压缩机"),
        ((340, 120, 530, 210), RED, "Cooler", "放热器"),
        ((370, 280, 550, 370), TEAL, "Expander", "膨胀机"),
        ((100, 280, 280, 370), BLUE, "Absorber", "吸热器"),
    ]
    for box, col, en, zh in boxes:
        round_rect(d, Sbox(box), S(10), CARD, col, S(2))
        bi(d, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), en, zh, F.b, F.zb, col, col)
    arrow(d, (280, 165), (340, 165), GREEN)
    arrow(d, (530, 165), (550, 165), RED)
    arrow(d, (460, 210), (460, 280), RED)
    arrow(d, (370, 325), (280, 325), TEAL)
    arrow(d, (190, 280), (190, 210), BLUE)

    bi(d, (350, 430), "All gas — no two-phase HX", "全程气相——无两相换热", F.s, F.zs, MUTED, MUTED)

    _tips(
        d,
        [
            ("No phase change", "无相变", "Air / gas working fluid", "工质为空气/气体"),
            ("Net work", "净功", "Compressor − expander", "压缩机−膨胀机"),
            ("T-s shape", "T-s 形态", "2 isentropics + 2 isobars", "两等熵+两等压"),
            ("Where used", "应用场景", "Aircraft / cryogenic air", "航空/深冷空气"),
        ],
    )
    _foot(d, "Rare as an industrial heat-pump core cycle", "罕作工业热泵核心循环")
    save_cycles(im, "knowledge-cycles-brayton.png")


# ---------------------------------------------------------------------------
# 4. Subcritical VCC on P-h
# ---------------------------------------------------------------------------


def draw_vcc_ph():
    im, d = _canvas()
    _title(d, "Subcritical vapor-compression on P-h", "亚临界蒸汽压缩 P-h 图")
    _plot(d)

    ox, oy = PL + 15, PB - 10
    d.line([Sp((ox, oy)), Sp((ox, PT + 15))], fill=INK, width=S(2))
    d.line([Sp((ox, oy)), Sp((PR - 15, oy))], fill=INK, width=S(2))
    text_center(d, Sp((ox - 20, (oy + PT) / 2)), "P", F.b, INK)
    text_center(d, Sp(((ox + PR) / 2, oy + 18)), "h", F.b, INK)

    crit = (ox + 210, PT + 55)
    draw_dome(d, crit, (ox + 55, oy - 50), (ox + 380, oy - 50), PT + 160)
    cx, cy = Sp(crit)
    d.ellipse([cx - S(4), cy - S(4), cx + S(4), cy + S(4)], fill=MUTED)

    pc_y, pe_y = PT + 120, oy - 90
    d.line([Sp((ox + 20, pc_y)), Sp((PR - 30, pc_y))], fill=RED, width=max(1, SCALE))
    d.line([Sp((ox + 20, pe_y)), Sp((PR - 30, pe_y))], fill=BLUE, width=max(1, SCALE))
    d.text(Sp((PR - 48, pc_y - 14)), "Pc", font=F.n, fill=RED)
    d.text(Sp((PR - 48, pe_y - 14)), "Pe", font=F.n, fill=BLUE)

    p2 = (ox + 340, pc_y)
    p3 = (ox + 75, pc_y)
    p4 = (ox + 75, pe_y)
    p1 = (ox + 310, pe_y)
    d.line([Sp(p1), Sp(p2)], fill=GREEN, width=S(4))
    d.line([Sp(p2), Sp(p3)], fill=RED, width=S(4))
    d.line([Sp(p3), Sp(p4)], fill=PURPLE, width=S(4))
    d.line([Sp(p4), Sp(p1)], fill=BLUE, width=S(4))
    for p, lab in [(p1, "1"), (p2, "2"), (p3, "3"), (p4, "4")]:
        _dot(d, p, lab)

    _tips(
        d,
        [
            ("1→2 compress", "1→2 压缩", "Work in · raise P", "输入功 · 升压"),
            ("2→3 reject", "2→3 放热", "Condense + subcool", "冷凝+过冷"),
            ("3→4 throttle", "3→4 节流", "h ≈ constant", "焓近似不变"),
            ("4→1 absorb", "4→1 吸热", "Evaporate + superheat", "蒸发+过热"),
        ],
    )
    _foot(d, "Pc < Pcrit — classic subcritical loop on the dome", "Pc < Pcrit——钟罩线下的经典亚临界回路")
    save_cycles(im, "knowledge-cycles-vcc-ph.png")


# ---------------------------------------------------------------------------
# 5. Basic VCC flow
# ---------------------------------------------------------------------------


def draw_vcc_flow():
    im, d = _canvas()
    _title(d, "Basic vapor-compression heat pump / chiller", "基本蒸汽压缩热泵 / 冷水机")
    _plot(d)

    comps = [
        ((220, 110, 420, 200), GREEN, "Compressor", "压缩机"),
        ((420, 240, 600, 340), RED, "Condenser", "冷凝器"),
        ((220, 370, 420, 460), PURPLE, "Expansion", "膨胀阀"),
        ((80, 240, 250, 340), BLUE, "Evaporator", "蒸发器"),
    ]
    for box, col, en, zh in comps:
        round_rect(d, Sbox(box), S(12), CARD, col, S(2))
        bi(d, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), en, zh, F.b, F.zb, col, col)
    arrow(d, (420, 155), (510, 240), GREEN)
    arrow(d, (510, 340), (420, 415), RED)
    arrow(d, (220, 415), (165, 340), PURPLE)
    arrow(d, (165, 240), (220, 155), BLUE)

    _tips(
        d,
        [
            ("Work input", "功输入", "Compressor only", "仅压缩机"),
            ("High-P side", "高压侧", "Condenser rejects heat", "冷凝器放热"),
            ("Low-P side", "低压侧", "Evaporator absorbs heat", "蒸发器吸热"),
            ("Cooling vs heat", "制冷 vs 制热", "Same loop, which side counts", "同一循环看哪一侧"),
        ],
    )
    _foot(d, "Industry workhorse — start here before enhancements", "工业主力——强化构型之前先看懂这一圈")
    save_cycles(im, "knowledge-cycles-vcc-flow.png")


# ---------------------------------------------------------------------------
# 6. Economizer
# ---------------------------------------------------------------------------


def draw_economizer():
    im, d = _canvas()
    _title(d, "VCC with economizer (flash / IHX)", "带经济器的 VCC（闪蒸 / IHX）")
    _plot(d)

    nodes = [
        ((90, 115, 230, 195), GREEN, "Comp", "压缩机"),
        ((260, 100, 400, 175), RED, "Cond", "冷凝器"),
        ((420, 100, 550, 175), PURPLE, "1st EXV", "一级膨胀"),
        ((420, 220, 600, 320), ORANGE, "Flash/IHX", "闪蒸/IHX"),
        ((260, 360, 400, 445), PURPLE, "2nd EXV", "二级膨胀"),
        ((90, 280, 230, 360), BLUE, "Evap", "蒸发器"),
    ]
    for box, col, en, zh in nodes:
        round_rect(d, Sbox(box), S(8), CARD, col, S(2))
        bi(d, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), en, zh, F.n, F.zn, col, col)
    arrow(d, (230, 155), (260, 140), GREEN)
    arrow(d, (400, 138), (420, 138), RED)
    arrow(d, (485, 175), (485, 220), PURPLE)
    arrow(d, (420, 360), (400, 400), ORANGE)
    arrow(d, (260, 400), (230, 400), PURPLE)
    arrow(d, (160, 280), (160, 195), BLUE)
    arrow(d, (420, 270), (230, 165), ORANGE, width=2)

    _tips(
        d,
        [
            ("Why", "收益", "Lower Td · better high-lift COP", "降排气 · 高升程 COP"),
            ("Cost", "代价", "Extra vessel / HX + control", "额外容器/换热器与控制"),
            ("Flash tank", "闪蒸罐", "Homepage config (b)", "首页构型 (b)"),
            ("IHX economizer", "换热器经济器", "Homepage config (c)", "首页构型 (c)"),
        ],
    )
    _foot(d, "Mid injection cools discharge and lifts capacity", "中间补气降低排气温度并提升能力")
    save_cycles(im, "knowledge-cycles-economizer.png")


# ---------------------------------------------------------------------------
# 7. Two-stage
# ---------------------------------------------------------------------------


def draw_two_stage():
    im, d = _canvas()
    _title(d, "Two-stage vapor compression", "双级蒸汽压缩")
    _plot(d)

    nodes = [
        ((80, 120, 220, 210), BLUE, "LP evap", "低压蒸发"),
        ((250, 120, 400, 210), GREEN, "LP comp", "低压机"),
        ((420, 120, 600, 210), ORANGE, "Intercool", "中间冷却"),
        ((420, 280, 600, 370), GREEN, "HP comp", "高压机"),
        ((250, 280, 400, 370), RED, "Cond", "冷凝器"),
        ((80, 280, 220, 370), PURPLE, "EXV", "膨胀"),
    ]
    for box, col, en, zh in nodes:
        round_rect(d, Sbox(box), S(8), CARD, col, S(2))
        bi(d, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), en, zh, F.n, F.zn, col, col)
    arrow(d, (220, 165), (250, 165), BLUE)
    arrow(d, (400, 165), (420, 165), GREEN)
    arrow(d, (510, 210), (510, 280), ORANGE)
    arrow(d, (420, 325), (400, 325), GREEN)
    arrow(d, (250, 325), (220, 325), RED)
    arrow(d, (150, 280), (150, 210), PURPLE)

    _tips(
        d,
        [
            ("Split ratio", "分摊压比", "Cooler discharge each stage", "每级排气更低"),
            ("Higher lift", "更高升程", "Beyond single-stage limits", "超越单级极限"),
            ("Trade-off", "代价", "Two machines · oil · control", "两台机·回油·控制"),
            ("Config", "构型", "Homepage config (e)", "首页构型 (e)"),
        ],
    )
    _foot(d, "Use when one stage cannot cover source→sink safely", "单级无法安全覆盖源侧→汇侧时使用")
    save_cycles(im, "knowledge-cycles-two-stage.png")


# ---------------------------------------------------------------------------
# 8. Cascade
# ---------------------------------------------------------------------------


def draw_cascade():
    im, d = _canvas()
    _title(d, "Cascade: two loops + cascade HX", "复叠：两回路 + 复叠换热器")
    _plot(d)

    round_rect(d, Sbox((80, 110, 320, 360)), S(12), (235, 245, 255), BLUE, S(2))
    bi(d, (200, 135), "LT loop", "低温回路", F.b, F.zb, BLUE, BLUE)
    round_rect(d, Sbox((100, 170, 200, 245)), S(6), LIGHT_BLUE, BLUE, S(2))
    bi(d, (150, 207), "Evap", "蒸发", F.n, F.zn, BLUE, BLUE)
    round_rect(d, Sbox((210, 170, 300, 245)), S(6), LIGHT_GREEN, GREEN, S(2))
    bi(d, (255, 207), "Comp", "压缩", F.n, F.zn, GREEN, GREEN)
    round_rect(d, Sbox((140, 275, 270, 340)), S(6), CARD, TEAL, S(2))
    bi(d, (205, 307), "Cascade HX", "复叠换热器", F.n, F.zn, TEAL, TEAL)

    round_rect(d, Sbox((350, 110, 600, 360)), S(12), (255, 240, 235), RED, S(2))
    bi(d, (475, 135), "HT loop", "高温回路", F.b, F.zb, RED, RED)
    round_rect(d, Sbox((370, 170, 470, 245)), S(6), LIGHT_GREEN, GREEN, S(2))
    bi(d, (420, 207), "Comp", "压缩", F.n, F.zn, GREEN, GREEN)
    round_rect(d, Sbox((480, 170, 580, 245)), S(6), LIGHT_RED, RED, S(2))
    bi(d, (530, 207), "Cond", "冷凝", F.n, F.zn, RED, RED)
    round_rect(d, Sbox((400, 275, 530, 340)), S(6), CARD, TEAL, S(2))
    bi(d, (465, 307), "Cascade HX", "复叠换热器", F.n, F.zn, TEAL, TEAL)

    d.line([Sp((270, 307)), Sp((400, 307))], fill=TEAL, width=S(3))

    _tips(
        d,
        [
            ("Two fluids", "两工质", "Independent oil circuits", "独立油路"),
            ("Thermal only", "仅热耦合", "HX couples loops", "换热器耦合两回路"),
            ("When", "何时用", "One fluid cannot span lift", "单工质跨不了升程"),
            ("Config", "构型", "Homepage (f) · CO₂ cascade", "首页 (f) · CO₂ 复叠"),
        ],
    )
    _foot(d, "Extreme-cold cascades: see Fundamentals Part 1", "极寒复叠见基础知识第 1 部分")
    save_cycles(im, "knowledge-cycles-cascade.png")


# ---------------------------------------------------------------------------
# 9. Transcritical CO2 P-h
# ---------------------------------------------------------------------------


def draw_transcritical_ph():
    im, d = _canvas()
    _title(d, "Transcritical CO₂ (R744) on P-h", "跨临界 CO₂ (R744) P-h 图")
    _plot(d)

    ox, oy = PL + 15, PB - 10
    d.line([Sp((ox, oy)), Sp((ox, PT + 15))], fill=INK, width=S(2))
    d.line([Sp((ox, oy)), Sp((PR - 15, oy))], fill=INK, width=S(2))
    text_center(d, Sp((ox - 20, (oy + PT) / 2)), "P", F.b, INK)
    text_center(d, Sp(((ox + PR) / 2, oy + 18)), "h", F.b, INK)

    crit = (ox + 210, PT + 130)
    draw_dome(d, crit, (ox + 65, oy - 50), (ox + 360, oy - 50), PT + 220)
    cx, cy = Sp(crit)
    d.ellipse([cx - S(5), cy - S(5), cx + S(5), cy + S(5)], fill=ORANGE)
    d.line([Sp((ox + 20, crit[1])), Sp((PR - 30, crit[1]))], fill=ORANGE, width=max(1, SCALE))
    d.text(Sp((PR - 60, crit[1] - 14)), "Pcrit", font=F.s, fill=ORANGE)

    ph_y, pe_y = PT + 40, oy - 100
    d.line([Sp((ox + 20, ph_y)), Sp((PR - 30, ph_y))], fill=RED, width=max(1, SCALE))
    d.text(Sp((PR - 48, ph_y - 14)), "Ph", font=F.n, fill=RED)
    d.line([Sp((ox + 20, pe_y)), Sp((PR - 30, pe_y))], fill=BLUE, width=max(1, SCALE))
    d.text(Sp((PR - 48, pe_y - 14)), "Pe", font=F.n, fill=BLUE)

    p1 = (ox + 330, pe_y)
    p2 = (ox + 390, ph_y)
    p3 = (ox + 95, ph_y)
    p4 = (ox + 95, pe_y)
    d.line([Sp(p1), Sp(p2)], fill=GREEN, width=S(4))
    d.line([Sp(p2), Sp(p3)], fill=RED, width=S(4))
    d.line([Sp(p3), Sp(p4)], fill=PURPLE, width=S(4))
    d.line([Sp(p4), Sp(p1)], fill=BLUE, width=S(4))
    for p, lab in [(p1, "1"), (p2, "2"), (p3, "3"), (p4, "4")]:
        _dot(d, p, lab)

    _tips(
        d,
        [
            ("Gas cooler", "气体冷却器", "No two-phase condenser", "无两相冷凝"),
            ("Ph > Pcrit", "Ph > Pcrit", "Optimization variable", "优化变量"),
            ("Exit temp", "气冷器出口温", "Drives COP & capacity", "主导 COP 与能力"),
            ("Throttle", "节流", "Same h≈const drop", "焓近似不变降压"),
        ],
    )
    _foot(d, "High-side pressure is chosen, not fixed by saturation", "高压侧压力是选型变量，非饱和固定")
    save_cycles(im, "knowledge-cycles-transcritical-ph.png")


# ---------------------------------------------------------------------------
# 10. Absorption
# ---------------------------------------------------------------------------


def draw_absorption():
    im, d = _canvas()
    _title(d, "Absorption cycle (heat-driven)", "吸收式循环（热驱动）")
    _plot(d)

    nodes = [
        ((90, 115, 250, 200), ORANGE, "Generator", "发生器"),
        ((270, 115, 430, 200), RED, "Condenser", "冷凝器"),
        ((450, 115, 600, 200), PURPLE, "EXV", "膨胀"),
        ((450, 280, 600, 365), BLUE, "Evaporator", "蒸发器"),
        ((270, 280, 430, 365), TEAL, "Absorber", "吸收器"),
        ((90, 280, 250, 365), GREEN, "Sol. pump", "溶液泵"),
    ]
    for box, col, en, zh in nodes:
        round_rect(d, Sbox(box), S(8), CARD, col, S(2))
        bi(d, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), en, zh, F.n, F.zn, col, col)
    arrow(d, (250, 158), (270, 158), ORANGE)
    arrow(d, (430, 158), (450, 158), RED)
    arrow(d, (525, 200), (525, 280), PURPLE)
    arrow(d, (450, 322), (430, 322), BLUE)
    arrow(d, (270, 322), (250, 322), TEAL)
    arrow(d, (170, 280), (170, 200), GREEN)

    _tips(
        d,
        [
            ("Thermal drive", "热驱动", "Waste heat / steam in", "余热/蒸汽输入"),
            ("Pairs", "工质对", "H₂O-LiBr · NH₃-H₂O", "H₂O-LiBr · NH₃-H₂O"),
            ("When", "适用", "Heat abundant · power scarce", "余热多·电力紧"),
            ("Watch", "注意", "Crystal · vacuum · COP defs", "结晶·真空·COP 口径"),
        ],
    )
    _foot(d, "Electric compressor → thermal compressor", "电压缩机 → 热压缩机")
    save_cycles(im, "knowledge-cycles-absorption.png")


# ---------------------------------------------------------------------------
# 11. Open steam / MVR
# ---------------------------------------------------------------------------


def draw_steam():
    im, d = _canvas()
    _title(d, "Open-cycle steam compression / MVR", "开式蒸汽压缩 / MVR")
    _plot(d)

    boxes = [
        ((90, 160, 260, 280), BLUE, "Process / flash", "工艺 / 闪蒸"),
        ((280, 160, 450, 280), GREEN, "Steam compressor", "蒸汽压缩机"),
        ((470, 160, 600, 280), RED, "Process use", "工艺用汽"),
    ]
    for box, col, en, zh in boxes:
        round_rect(d, Sbox(box), S(10), CARD, col, S(2))
        bi(d, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), en, zh, F.b, F.zb, col, col)
    arrow(d, (260, 220), (280, 220), BLUE)
    arrow(d, (450, 220), (470, 220), GREEN)

    bi(d, (345, 360), "Working fluid = H₂O (open)", "工质 = 水（开式）", F.n, F.zn, TEAL, TEAL)
    bi(d, (345, 420), "Configs (g)/(h)/(i) · HTHP column", "构型 (g)/(h)/(i) · 高温热泵专栏", F.s, F.zs, MUTED, MUTED)

    _tips(
        d,
        [
            ("Open loop", "开式回路", "Fluid may leave with product", "工质可能随产品离开"),
            ("Makeup", "补水", "Design charge + makeup together", "充注与补水一并设计"),
            ("Quality", "品质", "Condensate · oil risk", "凝水 · 油污染风险"),
            ("Raise P & T", "升压升温", "Reuse low-grade steam", "回用低品位蒸汽"),
        ],
    )
    _foot(d, "MVR recovers latent heat that would otherwise be wasted", "MVR 回收本会排掉的潜热")
    save_cycles(im, "knowledge-cycles-steam.png")


def main():
    global F
    F = scale_fonts(Fonts(), SCALE)
    draw_map()
    draw_carnot_ts()
    draw_carnot_vs_real()
    draw_brayton()
    draw_vcc_ph()
    draw_vcc_flow()
    draw_economizer()
    draw_two_stage()
    draw_cascade()
    draw_transcritical_ph()
    draw_absorption()
    draw_steam()
    print("ALL DONE (2× supersampled)")


if __name__ == "__main__":
    main()
