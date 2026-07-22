#!/usr/bin/env python3
"""Generate knowledge-ref-*.png — refrigerant history / policy diagrams (EN/ZH), 1024×576."""

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
    bi_title,
    bilingual_center,
    new_canvas,
    round_rect,
    save_png,
    text_center,
)

assert (W, H) == (1024, 576)


def arrow(draw, p1, p2, color=INK, width=3):
    draw.line([p1, p2], fill=color, width=width)
    x1, y1 = p1
    x2, y2 = p2
    ang = math.atan2(y2 - y1, x2 - x1)
    L = 10
    a1 = (x2 - L * math.cos(ang - 0.4), y2 - L * math.sin(ang - 0.4))
    a2 = (x2 - L * math.cos(ang + 0.4), y2 - L * math.sin(ang + 0.4))
    draw.polygon([p2, a1, a2], fill=color)


# ---------------------------------------------------------------------------
# 1. Generations timeline
# ---------------------------------------------------------------------------


def draw_timeline(F: Fonts):
    im, d = new_canvas()
    bi_title(d, F, "Refrigerant generations — a parallel timeline", "制冷剂代际——并行时间线")

    eras = [
        ("Natural", "天然工质", "1830s–today", "1830s–今", "NH3 · CO2 · H2O", "NH3 · CO2 · H2O", TEAL, LIGHT_BLUE),
        ("1st CFC", "第1代 CFC", "1930s–1990s", "1930s–1990s", "R11 · R12", "R11 · R12", RED, LIGHT_RED),
        ("2nd HCFC", "第2代 HCFC", "1990s–2020s", "1990s–2020s", "R22 · R123", "R22 · R123", ORANGE, LIGHT_ORANGE),
        ("3rd HFC", "第3代 HFC", "1990s–today", "1990s–今", "R134a · R410A", "R134a · R410A", PURPLE, LIGHT_PURPLE),
        ("4th HFO", "第4代 HFO", "2010s–today", "2010s–今", "R32 · R1234yf", "R32 · R1234yf", GREEN, LIGHT_GREEN),
        ("Natural↑", "天然回潮", "2000s–future", "2000s–未来", "R744 · R290", "R744 · R290", BLUE, LIGHT_BLUE),
    ]
    n = len(eras)
    gap = 10
    x0, y0, y1 = 28, 78, 340
    cw = (W - 2 * x0 - (n - 1) * gap) / n
    for i, (en, zh, ee, ez, fe, fz, col, fill) in enumerate(eras):
        x = x0 + i * (cw + gap)
        box = (x, y0, x + cw, y1)
        round_rect(d, box, 12, fill, col, 3)
        cx = x + cw / 2
        bilingual_center(d, (cx, y0 + 36), en, zh, F.b, F.zb, col, col, gap=2)
        bilingual_center(d, (cx, y0 + 110), ee, ez, F.xs, F.zxs, MUTED, MUTED, gap=1)
        bilingual_center(d, (cx, y0 + 190), fe, fz, F.s, F.zs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, y0 + 260), "ODP / GWP", "ODP / GWP", F.xs, F.zxs, MUTED, MUTED, gap=1)

    # Axis + treaty markers
    d.line([(40, 400), (984, 400)], fill=GRID, width=3)
    markers = [
        (120, "Montreal", "蒙特利尔", "1987", BLUE),
        (380, "Kyoto", "京都", "1997", PURPLE),
        (620, "Paris", "巴黎", "2015", GREEN),
        (820, "Kigali", "基加利", "2016", ORANGE),
    ]
    for x, en, zh, yr, col in markers:
        d.ellipse([x - 6, 394, x + 6, 406], fill=col)
        d.line([(x, 400), (x, 430)], fill=col, width=2)
        bilingual_center(d, (x, 455), f"{en} {yr}", zh, F.xs, F.zxs, col, col, gap=1)

    bi_foot(
        d,
        F,
        "Generations overlap — natural fluids never left industrial refrigeration",
        "代际重叠——天然工质从未离开工业制冷",
    )
    save_png(im, "knowledge-ref-timeline.png")


# ---------------------------------------------------------------------------
# 2. GWP landscape
# ---------------------------------------------------------------------------


