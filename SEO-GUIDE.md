# SEO 优化指南 - 搜索引擎提交说明

本网站已完成 SEO 优化，备案完成后可按以下步骤提交到各主流搜索引擎，加速收录。

## ✅ 已完成的 SEO 优化

1. **Meta 标签优化**：Title、Description、Keywords、Robots 指令
2. **Open Graph 标签**：支持社交媒体分享、Twitter Card
3. **结构化数据（JSON-LD）**：Person、WebSite 结构化数据
4. **技术 SEO**：Canonical URL、robots.txt、sitemap.xml
5. **百度自动推送**：页面被访问时自动将 URL 提交给百度（已嵌入）
6. **IndexNow 支持**：支持 Bing、Yandex 等快速收录协议（见下文）

---

## 📝 搜索引擎提交步骤（备案后必做）

### 1. 百度搜索资源平台（国内首选）

**站长平台**：https://ziyuan.baidu.com/

1. 使用百度账号登录
2. 添加网站：`www.jingyanrong.com`
3. 验证网站所有权（推荐 **HTML 标签验证**，在 `<head>` 中加入百度提供的 meta 标签）
4. 验证成功后：
   - **站点地图**：提交 `https://www.jingyanrong.com/sitemap.xml`
   - **主动推送**：在「数据引入」→「链接提交」→「主动推送」中提交首页及重要页面 URL
   - **自动推送**：✅ 已在本站嵌入，用户访问页面时会自动推送，无需额外操作

**百度链接提交三种方式**（可同时使用）：
| 方式 | 说明 | 本站状态 |
|------|------|----------|
| 自动推送 | 页面嵌入 JS，访问时自动提交 | ✅ 已启用 |
| 主动推送 | 通过 API 批量提交 URL | 需在站长平台操作 |
| sitemap | 提交 sitemap.xml | 需在站长平台提交 |

---

### 2. 必应 (Bing) Webmaster Tools（国际搜索引擎）

**站长平台**：https://www.bing.com/webmasters

1. 使用 Microsoft 账号登录
2. 添加网站：`https://www.jingyanrong.com`
3. 验证所有权（推荐 DNS 或 HTML 标签）
4. 提交 sitemap：`https://www.jingyanrong.com/sitemap.xml`
5. （可选）使用 **URL 提交** 工具手动提交首页，加速首次收录

**IndexNow 快速提交**（Bing 支持，可立即通知收录）：
- 本站已配置 IndexNow 密钥文件：`https://www.jingyanrong.com/7f3e9a2b4c8d1e6f.txt`
- 手动触发提交（在终端执行）：
  ```bash
  curl "https://www.bing.com/indexnow?url=https://www.jingyanrong.com/&key=7f3e9a2b4c8d1e6f&keyLocation=https://www.jingyanrong.com/7f3e9a2b4c8d1e6f.txt"
  ```
- 一次提交后，Bing 与 Yandex 会共享索引

---

### 3. 360 搜索站长平台

**站长平台**：https://zhanzhang.so.com/

1. 登录 360 账号
2. 添加网站并验证
3. 提交 sitemap：`https://www.jingyanrong.com/sitemap.xml`

---

### 4. 搜狗站长平台

**站长平台**：https://zhanzhang.sogou.com/

1. 登录搜狗账号
2. 添加网站并验证
3. 提交 sitemap：`https://www.jingyanrong.com/sitemap.xml`

---

### 5. 神马搜索站长平台（UC/阿里巴巴）

**站长平台**：https://zhanzhang.sm.cn/

1. 登录神马/阿里账号
2. 添加网站并验证
3. 提交 sitemap：`https://www.jingyanrong.com/sitemap.xml`

---

## 🔍 验证是否被收录

在各搜索引擎中搜索：

| 搜索引擎 | 搜索命令 |
|----------|----------|
| 百度 | `site:www.jingyanrong.com` |
| Google | `site:www.jingyanrong.com` |
| 必应 | `site:www.jingyanrong.com` |
| 搜狗 | `site:www.jingyanrong.com` |
| 360 | `site:www.jingyanrong.com` |

也可直接搜索：`荆炎荣` 或 `Jing Yanrong 工业制冷`

---

## ⏰ 预期索引时间

| 搜索引擎 | 首次收录通常耗时 |
|----------|------------------|
| Google | 1-7 天 |
| 必应 | 1-7 天（IndexNow 可加速） |
| 百度 | 1-2 周（自动推送+主动推送可加速） |
| 360 / 搜狗 / 神马 | 1-4 周 |

备案完成后，国内搜索引擎（百度、360、搜狗、神马）才能正常抓取，请先完成备案再提交。

---

## 🛠️ 技术维护

- 定期更新 `public/sitemap.xml` 中的 `<lastmod>` 日期
- 确保以下文件可访问：
  - `https://www.jingyanrong.com/robots.txt`
  - `https://www.jingyanrong.com/sitemap.xml`
  - `https://www.jingyanrong.com/7f3e9a2b4c8d1e6f.txt`（IndexNow 密钥）

---

## 📞 参考链接

- [Google Search Console](https://search.google.com/search-console)
- [百度搜索资源平台](https://ziyuan.baidu.com/)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [IndexNow 协议说明](https://www.indexnow.org/)

---

**最后更新**：2026年2月
