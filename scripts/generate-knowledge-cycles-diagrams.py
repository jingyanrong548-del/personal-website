#!/usr/bin/env python3
"""Generate knowledge-cycles-*.png diagrams (ASCII-safe labels, correct thermo geometry)."""

from __future__ import annotations

import math
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images"
W, H = 1024, 576

BG = (245, 247, 250)
CARD = (255, 255, 255)
INK = (26, 35, 50)
MUTED = (90, 100, 115)
BLUE = (59, 125, 216)
GREEN = (46, 125, 79)
RED = (196, 75, 75)
PURPLE = (123, 94, 167)
ORANGE = (210, 120, 40)
TEAL = (40, 140, 140)
GOLD = (180, 140, 40)
GRID = (210, 216, 224)
LIGHT_BLUE = (220, 232, 248)
LIGHT_GREEN = (220, 240, 228)
LIGHT_RED = (248, 228, 228)
LIGHT_PURPLE = (236, 228, 245)
LIGHT_ORANGE = (252, 236, 220)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except OSError:
                continue
    return ImageFont.load_default()


F_TITLE = font(28, True)
F_H = font(20, True)
F_B = font(16, True)
F_N = font(14)
F_S = font(12)
F_XS = font(11)


def new_img():
    im = Image.new("RGB", (W, H), BG)
    return im, ImageDraw.Draw(im)


def round_rect(draw, xy, r, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)


def text_center(draw, xy, text, f, fill=INK):
    bbox = draw.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((xy[0] - tw / 2, xy[1] - th / 2), text, font=f, fill=fill)


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


def draw_map():
    im, d = new_img()
    text_center(d, (W / 2, 36), "Refrigeration & heat-pump cycle families", F_TITLE)
    families = [
        ("Ideal reference", "Reverse Carnot", "T-s ceiling for COP", GOLD, (40, 80, 240, 200)),
        ("Gas cycle", "Reverse Brayton", "No phase change · air", TEAL, (280, 80, 480, 200)),
        ("Vapor compression", "Subcritical VCC", "Industry workhorse", GREEN, (520, 80, 720, 200)),
        ("Transcritical", "CO2 / R744", "Gas cooler · P>Pc", ORANGE, (760, 80, 984, 200)),
        ("Thermal drive", "Absorption", "Heat-driven · pairs", PURPLE, (160, 280, 400, 400)),
        ("Open steam", "MVR / steam VCC", "Working fluid = steam", RED, (440, 280, 680, 400)),
        ("Other", "Stirling · ORC*", "Niche / power side*", MUTED, (720, 280, 960, 400)),
    ]
    for title, name, note, col, box in families:
        round_rect(d, box, 14, CARD, col, 3)
        text_center(d, ((box[0] + box[2]) / 2, box[1] + 32), title, F_S, MUTED)
        text_center(d, ((box[0] + box[2]) / 2, box[1] + 68), name, F_H, col)
        text_center(d, ((box[0] + box[2]) / 2, box[1] + 105), note, F_S, INK)
    text_center(
        d,
        (W / 2, 460),
        "Flow diagram -> connections ·  P-h -> enthalpy & throttle loss ·  T-s -> irreversibility vs Carnot",
        F_N,
        MUTED,
    )
    text_center(
        d,
        (W / 2, 530),
        "*ORC / power Brayton are power-side cousins - not covered as a full chapter here.",
        F_XS,
        MUTED,
    )
    save(im, "knowledge-cycles-map.png")