def draw_gwp(F: Fonts):
    im, d = new_canvas()
    bi_title(d, F, "GWP landscape for heat-pump fluids", "热泵工质 GWP 版图（示意）")

    # Axes
    ox, oy, ax, ay = 90, 470, 700, 360
    d.line([(ox, oy), (ox, oy - ay)], fill=INK, width=2)
    d.line([(ox, oy), (ox + ax, oy)], fill=INK, width=2)
    text_center(d, (ox - 36, oy - ay / 2), "GWP", F.s, MUTED)
    bilingual_center(d, (ox + ax / 2, oy + 28), "Application temperature / lift →", "应用温度 / 温升 →", F.s, F.zxs, MUTED, MUTED, gap=1)

    bands = [
        (oy - 70, GREEN, LIGHT_GREEN, "GWP ≤ ~10", "GWP ≤ ~10", "Naturals · many HFOs", "天然工质 · 多数 HFO"),
        (oy - 180, BLUE, LIGHT_BLUE, "GWP ~100–750", "GWP ~100–750", "R32 · R454B / C", "R32 · R454B / C"),
        (oy - 300, ORANGE, LIGHT_ORANGE, "GWP ~1000–4000+", "GWP ~1000–4000+", "Legacy HFCs (R410A…)", "传统 HFC（R410A…）"),
    ]
    for y_mid, col, fill, en, zh, ne, nz in bands:
        y0, y1 = y_mid - 40, y_mid + 40
        round_rect(d, (ox + 20, y0, ox + ax - 20, y1), 10, fill, col, 2)
        bilingual_center(d, (ox + 160, y_mid), en, zh, F.b, F.zb, col, col, gap=1)
        bilingual_center(d, (ox + 480, y_mid), ne, nz, F.s, F.zs, INK, MUTED, gap=1)

    # Transition arrows
    arrow(d, (ox + ax + 20, oy - 300), (ox + ax + 20, oy - 70), GREEN, 3)
    bilingual_center(d, (ox + ax + 70, oy - 185), "Transition", "切换方向", F.xs, F.zxs, GREEN, GREEN, gap=1)

    # Side callouts
    callouts = [
        (860, 120, RED, "Comfort HP", "舒适热泵", "R410A → R32/R454"),
        (860, 250, PURPLE, "Industrial / HTHP", "工业 / 高温", "CO2 · NH3 · HFO"),
        (860, 380, GOLD, "PFAS watch", "PFAS 关注", "HFO chemistry risk"),
    ]
    for cx, cy, col, en, zh, note in callouts:
        round_rect(d, (cx - 90, cy - 48, cx + 90, cy + 48), 10, CARD, col, 2)
        bilingual_center(d, (cx, cy - 16), en, zh, F.s, F.zs, col, col, gap=1)
        text_center(d, (cx, cy + 22), note, F.xs, MUTED)

    bi_foot(
        d,
        F,
        "Schematic only — use ASHRAE Std 34 / property table for project GWP",
        "仅示意——项目 GWP 以 ASHRAE Std 34 / 物性表为准",
    )
    save_png(im, "knowledge-ref-gwp-landscape.png")


# ---------------------------------------------------------------------------
# 3. Policy framework map
# ---------------------------------------------------------------------------


def draw_policy(F: Fonts):
    im, d = new_canvas()
    bi_title(d, F, "International policy map for refrigerants", "制冷剂国际政策地图")

    # Direct regulators
    bilingual_center(d, (W / 2, 72), "Direct refrigerant law", "直接规制制冷剂", F.h, F.zh, RED, RED, gap=2)
    directs = [
        (180, 200, "Montreal Protocol", "蒙特利尔议定书", "1987 · ODS phase-out", "1987 · 淘汰 ODS", RED, LIGHT_RED),
        (520, 200, "Kigali Amendment", "基加利修正案", "2016 · HFC phasedown", "2016 · HFC 削减", ORANGE, LIGHT_ORANGE),
    ]
    for cx, cy, en, zh, ne, nz, col, fill in directs:
        round_rect(d, (cx - 150, cy - 70, cx + 150, cy + 70), 14, fill, col, 3)
        bilingual_center(d, (cx, cy - 28), en, zh, F.b, F.zb, col, col, gap=2)
        bilingual_center(d, (cx, cy + 28), ne, nz, F.s, F.zs, INK, MUTED, gap=1)

    d.line([(350, 200), (370, 200)], fill=GRID, width=3)
    arrow(d, (350, 200), (370, 200), GRID, 2)

    # Indirect climate drivers
    bilingual_center(d, (W / 2, 320), "Indirect climate drivers → heat-pump electrification", "间接气候驱动 → 热泵电气化", F.h, F.zh, BLUE, BLUE, gap=2)
    indirects = [
        (180, 430, "Kyoto Protocol", "京都议定书", "1997 · GHG targets", "1997 · 温室气体目标", PURPLE, LIGHT_PURPLE),
        (520, 430, "Paris Agreement", "巴黎协定", "2015 · NDCs / net-zero", "2015 · NDC / 净零", GREEN, LIGHT_GREEN),
        (860, 430, "National F-gas", "国内 F-gas", "EU · AIM · China MEE", "欧 · 美 AIM · 中国生态环境部", TEAL, (220, 242, 242)),
    ]
    for cx, cy, en, zh, ne, nz, col, fill in indirects:
        round_rect(d, (cx - 140, cy - 60, cx + 140, cy + 60), 12, fill, col, 3)
        bilingual_center(d, (cx, cy - 22), en, zh, F.b, F.zb, col, col, gap=2)
        bilingual_center(d, (cx, cy + 22), ne, nz, F.xs, F.zxs, INK, MUTED, gap=1)

    # Flow from climate to HP
    arrow(d, (350, 270), (350, 310), BLUE, 2)
    arrow(d, (520, 270), (520, 310), BLUE, 2)

    bi_foot(
        d,
        F,
        "Montreal + Kigali set fluid law; Kyoto/Paris set the electrification context",
        "蒙特利尔+基加利定工质法；京都/巴黎定电气化语境",
    )
    save_png(im, "knowledge-ref-policy-map.png")


