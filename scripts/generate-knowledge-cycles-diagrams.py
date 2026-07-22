#!/usr/bin/env python3
"""Generate knowledge-cycles-*.png with bilingual labels (English primary / Chinese secondary)."""

from __future__ import annotations

import math
import sys
from pathlib import Path

from PIL import Image, ImageDraw

# Allow `python3 scripts/generate-....py` from repo root
sys.path.insert(0, str(Path(__file__).resolve().parent))

from diagram_style import (  # noqa: E402
    BG,
    BLUE,
    CARD,
    GOLD,
    GREEN,
    GRID,
    IMAGES_OUT,
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
    bilingual_center,
    bilingual_title,
    font_cjk,
    font_latin,
    require_cjk_font,
    text_center,
)

OUT = IMAGES_OUT
W, H = 1024, 576

# Fonts (resolved after require_cjk_font)
F_TITLE = F_H = F_B = F_N = F_S = F_XS = None
FZ_TITLE = FZ_H = FZ_B = FZ_N = FZ_S = FZ_XS = None


def _init_fonts() -> None:
    global F_TITLE, F_H, F_B, F_N, F_S, F_XS
    global FZ_TITLE, FZ_H, FZ_B, FZ_N, FZ_S, FZ_XS
    require_cjk_font()
    F_TITLE = font_latin(24, True)
    F_H = font_latin(17, True)
    F_B = font_latin(14, True)
    F_N = font_latin(13)
    F_S = font_latin(11)
    F_XS = font_latin(10)
    FZ_TITLE = font_cjk(15)
    FZ_H = font_cjk(13)
    FZ_B = font_cjk(12)
    FZ_N = font_cjk(11)
    FZ_S = font_cjk(10)
    FZ_XS = font_cjk(9)


def new_img():
    im = Image.new("RGB", (W, H), BG)
    return im, ImageDraw.Draw(im)


def round_rect(draw, xy, r, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)


def arrow(draw, p1, p2, color=INK, width=3):
    draw.line([p1, p2], fill=color, width=width)
    x1, y1 = p1
    x2, y2 = p2
    ang = math.atan2(y2 - y1, x2 - x1)
    L = 12
    a1 = (x2 - L * math.cos(ang - 0.4), y2 - L * math.sin(ang - 0.4))
    a2 = (x2 - L * math.cos(ang + 0.4), y2 - L * math.sin(ang + 0.4))
    draw.polygon([p2, a1, a2], fill=color)


def save(im, name: str):
    path = OUT / name
    im.save(path, "PNG", optimize=True)
    print("wrote", name)


def bi_title(d, en: str, zh: str, y: float = 30):
    bilingual_title(d, (W / 2, y), en, zh, F_TITLE, FZ_TITLE, INK, MUTED)


def bi_foot(d, en: str, zh: str, y: float = 548):
    bilingual_center(d, (W / 2, y), en, zh, F_N, FZ_S, MUTED, MUTED, gap=2)


def draw_map():
    im, d = new_img()
    bi_title(d, "Refrigeration & heat-pump cycle families", "制冷与热泵循环族系", 28)
    families = [
        ("Ideal reference", "理想参照", "Reverse Carnot", "逆卡诺", "T-s ceiling for COP", "T-s 上 COP 上限", GOLD, (40, 72, 240, 210)),
        ("Gas cycle", "气体循环", "Reverse Brayton", "逆布雷顿", "No phase change · air", "无相变 · 空气", TEAL, (280, 72, 480, 210)),
        ("Vapor compression", "蒸汽压缩", "Subcritical VCC", "亚临界 VCC", "Industry workhorse", "工业主力", GREEN, (520, 72, 720, 210)),
        ("Transcritical", "跨临界", "CO2 / R744", "CO2 / R744", "Gas cooler · P>Pc", "气体冷却器 · P>Pc", ORANGE, (760, 72, 984, 210)),
        ("Thermal drive", "热驱动", "Absorption", "吸收式", "Heat-driven · pairs", "热驱动 · 工质对", PURPLE, (160, 260, 400, 400)),
        ("Open steam", "开式蒸汽", "MVR / steam VCC", "MVR / 蒸汽压缩", "Working fluid = steam", "工质=蒸汽", RED, (440, 260, 680, 400)),
        ("Other", "其他", "Stirling · ORC*", "斯特林 · ORC*", "Niche / power side*", "小众 / 动力侧*", MUTED, (720, 260, 960, 400)),
    ]
    for cat_en, cat_zh, name_en, name_zh, note_en, note_zh, col, box in families:
        round_rect(d, box, 14, CARD, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 28), cat_en, cat_zh, F_S, FZ_XS, MUTED, MUTED, gap=1)
        bilingual_center(d, (cx, box[1] + 68), name_en, name_zh, F_H, FZ_H, col, col, gap=1)
        bilingual_center(d, (cx, box[1] + 108), note_en, note_zh, F_S, FZ_XS, INK, MUTED, gap=1)
    bilingual_center(
        d,
        (W / 2, 440),
        "Flow -> connections ·  P-h -> enthalpy & throttle ·  T-s -> irreversibility vs Carnot",
        "流程图→连接 · P-h→焓与节流 · T-s→相对卡诺的不可逆",
        F_S,
        FZ_XS,
        MUTED,
        MUTED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 520),
        "*ORC / power Brayton are power-side cousins - not a full chapter here.",
        "*ORC / 动力布雷顿属动力侧近亲——本站暂不专章展开。",
        F_XS,
        FZ_XS,
        MUTED,
        MUTED,
        gap=2,
    )
    save(im, "knowledge-cycles-map.png")


