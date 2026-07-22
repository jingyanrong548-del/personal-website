#!/usr/bin/env python3
"""Generate knowledge-encl-*.png — enclosure knowledge diagrams (EN primary / ZH secondary)."""

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
# 1. Enclosure roles
# ---------------------------------------------------------------------------


def draw_role():
    im, d = new_canvas()
    bi_title(d, F, "Enclosure roles in a heat-pump package", "热泵机组外壳的角色")

    # Cabinet outline
    cab = (80, 90, 520, 460)
    round_rect(d, cab, 14, CARD, MUTED, 3)
    # Frame hint
    d.rectangle([110, 120, 490, 430], outline=GRID, width=2)
    d.line([(110, 200), (490, 200)], fill=GRID, width=2)
    d.line([(300, 120), (300, 430)], fill=GRID, width=2)
    bilingual_center(d, (300, 155), "Structural frame", "结构框架", F.b, F.zb, MUTED, MUTED, gap=2)
    bilingual_center(d, (200, 300), "Compressor bay", "压缩机舱", F.s, F.zs, GREEN, GREEN, gap=1)
    bilingual_center(d, (400, 300), "Coil / fan", "盘管/风机", F.s, F.zs, BLUE, BLUE, gap=1)
    # Ground mark
    round_rect(d, (200, 400, 400, 440), 8, LIGHT_GREEN, GREEN, 2)
    bilingual_center(d, (300, 420), "PE bond points", "接地点", F.s, F.zs, GREEN, GREEN, gap=1)

    roles = [
        ((560, 90, 984, 190), BLUE, LIGHT_BLUE, "Strength & mounting", "强度与安装", "Mass · vibration · shipping", "质量 · 振动 · 运输"),
        ((560, 210, 984, 310), GREEN, LIGHT_GREEN, "Grounding & bonding", "接地与等电位", "Doors · panels · DIN rails", "门 · 面板 · 导轨"),
        ((560, 330, 984, 430), ORANGE, LIGHT_ORANGE, "Serviceability", "可维护性", "Gloves-on access in < 10 min", "戴手套十分钟内可及"),
    ]
    for box, col, fill, en, zh, se, sz in roles:
        round_rect(d, box, 12, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 35), en, zh, F.h, F.zh, col, col, gap=2)
        bilingual_center(d, (cx, box[1] + 75), se, sz, F.s, F.zxs, MUTED, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "Start reviews with who must reach what — not marketing panel-off photos",
        "评审从「谁必须够到什么」开始——不是卸面板宣传照",
    )
    save_png(im, "knowledge-encl-role.png")


# ---------------------------------------------------------------------------
# 2. Frame, panels, doors, IP
# ---------------------------------------------------------------------------


def draw_frame():
    im, d = new_canvas()
    bi_title(d, F, "Frame, panels, doors & IP intuition", "框架、面板、门与 IP 直觉")

    items = [
        ("Base frame", "底座框架", "Fork-lift · foundation", "叉车 · 基础", "Squareness → pipe stress", "方正 → 配管应力", TEAL, (220, 242, 242)),
        ("Sheet panels", "钣金面板", "Gauge · ribs · pitch", "板厚 · 筋 · 螺距", "Captive hardware", "防丢紧固件", BLUE, LIGHT_BLUE),
        ("Door & hinge", "门与铰链", "Swing clearance", "开门净空", "Bond strap ≠ hinge alone", "跨接≠仅靠铰链", ORANGE, LIGHT_ORANGE),
        ("IP & weather", "IP 与耐候", "Glands · louvers · drains", "接头 · 百叶 · 排水", "Weakest cut-out wins", "最弱开孔决定 IP", PURPLE, LIGHT_PURPLE),
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
        # simple glyph
        gy = 220
        if i == 0:
            d.rectangle([cx - 50, gy - 20, cx + 50, gy + 30], outline=col, width=3)
            d.line([(cx - 50, gy + 30), (cx - 40, gy + 45)], fill=col, width=3)
            d.line([(cx + 50, gy + 30), (cx + 40, gy + 45)], fill=col, width=3)
        elif i == 1:
            d.rectangle([cx - 45, gy - 30, cx + 45, gy + 40], outline=col, width=3)
            for k in range(3):
                d.line([(cx - 30, gy - 10 + k * 16), (cx + 30, gy - 10 + k * 16)], fill=col, width=2)
        elif i == 2:
            d.rectangle([cx - 40, gy - 30, cx + 30, gy + 40], outline=col, width=3)
            d.ellipse([cx + 28, gy - 5, cx + 48, gy + 15], outline=col, width=2)
            d.line([(cx + 38, gy + 15), (cx + 38, gy + 45)], fill=GREEN, width=3)
        else:
            d.rectangle([cx - 45, gy - 30, cx + 45, gy + 40], outline=col, width=3)
            for k in range(4):
                d.line([(cx + 20, gy - 20 + k * 14), (cx + 40, gy - 20 + k * 14)], fill=col, width=2)
            text_center(d, (cx - 10, gy + 5), "IP", F.h, col)

        bilingual_center(d, (cx, 320), se, sz, F.s, F.zs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, 400), te, tz, F.b, F.zb, col, col, gap=2)

    bi_foot(
        d,
        F,
        "Field-drilled holes without glands undo a factory IP rating overnight",
        "现场钻孔不装接头，一夜毁掉出厂 IP",
    )
    save_png(im, "knowledge-encl-frame.png")


# ---------------------------------------------------------------------------
# 3. Power / signal segregation
# ---------------------------------------------------------------------------


