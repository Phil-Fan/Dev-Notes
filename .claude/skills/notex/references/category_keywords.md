# 分类关键词映射表

用于自动识别技术栈并归类到对应的文档目录。

## AI/ 目录

**关键词：**
- LLM, GPT, Claude, Gemini, OpenAI
- MCP, Model Context Protocol
- Skills, agent, AI 工具
- ChatGPT, AI 编程, 智能助手
- prompt, 提示词工程

**示例技术：**
- Cherry Studio, Claude Code, Cursor, OpenCode
- Context7, Playwright MCP, Exa MCP
- notebooklm, obsidian

## Backend/ 目录

**关键词：**
- Python, Go, Java, Node.js, TypeScript
- FastAPI, Django, Flask, Express
- Gin, GORM, Spring Boot, NestJS
- 后端, 服务端, API, 框架
- 数据库, ORM, 认证, 中间件

**示例技术：**
- Python: uv, ruff, pyright, FastAPI
- Go: gin, gorm
- Java: Spring Boot
- Node.js: NestJS, Express
- 数据库: Supabase, PostgreSQL, MongoDB
- 认证: Casdoor, next-auth

## Frontend/ 目录

**关键词：**
- Next.js, React, Vue, Angular
- Taro, uni-app, 小程序
- Tailwind, shadcn/ui, CSS
- JavaScript, TypeScript, 前端
- 组件库, UI 框架

**示例技术：**
- Next.js, React, Vue 3
- Taro, uni-app
- Tailwind CSS, shadcn/ui, motion
- zustand, TanStack Query, react-hook-form
- Electron (跨平台桌面)

## Cloud/ 目录

**关键词：**
- Docker, Kubernetes, K8s
- CI/CD, GitHub Actions, Jenkins
- 部署, 容器, 云服务
- Vercel, 阿里云, Cloudflare
- CDN, 反向代理

**示例技术：**
- Docker, Kubernetes
- GitHub Actions, Drone CI, Dagger
- Vercel, 阿里云, Cloudflare
- Caddy, Tailscale, ZeroTier

## Ops/ 目录

**关键词：**
- 监控, 日志, 运维
- Prometheus, Grafana
- Uptime, 性能分析
- 抓包, 网络工具
- 服务器, 部署管理

**示例技术：**
- Logfire, Uptime Kuma
- Prometheus, Grafana
- Wireshark, Reqable
- dokploy, coolify

## PM/ 目录

**关键词：**
- 产品, 设计, 原型
- Figma, 产品介绍
- 用户洞察, 分析
- Analytics, 热图
- 宣传, 内容分发

**示例技术：**
- Figma, iMockup, Jitter
- Microsoft Clarity, Google Analytics
- Product Hunt, Buffer
- 蚁小二, Multipost

## Tools/ 目录

**关键词：**
- Git, Vim, Neovim
- IDE, 编辑器, 终端
- 命令行, shell, 工具
- iTerm2, tmux
- 包管理, linter, formatter

**示例技术：**
- Git, Vim, Neovim, LazyVim
- iTerm2, tmux
- chezmoi, bat, ripgrep, eza, fd
- biome, eslint, prettier

## 分类决策树

1. **先判断技术类型**
   - 开发语言/框架 → Backend 或 Frontend
   - AI 相关工具 → AI
   - 云服务/部署 → Cloud
   - 运维监控 → Ops
   - 产品设计 → PM
   - 开发工具 → Tools

2. **后端 vs 前端判断**
   - 服务端运行、API、数据库 → Backend
   - 浏览器运行、UI、组件 → Frontend
   - 跨平台（Electron）→ Frontend

3. **不确定时**
   - 优先选择主要用途的分类
   - 查看官方文档的定位
   - 搜索结果中多数来源归入哪类
