#!/usr/bin/env python3
"""Generate knowledge-comp-*.png — compressor knowledge diagrams (EN primary / ZH secondary)."""

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
# 1. VCC cycle highlighting compressor
# ---------------------------------------------------------------------------


def draw_cycle():
    im, d = new_canvas()
    bi_title(d, F, "Vapor-compression cycle — compressor focus", "蒸汽压缩循环——聚焦压缩机")

    comps = [
        ((392, 70, 632, 190), GREEN, True, "Compressor", "压缩机", "work in · raise P", "输入功 · 升压"),
        ((720, 210, 960, 360), RED, False, "Condenser", "冷凝器", "high-P · reject heat", "高压 · 放热"),
        ((392, 390, 632, 520), PURPLE, False, "Expansion valve", "膨胀阀", "throttle · drop P", "节流 · 降压"),
        ((64, 210, 304, 360), BLUE, False, "Evaporator", "蒸发器", "low-P · absorb heat", "低压 · 吸热"),
    ]
    for box, col, hi, te, tz, se, sz in comps:
        fill = LIGHT_GREEN if hi else CARD
        round_rect(d, box, 14, fill, col, 4 if hi else 2)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 38), te, tz, F.h, F.zh, col, col, gap=2)
        bilingual_center(d, (cx, box[1] + 95), se, sz, F.s, F.zxs, MUTED, MUTED, gap=1)

    arrow(d, (632, 130), (840, 210), GREEN)
    arrow(d, (840, 360), (632, 455), RED)
    arrow(d, (392, 455), (184, 360), PURPLE)
    arrow(d, (184, 210), (392, 130), BLUE)

    bilingual_center(d, (760, 130), "discharge", "排气", F.xs, F.zxs, GREEN, GREEN, gap=1)
    bilingual_center(d, (260, 130), "suction", "吸气", F.xs, F.zxs, BLUE, BLUE, gap=1)

    bi_foot(
        d,
        F,
        "Compressor is the only work input — maps suction density & pressure ratio to capacity",
        "压缩机是唯一功输入——吸气密度与压比决定出力",
    )
    save_png(im, "knowledge-comp-cycle.png")


# ---------------------------------------------------------------------------
# 2. Compressor types — 5 columns
# ---------------------------------------------------------------------------


def draw_types():
    im, d = new_canvas()
    bi_title(d, F, "Compressor families at a glance", "压缩机类型一览")

    cols = [
        ("Reciprocating", "活塞式", "Pistons + valves", "活塞+气阀", "1–500 kW", "1–500 kW", "Multi-cyl common", "多缸常见", GREEN, LIGHT_GREEN),
        ("Scroll", "涡旋式", "Orbiting scroll", "动涡旋盘", "2–100 kW", "2–100 kW", "Quiet · compact", "安静·紧凑", BLUE, LIGHT_BLUE),
        ("Screw", "螺杆式", "Twin rotors", "双转子", "50–2000 kW", "50–2000 kW", "Oil-injected often", "常喷油", ORANGE, LIGHT_ORANGE),
        ("Centrifugal", "离心式", "Impeller + diffuser", "叶轮+扩压器", "300 kW+", "300 kW+", "High flow · low PR", "大流量·低压比", PURPLE, LIGHT_PURPLE),
        ("Rotary", "转子式", "Rolling piston", "滚动转子", "1–30 kW", "1–30 kW", "Room / small HP", "房间/小型热泵", TEAL, (220, 242, 242)),
    ]
    gap, n = 14, len(cols)
    x0, y0, y1 = 28, 70, 470
    cw = (W - 2 * x0 - (n - 1) * gap) / n

    def _icon(i: int, cx: float, cy: float, col):
        if i == 0:  # reciprocating — piston
            d.rectangle([cx - 18, cy - 22, cx + 18, cy + 22], outline=col, width=2)
            d.rectangle([cx - 10, cy - 8, cx + 10, cy + 8], fill=col)
            d.line([(cx, cy + 8), (cx, cy + 20)], fill=col, width=2)
        elif i == 1:  # scroll — spiral hint
            d.ellipse([cx - 22, cy - 22, cx + 22, cy + 22], outline=col, width=2)
            d.ellipse([cx - 12, cy - 12, cx + 12, cy + 12], outline=col, width=2)
            d.ellipse([cx - 4, cy - 4, cx + 4, cy + 4], fill=col)
        elif i == 2:  # screw — twin lobes
            d.ellipse([cx - 24, cy - 14, cx - 2, cy + 14], outline=col, width=2)
            d.ellipse([cx + 2, cy - 14, cx + 24, cy + 14], outline=col, width=2)
            d.line([(cx - 13, cy), (cx + 13, cy)], fill=col, width=2)
        elif i == 3:  # centrifugal — impeller rays
            d.ellipse([cx - 20, cy - 20, cx + 20, cy + 20], outline=col, width=2)
            for a in range(0, 360, 45):
                rad = math.radians(a)
                d.line([(cx, cy), (cx + 16 * math.cos(rad), cy + 16 * math.sin(rad))], fill=col, width=2)
        else:  # rotary — eccentric circle
            d.ellipse([cx - 22, cy - 22, cx + 22, cy + 22], outline=col, width=2)
            d.ellipse([cx - 6, cy - 14, cx + 14, cy + 6], outline=col, width=2)

    for i, (en, zh, be, bz, ce, cz, ne, nz, col, fill) in enumerate(cols):
        x = x0 + i * (cw + gap)
        box = (x, y0, x + cw, y1)
        round_rect(d, box, 12, fill, col, 3)
        cx = x + cw / 2
        bilingual_center(d, (cx, y0 + 42), en, zh, F.h, F.zh, col, col, gap=2)
        round_rect(d, (x + 18, y0 + 88, x + cw - 18, y0 + 160), 8, CARD, col, 2)
        _icon(i, cx, y0 + 124, col)
        bilingual_center(d, (cx, y0 + 200), be, bz, F.n, F.zs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, y0 + 270), "Typical capacity", "典型冷量", F.xs, F.zxs, MUTED, MUTED, gap=1)
        bilingual_center(d, (cx, y0 + 320), ce, cz, F.b, F.zb, col, col, gap=2)
        bilingual_center(d, (cx, y0 + 390), ne, nz, F.xs, F.zxs, MUTED, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "Pick by capacity band, lift, part-load, oil handling — not by name alone",
        "按冷量带、升程、部分负荷与油管理选型——不要只看名称",
    )
    save_png(im, "knowledge-comp-types.png")


