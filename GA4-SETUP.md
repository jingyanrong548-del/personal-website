# GA4（Google Analytics 4）配置步骤

本站采用 **Google Analytics 4** 统计全球访问。按下列步骤在 Google 后台创建媒体资源并获取 Measurement ID，再在本站填写即可生效。

---

## 一、在 Google Analytics 获取 Measurement ID

### 1. 登录并进入 Analytics

- 打开：**https://analytics.google.com/**
- 使用你的 **Google 账号**登录。

### 2. 创建账号（若还没有）

- 左下角点击 **「管理」**（齿轮图标）。
- 在「账号」列点击 **「创建账号」**。
- 填写账号名称（如：`个人网站`），点击 **「下一步」** → **「创建」**。

### 3. 创建 GA4 属性

- 仍在「管理」页面，「属性」列中点击 **「创建属性」**。
- **属性名称**：例如 `www.jingyanrong.com` 或 `荆炎荣个人站`。
- **报告时区**：选择 **（GMT+08:00）北京、重庆、香港…**。
- **货币**：选 **人民币 (CNY)** 或按需选择。
- 点击 **「下一步」** → **「创建」**。

### 4. 添加网站数据流

- 在「数据流」步骤选择 **「网站」**。
- **网址**：填写 `https://www.jingyanrong.com`（与本站一致）。
- **数据流名称**：可填 `主站` 或保持默认。
- 点击 **「创建数据流」**。

### 5. 复制 Measurement ID

- 创建完成后会进入该数据流详情页。
- 在页面右上角可见 **「衡量 ID」** / **Measurement ID**，格式为：**`G-XXXXXXXXXX`**（例如 `G-ABC12DEF3`）。
- **复制这串 ID**，下一步会粘贴到本站代码中。

---

## 二、在本站填写 Measurement ID

1. 打开项目中的 **`index.html`**。
2. 搜索 **`YOUR_GA4_MEASUREMENT_ID`**（约在第 113 行）。
3. 将  
   `var gaId = 'YOUR_GA4_MEASUREMENT_ID';`  
   改为  
   `var gaId = 'G-XXXXXXXXXX';`  
   （把 `G-XXXXXXXXXX` 换成你复制的真实 ID，保留引号）。
4. 保存文件，重新构建并部署。

---

## 三、验证是否生效

1. 部署后访问你的网站：https://www.jingyanrong.com  
2. 在 GA4 后台：**报告** → **实时**，稍等几秒，若能看到 **1 位用户** 或更多，即表示统计已生效。

---

## 四、可选：仅使用 GA4 时

- 本站已预留百度统计脚本；若只使用 Google，可保留百度统计代码但不填写 `YOUR_BAIDU_SITE_ID`，该脚本不会加载，不会影响 GA4。
- 需要同时看国内数据时，再在百度统计获取站点 ID 并填入即可。

---

**完成后**：访问量、地区分布等可在 **https://analytics.google.com/** 的「报告」中查看。
