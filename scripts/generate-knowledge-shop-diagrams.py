#!/usr/bin/env python3
"""Generate knowledge-shop-*.png — shop tools & test benches (EN/ZH), 1024×576."""

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
# 1. Shop tools bench
# ---------------------------------------------------------------------------


def draw_tools(F: Fonts):
    im, d = new_canvas()
    bi_title(d, F, "Shop tools for heat-pump assembly", "热泵装配车间核心工具")

    tools = [
        ("Vacuum pump", "真空泵", "& micron gauge", "与微米表", "Deep dry-down", "深度干燥", BLUE, LIGHT_BLUE),
        ("Charging", "充注机", "mass-based", "按质量", "Lot + target kg", "批次+目标质量", GREEN, LIGHT_GREEN),
        ("Leak detect", "检漏", "He / halogen / ΔP", "氦/卤素/压降", "Match threshold", "匹配阈值", ORANGE, LIGHT_ORANGE),
        ("Torque", "扭矩工具", "calibrated", "已校准", "Flare · flange · elec.", "扩口·法兰·电气", PURPLE, LIGHT_PURPLE),
    ]
    n = len(tools)
    gap = 16
    x0, y0, y1 = 36, 80, 420
    cw = (W - 2 * x0 - (n - 1) * gap) / n
    for i, (en, zh, se, sz, ne, nz, col, fill) in enumerate(tools):
        x = x0 + i * (cw + gap)
        box = (x, y0, x + cw, y1)
        round_rect(d, box, 14, fill, col, 3)
        cx = x + cw / 2
        # Simple icon block
        round_rect(d, (x + 28, y0 + 28, x + cw - 28, y0 + 130), 10, CARD, col, 2)
        if i == 0:  # pump cylinder
            d.rectangle([cx - 18, y0 + 50, cx + 18, y0 + 110], outline=col, width=2)
            d.ellipse([cx - 18, y0 + 44, cx + 18, y0 + 56], outline=col, width=2)
        elif i == 1:  # scale / bottle
            d.polygon([(cx - 20, y0 + 100), (cx + 20, y0 + 100), (cx + 14, y0 + 55), (cx - 14, y0 + 55)], outline=col)
            d.line([(cx - 24, y0 + 108), (cx + 24, y0 + 108)], fill=col, width=2)
        elif i == 2:  # sniffer
            d.ellipse([cx - 22, y0 + 55, cx + 22, y0 + 99], outline=col, width=2)
            d.line([(cx, y0 + 99), (cx, y0 + 118)], fill=col, width=2)
        else:  # wrench
            d.arc([cx - 24, y0 + 55, cx + 8, y0 + 87], 200, 340, fill=col, width=3)
            d.line([(cx + 4, y0 + 72), (cx + 28, y0 + 110)], fill=col, width=3)

        bilingual_center(d, (cx, y0 + 175), en, zh, F.h, F.zh, col, col, gap=2)
        bilingual_center(d, (cx, y0 + 245), se, sz, F.n, F.zs, INK, MUTED, gap=2)
        bilingual_center(d, (cx, y0 + 320), ne, nz, F.s, F.zxs, MUTED, MUTED, gap=1)

    bilingual_center(
        d,
        (W / 2, 470),
        "Calibrate on a schedule — tag out tools that fail",
        "按计划校准——失效工具挂牌停用",
        F.s,
        F.zs,
        MUTED,
        MUTED,
        gap=2,
    )
    bi_foot(
        d,
        F,
        "Process capability lives in the tool room as much as in the test cell",
        "过程能力同样活在工具室，而不只在试验间",
    )
    save_png(im, "knowledge-shop-tools.png")


# ---------------------------------------------------------------------------
# 2. Inline / online test bench
# ---------------------------------------------------------------------------


def draw_inline(F: Fonts):
    im, d = new_canvas()
    bi_title(d, F, "Inline test bench — function · safety · leak", "在线试验台——功能 · 安全 · 检漏")

    # Conveyor + UUT
    d.rectangle([60, 200, 964, 240], fill=GRID, outline=MUTED, width=1)
    round_rect(d, (380, 120, 644, 280), 12, LIGHT_BLUE, BLUE, 3)
    bilingual_center(d, (512, 170), "Unit under test", "被测机组", F.h, F.zh, BLUE, BLUE, gap=2)
    bilingual_center(d, (512, 235), "on conveyor / fixture", "传送线 / 夹具", F.s, F.zxs, MUTED, MUTED, gap=1)

    panels = [
        (120, 340, "Function seq.", "功能序列", "Modes · fans · self-test", "模式·风机·自检", GREEN, LIGHT_GREEN),
        (380, 340, "Safety interlocks", "安全联锁", "HP/LP · E-stop · doors", "高低压·急停·门", RED, LIGHT_RED),
        (640, 340, "Leak / hold", "检漏 / 保压", "Post-charge gate", "充注后关口", ORANGE, LIGHT_ORANGE),
        (900, 340, "Pass / Fail", "合格 / 不合格", "Log fault codes", "记录故障码", PURPLE, LIGHT_PURPLE),
    ]
    for cx, cy, en, zh, se, sz, col, fill in panels:
        round_rect(d, (cx - 110, cy - 55, cx + 110, cy + 70), 12, fill, col, 3)
        bilingual_center(d, (cx, cy - 20), en, zh, F.b, F.zb, col, col, gap=2)
        bilingual_center(d, (cx, cy + 30), se, sz, F.xs, F.zxs, INK, MUTED, gap=1)
        arrow(d, (512, 280), (cx, cy - 55), col, 2)

    # Traffic lights
    for i, col in enumerate((GREEN, RED, GOLD)):
        d.ellipse([860 + i * 36, 140, 888 + i * 36, 168], fill=col, outline=INK, width=1)

    bi_foot(
        d,
        F,
        "Hard safety stays local — even on a “quick functional” recipe",
        "硬安全保持本地——即便配方是「快速功能」",
    )
    save_png(im, "knowledge-shop-inline.png")