def draw_carnot_ts():
    im, d = new_img()
    bi_title(d, "Reverse Carnot cycle on T-s", "T-s 图上的逆卡诺循环", 26)
    ox, oy, ax, ay = 140, 470, 820, 100
    d.line([(ox, oy), (ox, ay)], fill=INK, width=2)
    d.line([(ox, oy), (ox + ax, oy)], fill=INK, width=2)
    text_center(d, (ox - 40, (oy + ay) / 2), "T", F_B, INK)
    text_center(d, (ox + ax / 2, oy + 22), "s", F_B, INK)
    th_y, tc_y = 150, 370
    d.line([(ox + 40, th_y), (ox + ax - 40, th_y)], fill=RED, width=1)
    d.line([(ox + 40, tc_y), (ox + ax - 40, tc_y)], fill=BLUE, width=1)
    d.text((ox + ax - 20, th_y - 18), "Th", font=F_N, fill=RED)
    d.text((ox + ax - 20, tc_y - 18), "Tc", font=F_N, fill=BLUE)
    s1, s2 = ox + 180, ox + 520
    pts = [(s1, tc_y), (s2, tc_y), (s2, th_y), (s1, th_y)]
    d.polygon(pts, outline=GREEN, fill=LIGHT_GREEN)
    d.line([pts[0], pts[1]], fill=BLUE, width=4)
    d.line([pts[1], pts[2]], fill=PURPLE, width=4)
    d.line([pts[2], pts[3]], fill=RED, width=4)
    d.line([pts[3], pts[0]], fill=TEAL, width=4)
    for p, lab in zip(pts, ["4", "1", "2", "3"]):
        d.ellipse([p[0] - 6, p[1] - 6, p[0] + 6, p[1] + 6], fill=INK)
        d.text((p[0] + 10, p[1] - 10), lab, font=F_B, fill=INK)
    bilingual_center(d, (s1 + 200, tc_y + 22), "isothermal heat absorption (Qc)", "等温吸热 (Qc)", F_S, FZ_XS, BLUE, BLUE, gap=1)
    bilingual_center(d, (s1 + 200, th_y - 28), "isothermal heat rejection (Qh)", "等温放热 (Qh)", F_S, FZ_XS, RED, RED, gap=1)
    bilingual_center(d, (s2 + 70, (th_y + tc_y) / 2), "isentropic compression", "等熵压缩", F_S, FZ_XS, PURPLE, PURPLE, gap=1)
    bilingual_center(d, (s1 - 70, (th_y + tc_y) / 2), "isentropic expansion", "等熵膨胀", F_S, FZ_XS, TEAL, TEAL, gap=1)
    bi_foot(
        d,
        "COPc = Tc/(Th-Tc) · COPh = Th/(Th-Tc)  - larger lift -> lower ceiling",
        "温差越大，理想 COP 上限越低",
    )
    save(im, "knowledge-cycles-carnot-ts.png")