def draw_carnot_ts():
    im, d = new_img()
    text_center(d, (W / 2, 32), "Reverse Carnot cycle on T-s", F_TITLE)
    ox, oy, ax, ay = 140, 480, 820, 100
    d.line([(ox, oy), (ox, ay)], fill=INK, width=2)
    d.line([(ox, oy), (ox + ax, oy)], fill=INK, width=2)
    text_center(d, (ox - 40, (oy + ay) / 2), "T", F_B)
    text_center(d, (ox + ax / 2, oy + 28), "s", F_B)
    th_y, tc_y = 160, 380
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
    d.text((s1 + 80, tc_y + 12), "isothermal heat absorption (Qc)", font=F_S, fill=BLUE)
    d.text((s1 + 80, th_y - 28), "isothermal heat rejection (Qh)", font=F_S, fill=RED)
    d.text((s2 + 12, (th_y + tc_y) / 2 - 10), "isentropic\ncompression", font=F_S, fill=PURPLE)
    d.text((s1 - 110, (th_y + tc_y) / 2 - 10), "isentropic\nexpansion", font=F_S, fill=TEAL)
    text_center(
        d,
        (W / 2, 540),
        "COPc = Tc/(Th-Tc) · COPh = Th/(Th-Tc)  - larger lift -> lower ceiling",
        F_N,
        MUTED,
    )
    save(im, "knowledge-cycles-carnot-ts.png")


def draw_carnot_vs_real():
    """Real VCC sits INSIDE the Carnot rectangle (finite dT, throttle, irreversibility)."""
    im, d = new_img()
    text_center(d, (W / 2, 32), "Ideal reverse Carnot vs real vapor-compression", F_TITLE)
    ox, oy = 120, 500
    d.line([(ox, oy), (ox, 80)], fill=INK, width=2)
    d.line([(ox, oy), (900, oy)], fill=INK, width=2)
    text_center(d, (ox - 35, 290), "T", F_B)
    text_center(d, (520, oy + 28), "s", F_B)

    # Ideal Carnot rectangle
    c = [(280, 400), (520, 400), (520, 160), (280, 160)]
    d.line([c[0], c[1], c[2], c[3], c[0]], fill=GREEN, width=3)

    # Real cycle INSIDE: colder evaporate, hotter condense approach, throttle (non-isentropic), compressor slope
    r = [(300, 380), (490, 385), (505, 185), (310, 195)]
    d.line([r[0], r[1]], fill=BLUE, width=3)
    d.line([r[1], r[2]], fill=ORANGE, width=3)
    d.line([r[2], r[3]], fill=RED, width=3)
    d.line([r[3], r[0]], fill=PURPLE, width=3)
    for p in r:
        d.ellipse([p[0] - 5, p[1] - 5, p[0] + 5, p[1] + 5], fill=INK)

    round_rect(d, (680, 100, 980, 300), 12, CARD, GRID, 1)
    d.line([(700, 140), (760, 140)], fill=GREEN, width=4)
    d.text((770, 130), "Reverse Carnot (ideal)", font=F_N, fill=INK)
    d.line([(700, 180), (760, 180)], fill=ORANGE, width=4)
    d.text((770, 170), "Real VCC (lossy)", font=F_N, fill=INK)
    d.text((700, 220), "- Finite dT in HX", font=F_S, fill=MUTED)
    d.text((700, 245), "- Throttle != isentropic expand", font=F_S, fill=MUTED)
    d.text((700, 270), "- Compressor irreversibility", font=F_S, fill=MUTED)
    text_center(
        d,
        (W / 2, 545),
        "Real cycles sit inside the Carnot rectangle - gap = irreversibility budget",
        F_N,
        MUTED,
    )
    save(im, "knowledge-cycles-carnot-vs-real.png")