def draw_segregation():
    im, d = new_canvas()
    bi_title(d, F, "Power vs signal segregation & EMC", "强电弱电分隔与 EMC")

    # Cabinet top-view
    cab = (48, 80, 560, 460)
    round_rect(d, cab, 14, CARD, MUTED, 3)
    bilingual_center(d, (304, 110), "Panel top view", "盘柜俯视", F.b, F.zb, MUTED, MUTED, gap=2)

    # Power tray
    round_rect(d, (80, 160, 520, 240), 10, LIGHT_ORANGE, ORANGE, 3)
    bilingual_center(d, (300, 200), "POWER tray — mains / motor", "动力线槽 — 市电/电机", F.b, F.zb, ORANGE, ORANGE, gap=2)

    # Gap
    bilingual_center(d, (300, 280), "≥ 200 mm (or barrier)", "≥ 200 mm（或屏障）", F.s, F.zs, MUTED, MUTED, gap=1)
    d.line([(200, 265), (400, 265)], fill=MUTED, width=1)

    # Signal tray
    round_rect(d, (80, 310, 520, 390), 10, LIGHT_BLUE, BLUE, 3)
    bilingual_center(d, (300, 350), "SIGNAL tray — sensors / comms", "信号线槽 — 传感器/通信", F.b, F.zb, BLUE, BLUE, gap=2)

    # PE bar
    round_rect(d, (80, 415, 520, 445), 6, LIGHT_GREEN, GREEN, 2)
    bilingual_center(d, (300, 430), "PE / shield bond bar", "PE / 屏蔽搭接排", F.s, F.zs, GREEN, GREEN, gap=1)

    # Right cards
    cards_r = [
        ((600, 80, 984, 200), PURPLE, LIGHT_PURPLE, "90° crossings", "直角交叉", "Beat long parallel runs", "优于长距离并行"),
        ((600, 220, 984, 340), TEAL, (220, 242, 242), "Shield termination", "屏蔽端接", "360° gland / PE — OEM end", "360° 接头/PE — 厂家端"),
        ((600, 360, 984, 460), RED, LIGHT_RED, "VFD cable care", "变频电缆", "Avoid over drive cabinets", "勿跨过变频器柜顶"),
    ]
    for box, col, fill, en, zh, se, sz in cards_r:
        round_rect(d, box, 12, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 40), en, zh, F.h, F.zh, col, col, gap=2)
        bilingual_center(d, (cx, box[1] + 85), se, sz, F.s, F.zxs, MUTED, MUTED, gap=1)

    bi_foot(
        d,
        F,
        "EMC is a layout discipline — not a sticker on the drive nameplate",
        "EMC 是布置纪律——不是驱动铭牌贴纸",
    )
    save_png(im, "knowledge-encl-segregation.png")


# ---------------------------------------------------------------------------
# 4. Cable routing
# ---------------------------------------------------------------------------


def draw_routing():
    im, d = new_canvas()
    bi_title(d, F, "Cable trays, ties & bend radius", "线槽、扎带与弯曲半径")

    panels = [
        (
            (40, 70, 340, 470),
            BLUE,
            LIGHT_BLUE,
            "Trays & ducts",
            "线槽与线管",
            [
                ("Size for fill & heat", "按填充与发热选型"),
                ("Separate power / signal", "动力/信号分层"),
                ("Grommet sharp edges", "锐边加护套"),
            ],
        ),
        (
            (362, 70, 662, 470),
            ORANGE,
            LIGHT_ORANGE,
            "Ties & strain relief",
            "扎带与应变消除",
            [
                ("Support before glands", "接头前先支撑"),
                ("Do not crush braid", "勿勒扁屏蔽层"),
                ("UV-stable outdoors", "室外用耐紫外"),
            ],
        ),
        (
            (684, 70, 984, 470),
            PURPLE,
            LIGHT_PURPLE,
            "Bend radius",
            "弯曲半径",
            [
                ("Respect OEM minima", "遵守厂家最小值"),
                ("Service loops at mates", "重插处留余长"),
                ("Forced bends → faults", "强弯 → 间歇故障"),
            ],
        ),
    ]
    for box, col, fill, en, zh, lines in panels:
        round_rect(d, box, 14, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 45), en, zh, F.h, F.zh, col, col, gap=2)
        # glyph
        gy = box[1] + 120
        if col == BLUE:
            d.rectangle([cx - 55, gy - 15, cx + 55, gy + 25], outline=col, width=3)
            for dx in (-30, 0, 30):
                d.line([(cx + dx, gy - 5), (cx + dx, gy + 15)], fill=ORANGE if dx < 0 else BLUE, width=3)
        elif col == ORANGE:
            d.line([(cx - 50, gy), (cx + 50, gy)], fill=col, width=4)
            for dx in (-25, 0, 25):
                d.ellipse([cx + dx - 6, gy - 6, cx + dx + 6, gy + 6], outline=MUTED, width=2)
        else:
            # bend arc
            d.arc([cx - 40, gy - 30, cx + 40, gy + 50], 200, 340, fill=col, width=4)
            bilingual_center(d, (cx, gy + 55), "Rmin", "最小半径", F.xs, F.zxs, col, col, gap=1)

        y = box[1] + 230
        for se, sz in lines:
            bilingual_center(d, (cx, y), se, sz, F.s, F.zs, INK, MUTED, gap=2)
            y += 50

    bi_foot(
        d,
        F,
        "Over-tight ties and undersized radii crack conductors after transport",
        "扎带过紧与半径过小会在运输后裂芯",
    )
    save_png(im, "knowledge-encl-routing.png")


def main():
    global F
    F = Fonts()
    assert IMAGES_OUT and W and H and BG
    draw_role()
    draw_frame()
    draw_segregation()
    draw_routing()
    print(f"done — {W}×{H} → {IMAGES_OUT}")


if __name__ == "__main__":
    main()