# ---------------------------------------------------------------------------
# 4. Regional matrix China / EU / US
# ---------------------------------------------------------------------------


def draw_regions(F: Fonts):
    im, d = new_canvas()
    bi_title(d, F, "China · EU · US — three regulatory clocks", "中国 · 欧盟 · 美国——三套监管时钟")

    cols = [
        ("China", "中国", TEAL, LIGHT_BLUE, "Kigali A5", "基加利 A5", "MEE HFC quotas", "生态环境部配额", "Natural + CO2 stds", "天然工质 + CO2 标准"),
        ("EU", "欧盟", BLUE, LIGHT_BLUE, "F-gas 2024/573", "F-gas 2024/573", "GWP ≤750 splits '25", "分体机 GWP≤750", "REACH PFAS watch", "REACH PFAS 关注"),
        ("United States", "美国", PURPLE, LIGHT_PURPLE, "AIM Act", "AIM 法案", "EPA Tech Transition", "EPA 技术过渡", "CARB / state stricter", "加州等更严"),
    ]
    eras = [
        ("Past", "过去", "1987–2014"),
        ("Present", "现在", "2015–2025"),
        ("Future", "未来", "2026–2036+"),
    ]

    # Header row
    x0, y0 = 160, 78
    cw, rh = 270, 100
    for i, (en, zh, _) in enumerate(eras):
        bilingual_center(d, (x0 + i * cw + cw / 2, y0), en, zh, F.h, F.zh, MUTED, MUTED, gap=1)

    for r, (cen, czh, col, fill, p_en, p_zh, n_en, n_zh, f_en, f_zh) in enumerate(cols):
        y = 110 + r * (rh + 18)
        # Region label
        round_rect(d, (28, y, 148, y + rh), 10, fill, col, 3)
        bilingual_center(d, (88, y + rh / 2), cen, czh, F.b, F.zb, col, col, gap=2)
        cells = [(p_en, p_zh), (n_en, n_zh), (f_en, f_zh)]
        for i, (en, zh) in enumerate(cells):
            x = x0 + i * cw
            round_rect(d, (x + 6, y, x + cw - 6, y + rh), 10, CARD, col if i == 1 else GRID, 2)
            bilingual_center(d, (x + cw / 2, y + rh / 2), en, zh, F.s, F.zs, INK, MUTED, gap=2)

    bilingual_center(
        d,
        (W / 2, 480),
        "Never assume one global ban date — map destination market per SKU",
        "勿假设全球统一禁用日——按 SKU 映射目标市场",
        F.s,
        F.zs,
        MUTED,
        MUTED,
        gap=2,
    )
    bi_foot(
        d,
        F,
        "Orientation only — verify consolidated legal texts before contracts",
        "仅供定向——合同前请核对现行有效法规文本",
    )
    save_png(im, "knowledge-ref-regions-matrix.png")


def main():
    F = Fonts()
    draw_timeline(F)
    draw_gwp(F)
    draw_policy(F)
    draw_regions(F)
    print(f"done — {W}×{H} knowledge-ref-* → diagrams")


if __name__ == "__main__":
    main()
