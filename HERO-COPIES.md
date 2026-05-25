# Hero 文案备选（双子句：宽温域 + 极寒 CO₂）

当前主标题采用 **方案 A**：前半句能力跨度，后半句差异化楔子。修改位置：[`src/i18n.js`](src/i18n.js) 中 `hero.headline`（中英文）；[`index.html`](index.html) 内同名 `data-i18n` 节点为英文 fallback。

---

## 中文 (hero.headline)

| 编号 | 文案 | 说明 |
|------|------|------|
| **A** ✅ 当前采用 | `−100℃ 工业冷冻至 300℃ 工业供热 · 极寒 CO₂ 复叠工程落地` | 并重策略；与洞察文 −40～+300℃、冷冻 −100℃ 叙事一致 |
| B | `工业冷冻与宽温域热泵（热泵 / MVR / 蒸汽）· 深耕极寒 CO₂ 复叠落地` | 突出技术形态，移动端略长 |
| C | `三十年工业冷热系统 · 极寒 CO₂ 复叠与 30–300℃ 供热架构落地` | 强调年限；温区与 expertise 分档需对照 |

---

## 英文 (hero.headline)

| 编号 | 文案 | 说明 |
|------|------|------|
| **A** ✅ 当前采用 | `Industrial refrigeration (−100°C class) through 300°C process heat · CO₂ cascade deployment in extreme cold` | 与中文 A 对齐 |
| B | `Industrial refrigeration & wide-temperature heat pumps (HP / MVR / steam) · CO₂ cascade in extreme cold` | 对应中文 B |
| C | `Three decades in industrial cold & heat · CO₂ cascade & 30–300°C heating architecture` | 对应中文 C |

---

## 关联键（同步修改时一并检查）

| 键名 | 用途 |
|------|------|
| `hero.subheadline` | 副标题；含冷冻背景 |
| `seo.pageTitle` / `seo.pageDescription` | 浏览器标题与摘要 |
| `missionStrip.greeting` | 首页顶部条 |
| `about.matrix.1.value` / `.sub` | 关于区矩阵 |

---

## 不建议作为主 H1

- `专注极寒场景与 CO₂ 复叠循环的工程落地` — 易被读成只做极寒 CO₂
- `近期专注极寒场景与 CO₂ 复叠循环的工程落地` — 「近期」削弱长期权威感

---

## 历史备选（已弃用）

曾用「工程积淀 → 决策工具」类标题，见 git 历史；若需工具向主标题可另开分支讨论，不与当前并重策略混用。
