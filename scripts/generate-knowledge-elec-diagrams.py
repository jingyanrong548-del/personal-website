#!/usr/bin/env python3
"""Generate knowledge-elec-*.png — electrical knowledge diagrams (EN primary / ZH secondary)."""

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
# 1. Electrical layers
# ---------------------------------------------------------------------------


def draw_layers():
    im, d = new_canvas()
    bi_title(d, F, "Heat-pump electrical layers", "热泵电气分层")

    layers = [
        ("1", "Field / IoT", "现场 / 物联网", "Telemetry · cloud · OTA", "遥测 · 云 · 固件", PURPLE, LIGHT_PURPLE),
        ("2", "Controller", "控制器", "Logic · I/O · UI", "逻辑 · I/O · 界面", BLUE, LIGHT_BLUE),
        ("3", "Drive / VFD", "驱动 / 变频", "Hz · V · torque", "频率 · 电压 · 转矩", TEAL, (220, 242, 242)),
        ("4", "Motor", "电机", "Hermetic / open shaft", "全封 / 开启轴", GREEN, LIGHT_GREEN),
        ("5", "Protection", "保护", "MCCB · contactor · OL", "断路器 · 接触器 · 热继", ORANGE, LIGHT_ORANGE),
    ]
    top = 70
    h = 72
    gap = 10
    left, right = 80, 944
    for i, (n, en, zh, se, sz, col, fill) in enumerate(layers):
        y0 = top + i * (h + gap)
        box = (left, y0, right, y0 + h)
        round_rect(d, box, 12, fill, col, 3)
        round_rect(d, (left + 16, y0 + 16, left + 56, y0 + h - 16), 8, CARD, col, 2)
        text_center(d, (left + 36, y0 + h / 2), n, F.h, col)
        bilingual_center(d, (280, y0 + h / 2), en, zh, F.h, F.zh, col, col, gap=2)
        bilingual_center(d, (700, y0 + h / 2), se, sz, F.s, F.zs, MUTED, MUTED, gap=1)
        if i < len(layers) - 1:
            arrow(d, (W / 2, y0 + h + 1), (W / 2, y0 + h + gap - 1), MUTED, width=2)

    bi_foot(
        d,
        F,
        "Diagnose sensor truth and lockouts before blaming the compressor map",
        "先核对传感器与连锁，再质疑压缩机性能图",
    )
    save_png(im, "knowledge-elec-layers.png")


# ---------------------------------------------------------------------------
# 2. Hermetic vs open motor
# ---------------------------------------------------------------------------


def draw_motor():
    im, d = new_canvas()
    bi_title(d, F, "Hermetic vs open compressor motors", "全封 vs 开启压缩机电机")

    panels = [
        (
            (40, 70, 490, 470),
            GREEN,
            LIGHT_GREEN,
            "Hermetic / semi-hermetic",
            "全封 / 半封",
            [
                ("Rotor in refrigerant–oil", "转子浸润工质–油"),
                ("OEM chemistry limits", "厂家化学兼容限值"),
                ("Winding T rise critical", "绕组温升关键"),
                ("No shaft seal to ambient", "无对外轴封"),
            ],
        ),
        (
            (534, 70, 984, 470),
            BLUE,
            LIGHT_BLUE,
            "Open motor",
            "开启电机",
            [
                ("Shaft seal + coupling", "轴封 + 联轴器"),
                ("Ambient IP & cooling", "环境 IP 与冷却"),
                ("Alignment matters", "对中关键"),
                ("Seal leak = joint failure", "轴封漏 = 机–电交界故障"),
            ],
        ),
    ]
    for box, col, fill, en, zh, lines in panels:
        round_rect(d, box, 14, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 40), en, zh, F.h, F.zh, col, col, gap=2)
        # shell glyph
        gy = box[1] + 110
        d.ellipse([cx - 55, gy - 35, cx + 55, gy + 35], outline=col, width=3)
        if col == GREEN:
            d.ellipse([cx - 25, gy - 15, cx + 25, gy + 15], fill=LIGHT_ORANGE, outline=ORANGE, width=2)
        else:
            d.line([(cx + 55, gy), (cx + 95, gy)], fill=col, width=4)
            d.ellipse([cx + 90, gy - 12, cx + 114, gy + 12], outline=MUTED, width=2)
        y = box[1] + 200
        for se, sz in lines:
            bilingual_center(d, (cx, y), se, sz, F.s, F.zs, INK, MUTED, gap=2)
            y += 48

    bi_foot(
        d,
        F,
        "Both need correct insulation class and start method",
        "两者都需要正确的绝缘等级与启动方式",
    )
    save_png(im, "knowledge-elec-motor.png")


