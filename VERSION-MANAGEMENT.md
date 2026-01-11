# 版本号管理说明

本项目采用**语义化版本（SemVer）**规则进行版本号管理，格式为：`MAJOR.MINOR.PATCH`

## 版本号规则

按照国际惯例（SemVer 2.0.0），版本号由三部分组成：

- **MAJOR（主版本号）**：当你做了不兼容的 API 修改时递增
- **MINOR（次版本号）**：当你做了向下兼容的功能性新增时递增
- **PATCH（修订版本号）**：当你做了向下兼容的问题修正时递增

### 示例

- `1.0.0` → `1.0.1`：修复了一个 bug（PATCH）
- `1.0.1` → `1.1.0`：添加了新功能（MINOR）
- `1.1.0` → `2.0.0`：重大更新，可能不兼容（MAJOR）

## 自动版本管理

### 自动递增（默认行为）

**每次使用 `git push` 推送到 GitHub 时，版本号会自动递增 PATCH 版本。**

这是通过 Git pre-push hook 实现的，无需手动操作。

### 手动管理版本号

如果需要手动控制版本号递增，可以使用以下命令：

```bash
# 增加 PATCH 版本（默认，修复 bug）
npm run version:patch
# 或
npm run version

# 增加 MINOR 版本（新功能）
npm run version:minor

# 增加 MAJOR 版本（重大更新）
npm run version:major
```

或者直接使用脚本：

```bash
# 增加 PATCH 版本
node scripts/bump-version.js patch

# 增加 MINOR 版本
node scripts/bump-version.js minor

# 增加 MAJOR 版本
node scripts/bump-version.js major
```

## 工作流程

1. **日常开发**：
   - 正常开发，提交代码
   - 使用 `git push` 时，版本号会自动从 `1.0.0` → `1.0.1` → `1.0.2` ...

2. **添加新功能**：
   - 如果添加了重要功能，可以手动运行 `npm run version:minor`
   - 版本号会从 `1.0.5` → `1.1.0`

3. **重大更新**：
   - 如果进行了重大重构或不兼容更新，运行 `npm run version:major`
   - 版本号会从 `1.5.2` → `2.0.0`

## 查看当前版本

```bash
# 查看 package.json 中的版本号
cat package.json | grep version

# 或使用 npm
npm version
```

## 注意事项

1. **版本号提交**：自动版本更新会创建一个提交，提交信息格式为：`chore: bump version to X.Y.Z [skip ci]`

2. **跳过 CI**：版本号更新提交包含 `[skip ci]` 标记，可以避免触发不必要的 CI/CD 构建

3. **Git Hook**：如果 Git hook 没有执行权限，运行：
   ```bash
   chmod +x .git/hooks/pre-push
   ```

4. **禁用自动递增**：如果需要临时禁用自动版本递增，可以：
   - 使用 `git push --no-verify` 跳过 hooks
   - 或临时重命名 `.git/hooks/pre-push` 文件

## 版本号位置

版本号存储在以下位置：

- `package.json` 的 `version` 字段
- Git 标签（可通过 `git tag` 查看）

## 相关文件

- `scripts/bump-version.js` - 版本号管理脚本
- `.git/hooks/pre-push` - Git pre-push hook（自动递增版本号）
- `package.json` - 版本号存储位置