def draw_carnot_vs_real():
    im, d = new_img()
    bi_title(d, "Ideal reverse Carnot vs real vapor-compression", "理想逆卡诺 vs 实际蒸汽压缩", 26)
    ox, oy = 120, 490
    d.line([(ox, oy), (ox, 80)], fill=INK, width=2)
    d.line([(ox, oy), (900, oy)], fill=INK, width=2)
    text_center(d, (ox - 35, 290), "T", F_B, INK)
    text_center(d, (520, oy + 22), "s", F_B, INK)

    c = [(280, 390), (520, 390), (520, 150), (280, 150)]
    d.line([c[0], c[1], c[2], c[3], c[0]], fill=GREEN, width=3)

    r = [(300, 370), (490, 375), (505, 175), (310, 185)]
    d.line([r[0], r[1]], fill=BLUE, width=3)
    d.line([r[1], r[2]], fill=ORANGE, width=3)
    d.line([r[2], r[3]], fill=RED, width=3)
    d.line([r[3], r[0]], fill=PURPLE, width=3)
    for p in r:
        d.ellipse([p[0] - 5, p[1] - 5, p[0] + 5, p[1] + 5], fill=INK)

    round_rect(d, (660, 90, 990, 320), 12, CARD, GRID, 1)
    d.line([(680, 125), (740, 125)], fill=GREEN, width=4)
    bilingual_center(d, (860, 125), "Reverse Carnot (ideal)", "逆卡诺（理想）", F_N, FZ_S, INK, MUTED, gap=1)
    d.line([(680, 175), (740, 175)], fill=ORANGE, width=4)
    bilingual_center(d, (860, 175), "Real VCC (lossy)", "实际 VCC（有损失）", F_N, FZ_S, INK, MUTED, gap=1)
    bilingual_center(d, (825, 230), "Finite dT in HX", "换热器有限温差", F_S, FZ_XS, MUTED, MUTED, gap=1)
    bilingual_center(d, (825, 265), "Throttle != isentropic expand", "节流≠等熵膨胀", F_S, FZ_XS, MUTED, MUTED, gap=1)
    bilingual_center(d, (825, 300), "Compressor irreversibility", "压缩机不可逆", F_S, FZ_XS, MUTED, MUTED, gap=1)
    bi_foot(
        d,
        "Real cycles sit inside the Carnot rectangle - gap = irreversibility budget",
        "实际循环落在卡诺矩形内侧——间隙即不可逆“预算”",
    )
    save(im, "knowledge-cycles-carnot-vs-real.png")


def draw_brayton():
    im, d = new_img()
    bi_title(d, "Reverse Brayton (gas) cycle", "逆布雷顿（气体）循环", 26)
    boxes = [
        ((60, 90, 280, 200), GREEN, "Compressor", "压缩机"),
        ((360, 90, 580, 200), RED, "Heat rejector (cooler)", "放热器（冷却器）"),
        ((660, 90, 900, 200), TEAL, "Expander (turbine)", "膨胀机（透平）"),
        ((360, 280, 580, 390), BLUE, "Heat absorber", "吸热器"),
    ]
    for box, col, en, zh in boxes:
        round_rect(d, box, 12, CARD, col, 3)
        bilingual_center(d, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), en, zh, F_B, FZ_B, col, col, gap=2)
    arrow(d, (280, 145), (360, 145), GREEN)
    arrow(d, (580, 145), (660, 145), RED)
    arrow(d, (780, 200), (780, 335), TEAL)
    arrow(d, (780, 335), (580, 335), BLUE)
    arrow(d, (360, 335), (170, 335), BLUE)
    arrow(d, (170, 335), (170, 200), BLUE)
    round_rect(d, (60, 420, 960, 555), 12, CARD, GRID, 1)
    bilingual_center(
        d,
        (W / 2, 450),
        "All gas - no two-phase condenser / evaporator. Work = compressor - expander.",
        "全程气相——无两相冷凝/蒸发。净功=压缩机-膨胀机。",
        F_N,
        FZ_S,
        INK,
        MUTED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 500),
        "Niche: aircraft / cryogenic air. Rare as industrial HP core.",
        "常见于航空/深冷空气循环；罕作工业热泵核心。",
        F_S,
        FZ_XS,
        MUTED,
        MUTED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 540),
        "T-s: two isentropics + two isobars (not Carnot rectangle).",
        "T-s：两等熵+两等压（非卡诺矩形）。",
        F_S,
        FZ_XS,
        MUTED,
        MUTED,
        gap=2,
    )
    save(im, "knowledge-cycles-brayton.png")


def draw_dome(d, peak, left_base, right_base, mid_y):
    lx, by = left_base
    rx, _ = right_base
    px, py = peak
    pts = [
        (lx, by),
        (lx + (px - lx) * 0.35, mid_y + 40),
        (lx + (px - lx) * 0.7, py + 30),
        peak,
        (px + (rx - px) * 0.3, py + 30),
        (px + (rx - px) * 0.65, mid_y + 40),
        (rx, by),
    ]
    d.line(pts, fill=MUTED, width=2)
    return peak