def draw_brayton():
    im, d = new_img()
    text_center(d, (W / 2, 28), "Reverse Brayton (gas) cycle", F_TITLE)
    boxes = [
        ((60, 100, 280, 200), GREEN, "Compressor"),
        ((360, 100, 580, 200), RED, "Heat rejector\n(cooler)"),
        ((660, 100, 900, 200), TEAL, "Expander\n(turbine)"),
        ((360, 300, 580, 400), BLUE, "Heat absorber"),
    ]
    for box, col, lab in boxes:
        round_rect(d, box, 12, CARD, col, 3)
        lines = lab.split("\n")
        cy = (box[1] + box[3]) / 2 - (len(lines) - 1) * 10
        for i, line in enumerate(lines):
            text_center(d, ((box[0] + box[2]) / 2, cy + i * 20), line, F_B, col)
    arrow(d, (280, 150), (360, 150), GREEN)
    arrow(d, (580, 150), (660, 150), RED)
    arrow(d, (780, 200), (780, 350), TEAL)
    arrow(d, (780, 350), (580, 350), BLUE)
    arrow(d, (360, 350), (170, 350), BLUE)
    arrow(d, (170, 350), (170, 200), BLUE)
    round_rect(d, (60, 430, 960, 550), 12, CARD, GRID, 1)
    d.text((80, 450), "All gas - no condenser / evaporator two-phase. Work = compressor - expander.", font=F_N, fill=INK)
    d.text((80, 480), "Niche: aircraft / cryogenic air cycles. Rare as industrial HP core (specific work, exchanger dT, volume).", font=F_N, fill=MUTED)
    d.text((80, 510), "T-s: two isentropics + two isobars (parallelogram-like), not Carnot rectangle.", font=F_N, fill=MUTED)
    save(im, "knowledge-cycles-brayton.png")


def draw_dome(d, peak, left_base, right_base, mid_y):
    """Simple saturation dome polyline. peak=(x,y) critical; bases at bottom."""
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
    """Subcritical: Pc BELOW critical; condense through two-phase; nearly vertical throttle."""
    im, d = new_img()
    text_center(d, (W / 2, 28), "Subcritical vapor-compression on P-h", F_TITLE)
    ox, oy = 100, 500
    d.line([(ox, oy), (ox, 70)], fill=INK, width=2)
    d.line([(ox, oy), (920, oy)], fill=INK, width=2)
    text_center(d, (ox - 35, 280), "P", F_B)
    text_center(d, (520, oy + 28), "h", F_B)

    # Dome: critical at top; Pc will be BELOW peak
    crit = (460, 150)
    left_base, right_base = (220, 430), (700, 430)
    draw_dome(d, crit, left_base, right_base, 280)
    d.ellipse([crit[0] - 5, crit[1] - 5, crit[0] + 5, crit[1] + 5], fill=MUTED)
    d.text((crit[0] + 10, crit[1] - 14), "critical", font=F_XS, fill=MUTED)

    # Pc below critical, Pe lower
    pc_y, pe_y = 230, 380
    d.line([(ox + 40, pc_y), (880, pc_y)], fill=RED, width=1)
    d.line([(ox + 40, pe_y), (880, pe_y)], fill=BLUE, width=1)
    d.text((885, pc_y - 8), "Pc", font=F_S, fill=RED)
    d.text((885, pe_y - 8), "Pe", font=F_S, fill=BLUE)

    # Saturation liquid / vapor approx at Pc and Pe (under dome)
    # Point 2: discharge superheated (right of vapor line at Pc)
    # Point 3: subcooled liquid (left of liquid line at Pc)
    # Point 4: two-phase at Pe (same h as 3 - vertical)
    # Point 1: suction vapor / slight superheat at Pe
    p2 = (640, pc_y)  # superheated vapor
    p2b = (560, pc_y)  # dew / start of condense (approx)
    p3 = (280, pc_y)  # subcooled liquid
    p4 = (280, pe_y)  # after throttle - vertical
    p1 = (600, pe_y)  # vapor + superheat

    # 1->2 compression
    d.line([p1, p2], fill=GREEN, width=4)
    # 2->3: desuperheat + condense + subcool (horizontal through dome)
    d.line([p2, p2b, p3], fill=RED, width=4)
    # 3->4 throttle vertical
    d.line([p3, p4], fill=PURPLE, width=4)
    # 4->1 evaporate + superheat
    d.line([p4, p1], fill=BLUE, width=4)

    for p, lab in [(p1, "1"), (p2, "2"), (p3, "3"), (p4, "4")]:
        d.ellipse([p[0] - 7, p[1] - 7, p[0] + 7, p[1] + 7], fill=INK)
        d.text((p[0] + 10, p[1] - 18), lab, font=F_B, fill=INK)

    d.text((610, 190), "compression", font=F_S, fill=GREEN)
    d.text((360, 200), "condense + subcool (Pc < Pcrit)", font=F_S, fill=RED)
    d.text((200, 300), "throttle\n(h~const)", font=F_S, fill=PURPLE)
    d.text((400, 410), "evaporate + superheat", font=F_S, fill=BLUE)
    text_center(
        d,
        (W / 2, 545),
        "1->2 compress · 2->3 reject heat through two-phase · 3->4 throttle · 4->1 absorb heat",
        F_N,
        MUTED,
    )
    save(im, "knowledge-cycles-vcc-ph.png")