# ---------------------------------------------------------------------------
# 3. VFD capacity control
# ---------------------------------------------------------------------------


def draw_vfd():
    im, d = new_canvas()
    bi_title(d, F, "VFD / inverter capacity control", "变频器 / 逆变器能力调节")

    stages = [
        ("Grid AC", "电网交流", ORANGE, LIGHT_ORANGE),
        ("Rectifier", "整流", BLUE, LIGHT_BLUE),
        ("DC bus", "直流母线", PURPLE, LIGHT_PURPLE),
        ("IGBT invert", "IGBT 逆变", TEAL, (220, 242, 242)),
        ("Motor", "电机", GREEN, LIGHT_GREEN),
    ]
    gap = 12
    left = 36
    usable = W - 2 * left - 4 * gap
    bw = usable / 5
    y0, y1 = 80, 200
    for i, (en, zh, col, fill) in enumerate(stages):
        x0 = left + i * (bw + gap)
        box = (x0, y0, x0 + bw, y1)
        round_rect(d, box, 12, fill, col, 3)
        bi_in_box(d, F, box, en, zh, col, title=True)
        if i < len(stages) - 1:
            arrow(d, (x0 + bw + 1, (y0 + y1) / 2), (x0 + bw + gap - 1, (y0 + y1) / 2), MUTED, width=2)

    bilingual_center(d, (W / 2, 230), "Hz · V · torque → match load", "频率 · 电压 · 转矩 → 匹配负荷", F.b, F.zb, TEAL, TEAL, gap=2)

    cards3 = [
        ((40, 260, 340, 470), GREEN, LIGHT_GREEN, "Part-load COP", "部分负荷 COP", "Turndown beats bypass\nif oil return OK", "调速优于旁通\n前提回油正常"),
        ((362, 260, 662, 470), ORANGE, LIGHT_ORANGE, "EMI & cable", "EMI 与电缆", "Screened cable · filters\ndV/dt stress", "屏蔽电缆 · 滤波\ndV/dt 应力"),
        ((684, 260, 984, 470), RED, LIGHT_RED, "Integration", "集成要点", "Fault relay → controller\nnot keypad as safety", "故障继电器→控制器\n勿用面板当安全"),
    ]
    for box, col, fill, en, zh, se, sz in cards3:
        round_rect(d, box, 12, fill, col, 3)
        cx = (box[0] + box[2]) / 2
        bilingual_center(d, (cx, box[1] + 40), en, zh, F.h, F.zh, col, col, gap=2)
        # split se/sz on newline if present
        se_lines = se.split("\n")
        sz_lines = sz.split("\n")
        y = box[1] + 110
        for a, b in zip(se_lines, sz_lines):
            bilingual_center(d, (cx, y), a, b, F.s, F.zs, INK, MUTED, gap=2)
            y += 55

    bi_foot(
        d,
        F,
        "Turndown helps seasonal COP only when oil return stays on the map",
        "仅当最低转速回油仍在性能图内时，调速才抬升季节能效",
    )
    save_png(im, "knowledge-elec-vfd.png")


# ---------------------------------------------------------------------------
# 4. Panel components
# ---------------------------------------------------------------------------


