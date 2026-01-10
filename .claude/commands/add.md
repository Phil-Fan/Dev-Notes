---
description: 智能添加资源到 README.md 对应分类
argument-hint: <名称> <链接> [描述]
allowed-tools: [Read, Edit, Bash]
---

# 添加资源到 README

用户输入：$ARGUMENTS

## 任务

解析用户输入，智能识别资源分类，添加到 README.md 对应位置。

## 解析规则

1. **输入格式**：`名称 URL [描述]`
   - 名称：必需，项目/工具名称
   - URL：必需，https:// 开头
   - 描述：可选，一句话概括

2. **智能分类**：根据名称/URL/描述判断分类
   - **AI 相关**：AI、LLM、Claude、GPT、Copilot、Cursor、Windsurf、Antigravity
   - **前端**：Next.js、React、Vue、Tailwind、shadcn、electron
   - **后端**：Python、Go、Java、NestJS、FastAPI、Docker、K8s
   - **云服务**：Cloudflare、Vercel、Aliyun、CDN
   - **运营**：Figma、Product Hunt、文档、分析
   - **IDE**：VSCode、Vim、编辑器、终端
   - **Template**：starter、template、boilerplate

3. **子分类识别**：
   - AI 下：IDE、CLI、MCP、知识库、Spec Tools
   - 后端下：用户管理、数据库、CI/CD、监控、网络

## 添加规则

1. **格式化**：

   ```text
   - [名称](链接): 描述
   ```

   或无描述：

   ```text
   - [名称](链接)
   ```

2. **描述规范**：
   - 一句话概括
   - 中文为主，保留技术术语英文
   - 末尾无标点
   - 极简精炼

3. **插入位置**：
   - 找到对应分类/子分类的最后一项
   - 在其下方添加新条目
   - 保持字母排序（如该分类已排序）

## 执行步骤

1. 读取 README.md
2. 解析用户输入（名称、URL、描述）
3. 智能匹配分类
4. 找到插入位置
5. 按 README 风格格式化
6. 使用 Edit 工具插入
7. 确认并报告添加位置

## 示例

```text
/add uv https://github.com/astral-sh/uv 快速的 Python 包管理器
→ 添加到 后端 → Python 下

/add Antigravity https://antigravity.google/
→ 添加到 AI 相关 → IDE 下
```

## 注意事项

- 如果分类不明确，询问用户
- 保持现有格式和缩进
- 描述尽可能精简，不超过 15 字
