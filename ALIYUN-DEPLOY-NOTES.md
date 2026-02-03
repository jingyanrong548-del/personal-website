# 阿里云自动部署备忘

供本站及**未来其他 app** 自动部署到同一台阿里云轻量服务器时参考。配置新项目时可按本清单逐项核对。

---

## 服务器与路径

| 项目 | 值 |
|------|-----|
| 服务器 | 阿里云轻量应用服务器 |
| SSH | `root@8.138.191.154` |
| 本站点 root（Nginx/宝塔） | `/www/wwwroot/www.jingyanrong.com` |

**重要**：部署写盘路径必须与 Nginx 里该站点的 `root` 完全一致，否则访问到的仍是旧目录。新建站点时先在宝塔确认「网站目录」，再在 workflow 里填同一路径。

---

## 传输方式

- **不要用 rsync**：服务器可能未安装，会报协议错误（exit code 12）。
- **用 SSH + tar**：
  1. 清空远程目录（排除宝塔/PHP 保护文件）：`find $REMOTE_DIR -mindepth 1 -maxdepth 1 ! -name '.user.ini' ! -name '.htaccess' -exec rm -rf {} +`
  2. 推送：`tar czf - -C . . | ssh ... "cd $REMOTE_DIR && tar xzf -"`

---

## GitHub Actions 配置

- **Secret**：`ALIYUN_SSH_PRIVATE_KEY`（部署用私钥整段内容）。
- **Variable**：`ALIYUN_DEPLOY_ENABLED` = `true`（不设则跳过阿里云部署）。
- 部署 job 建议加条件：`if: vars.ALIYUN_DEPLOY_ENABLED == 'true'`。

---

## 其他 app 部署到同机时

- 在宝塔中为新域名添加站点，记下「网站目录」（形如 `/www/wwwroot/新域名`）。
- 在新仓库配置 GitHub Actions：使用上述 SSH + tar 方式，`REMOTE_DIR` 填该目录。
- 同一台机复用同一对密钥即可；若希望按项目隔离，可为新 app 单独生成密钥并加入 `authorized_keys`，在 Secret 里用对应私钥。

---

## 参考

- 本站 workflow： [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- 首次部署与手动步骤： [DEPLOY.md](DEPLOY.md)、[ALIYUN-FIRST-DEPLOY.md](ALIYUN-FIRST-DEPLOY.md)