def draw_vcc_ph():
    im, d = new_img()
    bi_title(d, "Subcritical vapor-compression on P-h", "亚临界蒸汽压缩 P-h 图", 26)
    ox, oy = 100, 490
    d.line([(ox, oy), (ox, 70)], fill=INK, width=2)
    d.line([(ox, oy), (920, oy)], fill=INK, width=2)
    text_center(d, (ox - 35, 280), "P", F_B, INK)
    text_center(d, (520, oy + 22), "h", F_B, INK)

    crit = (460, 145)
    draw_dome(d, crit, (220, 420), (700, 420), 270)
    d.ellipse([crit[0] - 5, crit[1] - 5, crit[0] + 5, crit[1] + 5], fill=MUTED)
    bilingual_center(d, (crit[0] + 55, crit[1] - 8), "critical", "临界点", F_XS, FZ_XS, MUTED, MUTED, gap=1)

    pc_y, pe_y = 220, 370
    d.line([(ox + 40, pc_y), (880, pc_y)], fill=RED, width=1)
    d.line([(ox + 40, pe_y), (880, pe_y)], fill=BLUE, width=1)
    d.text((885, pc_y - 8), "Pc", font=F_S, fill=RED)
    d.text((885, pe_y - 8), "Pe", font=F_S, fill=BLUE)

    p2 = (640, pc_y)
    p2b = (560, pc_y)
    p3 = (280, pc_y)
    p4 = (280, pe_y)
    p1 = (600, pe_y)

    d.line([p1, p2], fill=GREEN, width=4)
    d.line([p2, p2b, p3], fill=RED, width=4)
    d.line([p3, p4], fill=PURPLE, width=4)
    d.line([p4, p1], fill=BLUE, width=4)

    for p, lab in [(p1, "1"), (p2, "2"), (p3, "3"), (p4, "4")]:
        d.ellipse([p[0] - 7, p[1] - 7, p[0] + 7, p[1] + 7], fill=INK)
        d.text((p[0] + 10, p[1] - 18), lab, font=F_B, fill=INK)

    bilingual_center(d, (650, 175), "compression", "压缩", F_S, FZ_XS, GREEN, GREEN, gap=1)
    bilingual_center(d, (400, 190), "condense + subcool (Pc < Pcrit)", "冷凝+过冷 (Pc < Pcrit)", F_S, FZ_XS, RED, RED, gap=1)
    bilingual_center(d, (220, 290), "throttle (h~const)", "节流（焓近似不变）", F_S, FZ_XS, PURPLE, PURPLE, gap=1)
    bilingual_center(d, (430, 410), "evaporate + superheat", "蒸发+过热", F_S, FZ_XS, BLUE, BLUE, gap=1)
    bi_foot(
        d,
        "1->2 compress · 2->3 reject heat · 3->4 throttle · 4->1 absorb heat",
        "1→2 压缩 · 2→3 放热 · 3→4 节流 · 4→1 吸热",
    )
    save(im, "knowledge-cycles-vcc-ph.png")


def draw_vcc_flow():
    im, d = new_img()
    bi_title(d, "Basic vapor-compression heat pump / chiller", "基本蒸汽压缩热泵 / 冷水机", 26)
    # Taller boxes to fit bilingual title + sub
    comps = [
        ((392, 55, 632, 175), GREEN, "Compressor", "压缩机", "work in · raise P", "输入功 · 升压"),
        ((720, 195, 960, 345), RED, "Condenser", "冷凝器", "high-P · reject heat", "高压 · 放热"),
        ((392, 390, 632, 520), PURPLE, "Expansion valve", "膨胀阀", "throttle · drop P", "节流 · 降压"),
        ((64, 195, 304, 345), BLUE, "Evaporator", "蒸发器", "low-P · absorb heat", "低压 · 吸热"),
    ]
    for box, col, title_en, title_zh, sub_en, sub_zh in comps:
        round_rect(d, box, 14, CARD, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 38), title_en, title_zh, F_H, FZ_H, col, col, gap=2)
        bilingual_center(d, (cx, box[1] + 90), sub_en, sub_zh, F_S, FZ_XS, MUTED, MUTED, gap=1)
    arrow(d, (632, 115), (840, 195), GREEN)
    arrow(d, (840, 345), (632, 455), RED)
    arrow(d, (392, 455), (184, 345), PURPLE)
    arrow(d, (184, 195), (392, 115), BLUE)
    bilingual_center(d, (740, 115), "discharge", "排气", F_XS, FZ_XS, GREEN, GREEN, gap=1)
    bilingual_center(d, (280, 115), "suction", "吸气", F_XS, FZ_XS, BLUE, BLUE, gap=1)
    bi_foot(
        d,
        "Same cycle for cooling or heating - useful heat is which side you count",
        "制冷/制热同一循环——有用热量取决于你算哪一侧",
    )
    save(im, "knowledge-cycles-vcc-flow.png")


