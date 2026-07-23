#!/usr/bin/env python3
"""Extreme-cold knowledge charts — language-swapped assets.

Chinese originals (do NOT regenerate / overwrite):
  public/images/knowledge-co2-heating-demand-vs-output.zh.png
  public/images/knowledge-extreme-cold-15yr-lifecycle-cost.zh.png

English variants (derived from Chinese artwork, English labels only):
  public/images/knowledge-co2-heating-demand-vs-output.png
  public/images/knowledge-extreme-cold-15yr-lifecycle-cost.png

Pages use data-i18n-src-zh; setLanguage swaps src. This script is intentionally
a no-op guard so `npm run generate:diagrams` never clobbers the Chinese originals.
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from diagram_style import IMAGES_OUT  # noqa: E402

REQUIRED = [
    "knowledge-co2-heating-demand-vs-output.png",
    "knowledge-co2-heating-demand-vs-output.zh.png",
    "knowledge-extreme-cold-15yr-lifecycle-cost.png",
    "knowledge-extreme-cold-15yr-lifecycle-cost.zh.png",
]


def main() -> None:
    missing = [n for n in REQUIRED if not (IMAGES_OUT / n).exists()]
    if missing:
        print("ERROR: missing extreme-cold chart assets:", ", ".join(missing), file=sys.stderr)
        print(
            "Restore ZH from git history (a610227 / 5aba2ee) and EN from the paired English artwork.",
            file=sys.stderr,
        )
        sys.exit(1)
    print("OK: extreme-cold EN/ZH chart assets present (ZH originals left untouched).")


if __name__ == "__main__":
    main()
