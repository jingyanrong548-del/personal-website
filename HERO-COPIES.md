# Hero 文案备选（中性版本，降低 AI 注入检测误报）

当前 hero headline 中的 "Encoded" / "封装" 等用词可能触发 Notion AI 等系统的 prompt injection 误报。以下是更中性的备选文案。

---

## 英文 (hero.headline)

| 编号 | 文案 | 说明 |
|------|------|------|
| **A** ✅ 当前采用 | `{experienceYears}+ Years of Engineering Judgment, Built into Tools.` | 用 Built 替代 Encoded，语义相近 |
| B | `{experienceYears}+ Years of Engineering Judgment, Turned into Tools.` | 转化为，自然表述 |
| C | `{experienceYears}+ Years of Engineering Know-How, Delivered as Tools.` | Know-How 更偏经验，Delivered 偏交付 |
| D | `{experienceYears}+ Years of Experience, Ready as Tools.` | 更简洁 |

---

## 中文 (hero.headline)

| 编号 | 文案 | 说明 |
|------|------|------|
| **A** ✅ 当前采用 | `{experienceYears} 年工程积淀，沉淀为可计算的<span class="hero-headline-emphasis">决策工具</span>。` | 用「沉淀」替代「封装」，语义相近 |
| B | `{experienceYears} 年工程积淀，转化为可计算的<span class="hero-headline-emphasis">决策工具</span>。` | 转化，更中性 |
| C | `{experienceYears} 年工程经验，以<span class="hero-headline-emphasis">工具</span>形式交付。` | 最简洁，无敏感词 |
| D | `{experienceYears} 年工程积淀，做成可计算的<span class="hero-headline-emphasis">决策工具</span>。` | 口语化，朴实 |

---

## 如何切换

在 `src/main.js` 中修改 `translations.en['hero.headline']` 和 `translations.zh['hero.headline']` 即可。  
`{experienceYears}` 和 `<span class="hero-headline-emphasis">` 需保留。