def draw_economizer():
    im, d = new_img()
    bi_title(d, "VCC with economizer (flash tank or IHX)", "带经济器的 VCC（闪蒸罐或 IHX）", 26)
    round_rect(d, (80, 90, 270, 200), 10, LIGHT_GREEN, GREEN, 2)
    bilingual_center(d, (175, 130), "Compressor", "压缩机", F_N, FZ_S, GREEN, GREEN, gap=1)
    bilingual_center(d, (175, 170), "(+ mid inject)", "（+中间补气）", F_XS, FZ_XS, MUTED, MUTED, gap=1)
    round_rect(d, (350, 55, 560, 145), 10, LIGHT_RED, RED, 2)
    bilingual_center(d, (455, 100), "Condenser", "冷凝器", F_B, FZ_B, RED, RED, gap=2)
    round_rect(d, (610, 55, 780, 145), 10, LIGHT_PURPLE, PURPLE, 2)
    bilingual_center(d, (695, 100), "1st expand", "一级膨胀", F_N, FZ_S, PURPLE, PURPLE, gap=1)
    round_rect(d, (710, 190, 950, 310), 10, LIGHT_ORANGE, ORANGE, 2)
    bilingual_center(d, (830, 230), "Flash / IHX", "闪蒸 / IHX", F_N, FZ_S, ORANGE, ORANGE, gap=1)
    bilingual_center(d, (830, 270), "economizer", "经济器", F_S, FZ_XS, MUTED, MUTED, gap=1)
    round_rect(d, (390, 350, 600, 450), 10, LIGHT_PURPLE, PURPLE, 2)
    bilingual_center(d, (495, 400), "2nd expand", "二级膨胀", F_B, FZ_B, PURPLE, PURPLE, gap=2)
    round_rect(d, (80, 350, 270, 450), 10, LIGHT_BLUE, BLUE, 2)
    bilingual_center(d, (175, 400), "Evaporator", "蒸发器", F_B, FZ_B, BLUE, BLUE, gap=2)

    arrow(d, (270, 145), (350, 100), GREEN)
    arrow(d, (560, 100), (610, 100), RED)
    arrow(d, (780, 100), (830, 190), PURPLE)
    arrow(d, (830, 310), (600, 400), ORANGE)
    arrow(d, (390, 400), (270, 400), PURPLE)
    arrow(d, (175, 350), (175, 200), BLUE)
    arrow(d, (710, 250), (270, 160), ORANGE, width=2)
    bilingual_center(d, (480, 220), "vapor / cooled liquid inject", "蒸汽/过冷液补入", F_XS, FZ_XS, ORANGE, ORANGE, gap=1)

    round_rect(d, (60, 475, 960, 560), 10, CARD, GRID, 1)
    bilingual_center(
        d,
        (W / 2, 505),
        "Why: lower discharge temp & better COP at higher lift. Cost: extra vessel/HX.",
        "收益：降排气温度、高升程 COP；代价：额外容器/换热器与控制。",
        F_S,
        FZ_XS,
        INK,
        MUTED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 540),
        "Homepage configs (b)/(c) - flash tank vs heat-exchanger economizer.",
        "对应首页构型 (b)/(c)——闪蒸罐 vs 换热器经济器。",
        F_XS,
        FZ_XS,
        MUTED,
        MUTED,
        gap=1,
    )
    save(im, "knowledge-cycles-economizer.png")


