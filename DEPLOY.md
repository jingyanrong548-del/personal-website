# 部署说明

本站默认部署到 **GitHub Pages** 与 **阿里云轻量应用服务器**。备案号：闽ICP备2026003850号。

---

## 一、GitHub Pages（自动）

- 推送 `main` 分支即触发 GitHub Actions 构建并部署。
- 仓库 **Settings → Pages** 中 Source 选择 **GitHub Actions**。
- 自定义域名通过 `public/CNAME`（内容为 `www.jingyanrong.com`）生效。

**操作：**
```bash
git add .
git commit -m "更新内容"
git push origin main
```

---

## 二、阿里云轻量服务器

### 自动部署（推荐，一次配置后推送 main 即同步）

推送 `main` 分支后，GitHub Actions 会构建并**自动部署到阿里云**（需先完成下方「一次性配置」）。

### 一次性配置（必做一次）

1. **在服务器上添加部署公钥**  
   - 本机生成仅用于部署的密钥（不共用日常登录密钥）：  
     `ssh-keygen -t ed25519 -f ~/.ssh/aliyun_deploy -N ""`  
   - 将 `~/.ssh/aliyun_deploy.pub` 内容追加到服务器：  
     `ssh root@8.138.191.154 "mkdir -p ~/.ssh; echo '粘贴公钥内容' >> ~/.ssh/authorized_keys"`  
   或把公钥内容复制后，SSH 登录服务器，执行 `echo '公钥内容' >> ~/.ssh/authorized_keys`。

2. **在 GitHub 仓库添加 Secret**  
   - 打开仓库 **Settings → Secrets and variables → Actions**。  
   - 点 **New repository secret**，名称填 **`ALIYUN_SSH_PRIVATE_KEY`**，值填 **`~/.ssh/aliyun_deploy`** 文件的**整段内容**（含 `-----BEGIN ... KEY-----` 和 `-----END ... KEY-----`）。  
   - 保存。

3. **启用阿里云自动部署**  
   - 在 **Settings → Secrets and variables → Actions** 中，切到 **Variables** 页。  
   - 点 **New repository variable**，名称填 **`ALIYUN_DEPLOY_ENABLED`**，值填 **`true`**。  
   - 保存后，每次 `git push origin main` 会同时部署到 GitHub Pages 和阿里云。若未添加该变量，阿里云部署步骤将自动跳过。

### 手动部署（可选）

**第一次部署**：请按 **[ALIYUN-FIRST-DEPLOY.md](./ALIYUN-FIRST-DEPLOY.md)** 的详细步骤操作（从获取宝塔面板地址到上传、解析、HTTPS）。

服务器已备案，域名需在 **30 天内** 解析到阿里云内地服务器；若为新增网站，开通后 **30 日内** 需完成公安备案。

### 1. 本机构建

```bash
npm ci
npm run build
```

产物在 `dist/` 目录。

### 2. 上传到服务器

用 SSH 将 `dist/` 内容上传到服务器（网站根目录为 `/www/wwwroot/www.jingyanrong.com`，与宝塔/nginx 一致）：

```bash
# 将下面替换为你的实际路径和服务器 IP
export SERVER="root@8.138.191.154"
export REMOTE_DIR="/www/wwwroot/www.jingyanrong.com"

rsync -avz --delete dist/ $SERVER:$REMOTE_DIR/
```

若未安装 `rsync`，可用 `scp`：

```bash
scp -r dist/* root@8.138.191.154:/www/wwwroot/www.jingyanrong.com/
```

### 3. 宝塔面板配置（手动）

1. 登录宝塔面板（端口 8888，从阿里云轻量控制台「应用详情」可获取面板地址与默认账号密码）。
2. **网站** → 添加站点（若尚未添加）：
   - 域名：`www.jingyanrong.com`（及 `jingyanrong.com` 如需）
   - 根目录：如 `/www/wwwroot/www.jingyanrong.com`
   - PHP 选「纯静态」或关闭 PHP。
3. 将上面步骤 2 中上传的 `dist` 内容放到该站点根目录（即 `dist/*` 对应到根目录下的 `index.html` 和 `assets/` 等）。
4. 若使用 HTTPS，在宝塔中为该站点申请 SSL 证书并开启强制 HTTPS。

