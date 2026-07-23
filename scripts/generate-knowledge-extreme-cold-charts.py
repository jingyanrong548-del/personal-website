#!/usr/bin/env python3
"""Generate extreme-cold knowledge charts as monolingual EN and ZH variants.

Outputs:
  public/images/knowledge-co2-heating-demand-vs-output.png
  public/images/knowledge-co2-heating-demand-vs-output.zh.png
  public/images/knowledge-extreme-cold-15yr-lifecycle-cost.png
  public/images/knowledge-extreme-cold-15yr-lifecycle-cost.zh.png
"""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Literal

from PIL import Image, ImageDraw, ImageFont

sys.path.insert(0, str(Path(__file__).resolve().parent))

from diagram_style import (  # noqa: E402
    IMAGES_OUT,
    font_cjk,
    font_latin,
    require_cjk_font,
    text_center,
)

OUT = IMAGES_OUT
Lang = Literal["en", "zh"]

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

# EN fonts
F_TITLE = F_H = F_B = F_N = F_S = F_XS = None
# ZH fonts (slightly larger than old bilingual secondary)
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
    FZ_TITLE = font_cjk(18)
    FZ_H = font_cjk(15)
    FZ_B = font_cjk(13)
    FZ_N = font_cjk(12)
    FZ_S = font_cjk(11)
    FZ_XS = font_cjk(10)


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


def label(
    draw,
    xy,
    en: str,
    zh: str,
    lang: Lang,
    f_en: ImageFont.ImageFont,
    f_zh: ImageFont.ImageFont,
    fill,
) -> None:
    if lang == "en":
        text_center(draw, xy, en, f_en, fill)
    else:
        text_center(draw, xy, zh, f_zh, fill)


def out_name(base: str, lang: Lang) -> str:
    return f"{base}.zh.png" if lang == "zh" else f"{base}.png"


# ---------------------------------------------------------------------------
# Chart 1: Heating demand vs equipment output
# ---------------------------------------------------------------------------


