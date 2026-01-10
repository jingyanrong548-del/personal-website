// 网站统计配置文件示例
// 使用方法：
// 1. 复制此文件为 analytics-config.js
// 2. 填写您的实际统计ID
// 3. 在 index.html 中引入此配置文件（如果使用模块化方式）

export const analyticsConfig = {
  // Google Analytics (GA4) Measurement ID
  // 格式：G-XXXXXXXXXX
  // 获取方式：https://analytics.google.com/ → 管理 → 数据流
  googleAnalyticsId: 'YOUR_GA4_MEASUREMENT_ID',
  
  // 百度统计站点ID
  // 获取方式：https://tongji.baidu.com/ → 网站列表 → 获取代码
  baiduSiteId: 'YOUR_BAIDU_SITE_ID',
  
  // 是否启用统计（可以临时禁用）
  enabled: true
};

// 如果使用此配置文件，需要在 index.html 中修改统计代码：
// 1. 添加：<script type="module" src="/analytics-config.js"></script>
// 2. 在统计代码中使用：analyticsConfig.googleAnalyticsId