def draw_vcc_flow():
    im, d = new_img()
    text_center(d, (W / 2, 28), "Basic vapor-compression heat pump / chiller", F_TITLE)
    comps = [
        ((392, 60, 632, 170), GREEN, "Compressor", "work in · raise P"),
        ((720, 200, 960, 340), RED, "Condenser", "high-P · reject heat"),
        ((392, 400, 632, 520), PURPLE, "Expansion valve", "throttle · drop P"),
        ((64, 200, 304, 340), BLUE, "Evaporator", "low-P · absorb heat"),
    ]
    for box, col, title, sub in comps:
        round_rect(d, box, 14, CARD, col, 3)
        text_center(d, ((box[0] + box[2]) / 2, box[1] + 40), title, F_H, col)
        text_center(d, ((box[0] + box[2]) / 2, box[1] + 75), sub, F_S, MUTED)
    arrow(d, (632, 115), (840, 200), GREEN)
    arrow(d, (840, 340), (632, 460), RED)
    arrow(d, (392, 460), (184, 340), PURPLE)
    arrow(d, (184, 200), (392, 115), BLUE)
    d.text((680, 120), "discharge", font=F_XS, fill=GREEN)
    d.text((250, 120), "suction", font=F_XS, fill=BLUE)
    text_center(d, (W / 2, 555), "Same cycle for cooling or heating - useful heat is which side you count", F_N, MUTED)
    save(im, "knowledge-cycles-vcc-flow.png")


def draw_economizer():
    """Flash economizer: condenser -> first expansion -> flash/IHX -> second expansion -> evaporator."""
    im, d = new_img()
    text_center(d, (W / 2, 28), "VCC with economizer (flash tank or IHX)", F_TITLE)
    round_rect(d, (80, 100, 260, 200), 10, LIGHT_GREEN, GREEN, 2)
    text_center(d, (170, 150), "Compressor\n(+ mid inject)", F_N, GREEN)
    round_rect(d, (360, 60, 560, 150), 10, LIGHT_RED, RED, 2)
    text_center(d, (460, 105), "Condenser", F_B, RED)
    round_rect(d, (620, 60, 780, 150), 10, LIGHT_PURPLE, PURPLE, 2)
    text_center(d, (700, 105), "1st expand", F_N, PURPLE)
    round_rect(d, (720, 200, 940, 310), 10, LIGHT_ORANGE, ORANGE, 2)
    text_center(d, (830, 245), "Flash / IHX\neconomizer", F_N, ORANGE)
    round_rect(d, (400, 360, 600, 460), 10, LIGHT_PURPLE, PURPLE, 2)
    text_center(d, (500, 410), "2nd expand", F_B, PURPLE)
    round_rect(d, (80, 360, 260, 460), 10, LIGHT_BLUE, BLUE, 2)
    text_center(d, (170, 410), "Evaporator", F_B, BLUE)

    arrow(d, (260, 150), (360, 105), GREEN)
    arrow(d, (560, 105), (620, 105), RED)
    arrow(d, (780, 105), (830, 200), PURPLE)
    arrow(d, (830, 310), (600, 410), ORANGE)
    arrow(d, (400, 410), (260, 410), PURPLE)
    arrow(d, (170, 360), (170, 200), BLUE)
    arrow(d, (720, 250), (260, 170), ORANGE, width=2)
    d.text((400, 220), "vapor / cooled liquid inject", font=F_XS, fill=ORANGE)

    round_rect(d, (60, 490, 960, 555), 10, CARD, GRID, 1)
    d.text((80, 505), "Why: lower discharge temp & better COP at higher lift. Cost: extra vessel/HX, oil & control.", font=F_N, fill=INK)
    d.text((80, 530), "Aligns with homepage configs (b)/(c) - flash tank vs heat-exchanger economizer.", font=F_S, fill=MUTED)
    save(im, "knowledge-cycles-economizer.png")


