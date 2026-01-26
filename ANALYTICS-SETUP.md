# 网站访问统计配置指南

本网站已集成多种访问统计工具，帮助您了解网站访问情况。

## 📊 已集成的统计工具

### 1. Google Analytics (GA4)
- **功能**：全球最流行的网站分析工具
- **优点**：功能强大，数据详细，支持实时统计
- **适用**：全球访问统计

### 2. 百度统计
- **功能**：国内主流的网站分析工具
- **优点**：针对中国用户优化，数据准确
- **适用**：中国地区访问统计

### 3. Vercel Web Analytics
- **功能**：Vercel 平台原生的网站分析工具
- **优点**：轻量级、高性能、零配置、自动部署集成
- **适用**：部署在 Vercel 上的网站实时统计

### 4. 本地访问计数器
- **功能**：简单的访问量统计
- **优点**：无需第三方服务，隐私友好
- **适用**：基础访问量统计

## 🔧 配置步骤

### 配置 Vercel Web Analytics

Vercel Web Analytics 已在 `index.html` 中自动配置，无需手动安装或配置代码。

#### 启用 Web Analytics

1. **登录 Vercel 控制面板**
   - 访问：https://vercel.com/dashboard
   - 登录您的 Vercel 账户

2. **选择项目**
   - 在仪表板中选择您的项目

3. **启用 Web Analytics**
   - 点击 **Analytics** 标签
   - 在弹出的对话框中点击 **Enable**
   - 启用 Web Analytics 后，在下一次部署时会自动添加新的路由（作用域为 `/_vercel/insights/*`）

4. **部署项目**
   ```bash
   vercel deploy
   ```

#### 查看数据

1. 登录 Vercel 仪表板
2. 选择您的项目
3. 点击 **Analytics** 标签
4. 查看实时访问者、页面浏览、地理位置等数据

#### 验证 Web Analytics 是否生效

访问您的网站后，打开浏览器开发者工具（F12），在 **Network** 标签中：
- 查看是否有来自 `/_vercel/insights/view` 的请求
- 如果看到该请求，说明 Web Analytics 正常运行

**💡 注意**：Vercel Web Analytics 是轻量级的，不需要像 Google Analytics 那样配置 Measurement ID。只需在 Vercel 控制面板启用它，该网站自动运行。

---

### 配置 Google Analytics (GA4)

1. **注册 Google Analytics 账号**
   - 访问：https://analytics.google.com/
   - 使用 Google 账号登录

2. **创建新的 GA4 属性**
   - 点击"管理" → "创建属性"
   - 填写网站信息：
     - 属性名称：`www.jingyanrong.com`
     - 时区：`(GMT+08:00) 北京，重庆，香港特别行政区，乌鲁木齐`
     - 货币：`人民币 (CNY)`

3. **获取 Measurement ID**
   - 在"管理" → "数据流"中创建数据流
   - 选择"网站"
   - 填写网站 URL：`https://www.jingyanrong.com`
   - 获取 Measurement ID（格式：`G-XXXXXXXXXX`）

4. **更新代码**
   - 打开 `index.html` 文件
   - 找到 `YOUR_GA4_MEASUREMENT_ID`
   - 替换为您的实际 Measurement ID（两处都需要替换）

```html
<!-- 将 YOUR_GA4_MEASUREMENT_ID 替换为您的 ID，例如：G-ABC123XYZ -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script>
  gtag('config', 'G-ABC123XYZ', {
    // ...
  });
</script>
```

### 配置百度统计

1. **注册百度统计账号**
   - 访问：https://tongji.baidu.com/
   - 使用百度账号登录

2. **添加网站**
   - 点击"网站列表" → "添加网站"
   - 填写网站信息：
     - 网站名称：`荆炎荣个人网站`
     - 网站地址：`https://www.jingyanrong.com`
     - 网站类型：`其他`
     - 行业类别：`其他`

3. **获取统计代码**
   - 添加网站后，系统会生成统计代码
   - 找到类似这样的代码：
   ```javascript
   hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
   ```
   - 提取代码中的站点ID（`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` 部分）

4. **更新代码**
   - 打开 `index.html` 文件
   - 找到 `YOUR_BAIDU_SITE_ID`
   - 替换为您的实际站点ID

```html
<!-- 将 YOUR_BAIDU_SITE_ID 替换为您的 ID -->
hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
```

### 本地访问计数器

本地访问计数器已自动配置，无需额外设置。它会在访问者的浏览器中记录：
- 总访问量（localStorage）
- 每日访问量（localStorage）
- 会话管理（sessionStorage，防止刷新重复计数）

