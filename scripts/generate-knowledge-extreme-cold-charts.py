#!/usr/bin/env python3
"""Generate extreme-cold knowledge charts with bilingual labels (English primary / Chinese secondary).

Outputs (same paths as before):
  public/images/knowledge-co2-heating-demand-vs-output.png
  public/images/knowledge-extreme-cold-15yr-lifecycle-cost.png
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from diagram_style import (  # noqa: E402
    IMAGES_OUT,
    bilingual_center,
    font_cjk,
    font_latin,
    require_cjk_font,
    text_center,
)

OUT = IMAGES_OUT

# Dark tech theme
BG = (8, 28, 58)
GRID = (30, 55, 95)
INK = (230, 238, 250)
MUTED = (160, 175, 200)
ORANGE = (255, 140, 40)
BLUE = (70, 160, 255)
GREY = (150, 160, 175)
RED = (220, 70, 70)
GREEN = (60, 200, 120)
GOLD = (240, 190, 60)
PANEL = (12, 36, 72)
PANEL_EDGE = (40, 80, 130)

F_TITLE = F_H = F_B = F_N = F_S = F_XS = None
FZ_TITLE = FZ_H = FZ_B = FZ_N = FZ_S = FZ_XS = None


def _init_fonts() -> None:
    global F_TITLE, F_H, F_B, F_N, F_S, F_XS
    global FZ_TITLE, FZ_H, FZ_B, FZ_N, FZ_S, FZ_XS
    require_cjk_font()
    F_TITLE = font_latin(22, True)
    F_H = font_latin(16, True)
    F_B = font_latin(14, True)
    F_N = font_latin(12)
    F_S = font_latin(11)
    F_XS = font_latin(10)
    FZ_TITLE = font_cjk(14)
    FZ_H = font_cjk(12)
    FZ_B = font_cjk(11)
    FZ_N = font_cjk(10)
    FZ_S = font_cjk(9)
    FZ_XS = font_cjk(8)


def save(im: Image.Image, name: str) -> None:
    path = OUT / name
    im.save(path, "PNG", optimize=True)
    print("wrote", name)


def round_rect(draw, xy, r, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)


def draw_polyline(draw, pts, color, width=3):
    if len(pts) < 2:
        return
    draw.line(pts, fill=color, width=width)


def lerp(a, b, t):
    return a + (b - a) * t


# ---------------------------------------------------------------------------
# Chart 1: Heating demand vs equipment output
# ---------------------------------------------------------------------------


def draw_heating_demand_chart():
    W, H = 1024, 739
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    bilingual_center(
        d,
        (W / 2, 36),
        "Heating load vs heat-pump output (ambient)",
        "供热负荷与热泵出力（环境温度）",
        F_TITLE,
        FZ_TITLE,
        INK,
        MUTED,
        gap=2,
    )

    # Plot area
    L, R, T, B = 90, 960, 100, 620
    plot_w, plot_h = R - L, B - T

    # Grid
    for i in range(6):
        y = T + i * plot_h / 5
        d.line([(L, y), (R, y)], fill=GRID, width=1)
    for i in range(7):
        x = L + i * plot_w / 6
        d.line([(x, T), (x, B)], fill=GRID, width=1)

    d.rectangle([L, T, R, B], outline=PANEL_EDGE, width=2)

    # X axis: +10 … −40 (left to right)
    temps = [10, 0, -10, -20, -30, -40]
    for i, t in enumerate(temps):
        x = L + i * plot_w / 5
        d.line([(x, B), (x, B + 6)], fill=MUTED, width=1)
        text_center(d, (x, B + 18), f"{'+' if t > 0 else ''}{t}", F_S, MUTED)

    bilingual_center(
        d,
        ((L + R) / 2, B + 48),
        "Ambient temperature (°C)",
        "环境温度 (°C)",
        F_N,
        FZ_S,
        MUTED,
        MUTED,
        gap=1,
    )

    # Y label (rotated via vertical text approximation: stacked)
    bilingual_center(
        d,
        (42, (T + B) / 2),
        "Load / output",
        "负荷 / 出力",
        F_N,
        FZ_S,
        MUTED,
        MUTED,
        gap=2,
    )

    def x_of(temp: float) -> float:
        # temp from +10 to -40
        return L + (10 - temp) / 50 * plot_w

    def y_of(frac: float) -> float:
        # frac 0..1 bottom to top of "relative" scale
        return B - frac * plot_h * 0.88

    # Curves (schematic, matching prior narrative)
    # Orange: building/industrial load rises as colder
    load_pts = []
    for t in range(10, -41, -1):
        # ~0.35 at +10 -> ~0.95 at -40
        f = 0.32 + (10 - t) / 50 * 0.62
        load_pts.append((x_of(t), y_of(f)))

    # Blue: 150 kW extreme-cold unit - gentle decline
    blue_pts = []
    for t in range(10, -41, -1):
        f = 0.78 - (10 - t) / 50 * 0.18  # still high at -40
        blue_pts.append((x_of(t), y_of(f)))

    # Grey: conventional cliff after -20
    grey_pts = []
    for t in range(10, -41, -1):
        if t >= -18:
            f = 0.72 - (10 - t) / 28 * 0.08
        else:
            # steep drop
            f = max(0.05, 0.62 - (-18 - t) / 22 * 0.55)
        grey_pts.append((x_of(t), y_of(f)))

    # Death zone hatch between load and grey for t <= -20
    death_poly = []
    for t in range(-20, -41, -1):
        f_load = 0.32 + (10 - t) / 50 * 0.62
        death_poly.append((x_of(t), y_of(f_load)))
    for t in range(-40, -19):
        if t >= -18:
            f = 0.72 - (10 - t) / 28 * 0.08
        else:
            f = max(0.05, 0.62 - (-18 - t) / 22 * 0.55)
        death_poly.append((x_of(t), y_of(f)))
    if len(death_poly) > 3:
        # translucent-ish via darker red overlay
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.polygon(death_poly, fill=(180, 40, 40, 55))
        # hatch lines
        x0, x1 = x_of(-20), x_of(-40)
        for i in range(0, 40):
            xx = x0 + (x1 - x0) * i / 40
            od.line([(xx, T + 20), (xx - 40, B - 20)], fill=(200, 60, 60, 40), width=1)
        im.paste(Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB"))
        d = ImageDraw.Draw(im)

    draw_polyline(d, load_pts, ORANGE, 4)
    draw_polyline(d, blue_pts, BLUE, 4)
    draw_polyline(d, grey_pts, GREY, 4)

    # Vertical dashed at -20
    x_m20 = x_of(-20)
    for y in range(int(T), int(B), 10):
        d.line([(x_m20, y), (x_m20, min(y + 5, B))], fill=ORANGE, width=1)

    # Curve labels (keep both EN/ZH inside the plot)
    bilingual_center(
        d,
        (x_of(-28), y_of(0.84)),
        "Building & industrial heating load rises",
        "建筑与工业热负荷剧增",
        F_S,
        FZ_XS,
        ORANGE,
        ORANGE,
        gap=1,
    )
    bilingual_center(
        d,
        (x_of(-5), y_of(0.88)),
        "150 kW-class extreme-cold unit",
        "150 kW 级极寒机组",
        F_S,
        FZ_XS,
        BLUE,
        BLUE,
        gap=1,
    )
    bilingual_center(
        d,
        (x_of(4), y_of(0.48)),
        "Conventional HP (R32/R410A) cliff",
        "常规热泵 (R32/R410A) 衰减断崖",
        F_S,
        FZ_XS,
        GREY,
        GREY,
        gap=1,
    )

    # Callout: 70% at -40
    round_rect(d, (620, 120, 940, 190), 8, PANEL, BLUE, 1)
    bilingual_center(
        d,
        (780, 155),
        "At −40 °C still ~70% of −20 °C capacity",
        "在 −40 °C 环温下仍约有 −20 °C 制热量的 70%",
        F_S,
        FZ_XS,
        INK,
        MUTED,
        gap=2,
    )
    # pointer
    d.line([(700, 190), (x_of(-40) + 20, y_of(0.62))], fill=BLUE, width=1)

    # Death zone label
    round_rect(d, (520, 480, 820, 555), 8, (40, 18, 28), RED, 1)
    # warning triangle
    tx, ty = 545, 515
    d.polygon([(tx, ty - 14), (tx - 12, ty + 10), (tx + 12, ty + 10)], outline=RED, fill=(80, 20, 20))
    d.text((tx - 3, ty - 10), "!", font=F_B, fill=RED)
    bilingual_center(
        d,
        (690, 518),
        "Extreme-cold vacuum (death zone)",
        "极寒真空地带（死亡区）",
        F_S,
        FZ_XS,
        RED,
        RED,
        gap=1,
    )

    bilingual_center(
        d,
        (W / 2, H - 28),
        "Schematic for teaching · not a certified performance map",
        "教学示意 · 非认证性能图谱",
        F_XS,
        FZ_XS,
        MUTED,
        MUTED,
        gap=1,
    )

    save(im, "knowledge-co2-heating-demand-vs-output.png")


# ---------------------------------------------------------------------------
# Chart 2: 15-year lifecycle cost
# ---------------------------------------------------------------------------


def draw_lifecycle_cost_chart():
    W, H = 1024, 557
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    bilingual_center(
        d,
        (W / 2, 28),
        "15-year total lifecycle cost in extreme cold (cumulative)",
        "极寒地区 15 年全生命周期总成本对比（累计费用）",
        F_TITLE,
        FZ_TITLE,
        INK,
        MUTED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 62),
        "Initial investment + operating electricity",
        "初投资 + 运行电费",
        F_S,
        FZ_XS,
        MUTED,
        MUTED,
        gap=1,
    )

    L, R, T, B = 70, 700, 95, 420
    plot_w, plot_h = R - L, B - T

    for i in range(6):
        y = T + i * plot_h / 5
        d.line([(L, y), (R, y)], fill=GRID, width=1)
    for i in range(16):
        x = L + i * plot_w / 15
        d.line([(x, T), (x, B)], fill=GRID, width=1)
    d.rectangle([L, T, R, B], outline=PANEL_EDGE, width=2)

    # Axes labels
    bilingual_center(d, (36, (T + B) / 2), "Cost (10k CNY)", "累计成本（万元）", F_XS, FZ_XS, MUTED, MUTED, gap=1)
    for i, v in enumerate([0, 500, 1000, 1500, 2000, 2500]):
        y = B - i * plot_h / 5
        text_center(d, (L - 22, y), str(v), F_XS, MUTED)
    for yr in range(0, 16, 3):
        x = L + yr * plot_w / 15
        text_center(d, (x, B + 14), str(yr), F_XS, MUTED)
    bilingual_center(d, ((L + R) / 2, B + 36), "Operating year", "运行年份", F_S, FZ_XS, MUTED, MUTED, gap=1)

    def xy(year: float, cost_wan: float):
        return (L + year / 15 * plot_w, B - cost_wan / 2500 * plot_h)

    # Series: CO2 green, electric boiler red dashed, cascade grey stops ~3.5
    # Capex: CO2 160, boiler 13.5, cascade 55; end: CO2 1120, boiler 2265
    co2 = [xy(y, 160 + (1120 - 160) * y / 15) for y in range(0, 16)]
    boiler = [xy(y, 13.5 + (2265 - 13.5) * y / 15) for y in range(0, 16)]
    cascade = [xy(y, 55 + (400 - 55) * y / 3.5) for y in [0, 1, 2, 3, 3.5]]

    # Fill savings band between boiler and co2 from year ~3 to 15
    cross_yr = 3.0
    band = []
    for y in range(3, 16):
        band.append(xy(y, 160 + (1120 - 160) * y / 15))
    for y in range(15, 2, -1):
        band.append(xy(y, 13.5 + (2265 - 13.5) * y / 15))
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.polygon(band, fill=(40, 160, 90, 45))
    im = Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB")
    d = ImageDraw.Draw(im)

    draw_polyline(d, co2, GREEN, 3)
    # dashed boiler
    for i in range(0, len(boiler) - 1):
        p1, p2 = boiler[i], boiler[i + 1]
        # short dashes
        segs = 4
        for s in range(segs):
            if s % 2 == 0:
                a = (lerp(p1[0], p2[0], s / segs), lerp(p1[1], p2[1], s / segs))
                b = (lerp(p1[0], p2[0], (s + 1) / segs), lerp(p1[1], p2[1], (s + 1) / segs))
                d.line([a, b], fill=RED, width=3)
    draw_polyline(d, cascade, GREY, 3)

    # STOP on cascade
    sx, sy = cascade[-1]
    d.ellipse([sx - 14, sy - 14, sx + 14, sy + 14], fill=RED, outline=INK, width=2)
    text_center(d, (sx, sy), "STOP", F_XS, INK)

    # Legend
    round_rect(d, (80, 100, 380, 190), 8, PANEL, PANEL_EDGE, 1)
    d.line([(95, 118), (130, 118)], fill=GREEN, width=3)
    bilingual_center(d, (250, 118), "CO₂ heat pump", "CO₂ 热泵", F_S, FZ_XS, INK, MUTED, gap=1)
    d.line([(95, 145), (105, 145), (115, 145), (130, 145)], fill=RED, width=3)
    bilingual_center(d, (255, 145), "Electric boiler", "电锅炉", F_S, FZ_XS, INK, MUTED, gap=1)
    d.line([(95, 172), (130, 172)], fill=GREY, width=3)
    bilingual_center(d, (270, 172), "Conventional cascade HP", "常规复叠热泵", F_S, FZ_XS, INK, MUTED, gap=1)

    # End markers
    bilingual_center(d, (xy(15, 1120)[0] - 40, xy(15, 1120)[1] - 18), "11.20 M", "1120 万", F_S, FZ_XS, GREEN, GREEN, gap=1)
    bilingual_center(d, (xy(15, 2265)[0] - 40, xy(15, 2265)[1] - 18), "22.65 M", "2265 万", F_S, FZ_XS, RED, RED, gap=1)
    bilingual_center(d, (xy(0, 160)[0] + 50, xy(0, 160)[1] - 12), "1.60 M start", "160 万初投", F_XS, FZ_XS, GREEN, GREEN, gap=1)
    bilingual_center(d, (xy(0, 13.5)[0] + 55, xy(0, 13.5)[1] + 14), "0.135 M start", "13.5 万初投", F_XS, FZ_XS, RED, RED, gap=1)

    # Golden cross
    cx, cy = xy(cross_yr, 160 + (1120 - 160) * cross_yr / 15)
    d.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=GOLD, outline=INK)
    bilingual_center(
        d,
        (cx + 90, cy - 28),
        "Golden cross (~3 yr payback)",
        "黄金交叉点（约 3 年回本）",
        F_S,
        FZ_XS,
        GOLD,
        GOLD,
        gap=1,
    )

    # Savings label
    bilingual_center(
        d,
        (xy(10, 1400)[0], xy(10, 1400)[1]),
        "Sustained savings (~11.45 M over 15 yr)",
        "持续对比收益（15 年约省 1145 万）",
        F_S,
        FZ_XS,
        GREEN,
        GREEN,
        gap=1,
    )

    # Cascade note
    bilingual_center(
        d,
        (sx - 20, sy + 36),
        "0.55 M start · fails below −25 °C",
        "55 万初投 · −25 °C 以下宕机",
        F_XS,
        FZ_XS,
        GREY,
        GREY,
        gap=1,
    )

    # Expert panel
    round_rect(d, (720, 95, 1000, 420), 10, PANEL, GREEN, 2)
    bilingual_center(d, (860, 120), "Expert takeaway", "专家核心解读", F_H, FZ_H, GREEN, GREEN, gap=2)
    # Wrapped body — draw as stacked bilingual short lines
    lines = [
        ("CO₂ HP costs more upfront,", "CO₂ 热泵初投资较高，"),
        ("but extreme-cold efficiency", "但在极寒工况能效高，"),
        ("closes the boiler gap in ~3 years,", "约 3 年抹平与电锅炉差价，"),
        ("then compounds savings for 12 more.", "其后 12 年持续产生节能收益。"),
        ("", ""),
        ("Conventional cascade (R410A/R32)", "常规复叠 (R410A/R32)"),
        ("fits cold regions better than", "更适于寒冷地区，"),
        ("true extreme cold vs CO₂ cascade.", "极寒稳定性不及 CO₂ 复叠。"),
    ]
    y = 155
    for en, zh in lines:
        if not en:
            y += 10
            continue
        text_center(d, (860, y), en, F_XS, INK)
        y += 14
        text_center(d, (860, y), zh, FZ_XS, MUTED)
        y += 18

    bilingual_center(
        d,
        (W / 2, H - 22),
        "Note: estimates for a 1 steam-ton scale under stated conditions · reference only",
        "注：按 1 蒸吨规模与特定工况估算，仅供参考",
        F_XS,
        FZ_XS,
        MUTED,
        MUTED,
        gap=1,
    )

    save(im, "knowledge-extreme-cold-15yr-lifecycle-cost.png")


def main():
    _init_fonts()
    OUT.mkdir(parents=True, exist_ok=True)
    draw_heating_demand_chart()
    draw_lifecycle_cost_chart()
    print("ALL DONE ->", OUT)


if __name__ == "__main__":
    main()