def draw_two_stage():
    im, d = new_img()
    text_center(d, (W / 2, 28), "Two-stage vapor compression", F_TITLE)
    round_rect(d, (60, 100, 280, 220), 12, LIGHT_BLUE, BLUE, 3)
    text_center(d, (170, 145), "LP evaporator", F_B, BLUE)
    text_center(d, (170, 180), "low stage", F_S, MUTED)
    round_rect(d, (360, 100, 580, 220), 12, LIGHT_GREEN, GREEN, 3)
    text_center(d, (470, 145), "LP compressor", F_B, GREEN)
    text_center(d, (470, 180), "stage 1", F_S, MUTED)
    round_rect(d, (660, 100, 960, 220), 12, LIGHT_ORANGE, ORANGE, 3)
    text_center(d, (810, 145), "Intercooler /\nflash vessel", F_B, ORANGE)
    round_rect(d, (660, 280, 960, 400), 12, LIGHT_GREEN, GREEN, 3)
    text_center(d, (810, 325), "HP compressor", F_B, GREEN)
    text_center(d, (810, 360), "stage 2", F_S, MUTED)
    round_rect(d, (360, 280, 580, 400), 12, LIGHT_RED, RED, 3)
    text_center(d, (470, 340), "Condenser", F_B, RED)
    round_rect(d, (60, 280, 280, 400), 12, LIGHT_PURPLE, PURPLE, 3)
    text_center(d, (170, 340), "Expansion\n(often staged)", F_N, PURPLE)
    arrow(d, (280, 160), (360, 160), BLUE)
    arrow(d, (580, 160), (660, 160), GREEN)
    arrow(d, (810, 220), (810, 280), ORANGE)
    arrow(d, (660, 340), (580, 340), GREEN)
    arrow(d, (360, 340), (280, 340), RED)
    arrow(d, (170, 280), (170, 220), PURPLE)
    text_center(d, (W / 2, 470), "Splits pressure ratio -> cooler discharge, higher lift capability", F_N, INK)
    text_center(d, (W / 2, 520), "Homepage config (e). Trade-off: two machines, oil return, and control logic.", F_S, MUTED)
    save(im, "knowledge-cycles-two-stage.png")