# ---------------------------------------------------------------------------
# 3. Hermetic / Semi-hermetic / Open-drive
# ---------------------------------------------------------------------------


def draw_hermetic():
    im, d = new_canvas()
    bi_title(d, F, "Drive enclosure: hermetic · semi-hermetic · open", "驱动封闭形式：全封闭·半封闭·开启式")

    cols = [
        (
            "Hermetic",
            "全封闭",
            GREEN,
            LIGHT_GREEN,
            [
                ("Welded shell", "焊接壳体"),
                ("Motor in refrigerant", "电机浸制冷剂"),
                ("No field service of motor", "现场不可修电机"),
                ("Common: scroll / rotary", "常见：涡旋/转子"),
            ],
        ),
        (
            "Semi-hermetic",
            "半封闭",
            BLUE,
            LIGHT_BLUE,
            [
                ("Bolted casing", "螺栓壳体"),
                ("Motor still inside", "电机仍在内部"),
                ("Field rebuild possible", "可现场大修"),
                ("Common: recip / screw", "常见：活塞/螺杆"),
            ],
        ),
        (
            "Open-drive",
            "开启式",
            ORANGE,
            LIGHT_ORANGE,
            [
                ("External motor / engine", "外置电机/发动机"),
                ("Shaft seal required", "需要轴封"),
                ("Drive flexibility", "驱动灵活"),
                ("Common: large screw", "常见：大型螺杆"),
            ],
        ),
    ]
    gap = 24
    x0, y0, y1 = 40, 72, 470
    cw = (W - 2 * x0 - 2 * gap) / 3

    for i, (en, zh, col, fill, lines) in enumerate(cols):
        x = x0 + i * (cw + gap)
        box = (x, y0, x + cw, y1)
        round_rect(d, box, 14, fill, col, 3)
        cx = x + cw / 2
        bilingual_center(d, (cx, y0 + 45), en, zh, F.h, F.zh, col, col, gap=2)
        # schematic shell
        round_rect(d, (x + 40, y0 + 90, x + cw - 40, y0 + 170), 20, CARD, col, 2)
        if i < 2:
            d.ellipse([cx - 28, y0 + 112, cx + 28, y0 + 150], outline=col, width=2)
            text_center(d, (cx, y0 + 131), "M", F.b, col)
        else:
            d.ellipse([x + 55, y0 + 112, x + 100, y0 + 150], outline=col, width=2)
            text_center(d, (x + 77, y0 + 131), "M", F.b, col)
            d.line([(x + 100, y0 + 131), (x + cw - 55, y0 + 131)], fill=col, width=3)
            bilingual_center(d, (x + cw - 85, y0 + 155), "seal", "轴封", F.xs, F.zxs, ORANGE, ORANGE, gap=1)

        y = y0 + 210
        for le, lz in lines:
            bilingual_center(d, (cx, y), le, lz, F.n, F.zs, INK, MUTED, gap=1)
            y += 52

    bi_foot(
        d,
        F,
        "Leak path & serviceability trade against first cost and efficiency",
        "泄漏路径与可维护性，换取初投资与效率",
    )
    save_png(im, "knowledge-comp-hermetic.png")