def draw_heating_demand_chart(lang: Lang) -> None:
    W, H = 1024, 739
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    label(
        d,
        (W / 2, 36),
        "Heating load vs heat-pump output (ambient)",
        "供热负荷与热泵出力（环境温度）",
        lang,
        F_TITLE,
        FZ_TITLE,
        INK,
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

    # X axis: +10 … -40 (left to right)
    temps = [10, 0, -10, -20, -30, -40]
    for i, t in enumerate(temps):
        x = L + i * plot_w / 5
        d.line([(x, B), (x, B + 6)], fill=MUTED, width=1)
        text_center(d, (x, B + 18), f"{'+' if t > 0 else ''}{t}", F_S, MUTED)

    label(
        d,
        ((L + R) / 2, B + 48),
        "Ambient temperature (°C)",
        "环境温度 (°C)",
        lang,
        F_N,
        FZ_N,
        MUTED,
    )

    label(
        d,
        (42, (T + B) / 2),
        "Load / output",
        "负荷 / 出力",
        lang,
        F_N,
        FZ_N,
        MUTED,
    )

    def x_of(temp: float) -> float:
        return L + (10 - temp) / 50 * plot_w

    def y_of(frac: float) -> float:
        return B - frac * plot_h * 0.88

    load_pts = []
    for t in range(10, -41, -1):
        f = 0.32 + (10 - t) / 50 * 0.62
        load_pts.append((x_of(t), y_of(f)))

    blue_pts = []
    for t in range(10, -41, -1):
        f = 0.78 - (10 - t) / 50 * 0.18
        blue_pts.append((x_of(t), y_of(f)))

    grey_pts = []
    for t in range(10, -41, -1):
        if t >= -18:
            f = 0.72 - (10 - t) / 28 * 0.08
        else:
            f = max(0.05, 0.62 - (-18 - t) / 22 * 0.55)
        grey_pts.append((x_of(t), y_of(f)))

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
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.polygon(death_poly, fill=(180, 40, 40, 55))
        x0, x1 = x_of(-20), x_of(-40)
        for i in range(0, 40):
            xx = x0 + (x1 - x0) * i / 40
            od.line([(xx, T + 20), (xx - 40, B - 20)], fill=(200, 60, 60, 40), width=1)
        im.paste(Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB"))
        d = ImageDraw.Draw(im)

    draw_polyline(d, load_pts, ORANGE, 4)
    draw_polyline(d, blue_pts, BLUE, 4)
    draw_polyline(d, grey_pts, GREY, 4)

    x_m20 = x_of(-20)
    for y in range(int(T), int(B), 10):
        d.line([(x_m20, y), (x_m20, min(y + 5, B))], fill=ORANGE, width=1)

    label(
        d,
        (x_of(-28), y_of(0.84)),
        "Building & industrial heating load rises",
        "建筑与工业热负荷剧增",
        lang,
        F_S,
        FZ_S,
        ORANGE,
    )
    label(
        d,
        (x_of(-5), y_of(0.88)),
        "150 kW-class extreme-cold unit",
        "150 kW 级极寒机组",
        lang,
        F_S,
        FZ_S,
        BLUE,
    )
    label(
        d,
        (x_of(4), y_of(0.48)),
        "Conventional HP (R32/R410A) cliff",
        "常规热泵 (R32/R410A) 衰减断崖",
        lang,
        F_S,
        FZ_S,
        GREY,
    )

    round_rect(d, (620, 120, 940, 190), 8, PANEL, BLUE, 1)
    label(
        d,
        (780, 155),
        "At -40 °C still ~70% of -20 °C capacity",
        "在 -40 °C 环温下仍约有 -20 °C 制热量的 70%",
        lang,
        F_S,
        FZ_S,
        INK,
    )
    d.line([(700, 190), (x_of(-40) + 20, y_of(0.62))], fill=BLUE, width=1)

    round_rect(d, (520, 480, 820, 555), 8, (40, 18, 28), RED, 1)
    tx, ty = 545, 515
    d.polygon([(tx, ty - 14), (tx - 12, ty + 10), (tx + 12, ty + 10)], outline=RED, fill=(80, 20, 20))
    d.text((tx - 3, ty - 10), "!", font=F_B, fill=RED)
    label(
        d,
        (690, 518),
        "Extreme-cold vacuum (death zone)",
        "极寒真空地带（死亡区）",
        lang,
        F_S,
        FZ_S,
        RED,
    )

    label(
        d,
        (W / 2, H - 28),
        "Schematic for teaching · not a certified performance map",
        "教学示意 · 非认证性能图谱",
        lang,
        F_XS,
        FZ_XS,
        MUTED,
    )

    save(im, out_name("knowledge-co2-heating-demand-vs-output", lang))


# ---------------------------------------------------------------------------
# Chart 2: 15-year lifecycle cost
# ---------------------------------------------------------------------------


def draw_lifecycle_cost_chart(lang: Lang) -> None:
    W, H = 1024, 557
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    label(
        d,
        (W / 2, 28),
        "15-year total lifecycle cost in extreme cold (cumulative)",
        "极寒地区 15 年全生命周期总成本对比（累计费用）",
        lang,
        F_TITLE,
        FZ_TITLE,
        INK,
    )
    label(
        d,
        (W / 2, 62),
        "Initial investment + operating electricity",
        "初投资 + 运行电费",
        lang,
        F_S,
        FZ_S,
        MUTED,
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

    label(d, (36, (T + B) / 2), "Cost (10k CNY)", "累计成本（万元）", lang, F_XS, FZ_XS, MUTED)
    for i, v in enumerate([0, 500, 1000, 1500, 2000, 2500]):
        y = B - i * plot_h / 5
        text_center(d, (L - 22, y), str(v), F_XS, MUTED)
    for yr in range(0, 16, 3):
        x = L + yr * plot_w / 15
        text_center(d, (x, B + 14), str(yr), F_XS, MUTED)
    label(d, ((L + R) / 2, B + 36), "Operating year", "运行年份", lang, F_S, FZ_S, MUTED)

    def xy(year: float, cost_wan: float):
        return (L + year / 15 * plot_w, B - cost_wan / 2500 * plot_h)

    co2 = [xy(y, 160 + (1120 - 160) * y / 15) for y in range(0, 16)]
    boiler = [xy(y, 13.5 + (2265 - 13.5) * y / 15) for y in range(0, 16)]
    cascade = [xy(y, 55 + (400 - 55) * y / 3.5) for y in [0, 1, 2, 3, 3.5]]

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
    for i in range(0, len(boiler) - 1):
        p1, p2 = boiler[i], boiler[i + 1]
        segs = 4
        for s in range(segs):
            if s % 2 == 0:
                a = (lerp(p1[0], p2[0], s / segs), lerp(p1[1], p2[1], s / segs))
                b = (lerp(p1[0], p2[0], (s + 1) / segs), lerp(p1[1], p2[1], (s + 1) / segs))
                d.line([a, b], fill=RED, width=3)
    draw_polyline(d, cascade, GREY, 3)

    sx, sy = cascade[-1]
    d.ellipse([sx - 14, sy - 14, sx + 14, sy + 14], fill=RED, outline=INK, width=2)
    text_center(d, (sx, sy), "STOP", F_XS, INK)

    round_rect(d, (80, 100, 380, 190), 8, PANEL, PANEL_EDGE, 1)
    d.line([(95, 118), (130, 118)], fill=GREEN, width=3)
    label(d, (250, 118), "CO2 heat pump", "CO2 热泵", lang, F_S, FZ_S, INK)
    d.line([(95, 145), (105, 145), (115, 145), (130, 145)], fill=RED, width=3)
    label(d, (255, 145), "Electric boiler", "电锅炉", lang, F_S, FZ_S, INK)
    d.line([(95, 172), (130, 172)], fill=GREY, width=3)
    label(d, (270, 172), "Conventional cascade HP", "常规复叠热泵", lang, F_S, FZ_S, INK)

    label(d, (xy(15, 1120)[0] - 40, xy(15, 1120)[1] - 18), "11.20 M", "1120 万", lang, F_S, FZ_S, GREEN)
    label(d, (xy(15, 2265)[0] - 40, xy(15, 2265)[1] - 18), "22.65 M", "2265 万", lang, F_S, FZ_S, RED)
    label(d, (xy(0, 160)[0] + 50, xy(0, 160)[1] - 12), "1.60 M start", "160 万初投", lang, F_XS, FZ_XS, GREEN)
    label(d, (xy(0, 13.5)[0] + 55, xy(0, 13.5)[1] + 14), "0.135 M start", "13.5 万初投", lang, F_XS, FZ_XS, RED)

    cx, cy = xy(cross_yr, 160 + (1120 - 160) * cross_yr / 15)
    d.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=GOLD, outline=INK)
    label(
        d,
        (cx + 90, cy - 28),
        "Golden cross (~3 yr payback)",
        "黄金交叉点（约 3 年回本）",
        lang,
        F_S,
        FZ_S,
        GOLD,
    )

    label(
        d,
        (xy(10, 1400)[0], xy(10, 1400)[1]),
        "Sustained savings (~11.45 M over 15 yr)",
        "持续对比收益（15 年约省 1145 万）",
        lang,
        F_S,
        FZ_S,
        GREEN,
    )

    label(
        d,
        (sx - 20, sy + 36),
        "0.55 M start · fails below -25 °C",
        "55 万初投 · -25 °C 以下宕机",
        lang,
        F_XS,
        FZ_XS,
        GREY,
    )

    round_rect(d, (720, 95, 1000, 420), 10, PANEL, GREEN, 2)
    label(d, (860, 120), "Expert takeaway", "专家核心解读", lang, F_H, FZ_H, GREEN)

    lines_en = [
        "CO2 HP costs more upfront,",
        "but extreme-cold efficiency",
        "closes the boiler gap in ~3 years,",
        "then compounds savings for 12 more.",
        "",
        "Conventional cascade (R410A/R32)",
        "fits cold regions better than",
        "true extreme cold vs CO2 cascade.",
    ]
    lines_zh = [
        "CO2 热泵初投资较高，",
        "但在极寒工况能效高，",
        "约 3 年抹平与电锅炉差价，",
        "其后 12 年持续产生节能收益。",
        "",
        "常规复叠 (R410A/R32)",
        "更适于寒冷地区，",
        "极寒稳定性不及 CO2 复叠。",
    ]
    lines = lines_en if lang == "en" else lines_zh
    f_body = F_XS if lang == "en" else FZ_XS
    line_gap = 22 if lang == "en" else 26
    y = 155
    for line in lines:
        if not line:
            y += 10
            continue
        text_center(d, (860, y), line, f_body, INK)
        y += line_gap

    label(
        d,
        (W / 2, H - 22),
        "Note: estimates for a 1 steam-ton scale under stated conditions · reference only",
        "注：按 1 蒸吨规模与特定工况估算，仅供参考",
        lang,
        F_XS,
        FZ_XS,
        MUTED,
    )

    save(im, out_name("knowledge-extreme-cold-15yr-lifecycle-cost", lang))


def main():
    _init_fonts()
    OUT.mkdir(parents=True, exist_ok=True)
    for lang in ("en", "zh"):
        draw_heating_demand_chart(lang)  # type: ignore[arg-type]
        draw_lifecycle_cost_chart(lang)  # type: ignore[arg-type]
    print("ALL DONE ->", OUT)


if __name__ == "__main__":
    main()