def draw_two_stage():
    im, d = new_img()
    bi_title(d, "Two-stage vapor compression", "双级蒸汽压缩", 26)
    round_rect(d, (60, 90, 280, 220), 12, LIGHT_BLUE, BLUE, 3)
    bilingual_center(d, (170, 135), "LP evaporator", "低压蒸发器", F_B, FZ_B, BLUE, BLUE, gap=2)
    bilingual_center(d, (170, 185), "low stage", "低压级", F_S, FZ_XS, MUTED, MUTED, gap=1)
    round_rect(d, (360, 90, 580, 220), 12, LIGHT_GREEN, GREEN, 3)
    bilingual_center(d, (470, 135), "LP compressor", "低压压缩机", F_B, FZ_B, GREEN, GREEN, gap=2)
    bilingual_center(d, (470, 185), "stage 1", "第一级", F_S, FZ_XS, MUTED, MUTED, gap=1)
    round_rect(d, (660, 90, 960, 220), 12, LIGHT_ORANGE, ORANGE, 3)
    bilingual_center(d, (810, 135), "Intercooler / flash", "中间冷却 / 闪蒸", F_B, FZ_B, ORANGE, ORANGE, gap=2)
    bilingual_center(d, (810, 185), "vessel", "容器", F_S, FZ_XS, MUTED, MUTED, gap=1)
    round_rect(d, (660, 270, 960, 400), 12, LIGHT_GREEN, GREEN, 3)
    bilingual_center(d, (810, 315), "HP compressor", "高压压缩机", F_B, FZ_B, GREEN, GREEN, gap=2)
    bilingual_center(d, (810, 365), "stage 2", "第二级", F_S, FZ_XS, MUTED, MUTED, gap=1)
    round_rect(d, (360, 270, 580, 400), 12, LIGHT_RED, RED, 3)
    bilingual_center(d, (470, 335), "Condenser", "冷凝器", F_B, FZ_B, RED, RED, gap=2)
    round_rect(d, (60, 270, 280, 400), 12, LIGHT_PURPLE, PURPLE, 3)
    bilingual_center(d, (170, 320), "Expansion", "膨胀", F_N, FZ_S, PURPLE, PURPLE, gap=1)
    bilingual_center(d, (170, 360), "(often staged)", "（常分级）", F_S, FZ_XS, MUTED, MUTED, gap=1)
    arrow(d, (280, 155), (360, 155), BLUE)
    arrow(d, (580, 155), (660, 155), GREEN)
    arrow(d, (810, 220), (810, 270), ORANGE)
    arrow(d, (660, 335), (580, 335), GREEN)
    arrow(d, (360, 335), (280, 335), RED)
    arrow(d, (170, 270), (170, 220), PURPLE)
    bilingual_center(
        d,
        (W / 2, 450),
        "Splits pressure ratio -> cooler discharge, higher lift capability",
        "分摊压比→更低排气温度、更高升程能力",
        F_N,
        FZ_S,
        INK,
        MUTED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 520),
        "Homepage config (e). Trade-off: two machines, oil return, and control.",
        "首页构型 (e)。代价：两台机器、回油与控制逻辑。",
        F_S,
        FZ_XS,
        MUTED,
        MUTED,
        gap=2,
    )
    save(im, "knowledge-cycles-two-stage.png")


def draw_cascade():
    im, d = new_img()
    bi_title(d, "Cascade: two independent loops + cascade HX", "复叠：两独立回路 + 复叠换热器", 26)
    round_rect(d, (40, 65, 480, 340), 16, (235, 245, 255), BLUE, 2)
    bilingual_center(d, (260, 90), "Low-temperature loop", "低温回路", F_B, FZ_B, BLUE, BLUE, gap=2)
    round_rect(d, (70, 125, 200, 215), 8, LIGHT_BLUE, BLUE, 2)
    bilingual_center(d, (135, 170), "LT evap", "低温蒸发器", F_N, FZ_S, BLUE, BLUE, gap=1)
    round_rect(d, (230, 125, 360, 215), 8, LIGHT_GREEN, GREEN, 2)
    bilingual_center(d, (295, 170), "LT comp", "低温压缩机", F_N, FZ_S, GREEN, GREEN, gap=1)
    round_rect(d, (160, 240, 360, 315), 8, CARD, TEAL, 2)
    bilingual_center(d, (260, 277), "Cascade HX", "复叠换热器", F_N, FZ_S, TEAL, TEAL, gap=1)
    round_rect(d, (520, 65, 980, 340), 16, (255, 240, 235), RED, 2)
    bilingual_center(d, (750, 90), "High-temperature loop", "高温回路", F_B, FZ_B, RED, RED, gap=2)
    round_rect(d, (660, 125, 800, 215), 8, LIGHT_GREEN, GREEN, 2)
    bilingual_center(d, (730, 170), "HT comp", "高温压缩机", F_N, FZ_S, GREEN, GREEN, gap=1)
    round_rect(d, (820, 125, 950, 215), 8, LIGHT_RED, RED, 2)
    bilingual_center(d, (885, 170), "HT cond", "高温冷凝器", F_N, FZ_S, RED, RED, gap=1)
    round_rect(d, (660, 240, 860, 315), 8, CARD, TEAL, 2)
    bilingual_center(d, (760, 277), "Cascade HX", "复叠换热器", F_N, FZ_S, TEAL, TEAL, gap=1)
    d.line([(360, 277), (660, 277)], fill=TEAL, width=3)
    bilingual_center(d, (510, 255), "heat transfer", "热量传递", F_XS, FZ_XS, TEAL, TEAL, gap=1)
    bilingual_center(
        d,
        (W / 2, 385),
        "Two fluids, two oil circuits - intermediate HX couples them thermally only",
        "两工质、两油路——中间换热器仅热耦合",
        F_N,
        FZ_S,
        INK,
        MUTED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 445),
        "Homepage config (f). Extreme-cold CO2 cascade: see Fundamentals Part 1.",
        "首页构型 (f)。极寒 CO2 复叠见基础知识第 1 部分。",
        F_S,
        FZ_XS,
        MUTED,
        MUTED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 520),
        "Use when one fluid cannot span source->sink safely or efficiently alone.",
        "单工质无法安全/高效跨越源侧→汇侧时使用。",
        F_N,
        FZ_S,
        MUTED,
        MUTED,
        gap=2,
    )
    save(im, "knowledge-cycles-cascade.png")