# ---------------------------------------------------------------------------
# 4. Operating map — Condensing T vs Evaporating T
# ---------------------------------------------------------------------------


def draw_map():
    im, d = new_canvas()
    bi_title(d, F, "Compressor operating envelope", "压缩机运行包络")

    # Plot area (left)
    L, R, T, B = 70, 620, 85, 480
    card(d, (L - 10, T - 10, R + 40, B + 40), CARD, GRID, 10, 1)
    d.rectangle([L, T, R, B], outline=GRID, width=2)

    # Grid
    for i in range(1, 5):
        y = T + i * (B - T) / 5
        d.line([(L, y), (R, y)], fill=GRID, width=1)
        x = L + i * (R - L) / 5
        d.line([(x, T), (x, B)], fill=GRID, width=1)

    # Envelope polygon
    env = [(L + 40, B - 40), (L + 80, T + 50), (R - 50, T + 70), (R - 30, B - 60)]
    d.polygon(env, fill=LIGHT_BLUE, outline=BLUE)
    d.line(env + [env[0]], fill=BLUE, width=3)

    # Duty point
    px, py = L + 280, T + 200
    d.ellipse([px - 8, py - 8, px + 8, py + 8], fill=GREEN, outline=INK, width=2)
    bilingual_center(d, (px + 70, py - 18), "Duty point", "工况点", F.s, F.zxs, GREEN, GREEN, gap=1)

    # Axes labels
    bilingual_center(d, ((L + R) / 2, B + 28), "Evaporating temperature Te", "蒸发温度 Te", F.n, F.zs, MUTED, MUTED, gap=1)
    text_center(d, (L - 22, (T + B) / 2 - 12), "Tc", F.b, MUTED)
    bilingual_center(d, (L + 90, T + 22), "Condensing T", "冷凝温度", F.xs, F.zxs, MUTED, MUTED, gap=1)

    # Sidebar tips
    tips = [
        ("Stay inside envelope", "留在包络内", "Avoid trip / damage", "避免跳机/损伤"),
        ("Lift = Tc − Te", "升程 = Tc − Te", "Drives pressure ratio", "决定压比"),
        ("Suction density", "吸气密度", "Sets mass flow", "决定质量流量"),
        ("Oil & discharge T", "油与排气温度", "Limit high-lift run", "限制高升程运行"),
    ]
    sx0, sy0 = 680, 90
    for i, (te, tz, se, sz) in enumerate(tips):
        y = sy0 + i * 95
        box = (sx0, y, 990, y + 82)
        round_rect(d, box, 10, CARD, GRID, 2)
        bilingual_center(d, ((sx0 + 990) / 2, y + 28), te, tz, F.n, F.zs, INK, MUTED, gap=1)
        bilingual_center(d, ((sx0 + 990) / 2, y + 58), se, sz, F.xs, F.zxs, MUTED, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "Catalogue maps are model-specific — verify oil, motor & discharge limits",
        "样本包络因机型而异——核对油、电机与排气限制",
    )
    save_png(im, "knowledge-comp-map.png")


# ---------------------------------------------------------------------------
# 5. Oil separator + oil return
# ---------------------------------------------------------------------------


