# Pre-commit Hooks 使用指南

本项目使用 [pre-commit](https://pre-commit.com/) 框架管理 Git hooks，确保 Markdown 文件的格式规范。

## 🚀 快速开始

### 1. 安装依赖

```bash
# macOS
brew install pre-commit
brew install autocorrect

# 或使用 pip
pip install pre-commit
```

### 2. 激活 hooks

```bash
# 在项目根目录运行
pre-commit install
```

激活后，每次 `git commit` 时会自动运行格式化检查。

### 3. 手动运行

```bash
# 检查所有文件
pre-commit run --all-files

# 检查特定文件
pre-commit run --files README.md
```

## 📋 配置的 Hooks

### markdownlint
- **功能**: ��查和修复 Markdown 语法问题
- **自动修复**: 列表格式、空行、链接等
- **版本**: v0.41.0

### autocorrect
- **功能**: 中英文格式化
- **作用**: 自动添加中英文空格、标点符号规范化

## 🔧 配置文件

`.pre-commit-config.yaml` - pre-commit 配置文件

## 📝 跳过 hooks

如果需要临时跳过检查：

```bash
git commit --no-verify -m "your message"
```

## 🔄 更新 hooks

```bash
pre-commit autoupdate
pre-commit run --all-files
```

## ⚠️ 常见问题

### Q: 提交时提示错误怎么办？
A: 查看 hook 的错误信息，手动修复无法自动修复的问题后再次提交。

### Q: 如何禁用某个规则？
A: 在 `.markdownlint.json` 中配置规则（需创建此文件）：

```json
{
  "MD041": false,
  "line-length": false
}
```

### Q: autocorrect 格式化不正确？
A: 可以在提交前手动调整，或使用 `git commit --no-verify` 跳过。
