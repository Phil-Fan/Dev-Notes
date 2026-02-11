# AGENTS.md

本文件用于指导 AI Agent 和贡献者在本仓库中协作，重点说明：目录结构、技术栈、以及编辑规范。

## 1) 项目定位

- 项目名：`Awesome Full Stack`
- 类型：文档/知识库站点（VitePress）
- 主要内容：AI、前端、后端、云原生、运维、工具、产品与运营相关笔记与资源

## 2) 目录结构（以当前仓库为准）

```text
.
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts          # 站点导航、侧边栏、主题配置
│   │   └── theme/             # 主题扩展与样式
│   ├── index.md               # 站点首页
│   ├── awesome/               # 资源导航页
│   ├── AI/                    # AI 相关文档
│   ├── Frontend/              # 前端文档
│   ├── Backend/               # 后端文档（含 db/、platform/）
│   ├── Cloud/                 # 云原生/容器/部署文档
│   ├── Ops/                   # 运维文档（含 linux/、env/）
│   ├── Tools/                 # 开发工具文档
│   └── PM/                    # 产品与运营文档
├── package.json               # 仓库级脚本（转发到 docs 子包）
├── pnpm-workspace.yaml
└── .pre-commit-config.yaml    # Markdown 规范检查与自动修复
```

## 3) 技术栈

- 文档框架：`VitePress`（`docs/package.json`）
- 包管理器：`pnpm`（workspace）
- 规范检查：
  - `markdownlint-cli2`
  - `autocorrect`
  - `pre-commit`
- 语言：Markdown、TypeScript（VitePress 配置）

## 4) 常用命令

在仓库根目录执行：

```bash
pnpm dev      # 启动文档开发服务器
pnpm build    # 构建文档
pnpm preview  # 预览构建结果
pnpm lint     # 执行 pre-commit 全量检查
```

## 5) 编辑规范（必须遵守）

### 5.1 文档与导航一致性

- 新增或删除文档后，必须同步更新：
  - `docs/.vitepress/config.ts` 中对应的 `sidebar`
  - 对应目录下的 `index.md`（如果有目录清单）
- 侧边栏链接必须指向真实存在的文件。

### 5.2 Markdown 规范

- 一级标题：每个文档首行应为 `# 标题`
- 代码块：必须标注语言（例如 `bash`、`yaml`、`text`）
- 图片：必须提供 alt 文本（避免 `![](...)`）
- 避免使用加粗文本代替标题（例如 `**标题**`）
- 避免重复同级标题名称（必要时加限定词）

### 5.3 文件与命名

- 保持现有目录命名风格，不做无必要重命名
- 新文件优先使用小写英文和短横线（与现有结构保持一致）
- 如果是系列文档，可沿用现有编号风格（如 `01-File.md`）

### 5.4 提交前自检

- 至少运行一次：

```bash
pnpm lint
```

- 若改动了导航，建议额外运行：

```bash
pnpm build
```

确保链接和页面构建正常。

## 6) Agent 工作约定

- 优先做“最小必要改动”，不要无关重构。
- 不要删除或回滚与当前任务无关的用户改动。
- 若发现目录结构与导航不一致，优先修复为“以文件系统为准”。
- 修改说明中请明确列出：
  - 改了哪些文件
  - 为什么改
  - 是否已执行 lint/build 验证