**注意**：本地计数器数据存储在访问者浏览器中，不是服务器端数据。

## 📈 查看统计数据

### Google Analytics

1. 登录 https://analytics.google.com/
2. 选择您的属性
3. 查看"报告"：
   - **实时**：当前访问者
   - **获取**：流量来源
   - **参与度**：页面浏览、停留时间
   - **受众群体**：访问者特征

### 百度统计

1. 登录 https://tongji.baidu.com/
2. 选择您的网站
3. 查看报告：
   - **趋势分析**：访问量趋势
   - **来源分析**：流量来源
   - **受访页面**：热门页面
   - **访客分析**：访客特征
   - **转化路径**：用户行为

## 🔒 隐私说明

- **Google Analytics** 和 **百度统计** 会收集访问者的部分信息
- 本地计数器只在访问者浏览器本地存储，不会发送到服务器
- 建议在网站隐私政策中说明使用的统计工具

## ✅ 验证统计代码是否生效

### Google Analytics 验证

1. 访问您的网站
2. 打开 Google Analytics 实时报告
3. 查看是否显示您的访问

或使用浏览器扩展：
- Chrome: Google Analytics Debugger
- Firefox: GA Debugger

### 百度统计验证

1. 访问您的网站
2. 登录百度统计
3. 查看"实时访客"
4. 查看是否显示您的访问

或使用百度统计的"代码安装检查"功能。

## 🛠️ 高级配置（可选）

### Google Analytics 事件跟踪

如果需要跟踪特定事件（如点击应用卡片），可以添加：

```javascript
// 跟踪应用卡片点击
document.querySelectorAll('.app-card-link').forEach(card => {
  card.addEventListener('click', function() {
    gtag('event', 'app_click', {
      'app_name': this.querySelector('.app-title').textContent,
      'app_url': this.href
    });
  });
});
```

### 百度统计事件跟踪

```javascript
// 跟踪应用卡片点击
document.querySelectorAll('.app-card-link').forEach(card => {
  card.addEventListener('click', function() {
    _hmt.push(['_trackEvent', '应用', '点击', this.querySelector('.app-title').textContent]);
  });
});
```

## 📝 注意事项

1. **替换占位符**：部署前务必替换 `YOUR_GA4_MEASUREMENT_ID` 和 `YOUR_BAIDU_SITE_ID`
2. **测试环境**：在本地测试时，统计数据可能不准确
3. **数据延迟**：统计数据显示可能有几分钟延迟
4. **隐私合规**：确保符合 GDPR、个人信息保护法等法规要求

## 🆘 常见问题

**Q: 为什么看不到统计数据？**
A: 
- 检查代码是否正确替换了ID
- 等待几分钟（数据可能有延迟）
- 清除浏览器缓存后重新访问
- 检查浏览器是否阻止了统计脚本

**Q: 本地计数器数据会丢失吗？**
A: 本地计数器数据存储在用户浏览器中，清除浏览器数据后会重置。

**Q: 可以不使用第三方统计工具吗？**
A: 可以，如果只需要基础统计，可以只使用本地计数器。但第三方工具提供更详细的分析。

---

## 📊 多个分析工具的对比

| 工具 | 配置难度 | 性能 | 功能 | 隐私性 | 适用场景 |
|------|---------|------|------|--------|---------|
| **Vercel Web Analytics** | 非常简单 | 极高 | 基础但足够 | 高 | Vercel 部署的网站 |
| **Google Analytics** | 中等 | 中等 | 强大详细 | 中等 | 需要详细分析的网站 |
| **百度统计** | 中等 | 中等 | 强大详细 | 中等 | 中国用户为主的网站 |
| **本地计数器** | 简单 | 高 | 基础 | 极高 | 隐私优先的网站 |

## 🎯 推荐配置方案

### 方案 A：最小配置（推荐用于个人网站）
仅使用 **Vercel Web Analytics** + **本地计数器**
- 优点：轻量级、隐私友好、自动部署、无需配置 ID
- 适用：部署在 Vercel 上的个人网站

### 方案 B：完整配置（适合专业网站）
使用 **Vercel Web Analytics** + **Google Analytics** + **百度统计**
- 优点：数据全面、功能强大、多维度分析
- 适用：需要详细数据分析的专业网站

### 方案 C：隐私优先配置
仅使用 **Vercel Web Analytics** + **本地计数器**（禁用第三方 Analytics）
- 优点：完全隐私、无第三方追踪
- 适用：对隐私和 GDPR 合规有严格要求的网站

---

**最后更新**：2026年1月