def draw_oil():
    im, d = new_canvas()
    bi_title(d, F, "Oil management in the refrigeration circuit", "制冷回路中的油管理")

    # Cycle boxes
    boxes = [
        ((380, 70, 620, 155), GREEN, "Compressor", "压缩机"),
        ((700, 70, 940, 155), GOLD, "Oil separator", "油分离器"),
        ((700, 210, 940, 300), RED, "Condenser", "冷凝器"),
        ((380, 340, 620, 430), PURPLE, "Expansion", "膨胀阀"),
        ((80, 210, 320, 300), BLUE, "Evaporator", "蒸发器"),
    ]
    for box, col, en, zh in boxes:
        round_rect(d, box, 12, CARD, col, 3)
        bi_in_box(d, F, box, en, zh, col)

    arrow(d, (620, 112), (700, 112), GREEN)
    arrow(d, (820, 155), (820, 210), GOLD)
    arrow(d, (820, 300), (620, 385), RED)
    arrow(d, (380, 385), (200, 300), PURPLE)
    arrow(d, (200, 210), (380, 112), BLUE)

    # Oil return dashed path
    d.line([(820, 155), (820, 175), (500, 175), (500, 155)], fill=GOLD, width=2)
    bilingual_center(d, (640, 168), "oil return", "回油", F.xs, F.zxs, GOLD, GOLD, gap=1)

    # Notes panel
    notes = [
        ("Separator: keep oil near compressor", "油分：把油留在压缩机附近"),
        ("Velocity & traps: carry oil back from evaporator", "流速与存油弯：从蒸发器带回油"),
        ("Solubility / viscosity change with refrigerant & T", "溶解度/黏度随工质与温度变化"),
        ("Low Te / long lines → oil return risk", "低蒸发温度/长管 → 回油风险"),
    ]
    card(d, (60, 460, 960, 530), LIGHT_ORANGE, ORANGE, 10, 2)
    for i, (en, zh) in enumerate(notes):
        x = 90 + (i % 2) * 450
        y = 478 + (i // 2) * 28
        bilingual_center(d, (x + 180, y), en, zh, F.xs, F.zxs, INK, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "Oil is not optional — it lubricates, seals, and cools; mismanage it and capacity fails",
        "油不可缺——润滑、密封、冷却；管理失败则出力与寿命双崩",
    )
    save_png(im, "knowledge-comp-oil.png")


# ---------------------------------------------------------------------------
# 6. High-lift heat pump
# ---------------------------------------------------------------------------


def draw_hthp():
    im, d = new_canvas()
    bi_title(d, F, "High-lift heat pump — temperature lift callouts", "高升程热泵——温升标注")

    # Source / sink bands
    round_rect(d, (60, 90, 300, 200), 12, LIGHT_BLUE, BLUE, 3)
    bilingual_center(d, (180, 125), "Heat source", "热源", F.h, F.zh, BLUE, BLUE, gap=2)
    bilingual_center(d, (180, 175), "Te ≈ +5…−20 °C", "Te ≈ +5…−20 °C", F.n, F.zs, MUTED, MUTED, gap=1)

    round_rect(d, (724, 90, 964, 200), 12, LIGHT_RED, RED, 3)
    bilingual_center(d, (844, 125), "Heat sink", "热汇", F.h, F.zh, RED, RED, gap=2)
    bilingual_center(d, (844, 175), "Tc ≈ 80…120 °C", "Tc ≈ 80…120 °C", F.n, F.zs, MUTED, MUTED, gap=1)

    # Mid cycle
    round_rect(d, (340, 90, 684, 200), 12, LIGHT_GREEN, GREEN, 3)
    bilingual_center(d, (512, 125), "Compressor (+ oil / economizer)", "压缩机（+油/经济器）", F.b, F.zb, GREEN, GREEN, gap=2)
    bilingual_center(d, (512, 170), "High pressure ratio · high Td", "高压比 · 高排气温度", F.s, F.zxs, MUTED, MUTED, gap=1)

    arrow(d, (300, 145), (340, 145), BLUE)
    arrow(d, (684, 145), (724, 145), RED)

    # Lift callout bar
    card(d, (120, 230, 904, 320), CARD, GOLD, 12, 3)
    bilingual_center(
        d,
        (512, 260),
        "Lift ΔT = Tc − Te   (often 60–100+ K for HTHP)",
        "升程 ΔT = Tc − Te（高温热泵常 60–100+ K）",
        F.b,
        F.zb,
        GOLD,
        GOLD,
        gap=2,
    )
    bilingual_center(
        d,
        (512, 295),
        "Larger lift → lower COP ceiling · higher discharge T risk",
        "升程越大 → COP 上限越低 · 排气温度风险越高",
        F.s,
        F.zxs,
        MUTED,
        MUTED,
        gap=1,
    )

    # Bottom tips
    tips = [
        ("Stage / cascade / economizer", "分级 / 复叠 / 经济器", GREEN),
        ("Watch oil & motor cooling", "关注油与电机冷却", ORANGE),
        ("Match refrigerant to Te/Tc", "工质匹配 Te/Tc", PURPLE),
        ("Verify map + Td limit", "核对包络与排气限", RED),
    ]
    for i, (en, zh, col) in enumerate(tips):
        x = 40 + i * 245
        box = (x, 360, x + 230, 470)
        round_rect(d, box, 10, CARD, col, 2)
        bilingual_center(d, ((box[0] + box[2]) / 2, (box[1] + box[3]) / 2), en, zh, F.n, F.zs, col, col, gap=2)

    bi_foot(
        d,
        F,
        "HTHP is still a VCC — lift and discharge temperature dominate design",
        "高温热泵仍是 VCC——升程与排气温度主导设计",
    )
    save_png(im, "knowledge-comp-hthp.png")


def main():
    global F
    F = Fonts()
    assert IMAGES_OUT  # ensure constant linked
    draw_cycle()
    draw_types()
    draw_hermetic()
    draw_map()
    draw_oil()
    draw_hthp()
    print(f"done — {W}×{H} → {IMAGES_OUT}")


if __name__ == "__main__":
    main()