def draw_panel():
    im, d = new_canvas()
    bi_title(d, F, "Electrical panel components", "电气盘柜元件")

    items = [
        ("MCCB", "塑壳断路器", "Short-circuit / isolate", "短路 / 隔离", ORANGE, LIGHT_ORANGE),
        ("Contactor", "接触器", "Motor start / stop", "电机启停", BLUE, LIGHT_BLUE),
        ("Thermal OL", "热继电器", "Set to nameplate FLC", "按铭牌满载整定", RED, LIGHT_RED),
        ("Ctrl XFMR", "控制变压器", "24 V / 230 V rails", "24 V / 230 V 电源", PURPLE, LIGHT_PURPLE),
        ("Segregate", "强弱电分隔", "Power ≠ signal trunks", "动力≠信号共管", TEAL, (220, 242, 242)),
        ("Label ends", "两端标识", "IP · ventilation match", "IP · 通风匹配", GREEN, LIGHT_GREEN),
    ]
    gap = 14
    # 3x2
    for i, (en, zh, se, sz, col, fill) in enumerate(items):
        r, c = divmod(i, 3)
        cw = (W - 2 * 40 - 2 * gap) / 3
        ch = 170
        x0 = 40 + c * (cw + gap)
        y0 = 75 + r * (ch + gap)
        box = (x0, y0, x0 + cw, y0 + ch)
        round_rect(d, box, 12, fill, col, 3)
        cx = x0 + cw / 2
        bilingual_center(d, (cx, y0 + 50), en, zh, F.h, F.zh, col, col, gap=2)
        bilingual_center(d, (cx, y0 + 115), se, sz, F.s, F.zs, MUTED, MUTED, gap=2)

    bi_foot(
        d,
        F,
        "Raising a thermal relay “so it stops tripping” burns the motor later",
        "把热继调高「免得跳」——迟早烧电机",
    )
    save_png(im, "knowledge-elec-panel.png")


# ---------------------------------------------------------------------------
# 5. Unit controller I/O
# ---------------------------------------------------------------------------


def draw_controller():
    im, d = new_canvas()
    bi_title(d, F, "Unit controller I/O & interlocks", "机组控制器 I/O 与连锁")

    # Inputs
    inputs = [
        ("Pressure P", "压力"),
        ("Temperature T", "温度"),
        ("Flow switch", "流量开关"),
        ("User / BMS", "用户/楼控"),
    ]
    for i, (en, zh) in enumerate(inputs):
        y = 90 + i * 85
        box = (40, y, 280, y + 70)
        round_rect(d, box, 10, LIGHT_BLUE, BLUE, 2)
        bi_in_box(d, F, box, en, zh, BLUE)
        arrow(d, (280, y + 35), (380, y + 35), BLUE, width=2)

    # Controller core
    core = (380, 150, 644, 400)
    round_rect(d, core, 14, LIGHT_PURPLE, PURPLE, 3)
    bilingual_center(d, (512, 200), "Controller / PLC", "控制器 / PLC", F.h, F.zh, PURPLE, PURPLE, gap=2)
    bilingual_center(d, (512, 270), "Algorithms · modes", "算法 · 模式", F.s, F.zs, MUTED, MUTED, gap=1)
    bilingual_center(d, (512, 330), "Hard safety stays local", "硬安全留在本地", F.b, F.zb, RED, RED, gap=2)

    # Outputs
    outputs = [
        ("Compressor / VFD", "压缩机/变频"),
        ("Reversing / EEV", "换向/电子膨胀"),
        ("Pumps / fans", "泵/风机"),
        ("Alarm / lockout", "报警/锁定"),
    ]
    for i, (en, zh) in enumerate(outputs):
        y = 90 + i * 85
        box = (744, y, 984, y + 70)
        col = RED if i == 3 else GREEN
        fill = LIGHT_RED if i == 3 else LIGHT_GREEN
        round_rect(d, box, 10, fill, col, 2)
        bi_in_box(d, F, box, en, zh, col)
        arrow(d, (644, y + 35), (744, y + 35), col, width=2)

    # Interlock bar
    card(d, (40, 470, 984, 520), fill=LIGHT_ORANGE, outline=ORANGE, r=10, width=2)
    bilingual_center(
        d,
        (W / 2, 495),
        "HP/LP · overload · frost · E-stop — never silently bypassed by BMS writes",
        "高低压 · 过载 · 防冻 · 急停 — 楼控写入绝不能静默旁路",
        F.s,
        F.zs,
        ORANGE,
        ORANGE,
        gap=1,
    )

    bi_foot(
        d,
        F,
        "Soft setpoints must never defeat hard safety interlocks",
        "软设定绝不能击败硬安全连锁",
    )
    save_png(im, "knowledge-elec-controller.png")


