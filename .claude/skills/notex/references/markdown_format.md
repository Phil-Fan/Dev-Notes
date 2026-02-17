# Markdown 格式规范

项目文档的格式标准和最佳实践。

## 基本资源条目格式

### 简单链接格式

```markdown
- [库名](链接): 简洁描述（一句话说明用途或特点）
```

**示例：**

```markdown
- [Next.js](https://nextjs.org/): React 全栈框架
- [shadcn/ui](https://ui.shadcn.com/): 可复用的 React 组件集合
```

### 带子项的格式

```markdown
- [主项目](链接): 主描述
  - [子项目 1](链接): 子描述
  - [子项目 2](链接): 子描述
```

**示例：**

```markdown
- [Cherry Studio](https://github.com/CherryHQ/cherry-studio): All-in-one desktop LLM client
  - 可以当做 API key 管理器
  - AI app all in one
  - 知识库、agent 都可以放在一起用
```

### 多行描述格式

```markdown
- [项目名](链接): 主要描述
  - 详细说明 1
  - 详细说明 2
  - 详细说明 3
```

**示例：**

```markdown
- [Claude Code](https://code.claude.com/docs/zh-CN/overview#homebrew): 生态最完善，功能最齐全
  - 可以上一些国产模型，比如 MiniMax GLM 等
  - [CN Documentation](https://platform.claude.com/docs/zh-CN/home)
```

## 带代码示例的格式

### 安装命令格式

```markdown
\```shell
<安装命令>
\```
```

**示例：**

```markdown
\```shell
brew install --cask claude-code
npx create-next-app@latest my-app
\```

```

### 代码示例格式

```markdown
**代码示例：**
\```<语言>
<代码内容>
\```
```

## 独立页面格式

### 带标题的完整页面

```markdown
---
layout: home  # 可选，VitePress frontmatter

hero:
  name: 页面标题
  text: 副标题
  # ... 其他配置
---

# 主标题

内容描述...

## 二级标题

### 三级标题

- 列表项 1
- 列表项 2
```

## 特殊语法

### 提示框格式

```markdown
> [!TIP]
>
> 提示内容

> [!NOTE]
>
> 注意内容

> [!WARNING]
>
> 警告内容
```

**示例：**

```markdown
> [!TIP]
>
> My Best Practices
>
> - 能用 AI 做，不要自己做
> - 确定好技术栈，用脚手架和模板框定 AI 能力边界
```

## 排版规范

### 标题层级

- `#` 只用于文档标题
- `##` 用于主要章节
- `###` 用于子章节
- 避免使用 `####` 及以下层级（考虑拆分文档）

### 列表规范

- 使用 `-` 作为无序列表标记
- 嵌套列表使用 2 空格缩进
- 同级列表项对齐

### 链接规范

- 优先使用项目/库名作为链接文本
- 外部链接使用完整 URL
- 内部链接使用相对路径

### 代码块规范

- 始终指定语言类型：\```shell, \```python, \```typescript
- 安装命令使用 \```shell
- 配置文件使用对应的格式类型

## 示例参考

### README.md 中的完整章节示例

```markdown
## AI 相关

> [!TIP]
>
> My Best Practices
>
> - 能用 AI 做，不要自己做，逐渐放手

### CLI 工具

- [OpenCode](https://opencode.ai/)：用户体验不错
  - [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode): OpenCode Plugin
- [Claude Code](https://code.claude.com/docs/zh-CN/overview#homebrew): 生态最完善
  - [CN Documentation](https://platform.claude.com/docs/zh-CN/home)

\```shell
brew install --cask claude-code
\```

### MCP

- [Context7 MCP](https://github.com/upstash/context7)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Exa MCP](https://docs.exa.ai/reference/exa-mcp)
```

### 独立页面示例

```markdown
# FastAPI 框架

> 现代化、高性能的 Python Web 框架

## 主要特点

- **快速**：与 Node.js 和 Go 相当的性能
- **快速编码**：开发速度提升 200%-300%
- **更少的 Bug**：减少约 40% 的人为错误
- **直观**：对 IDE 友好，调试简单

## 安装

\```shell
pip install fastapi uvicorn
\```

## 快速开始

\```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
\```

## 相关链接

- [官方文档](https://fastapi.tiangolo.com/)
- [GitHub](https://github.com/tiangolo/fastapi)
```