### 4. 域名解析（手动）

在域名服务商处添加解析：

- 主机记录：`www`（以及 `@` 若要用根域名）
- 记录类型：`A`
- 记录值：`8.138.191.154`（你的轻量服务器公网 IP，若有变请替换）

---

## 备案与合规

- 首页底部已按工信部要求放置备案号 **闽ICP备2026003850号**，并链接至 https://beian.miit.gov.cn/
- 首页底部已放置 **公安备案号** **闽公网安备35010402351823号**，并链接至 https://beian.mps.gov.cn/
- 新增网站需在开通后 30 日内完成公安备案，详见阿里云备案邮件或控制台说明。

---

## URL 重定向（信息架构归并，2026-07）

旧独立页已合并为 Hub 子章节；构建产物仍保留 stub HTML（meta refresh + JS），建议在宝塔/nginx 为以下路径配置 **301** 以兼顾 SEO：

| 旧路径 | 新目标 |
|--------|--------|
| `/heat-pump-refrigerants.html` | `/knowledge-refrigerants.html#refrigerant-data-table` |
| `/heat-pump-policies.html` | `/heat-pump-standards.html#policies` |
| `/useful-links.html` | `/heat-pump-standards.html#links` |

宝塔示例（站点 `www.jingyanrong.com` → 设置 → 配置文件，在 `server { }` 内追加）：

```nginx
location = /heat-pump-refrigerants.html {
    return 301 /knowledge-refrigerants.html#refrigerant-data-table;
}
location = /heat-pump-policies.html {
    return 301 /heat-pump-standards.html#policies;
}
location = /useful-links.html {
    return 301 /heat-pump-standards.html#links;
}
```

修改后重载 nginx。GitHub Pages 依赖各 stub 页内重定向，无需额外配置。

---

## 知识库示意/图表生成（双语图）

知识库示意与首页 HTHP 构型叠标由本地脚本维护。CI **不**运行这些脚本；改文案后请在本机生成并提交资源。

**依赖：** Python 3 + [Pillow](https://pillow.readthedocs.io/)；需中英均可渲染的字体（macOS 通常自带；Linux 可 `sudo apt install fonts-noto-cjk`）。

**命令：**

```bash
npm run generate:diagrams
```

当前会运行：

- `scripts/generate-knowledge-cycles-diagrams.py` — 循环导读示意（可脚本重绘）
- `scripts/generate-knowledge-extreme-cold-charts.py` — 极寒两张图表资产校验（**不重绘**）。中文原图为 `*.zh.png`（勿覆盖）；英文为同名 `*.png`（以中文图为底改英文标注）。页面用 `data-i18n-src-zh` 换图。
- `scripts/generate-hthp-config-overlays.py` — HTHP 构型叠标（幂等；重做前 `git checkout -- public/images/hthp-configs/`）
- `scripts/overlay-knowledge-3d-legends.py` — **3D/实物原图底部双语图例**（不重绘主体；清单见 `scripts/knowledge-3d-restore-manifest.json`）

**3D 中英换图：** 清单内英文原图为 `public/images/<name>.png`；中文标注版为同名 `.zh.png`。词表见 `scripts/knowledge-3d-zh-glossary.json`（译文以图内英文为准）。页面用 `data-i18n-src-zh`，由 `src/i18n.js` 按语言切换 `src`。**.zh.png 不进** `generate:diagrams`，避免被脚本覆盖。

**重要：** `generate-knowledge-{comp,valve,hx,vessel,lub,pipe,encl,elec,ref,shop}-diagrams.py` 仅作备查，**禁止**默认跑进 `generate:diagrams`，否则会再次用框线图覆盖 3D 原图。若需恢复原图：

```bash
# 从部署前 commit 检出原图，再叠图例
git checkout 6238163 -- $(jq -r '.[].file | "public/images/\(.)"' scripts/knowledge-3d-restore-manifest.json)
python3 scripts/overlay-knowledge-3d-legends.py
```

共享字体/双语绘制：`scripts/diagram_style.py`（无 CJK 字体会退出并提示）。

生成后照常 `npm run build` / 推送 `main`，GitHub Pages 与阿里云仍只部署 `dist/`。