# ---------------------------------------------------------------------------
# 6. Remote / IoT loop
# ---------------------------------------------------------------------------


def draw_iot():
    im, d = new_canvas()
    bi_title(d, F, "Remote control & IoT loop", "远程控制与物联网闭环")

    steps = [
        ("Sensors", "传感器", "P / T / I / status", "压力/温度/电流/状态", BLUE, LIGHT_BLUE),
        ("Controller", "控制器", "Local safety first", "本地安全优先", PURPLE, LIGHT_PURPLE),
        ("Gateway", "网关", "Modbus · BACnet · MQTT", "协议与点表", TEAL, (220, 242, 242)),
        ("Cloud / BMS", "云 / 楼控", "Diagnostics · forecast", "诊断 · 负荷预测", ORANGE, LIGHT_ORANGE),
        ("Action loop", "行动闭环", "Ticket · named owner", "工单 · 责任人", GREEN, LIGHT_GREEN),
    ]
    gap = 12
    left = 28
    usable = W - 2 * left - 4 * gap
    bw = usable / 5
    top, bot = 90, 320
    for i, (en, zh, se, sz, col, fill) in enumerate(steps):
        x0 = left + i * (bw + gap)
        box = (x0, top, x0 + bw, bot)
        round_rect(d, box, 12, fill, col, 3)
        cx = x0 + bw / 2
        bilingual_center(d, (cx, 150), en, zh, F.h, F.zh, col, col, gap=2)
        bilingual_center(d, (cx, 240), se, sz, F.s, F.zxs, MUTED, MUTED, gap=2)
        if i < len(steps) - 1:
            arrow(d, (x0 + bw + 1, 205), (x0 + bw + gap - 1, 205), MUTED, width=2)

    # Feedback arrow hint
    card(d, (80, 360, 944, 460), fill=LIGHT_RED, outline=RED, r=12, width=2)
    bilingual_center(
        d,
        (W / 2, 395),
        "AI / remote setpoints: trim within a band — never defeat frost / HP / min-flow",
        "AI / 远程设定：仅在带宽内微调——绝不能击败防冻/高压/最小流量",
        F.s,
        F.zs,
        RED,
        RED,
        gap=2,
    )
    bilingual_center(
        d,
        (W / 2, 440),
        "Cyber: segment · patch · restrict writes · alarms must reach people",
        "安全：隔离 · 补丁 · 限制写入 · 报警须到达能行动的人",
        F.s,
        F.zs,
        MUTED,
        MUTED,
        gap=1,
    )

    bi_foot(
        d,
        F,
        "Dashboards without a ticket path do not improve COP",
        "没有工单路径的仪表盘不会抬升 COP",
    )
    save_png(im, "knowledge-elec-iot.png")


def main():
    global F
    F = Fonts()
    assert IMAGES_OUT and W and H and BG
    draw_layers()
    draw_motor()
    draw_vfd()
    draw_panel()
    draw_controller()
    draw_iot()
    print(f"done — {W}×{H} → {IMAGES_OUT}")


if __name__ == "__main__":
    main()