def draw_transcritical_ph():
    im, d = new_img()
    bi_title(d, "Transcritical CO2 (R744) on P-h", "跨临界 CO2 (R744) P-h 图", 26)
    ox, oy = 100, 490
    d.line([(ox, oy), (ox, 70)], fill=INK, width=2)
    d.line([(ox, oy), (920, oy)], fill=INK, width=2)
    text_center(d, (ox - 35, 280), "P", F_B, INK)
    text_center(d, (520, oy + 22), "h", F_B, INK)

    crit = (460, 235)
    draw_dome(d, crit, (240, 420), (680, 420), 310)
    d.ellipse([crit[0] - 6, crit[1] - 6, crit[0] + 6, crit[1] + 6], fill=ORANGE)
    bilingual_center(d, (crit[0] + 70, crit[1] - 5), "critical point", "临界点", F_S, FZ_XS, ORANGE, ORANGE, gap=1)

    d.line([(ox + 40, 235), (880, 235)], fill=ORANGE, width=1)
    d.text((885, 227), "Pcrit", font=F_XS, fill=ORANGE)

    ph_y, pe_y = 115, 350
    d.line([(ox + 40, ph_y), (880, ph_y)], fill=RED, width=1)
    d.text((885, ph_y - 8), "Ph", font=F_S, fill=RED)
    d.line([(ox + 40, pe_y), (880, pe_y)], fill=BLUE, width=1)
    d.text((885, pe_y - 8), "Pe", font=F_S, fill=BLUE)

    p1 = (640, pe_y)
    p2 = (720, ph_y)
    p3 = (300, ph_y)
    p4 = (300, pe_y)
    d.line([p1, p2], fill=GREEN, width=4)
    d.line([p2, p3], fill=RED, width=4)
    d.line([p3, p4], fill=PURPLE, width=4)
    d.line([p4, p1], fill=BLUE, width=4)
    for p, lab in [(p1, "1"), (p2, "2"), (p3, "3"), (p4, "4")]:
        d.ellipse([p[0] - 7, p[1] - 7, p[0] + 7, p[1] + 7], fill=INK)
        d.text((p[0] + 10, p[1] - 18), lab, font=F_B, fill=INK)

    bilingual_center(d, (480, 85), "gas cooler (no two-phase condenser)", "气体冷却器（无两相冷凝）", F_S, FZ_XS, RED, RED, gap=1)
    bilingual_center(d, (680, 190), "compress", "压缩", F_S, FZ_XS, GREEN, GREEN, gap=1)
    bilingual_center(d, (230, 220), "throttle", "节流", F_S, FZ_XS, PURPLE, PURPLE, gap=1)
    bilingual_center(d, (470, 385), "evaporate", "蒸发", F_S, FZ_XS, BLUE, BLUE, gap=1)
    bi_foot(
        d,
        "Ph > Pcrit is an optimization variable · gas-cooler exit temp drives COP & capacity",
        "Ph>Pcrit 为优化变量 · 气冷器出口温度主导 COP 与能力",
    )
    save(im, "knowledge-cycles-transcritical-ph.png")