def draw_cascade():
    im, d = new_img()
    text_center(d, (W / 2, 28), "Cascade: two independent loops + cascade HX", F_TITLE)
    round_rect(d, (40, 70, 480, 340), 16, (235, 245, 255), BLUE, 2)
    d.text((60, 85), "Low-temperature loop", font=F_B, fill=BLUE)
    round_rect(d, (70, 130, 200, 210), 8, LIGHT_BLUE, BLUE, 2)
    text_center(d, (135, 170), "LT evap", F_N, BLUE)
    round_rect(d, (230, 130, 360, 210), 8, LIGHT_GREEN, GREEN, 2)
    text_center(d, (295, 170), "LT comp", F_N, GREEN)
    round_rect(d, (180, 240, 340, 310), 8, CARD, TEAL, 2)
    text_center(d, (260, 275), "Cascade HX", F_N, TEAL)
    round_rect(d, (520, 70, 980, 340), 16, (255, 240, 235), RED, 2)
    d.text((540, 85), "High-temperature loop", font=F_B, fill=RED)
    round_rect(d, (660, 130, 800, 210), 8, LIGHT_GREEN, GREEN, 2)
    text_center(d, (730, 170), "HT comp", F_N, GREEN)
    round_rect(d, (820, 130, 950, 210), 8, LIGHT_RED, RED, 2)
    text_center(d, (885, 170), "HT cond", F_N, RED)
    round_rect(d, (680, 240, 840, 310), 8, CARD, TEAL, 2)
    text_center(d, (760, 275), "Cascade HX", F_N, TEAL)
    d.line([(340, 275), (680, 275)], fill=TEAL, width=3)
    d.text((430, 250), "heat transfer", font=F_XS, fill=TEAL)
    text_center(d, (W / 2, 400), "Two fluids, two oil circuits - intermediate HX couples them thermally only", F_N, INK)
    text_center(d, (W / 2, 445), "Homepage config (f). Extreme-cold CO2 cascade: see Fundamentals Part 1.", F_S, MUTED)
    text_center(d, (W / 2, 520), "Use when one fluid cannot span source->sink safely or efficiently alone.", F_N, MUTED)
    save(im, "knowledge-cycles-cascade.png")


def draw_transcritical_ph():
    """Ph ABOVE Pcrit; gas cooler (no two-phase condensation)."""
    im, d = new_img()
    text_center(d, (W / 2, 28), "Transcritical CO2 (R744) on P-h", F_TITLE)
    ox, oy = 100, 500
    d.line([(ox, oy), (ox, 70)], fill=INK, width=2)
    d.line([(ox, oy), (920, oy)], fill=INK, width=2)
    text_center(d, (ox - 35, 280), "P", F_B)
    text_center(d, (520, oy + 28), "h", F_B)

    crit = (460, 240)
    draw_dome(d, crit, (240, 430), (680, 430), 320)
    d.ellipse([crit[0] - 6, crit[1] - 6, crit[0] + 6, crit[1] + 6], fill=ORANGE)
    d.text((crit[0] + 12, crit[1] - 10), "critical point", font=F_S, fill=ORANGE)

    d.line([(ox + 40, 240), (880, 240)], fill=ORANGE, width=1)
    d.text((885, 232), "Pcrit", font=F_XS, fill=ORANGE)

    ph_y, pe_y = 120, 360
    d.line([(ox + 40, ph_y), (880, ph_y)], fill=RED, width=1)
    d.text((885, ph_y - 8), "Ph", font=F_S, fill=RED)
    d.line([(ox + 40, pe_y), (880, pe_y)], fill=BLUE, width=1)
    d.text((885, pe_y - 8), "Pe", font=F_S, fill=BLUE)

    p1 = (640, pe_y)
    p2 = (720, ph_y)
    p3 = (300, ph_y)
    p4 = (300, pe_y)  # nearly vertical throttle
    d.line([p1, p2], fill=GREEN, width=4)
    d.line([p2, p3], fill=RED, width=4)
    d.line([p3, p4], fill=PURPLE, width=4)
    d.line([p4, p1], fill=BLUE, width=4)
    for p, lab in [(p1, "1"), (p2, "2"), (p3, "3"), (p4, "4")]:
        d.ellipse([p[0] - 7, p[1] - 7, p[0] + 7, p[1] + 7], fill=INK)
        d.text((p[0] + 10, p[1] - 18), lab, font=F_B, fill=INK)

    d.text((420, 90), "gas cooler (no two-phase condenser)", font=F_S, fill=RED)
    d.text((650, 200), "compress", font=F_S, fill=GREEN)
    d.text((220, 230), "throttle", font=F_S, fill=PURPLE)
    d.text((450, 390), "evaporate", font=F_S, fill=BLUE)
    text_center(
        d,
        (W / 2, 545),
        "Ph > Pcrit is an optimization variable · gas-cooler exit temp drives COP & capacity",
        F_N,
        MUTED,
    )
    save(im, "knowledge-cycles-transcritical-ph.png")