# ---------------------------------------------------------------------------
# 3. Factory quality loop
# ---------------------------------------------------------------------------


def draw_loop(F: Fonts):
    im, d = new_canvas()
    bi_title(d, F, "Factory quality loop — assembly to ship", "工厂质量闭环——从装配到发运")

    stages = [
        (140, 200, "Assembly", "装配", "Torque · braze · wire", "扭矩·钎焊·布线", TEAL),
        (360, 120, "Vacuum / charge", "真空 / 充注", "Dry & tight first", "先干燥气密", BLUE),
        (600, 120, "Inline tests", "在线试验", "Function · leak", "功能·检漏", ORANGE),
        (820, 200, "Performance", "性能台", "100% or sample", "全检或抽检", GREEN),
        (600, 360, "Pack & ship", "包装发运", "Serial + records", "机号+记录", PURPLE),
        (360, 360, "Rework / SPC", "返工 / SPC", "Feed process", "反馈过程", RED),
    ]
    for cx, cy, en, zh, se, sz, col in stages:
        round_rect(d, (cx - 95, cy - 55, cx + 95, cy + 55), 14, CARD, col, 3)
        bilingual_center(d, (cx, cy - 18), en, zh, F.b, F.zb, col, col, gap=2)
        bilingual_center(d, (cx, cy + 22), se, sz, F.xs, F.zxs, MUTED, MUTED, gap=1)

    # Forward flow
    pairs = [(0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 0)]
    for i, j in pairs:
        x1, y1 = stages[i][0], stages[i][1]
        x2, y2 = stages[j][0], stages[j][1]
        # shorten toward boxes
        ang = math.atan2(y2 - y1, x2 - x1)
        p1 = (x1 + 95 * math.cos(ang), y1 + 50 * math.sin(ang))
        p2 = (x2 - 95 * math.cos(ang), y2 - 50 * math.sin(ang))
        col = RED if (i, j) in ((4, 5), (5, 0)) else INK
        arrow(d, p1, p2, col, 2)

    bilingual_center(
        d,
        (W / 2, 480),
        "Closed feedback into process control — not a lonely end-of-line stamp",
        "闭环反馈进过程控制——不是孤独的线末盖章",
        F.s,
        F.zs,
        MUTED,
        MUTED,
        gap=2,
    )
    bi_foot(
        d,
        F,
        "Each station either catches a defect or ships it",
        "每个工位要么拦住缺陷，要么把它发出去",
    )
    save_png(im, "knowledge-shop-loop.png")


# ---------------------------------------------------------------------------
# 4. Performance test bench
# ---------------------------------------------------------------------------


def draw_perf(F: Fonts):
    im, d = new_canvas()
    bi_title(d, F, "Performance test bench — duty · COP · DAQ", "性能试验台——工况 · COP · 采集")

    # Cell
    round_rect(d, (48, 90, 560, 420), 14, LIGHT_BLUE, BLUE, 3)
    bilingual_center(d, (304, 120), "Calorimeter / liquid-loop cell", "量热计 / 液环试验间", F.h, F.zh, BLUE, BLUE, gap=2)

    round_rect(d, (180, 170, 428, 310), 10, CARD, INK, 2)
    bilingual_center(d, (304, 220), "Unit under test", "被测机组", F.b, F.zb, INK, MUTED, gap=2)
    bilingual_center(d, (304, 275), "stable Te / Tc / flow", "稳定 Te / Tc / 流量", F.s, F.zxs, MUTED, MUTED, gap=1)

    sensors = [
        (100, 360, "T", "温度"),
        (200, 360, "P", "压力"),
        (300, 360, "ṁ", "流量"),
        (400, 360, "W", "功率"),
        (500, 360, "DAQ", "采集"),
    ]
    for cx, cy, en, zh in sensors:
        round_rect(d, (cx - 36, cy - 28, cx + 36, cy + 28), 8, CARD, TEAL, 2)
        bilingual_center(d, (cx, cy), en, zh, F.s, F.zs, TEAL, TEAL, gap=1)

    # Right panel: results
    round_rect(d, (600, 90, 976, 420), 14, CARD, GREEN, 3)
    bilingual_center(d, (788, 125), "Rated duty readout", "额定工况读数", F.h, F.zh, GREEN, GREEN, gap=2)

    rows = [
        ("Capacity Q", "制热量 Q", "kW", GREEN),
        ("Power input", "输入功率", "kW", ORANGE),
        ("COP / SPF", "COP / SPF", "—", BLUE),
        ("Uncertainty", "不确定度", "±%", MUTED),
    ]
    for i, (en, zh, unit, col) in enumerate(rows):
        y = 185 + i * 55
        round_rect(d, (630, y - 22, 946, y + 22), 8, (245, 247, 250), col, 2)
        bilingual_center(d, (740, y), en, zh, F.n, F.zs, col, col, gap=1)
        text_center(d, (900, y), unit, F.b, INK)

    bi_foot(
        d,
        F,
        "A number without method, stability, and calibration is marketing",
        "没有方法、稳定性与校准的性能数是营销",
    )
    save_png(im, "knowledge-shop-perf.png")


def main():
    F = Fonts()
    draw_tools(F)
    draw_inline(F)
    draw_loop(F)
    draw_perf(F)
    print(f"done — {W}×{H} knowledge-shop-* → diagrams")


if __name__ == "__main__":
    main()