def draw_absorption():
    im, d = new_img()
    bi_title(d, "Absorption cycle (heat-driven)", "吸收式循环（热驱动）", 26)
    nodes = [
        ((60, 70, 280, 175), ORANGE, "Generator", "发生器", "heat in (waste/steam)", "输入热（余热/蒸汽）"),
        ((400, 70, 620, 175), RED, "Condenser", "冷凝器", "reject heat", "放热"),
        ((740, 70, 960, 175), PURPLE, "Expansion", "膨胀", "refrigerant", "制冷剂"),
        ((740, 260, 960, 370), BLUE, "Evaporator", "蒸发器", "useful cold / HP", "有用冷量/热泵"),
        ((400, 260, 620, 370), TEAL, "Absorber", "吸收器", "absorb into solution", "蒸汽溶入溶液"),
        ((60, 260, 280, 370), GREEN, "Solution pump", "溶液泵", "weak -> strong", "稀液→浓液"),
    ]
    for box, col, t_en, t_zh, s_en, s_zh in nodes:
        round_rect(d, box, 12, CARD, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 32), t_en, t_zh, F_B, FZ_B, col, col, gap=2)
        bilingual_center(d, (cx, box[1] + 78), s_en, s_zh, F_XS, FZ_XS, MUTED, MUTED, gap=1)
    arrow(d, (280, 122), (400, 122), ORANGE)
    arrow(d, (620, 122), (740, 122), RED)
    arrow(d, (850, 175), (850, 260), PURPLE)
    arrow(d, (740, 315), (620, 315), BLUE)
    arrow(d, (400, 315), (280, 315), TEAL)
    arrow(d, (170, 260), (170, 175), GREEN)
    bilingual_center(
        d,
        (W / 2, 415),
        "Pairs: H2O-LiBr, NH3-H2O, ...  ·  Electric compressor -> thermal compressor",
        "工质对：H2O-LiBr、NH3-H2O… · 电压缩机→热压缩机",
        F_N,
        FZ_S,
        INK,
        MUTED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 470),
        "When: abundant waste heat / scarce power. Watch crystallization & vacuum.",
        "适用：余热充裕/电力紧张。注意结晶、真空与维护。",
        F_S,
        FZ_XS,
        MUTED,
        MUTED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 525),
        "COP definitions differ from VCC - compare carefully in proposals.",
        "COP 定义与 VCC 不同——方案比选时需统一口径。",
        F_S,
        FZ_XS,
        MUTED,
        MUTED,
        gap=2,
    )
    save(im, "knowledge-cycles-absorption.png")


def draw_steam():
    im, d = new_img()
    bi_title(d, "Open-cycle steam compression / MVR", "开式蒸汽压缩 / MVR", 26)
    round_rect(d, (80, 90, 360, 260), 14, LIGHT_BLUE, BLUE, 3)
    bilingual_center(d, (220, 140), "Process / flash steam", "工艺 / 闪蒸汽源", F_H, FZ_H, BLUE, BLUE, gap=2)
    bilingual_center(d, (220, 200), "working fluid = H2O", "工质 = 水", F_S, FZ_S, MUTED, MUTED, gap=1)
    round_rect(d, (460, 90, 740, 260), 14, LIGHT_GREEN, GREEN, 3)
    bilingual_center(d, (600, 140), "Steam compressor", "蒸汽压缩机", F_H, FZ_H, GREEN, GREEN, gap=2)
    bilingual_center(d, (600, 200), "raise P & T", "升压升温", F_S, FZ_S, MUTED, MUTED, gap=1)
    round_rect(d, (820, 90, 980, 260), 14, LIGHT_RED, RED, 3)
    bilingual_center(d, (900, 140), "Process use", "工艺用汽", F_H, FZ_H, RED, RED, gap=2)
    bilingual_center(d, (900, 200), "steam sink", "蒸汽汇", F_S, FZ_S, MUTED, MUTED, gap=1)
    arrow(d, (360, 175), (460, 175), BLUE)
    arrow(d, (740, 175), (820, 175), GREEN)
    round_rect(d, (180, 320, 800, 440), 12, CARD, TEAL, 2)
    bilingual_center(
        d,
        (490, 360),
        "Condensate recovery · steam quality · oil contamination risk",
        "凝水回收 · 蒸汽品质 · 油污染风险",
        F_B,
        FZ_B,
        TEAL,
        TEAL,
        gap=2,
    )
    bilingual_center(
        d,
        (490, 410),
        "Homepage configs (g)/(h)/(i) · see Industrial HTHP column",
        "首页构型 (g)/(h)/(i) · 见工业高温热泵专栏",
        F_S,
        FZ_XS,
        MUTED,
        MUTED,
        gap=1,
    )
    bi_foot(
        d,
        "Open loop: fluid may leave with the product - design charge & makeup together",
        "开式回路：工质可能随产品离开——充注与补水需一并设计",
    )
    save(im, "knowledge-cycles-steam.png")


def main():
    _init_fonts()
    OUT.mkdir(parents=True, exist_ok=True)
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
    print("ALL DONE ->", OUT)


if __name__ == "__main__":
    main()