def draw_absorption():
    im, d = new_img()
    text_center(d, (W / 2, 28), "Absorption cycle (heat-driven)", F_TITLE)
    nodes = [
        ((60, 80, 280, 180), ORANGE, "Generator", "heat in (waste/\nsteam/hot water)"),
        ((400, 80, 620, 180), RED, "Condenser", "reject heat"),
        ((740, 80, 960, 180), PURPLE, "Expansion", "refrigerant"),
        ((740, 280, 960, 380), BLUE, "Evaporator", "useful cold\n(or heat pump)"),
        ((400, 280, 620, 380), TEAL, "Absorber", "absorb vapor\ninto solution"),
        ((60, 280, 280, 380), GREEN, "Solution\npump", "weak -> strong\n(small work)"),
    ]
    for box, col, t, s in nodes:
        round_rect(d, box, 12, CARD, col, 3)
        text_center(d, ((box[0] + box[2]) / 2, box[1] + 35), t, F_B, col)
        for i, line in enumerate(s.split("\n")):
            text_center(d, ((box[0] + box[2]) / 2, box[1] + 70 + i * 16), line, F_XS, MUTED)
    arrow(d, (280, 130), (400, 130), ORANGE)
    arrow(d, (620, 130), (740, 130), RED)
    arrow(d, (850, 180), (850, 280), PURPLE)
    arrow(d, (740, 330), (620, 330), BLUE)
    arrow(d, (400, 330), (280, 330), TEAL)
    arrow(d, (170, 280), (170, 180), GREEN)
    d.text((90, 400), "Pairs: H2O-LiBr, NH3-H2O, ...  ·  Electric compressor -> thermal compressor", font=F_N, fill=INK)
    d.text((90, 440), "When: abundant waste heat / scarce power. Watch crystallization, vacuum, and maintenance.", font=F_S, fill=MUTED)
    d.text((90, 480), "COP definitions differ from VCC - compare carefully in proposals.", font=F_S, fill=MUTED)
    save(im, "knowledge-cycles-absorption.png")


def draw_steam():
    im, d = new_img()
    text_center(d, (W / 2, 28), "Open-cycle steam compression / MVR", F_TITLE)
    round_rect(d, (80, 100, 360, 260), 14, LIGHT_BLUE, BLUE, 3)
    text_center(d, (220, 155), "Process / flash\nsteam source", F_H, BLUE)
    text_center(d, (220, 215), "working fluid = H2O", F_S, MUTED)
    round_rect(d, (460, 100, 740, 260), 14, LIGHT_GREEN, GREEN, 3)
    text_center(d, (600, 155), "Steam\ncompressor", F_H, GREEN)
    text_center(d, (600, 215), "raise P & T", F_S, MUTED)
    round_rect(d, (840, 100, 980, 260), 14, LIGHT_RED, RED, 3)
    text_center(d, (910, 155), "Process\nuse", F_H, RED)
    text_center(d, (910, 215), "steam sink", F_S, MUTED)
    arrow(d, (360, 180), (460, 180), BLUE)
    arrow(d, (740, 180), (840, 180), GREEN)
    round_rect(d, (200, 340, 780, 460), 12, CARD, TEAL, 2)
    text_center(d, (490, 380), "Condensate recovery · steam quality · oil contamination risk", F_B, TEAL)
    text_center(d, (490, 420), "Homepage configs (g)/(h)/(i) · see Industrial HTHP column", F_S, MUTED)
    text_center(
        d,
        (W / 2, 520),
        "Open loop: fluid may leave the plant with the product stream - design charge & makeup together",
        F_N,
        MUTED,
    )
    save(im, "knowledge-cycles-steam.png")


def main():
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
