#!/usr/bin/env python3
"""
Append a bilingual EN/ZH legend strip under restored 3D knowledge PNGs.

Does NOT redraw the artwork — expands canvas by LEGEND_H.
Idempotent via known original heights (height == original_h + LEGEND_H → skip).
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from diagram_style import (  # noqa: E402
    IMAGES_OUT,
    INK,
    MUTED,
    bilingual_center,
    font_cjk,
    require_cjk_font,
)

LEGEND_H = 52
MARKER_RGB = (245, 247, 250)
RULE = (210, 216, 224)
# Unique corner marker in the strip (not found in typical artwork corners)
CORNER_MARK = (59, 125, 216)

RESTORE_COMMIT = "6238163"

LEGENDS: list[tuple[str, str, str]] = [
    ("knowledge-comp-cycle.png", "Vapor-compression cycle — compressor highlighted", "蒸汽压缩循环 — 突出压缩机"),
    ("knowledge-comp-types.png", "Compressor families (3D cutaways)", "压缩机类型一览（3D 剖视）"),
    ("knowledge-comp-hermetic.png", "Hermetic · semi-hermetic · open-drive", "全封闭 · 半封闭 · 开启式"),
    ("knowledge-comp-map.png", "Performance map at the duty point", "工况点上的性能曲线图读法"),
    ("knowledge-comp-oil.png", "Lubrication & oil return", "润滑与回油"),
    ("knowledge-comp-hthp.png", "Heat pump & high-lift duty", "热泵与高升程工况"),
    ("knowledge-valve-types.png", "Refrigerant-side valve families", "制冷剂侧阀门族系"),
    ("knowledge-valve-txv-eev.png", "TXV vs EEV — superheat control", "TXV 与 EEV — 过热度控制"),
    ("knowledge-valve-reversing.png", "4-way reversing valve — heating vs cooling", "四通换向阀 — 制热/制冷路径"),
    ("knowledge-hx-types.png", "Heat exchanger families (3D)", "换热器类型一览（3D）"),
    ("knowledge-vessel-cycle.png", "Vapor-compression cycle — vessels highlighted", "蒸汽压缩循环 — 突出容器"),
    ("knowledge-vessel-types.png", "Refrigerant vessel families", "制冷剂容器族系"),
    ("knowledge-vessel-receiver.png", "Liquid receiver — charge storage", "储液器 — 充注贮存"),
    ("knowledge-vessel-accum.png", "Suction accumulator — liquid slug protection", "回气集液器 — 防液击"),
    ("knowledge-vessel-flash.png", "Flash tank / economizer vessel", "闪蒸罐 / 经济器容器"),
    ("knowledge-vessel-oil.png", "Oil separator — discharge path", "油分离器 — 排气路径"),
    ("knowledge-lub-cycle.png", "Oil path in the refrigeration cycle", "制冷循环中的油路"),
    ("knowledge-lub-families.png", "Lubricant families", "润滑油族系"),
    ("knowledge-lub-viscosity.png", "Viscosity versus temperature", "粘度–温度关系"),
    ("knowledge-lub-contamination.png", "Oil charge & contamination control", "充注与污染控制"),
    ("knowledge-pipe-cycle.png", "Refrigerant piping roles in the cycle", "循环中的制冷剂管路角色"),
    ("knowledge-pipe-sizing.png", "Pipe sizing geometry", "管径选型几何"),
    ("knowledge-pipe-supports.png", "Pipe supports and expansion", "支架与热膨胀"),
    ("knowledge-pipe-corrosion.png", "Piping corrosion risks", "管路腐蚀风险"),
    ("knowledge-pipe-insulation.png", "Pipe insulation & vapor barrier", "保温与隔汽层"),
    ("knowledge-encl-role.png", "Enclosure roles in a heat-pump package", "热泵机组机柜角色"),
    ("knowledge-encl-frame.png", "Frame, panels, doors, and IP", "机架、面板、门与防护等级"),
    ("knowledge-encl-segregation.png", "Power and signal segregation", "强电与信号分隔"),
    ("knowledge-encl-routing.png", "Cable trays and bend radius", "线槽与弯曲半径"),
    ("knowledge-elec-layers.png", "Electrical layers in a heat-pump package", "热泵电气分层"),
    ("knowledge-elec-motor.png", "Compressor motor drive basics", "压缩机电机驱动基础"),
    ("knowledge-elec-vfd.png", "VFD / inverter drive", "变频器 / 逆变驱动"),
    ("knowledge-elec-panel.png", "Control panel layout", "电控柜布置"),
    ("knowledge-elec-controller.png", "Controller & I/O", "控制器与 I/O"),
    ("knowledge-elec-iot.png", "IoT / remote monitoring", "物联网 / 远程监测"),
    ("knowledge-ref-timeline.png", "Refrigerant generations timeline", "制冷剂代际时间轴"),
    ("knowledge-ref-gwp-landscape.png", "GWP landscape of common fluids", "常用工质 GWP 景观"),
    ("knowledge-ref-policy-map.png", "Policy & phase-down map", "政策与削减路线图"),
    ("knowledge-ref-regions-matrix.png", "Regional refrigerant matrix", "区域制冷剂矩阵"),
    ("knowledge-shop-tools.png", "Shop tools for assembly & service", "装配与售后工具"),
    ("knowledge-shop-inline.png", "Inline production checkpoints", "产线在线检查点"),
    ("knowledge-shop-loop.png", "Factory test loop", "工厂测试回路"),
    ("knowledge-shop-perf.png", "Performance test bench", "性能测试台"),
]

MANIFEST = Path(__file__).resolve().parent / "knowledge-3d-restore-manifest.json"


def original_size(name: str) -> tuple[int, int]:
    """Pixel size of the pristine asset at RESTORE_COMMIT."""
    # Prefer manifest cache
    if MANIFEST.exists():
        data = json.loads(MANIFEST.read_text(encoding="utf-8"))
        for row in data:
            if row["file"] == name and "width" in row and "height" in row:
                return int(row["width"]), int(row["height"])
    # Fall back: checkout blob to temp via git show | Pillow
    import io

    blob = subprocess.check_output(["git", "show", f"{RESTORE_COMMIT}:public/images/{name}"])
    with Image.open(io.BytesIO(blob)) as im:
        return im.size


def build_manifest() -> list[dict]:
    rows = []
    for name, en, zh in LEGENDS:
        w, h = original_size(name)
        rows.append({"file": name, "en": en, "zh": zh, "width": w, "height": h})
    MANIFEST.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return rows


def has_legend(im: Image.Image, orig_h: int) -> bool:
    w, h = im.size
    if h == orig_h + LEGEND_H:
        # Confirm corner mark
        c = im.getpixel((2, h - 2))
        return c[:3] == CORNER_MARK
    return False


def strip_false_legend(im: Image.Image, orig_w: int, orig_h: int) -> Image.Image:
    """If height grew without our marker (bad prior run), crop back to original."""
    w, h = im.size
    if w == orig_w and h == orig_h:
        return im
    if w == orig_w and h == orig_h + LEGEND_H:
        c = im.getpixel((2, h - 2))
        if c[:3] == CORNER_MARK:
            return im  # good
        # Bad strip from false positive skip — but wait, false skip didn't add strip.
        # If we wrote without marker in first version, crop.
        return im.crop((0, 0, orig_w, orig_h))
    if w == orig_w and h > orig_h:
        # Unexpected — crop to original height from top
        return im.crop((0, 0, orig_w, orig_h))
    return im


def process_one(path: Path, en: str, zh: str, orig_w: int, orig_h: int, f_en, f_zh) -> None:
    im = Image.open(path).convert("RGB")
    im = strip_false_legend(im, orig_w, orig_h)

    if has_legend(im, orig_h):
        print(f"skip {path.name} (legend present)")
        return

    # Ensure we start from pristine pixels: if size wrong, re-fetch from git
    if im.size != (orig_w, orig_h):
        import io

        blob = subprocess.check_output(
            ["git", "show", f"{RESTORE_COMMIT}:public/images/{path.name}"]
        )
        im = Image.open(io.BytesIO(blob)).convert("RGB")
        print(f"  re-fetched {path.name} from {RESTORE_COMMIT}")

    w, h = im.size
    out = Image.new("RGB", (w, h + LEGEND_H), MARKER_RGB)
    out.paste(im, (0, 0))
    d = ImageDraw.Draw(out)
    d.line([(12, h + 1), (w - 12, h + 1)], fill=RULE, width=1)
    bilingual_center(d, (w / 2, h + LEGEND_H / 2), en, zh, f_en, f_zh, INK, MUTED, gap=2)
    # Corner marker for idempotency
    d.point((2, h + LEGEND_H - 2), fill=CORNER_MARK)
    d.point((3, h + LEGEND_H - 2), fill=CORNER_MARK)
    d.point((2, h + LEGEND_H - 3), fill=CORNER_MARK)
    out.save(path, "PNG", optimize=True)
    print(f"wrote {path.name} ({w}×{h + LEGEND_H})")


def main() -> None:
    require_cjk_font()
    f_en = font_cjk(13)
    f_zh = font_cjk(11)

    rows = build_manifest()
    missing = 0
    for row in rows:
        path = IMAGES_OUT / row["file"]
        if not path.exists():
            print(f"missing {row['file']}", file=sys.stderr)
            missing += 1
            continue
        process_one(
            path,
            row["en"],
            row["zh"],
            int(row["width"]),
            int(row["height"]),
            f_en,
            f_zh,
        )

    if missing:
        print(f"WARNING: {missing} file(s) missing", file=sys.stderr)
        sys.exit(1)
    print(f"done — {len(rows)} legends → {IMAGES_OUT}")


if __name__ == "__main__":
    main()
