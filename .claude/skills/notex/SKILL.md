---
name: notex
description: 智能技术文档研究与调研工具。搜索技术文档、最佳实践和代码示例，并自动分类整理到站点。
---

# Tech Doc Researcher

智能技术文档研究与整理工具，帮助用户高效收集、分类和整合技术资料到文档站点。

## 核心功能

1. **智能搜索**：使用 Exa 和 Context7 搜索最新技术文档和最佳实践
2. **自动分类**：根据技术关键词自动识别并归类到对应的文档目录
3. **智能合并**：检测并合并重复或相似的内容
4. **格式化输出**：生成符合 VitePress 规范的 Markdown 内容

注意，不要更新 `README.md` 文件，只更新对应的 `docs/` 目录下的文件。

## 工作流程

### 第一步：理解需求

使用 AskUserQuestionTool 确认用户的具体需求：

- **研究新技术栈**：学习全新技术框架的文档和最佳实践
- **补充现有文档**：在已有分类中添加更多资源
- **学习最佳实践**：搜索特定技术的最佳实践和代码示例

### 第二步：执行搜索

使用以下工具进行综合搜索：

**使用 Exa 搜索网络资源：**

**使用 Context7 查询官方文档：**

```python
# 先解析库 ID
mcp__context7__resolve-library-id(
    libraryName="<库名称>",
    query="<查询内容>"
)

# 再查询具体文档
mcp__context7__query-docs(
    libraryId="<解析出的库 ID>",
    query="<具体问题>"
)
```

**使用 Exa Web 搜索补充信息：**

```python
mcp__exa__web_search_exa(
    query="<技术栈> 2025 tutorial guide",
    numResults=8
)
```

### 第三步：自动分类

根据搜索结果中的技术关键词，自动识别分类：

**分类映射表**（详见 `references/category_keywords.md`）：

- **AI/**: LLM, MCP, Skills, AI 工具
- **Backend/**: Python, Go, Java, Node.js, FastAPI, Gin, Spring
- **Frontend/**: Next.js, React, Vue, Taro, Tailwind, shadcn
- **Cloud/**: Docker, Kubernetes, CI/CD, 阿里云，Vercel
- **Ops/**: 监控，日志，部署，运维工具
- **PM/**: 产品设计，Figma, 用户洞察
- **Tools/**: Git, Vim, IDE, 开发工具

### 第四步：智能合并与去重

检查目标文档中是否已存在相似内容：

1. **读取目标文件**：使用 `Read` 工具查看现有文档，现有文档的结构参考 `references/project_structure.md`
2. **检测重复项**：
   - 完全相同的 URL 链接 → 跳过
   - 相同库名的描述 → 合并为更完整的版本
   - 相似主题的内容 → 归类到同一小节
3. **保留最佳内容**：优先保留包含示例代码、中文说明、最新版本的内容

### 第五步：整理到文档

#### 优先策略：整合到现有文档

#### 备用策略：创建独立页面

仅当满足以下条件时创建新的 `.md` 文件：

- 现有文档完全没有对应主题
- 内容足够丰富（>500 字或包含多个代码示例）
- 需要独立章节展示（如教程、深度指南）

创建新文件时遵循：

- 路径：`docs/<分类>/<主题>.md`
- 格式：包含 VitePress frontmatter（如需要）
- 结构：清晰的标题层级、代码示例、参考链接

如果有任何不确定的任务，使用 AskUserQuestionTool 询问用户

### 第六步：整理并输出报告

- 修改对应的 vitepress 文档的结构，包括侧边栏、导航栏、首页等

完成整理后，向用户报告：

1. **搜索来源**：使用的搜索工具和关键词
2. **分类结果**：内容被归入哪个分类及原因
3. **修改位置**：具体修改了哪个文件的哪一部分
4. **新增内容摘要**：简述新增的关键资源
5. **去重说明**：是否合并了重复内容

## 输出格式规范

**标准资源条目格式**（参考 `references/markdown_format.md`）：

```markdown
- [库名](链接): 简洁描述（一句话说明用途）
  - 可选的子项或补充说明
```

**带代码示例的格式**：

```markdown
### 技术名称

> 简短描述

**主要特点：**
- 特点 1
- 特点 2

**安装命令：**
\```shell
<命令>
\```

**代码示例：**
\```<语言>
<代码>
\```

**相关链接：**
- [官方文档](链接)
- [GitHub](链接)
```

## 使用示例

### 示例 1：研究新技术栈

```text
用户："研究一下 Bun 运行时"
→ 搜索 Bun 文档和最佳实践
→ 分类到 Backend 或 Frontend（根据内容）
→ 整理到 README.md 的对应分类下
```

### 示例 2：补充文档

```text
用户："添加更多 Python Web 框架"
→ 搜索 Python Web 框架（FastAPI, Django, Flask）
→ 读取 README.md 确认已有内容
→ 智能合并，补充缺失的框架
```

### 示例 3：学习最佳实践

```text
用户："Next.js 性能优化最佳实践"
→ 搜索 Next.js 性能优化文档
→ 整理成独立页面或补充到 Frontend 目录
```

## 要求

- 尽可能附上官方的 GitHub 链接，或者官方文档的链接，Markdown 格式
- 尽可能简洁
- 使用通俗易懂不失严谨的风格

## 参考资源

- **分类关键词映射**: `references/category_keywords.md`
- **Markdown 格式规范**: `references/markdown_format.md`
- **项目结构说明**: `references/project_structure.md`
