# 阿里云轻量服务器 · 首次部署个人网页（详细步骤）

本文是**第一次**在阿里云轻量服务器上部署本仓库个人网页的完整步骤，按顺序执行即可。

---

## 前置准备

- 本机已安装 **Node.js**（建议 18+）和 **npm**。
- 能通过 SSH 登录服务器：`ssh root@8.138.191.154`（已绑定密钥）。
- 域名 **www.jingyanrong.com**（或 jingyanrong.com）已备案，且准备解析到当前服务器。

---

## 第一步：获取宝塔面板登录信息

1. 打开 [阿里云轻量应用服务器控制台](https://swasnext.console.aliyun.com/)。
2. 找到实例 **「宝塔Linux面板-wecb」**，点击进入详情。
3. 顶部标签切换到 **「应用详情」**。
4. **端口放通**：若未放通，先点「防火墙一键放行应用端口: 8888」。
5. **面板地址**：在「面板首页地址」处点击 **「执行命令」**，执行后复制输出的「外网面板地址」；或点击 **「远程连接」** 登录服务器后执行：
   ```bash
   sudo /etc/init.d/bt default | grep 外网面板地址
   ```
6. **面板账号密码**：同页「面板默认的用户名和密码」处点击 **「执行命令」**，或 SSH 进服务器后执行：
   ```bash
   sudo /etc/init.d/bt default | grep -E 'username|password'
   ```
7. 用浏览器打开上一步得到的**外网面板地址**，用得到的用户名、密码登录宝塔。

---

## 第二步：在服务器上创建网站目录

两种方式二选一。

### 方式 A：用宝塔创建（推荐第一次）

1. 登录宝塔面板后，左侧点 **「网站」**。
2. 点击 **「添加站点」**。
3. 填写：
   - **域名**：`www.jingyanrong.com`（若也要用根域名，可再加一行 `jingyanrong.com`，或稍后在站点设置里加）。
   - **根目录**：用默认即可，例如 `/www/wwwroot/www.jingyanrong.com`（宝塔会自动创建该目录）。
   - **FTP / 数据库**：不勾选。
4. 提交后，站点会生成，**网站根目录**即为该路径（例如 `/www/wwwroot/www.jingyanrong.com`），记下备用。

### 方式 B：用 SSH 创建

```bash
ssh root@8.138.191.154
sudo mkdir -p /www/wwwroot/www.jingyanrong.com
exit
```

若你打算用其他路径，请把下文所有 `/www/wwwroot/www.jingyanrong.com` 换成你的路径。

---

## 第三步：本机构建网站

在**你的电脑**上，进入本项目目录（与 `package.json` 同级）：

```bash
cd /Users/jingyanrong/Desktop/MyGitHubProjects/personal-website

# 安装依赖（首次或 package.json 有变更时）
npm ci

# 构建
npm run build
```

构建成功后，当前目录下会有 **`dist`** 文件夹，里面是 `index.html`、`assets/` 等要部署的文件。

---

## 第四步：把 dist 内容上传到服务器

把**本机 `dist/` 里的所有内容**上传到服务器的**网站根目录**（即第二步里的路径，例如 `/www/wwwroot/www.jingyanrong.com`）。根目录下应直接是 `index.html` 和 `assets` 文件夹，不要多一层 `dist`。

### 方式 A：用 rsync（推荐）

```bash
cd /Users/jingyanrong/Desktop/MyGitHubProjects/personal-website

rsync -avz --delete dist/ root@8.138.191.154:/www/wwwroot/www.jingyanrong.com/
```

- `dist/` 末尾的 `/` 表示只同步目录**内容**，不会在服务器上多出一个 `dist` 目录。
- `--delete` 会删除服务器上多余文件，与本地保持一致。

### 方式 B：用 scp

若服务器上目录已存在且为空或可清空：

```bash
cd /Users/jingyanrong/Desktop/MyGitHubProjects/personal-website

# 先清空服务器上的目录（谨慎：确认路径无误再执行）
ssh root@8.138.191.154 "rm -rf /www/wwwroot/www.jingyanrong.com/*"

# 再上传
scp -r dist/* root@8.138.191.154:/www/wwwroot/www.jingyanrong.com/
```

上传完成后，可在服务器上检查：

```bash
ssh root@8.138.191.154 "ls -la /www/wwwroot/www.jingyanrong.com/"
```

应能看到 `index.html`、`assets` 等。

---

## 第五步：在宝塔里确认网站配置

1. 宝塔 → **网站** → 找到 **www.jingyanrong.com**，点站点名或「设置」。
2. **网站目录**：
   - 网站目录应指向 `/www/wwwroot/www.jingyanrong.com`（或你实际用的路径）。
   - 若你用的是「方式 B」自己建的目录，需在宝塔里「添加站点」时把根目录选成该路径，或在此处改成该路径。
3. **默认文档**：确保有 `index.html`（宝塔默认通常已包含）。
4. **保存** 后，可先用 IP 测一下（见下方「用 IP 测试」）。

若你**没有**在第二步用宝塔「添加站点」，而是只用 SSH 建了目录：

- 需要在宝塔 **网站 → 添加站点** 补加一站：
  - 域名：`www.jingyanrong.com`
  - 根目录：`/www/wwwroot/www.jingyanrong.com`（或你创建的路径）

---

## 第六步：域名解析

在**购买域名的服务商**（阿里云、腾讯云、GoDaddy 等）的 DNS 解析里添加：

| 主机记录 | 记录类型 | 记录值        | TTL（可选） |
|----------|----------|---------------|-------------|
| www      | A        | 8.138.191.154 | 600 或默认  |
| @        | A        | 8.138.191.154 | 600 或默认  |

- **www**：用于访问 `https://www.jingyanrong.com`。
- **@**：用于访问 `https://jingyanrong.com`（若需根域名也打开本站）。

解析生效通常要几分钟到几十分钟。

---

## 第七步：检查防火墙与访问

- **阿里云轻量**：实例的「防火墙」里需放行 **80**（HTTP）、**443**（HTTPS）。你之前已放过 80/443，一般无需再改。
- **宝塔**：若宝塔自带防火墙开启了，确保放行 80/443。

**用 IP 测（不依赖域名）：**

在浏览器打开：

`http://8.138.191.154`

若宝塔里该站点是**唯一站点**或默认站点，可能能直接打开你的页面；若打不开或不是你的站，用域名测。

**用域名测：**

解析生效后访问：

- `http://www.jingyanrong.com`
- （若加了 @ 解析）`http://jingyanrong.com`

应能看到个人网页，且首页底部有备案号 **闽ICP备2026003850号**。

---

## 第八步：（可选）开启 HTTPS

1. 宝塔 → **网站** → 选中 **www.jingyanrong.com** → **设置**。
2. 左侧选 **「SSL」**。
3. 选 **「Let's Encrypt」**，勾选域名，申请证书。
4. 申请成功后，可开启 **「强制 HTTPS」**。

---

## 以后更新网站怎么操作

1. 本机改代码后：
   ```bash
   cd /Users/jingyanrong/Desktop/MyGitHubProjects/personal-website
   npm run build
   rsync -avz --delete dist/ root@8.138.191.154:/www/wwwroot/www.jingyanrong.com/
   ```
2. 无需改宝塔或 DNS，刷新浏览器即可看到新内容。

---

## 常见问题

- **访问显示 403 / 目录列表**：检查网站根目录下是否有 `index.html`，且宝塔里该站点的「网站目录」指的就是这个目录。
- **访问显示 404**：多为 Nginx 未把请求交给该站点，或域名没解析到本机；检查宝塔里该站点绑定的域名和 DNS 解析。
- **样式/脚本 404**：确认是用 `dist/` 里的内容上传的，且 `assets/` 完整上传；路径不要多一层 `dist`。

若某一步报错，把**具体步骤**和**终端或浏览器报错信息**记下来，便于排查。
