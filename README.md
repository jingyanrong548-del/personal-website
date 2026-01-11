# 个人网站 / Personal Website

使用 Vite 构建的个人网站项目，自动部署到 GitHub Pages。

## 🚀 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

开发服务器将在 `http://localhost:3000` 启动。

## 📦 构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

构建后的文件将输出到 `dist` 目录。

## 🚢 部署

本项目使用 **GitHub Actions** 自动部署到 GitHub Pages。

### 部署流程

1. **提交代码**
   ```bash
   git add .
   git commit -m "你的提交信息"
   git push origin main
   ```

2. **自动部署**
   - 推送代码后，GitHub Actions 会自动触发
   - 自动执行构建和部署流程
   - 部署完成后，网站会在几分钟内更新

### GitHub Pages 设置

确保在 GitHub 仓库设置中：
1. 进入仓库的 **Settings** → **Pages**
2. 在 "Source" 下选择 **"GitHub Actions"**（而不是 "Deploy from a branch"）

### 手动触发部署

如果需要手动触发部署：
1. 进入 GitHub 仓库的 **Actions** 标签
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow"

## 📁 项目结构

```
.
├── src/
│   ├── main.js      # JavaScript 入口文件
│   └── style.css    # 样式文件
├── public/          # 静态资源（如 CNAME）
├── dist/            # 构建输出目录（不提交到 Git）
├── index.html       # HTML 入口文件
├── vite.config.js   # Vite 配置
└── package.json     # 项目配置和依赖
```

## 🔧 技术栈

- **Vite** - 构建工具
- **Vanilla JavaScript** - 纯 JavaScript
- **CSS** - 原生 CSS

## 📝 注意事项

- 构建后的文件（`dist` 目录）不应该提交到 Git
- `assets` 目录是构建产物，不应该提交到 Git
- CNAME 文件放在 `public` 目录中，构建时会被自动复制

## 🔢 版本管理

本项目采用**语义化版本（SemVer）**规则，版本号格式为 `MAJOR.MINOR.PATCH`。

### 自动版本递增

**每次使用 `git push` 推送到 GitHub 时，版本号会自动递增 PATCH 版本。**

例如：`1.0.0` → `1.0.1` → `1.0.2` ...

### 手动管理版本

```bash
# 增加 PATCH 版本（修复 bug，默认）
npm run version:patch

# 增加 MINOR 版本（新功能）
npm run version:minor

# 增加 MAJOR 版本（重大更新）
npm run version:major
```

详细说明请查看 [VERSION-MANAGEMENT.md](./VERSION-MANAGEMENT.md)
