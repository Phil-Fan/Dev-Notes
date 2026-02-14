# Awesome Full Stack

> 🚀🌙 Take a small step towards a full stack developer.

收藏一些全栈开发相关的工具、资源、教程、最佳实践。

[![Awesome](https://awesome.re/badge-flat.svg)](https://awesome.re) [![GitHub Stars](https://img.shields.io/github/stars/Phil-Fan/Dev-Notes?style=flat-square)](https://github.com/Phil-Fan/Dev-Notes/stargazers) [![GitHub Forks](https://img.shields.io/github/forks/Phil-Fan/Dev-Notes?style=flat-square)](https://github.com/Phil-Fan/Dev-Notes/network/members) [![GitHub Issues](https://img.shields.io/github/issues/Phil-Fan/Dev-Notes?style=flat-square)](https://github.com/Phil-Fan/Dev-Notes/issues) [![CC0 License](https://img.shields.io/badge/license-CC0%201.0-lightgrey?style=flat-square)](https://github.com/Phil-Fan/Dev-Notes/blob/main/LICENSE)

## AI 相关

> [!TIP]
>
> My Best Practices
>
> - 能用 AI 做，不要自己做，逐渐放手。领悟的最好方法是让 Agent Tool 在你的专业领域完成你指定的工作，然后查看效果。
> - 确定好技术栈，用**脚手架和模板**框定 AI 能力边界！用**脚手架和模板**框定 AI 能力边界！
> - 需求对话占据 80% 的时间，然后 DEBUG 和迭代占据 20% 的时间。
> - 白嫖很好，但有时候免费的才是最贵的。
> - 任务不要太长，记得 /compact
> - 睡前可以挂一个免费的模型跑任务 😆

- [Cherry Studio](https://github.com/CherryHQ/cherry-studio): All-in-one desktop LLM client.
  - 可以当做 API key 管理器
  - AI app all in one
  - 知识库、agent 都可以放在一起用

::: note Best Practices

- 调研技术栈、维护全局技术文档、每次对话即时更新技术文档
- cc planing 模式做规划，ultrawork 模式写代码
- cursor antigravity 进行小规模 debug 以及纠错
- codex 大规模审核与重构、写重要的逻辑
- 5.2pro & gemini 3p deep research
- kiro & qcoder & trae 以及其他中转站用于没有余额的时候搞
:::

### 配置

- [AGENTS.md](https://github.com/agentsmd/agents.md)
- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

### CLI 工具

- [OpenCode](https://opencode.ai/)：用户体验不错。
  - [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode): OpenCode Plugin
- [zcf](https://github.com/UfoMiao/zcf/tree/main): Zero-Config Code Flow for Claude Code & Codex
- [cc-switch](https://github.com/farion1231/cc-switch): 跨平台桌面 AI 助手工具，统一管理 Claude Code、Codex、Gemini CLI
- [Codex](https://github.com/openai/codex): Debug 很好，能力很强，但是任务运行时间太久
- [Claude Code](https://code.claude.com/docs/zh-CN/overview#homebrew): 生态最完善，功能最齐全，有一些奇怪小 Bug。可以上一些国产模型，比如 MiniMax GLM 等
  - [CN Documentation](https://platform.claude.com/docs/zh-CN/home)
- [Gemini CLI](https://github.com/google/gemini-cli)：UI 可以
- [anyrouter 公益站](https://anyrouter.top/register?aff=9Yan): 每日 25 刀 cc

    ```shell
    export ANTHROPIC_BASE_URL=https://pmpjfbhq.cn-nb1.rainapp.top
    ```

- [new-api](https://github.com/QuantumNous/new-api): AI 模型聚合管理与分发系统，支持 OpenAI/Claude/Gemini 统一格式调用
- [simonw/llm](https://github.com/simonw/llm): 命令行访问大模型

```shell
brew install --cask codex
brew install --cask claude-code
brew install gemini-cli
```

### IDE

- [Cursor](https://cursor.com/home)：Tab 神器，新上 Plan 模式和网页模式挺有意思的。
- [Antigravity](https://antigravity.google/), [Windsurf](https://windsurf.com/download/editor)
- [Trae CN](https://www.trae.cn)
- [Visual Studio Code](https://code.visualstudio.com/)

### MCP

General

- [Context7 MCP](https://github.com/upstash/context7)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Exa MCP](https://docs.exa.ai/reference/exa-mcp)

Dev

- [GitHub MCP](https://github.com/github/github-mcp-server): GitHub's official MCP Server
- [高德地图 MCP Server](https://lbs.amap.com/api/mcp-server/summary): 高德地图 API 的 MCP Server
- [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp): Chrome DevTools for coding agents
- [shadcn MCP](https://ui.shadcn.com/)

### Spec Tools

- [OpenSpec](https://github.com/Fission-AI/OpenSpec): Spec-driven development for AI coding assistants.
- [Spec-kit](https://github.com/github/spec-kit): Toolkit to help you get started with Spec-Driven Development

提问语句：

```text
read this @SPEC.md and interview me in detail
using the AskUserQuestionTool about literally anything: 
technical implementation, UI & UX, concerns, tradeoffs, etc. 
but make sure the questions are not obvious

be very in-depth and continue interviewing me continually 
until it's complete, then write the spec to the file.
```

### Skills

```shell
/plugin marketplace add anthropics/skills
```

```shell
/plugin
```

- [planning-with-files](https://github.com/OthmanAdi/planning-with-files): Manus 风格持久化 Markdown 规划
- [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): 多平台专业 UI/UX 设计智能
- [notebooklm-py](https://github.com/teng-lin/notebooklm-py)
- [obsidian-skills](https://github.com/kepano/obsidian-skills): Obsidian 的 Claude Skills 集合
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code): Claude Code 精选命令、文件和工作流列表

### 知识库

- [腾讯 IMA](https://ima.qq.com/): 腾讯良心产品

### 多模态

- [ComfyUI](https://www.comfy.org/zh-cn/): 用 AI 生成视频、图像、音频

- Image
  - 🍌
    - [ZHO-nano-banana-Creation](https://github.com/ZHO-ZHO-ZHO/ZHO-nano-banana-Creation): Nano-banana 创意玩法大合集，包含 46+ 种 AI 图像/视频生成创意玩法
- Video
  - [Sora](https://apps.apple.com/us/app/sora-by-openai/id6744034028)
  - [Veo - Google DeepMind](https://deepmind.google/models/veo/)
- Audio
  - 调用类：[ElevenLabs](https://elevenlabs.io), [火山引擎](https://www.volcengine.com/product/tts), [科大讯飞](https://www.xfyun.cn/services/smart-tts), [Fish Audio](https://fishspeech.net/zh), [OpenAI TTS](https://platform.openai.com/docs/guides/text-to-speech), [SiliconFlow](https://siliconflow.cn/), [腾讯云](https://cloud.tencent.com/product/tts), [阿里云百炼](https://ai.aliyun.com/nls/tts)
  - 本地部署类：[EdgeTTS](https://github.com/rany2/edge-tts), [Fish Speech](https://github.com/fishaudio/fish-speech), [GPT-SoVITS V2](https://github.com/v3ucn/GPT-SoVITS-V2), [GPT-SoVITS V3](https://github.com/RVC-Boss/GPT-SoVITS), [Index-TTS](https://github.com/index-tts/index-tts), [PaddleSpeech](https://github.com/PaddlePaddle/PaddleSpeech)

## 工具

- [iTerm2](https://github.com/gnachman/iTerm2)：Mac 下最好的终端
- [Amphetamine](https://apps.apple.com/cn/app/amphetamine/id937984704?mt=12)：Mac 防休眠工具
- [tmux](https://github.com/tmux/tmux)
  - [A Quick and Easy Guide to tmux - Ham Vocke](https://hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/)
  - [Make tmux Pretty and Usable - Ham Vocke](https://hamvocke.com/blog/a-guide-to-customizing-your-tmux-conf/)
- [Vim](https://www.vim.org/)

- [chezmoi](https://github.com/twpayne/chezmoi): Dotfiles 管理工具
- [dot-files](https://github.com/Phil-Fan/dot-files): 我的 dotfiles

### 文本处理

- [awk](https://www.gnu.org/software/gawk/): 强大的文本分析与报告生成工具
- [sed](https://www.gnu.org/software/sed/): 流编辑器，用于文本过滤和转换

## Template

> 好用的开发模版

- [Next.js & shadcn/ui Admin Dashboard](https://github.com/arhamkhnz/next-shadcn-admin-dashboard)
- [next‑shadcn‑dashboard‑starter](https://github.com/Kiranism/next-shadcn-dashboard-starter)
- [shadcn-admin-starter-template](https://github.com/MinPyaeKyaw/shadcn-admin-starter-template)

## 前端

- [Next.js](https://nextjs.org/)
  - [TypeScript](https://github.com/microsoft/TypeScript)
  - [biome](https://github.com/biomejs/biome): Next.js 项目
  - [tailwindcss](https://github.com/tailwindlabs/tailwindcss)+[shadcn/ui](https://ui.shadcn.com/)
    - [tweakcn](https://tweakcn.com/editor/theme): 风格模版
    - [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss): 自动排序类名
  - [motion](https://github.com/motiondivision/motion): 动画库
  - [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction): 前端状态管理库
  - [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview): 数据查询库
  - [react-hook-form](https://react-hook-form.com/get-started): 表单库

```shell
npx create-next-app@latest my-app
```

- [Taro](https://docs.taro.zone/docs/): 使用 React/Vue 开发多平台小程序应用
- [uni-app](https://uniapp.dcloud.net.cn/): 使用 Vue 开发多平台应用（小程序、H5、App）
- [electron](https://github.com/electron/electron): Build cross-platform desktop apps with JavaScript, HTML, and CSS

## 后端

- [Bun](https://bun.sh/): 快速的一体化 JavaScript 运行时
- [Python](https://www.python.org/)
  - [uv](https://github.com/astral-sh/uv): package and project manager
  - [ruff](https://github.com/astral-sh/ruff): linter and code formatter
  - [pyrefly](https://github.com/jakevandenburg/pyrefly): 快速的 Python LSP 和 linter
  - [fastapi](https://github.com/tiangolo/fastapi)
- [Go](https://go.dev/)
  - [gin](https://github.com/gin-gonic/gin)
  - [gorm](https://github.com/go-gorm/gorm)
- Java
  - [Spring Boot](https://spring.io/projects/spring-boot)
- [nestjs](https://github.com/nestjs/nest)
  - [Vitest](https://vitest.dev/): 单元测试
  - [Playwright](https://playwright.dev/): 端到端测试

### 用户管理与认证

- [Casdoor](https://github.com/casdoor/casdoor)
- [next-auth](https://next-auth.js.org)

### 数据库

- [Supabase](https://github.com/supabase/supabase)

### 缓存

- [Redis](https://redis.io/)

### 应用部署

- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [宝塔面板](https://www.bt.cn/new/index.html): 简单好用的 Linux/Windows 服务器运维管理面板

### 网络

- [Caddy](https://github.com/caddyserver/caddy): 反向代理最佳实践
- [Tailscale](https://tailscale.com/download/linux) / [ZeroTier](https://www.zerotier.com/) 内网穿透工具

### 运维与监控

- [Logfire](https://logfire.pydantic.dev/)：Python 日志分析与可视化
- [Uptime Kuma](https://github.com/louislam/uptime-kuma)
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)：指标与日志可视化

### 抓包

- [Wireshark](https://www.wireshark.org/)
- [Reqable](https://github.com/reqable/reqable-app) 小黄鸟，可抓包小程序
- [Stream](https://apps.apple.com/app/stream/id1312141691) iOS 抓包
- [WeChatOpenDevTools](https://github.com/JaveleyQAQ/WeChatOpenDevTools-Python) 微信强制开启 F12，Mac 不可用

## Code Quality

### Testing

- test-driven
- regression tests
- property-based tests

### Code Coverage

- [Codecov](https://app.codecov.io)

### Formatter & Linter

- [eslint/eslint](https://github.com/eslint/eslint): JavaScript/TypeScript 静态分析
- [prettier/prettier](https://github.com/prettier/prettier): 代码格式化，可配置性强
  - [rbubley/mirrors-prettier](https://github.com/rbubley/mirrors-prettier) for pre-commit
- [biomejs/biome](https://github.com/biomejs/biome): 一体化 Linter & Formatter & Bundler（ESLint + Prettier 替代）
- [markdownlint](https://github.com/DavidAnson/markdownlint): Markdown 静态分析
- [autocorrect](https://github.com/huacnlee/autocorrect): CJK 排版自动修正

### commit hooks

- [pre-commit](https://github.com/pre-commit/pre-commit)：多语言 pre-commit hooks 管理框架
- [husky](https://github.com/typicode/husky) 适合前端项目

### CI/CD

- [GitHub Actions](https://github.com/features/actions)
- [dokploy](https://dokploy.com)
- [coolify](https://coolify.io)
- [jenkins](https://www.jenkins.io)
- [Dagger](https://dagger.io/)：可编排的 CI/CD 引擎
- [Drone CI](https://github.com/harness/drone)
- [qinglong](https://github.com/whyour/qinglong): 支持 Python3、JavaScript、Shell、Typescript 的定时任务管理平台

## 云

### 云原生

- Docker
- Kubernetes
- Helm

### 厂商

- [Cloudflare](https://github.com/cloudflare/cloudflare-docs)：CDN，云函数
- [Aliyun](https://www.aliyun.com/)
- [Vercel](https://vercel.com/)：前端托管与边缘函数

### 域名

- [阿里云域名](https://wanwang.aliyun.com/domain/)

### CDN 服务

- [Atlassian Statuspage](https://www.atlassian.com/software/statuspage/pricing)

## 运营

### 信息源与宣传

- [X](https://x.com/)
- [Linux.do](https://linux.do/)
- [Hacker News](https://news.ycombinator.com/)
- [X](https://x.com/)
- [小红书](https://www.xiaohongshu.com/)
- [小宇宙](https://www.xiaoyuzhoufm.com/)
- [即刻](https://web.okjike.com)
- [Product Hunt](https://www.producthunt.com/)
- [Folo](https://github.com/RSSNext/Folo): All-in-one RSS reader.

### 多平台内容分发

- [蚁小二](https://www.yixiaoer.cn/vip): 多平台内容分发订阅服务，支持平台较全
- [TurboPush](https://www.turbopush.top/)

### 内容与文档

- [MkDocs](https://www.mkdocs.org/)
- [VuePress](https://vuepress.vuejs.org)
- [fumadocs](https://github.com/fuma-nama/fumadocs)
- [Jekyll](https://jekyllrb.com)
  - [minima](https://github.com/jekyll/minima)
- [Vitepress](https://vitepress.dev/)

- [reveal-md](https://github.com/webpro/reveal-md)
- [Slidev](https://sli.dev/)

### 产品介绍

平面设计

- PowerPoint 永远的神
- [Figma](https://www.figma.com/): 产品设计与原型设计

视频与动画

- [Rotato](https://rotato.app/): 模型机动画
- [Jitter](https://jitter.video/templates/devices/): 产品视频介绍模版
- [Remotion](https://www.remotion.dev/): 用代码创建视频的 React 框架
- 录屏
  - [Screen Studio](https://screen.studio/): 录屏软件；
  - [Open Screen](https://openscreen.vercel.app/): 免费开源的演示视频工具，支持一下开源，但是感觉功能不是特别完善
- [Blender](https://www.blender.org/): 3D 建模软件

### 用户洞察

- [Microsoft Clarity](https://clarity.microsoft.com/): 免费热图与会话记录
- [Google Analytics](https://marketingplatform.google.com/about/analytics/)

### 流程与合规

- 软著登记：[中国版权保护中心](https://www.ccopyright.com.cn/)
- 专利申请：[专利业务办理系统](https://cponline.cnipa.gov.cn/)
- 商标注册：[国家知识产权局商标局](https://sbj.cnipa.gov.cn/sbj/index.html)
- ICP 备案：[ICP 信息备案管理系统](https://beiancx.miit.gov.cn)
- ICP 资质：

## License

- 本项目采用 [CC0 1.0 Universal](https://github.com/Phil-Fan/Dev-Notes/blob/main/LICENSE)，你可以自由复制、分享与改编。

## Contributing

- 阅读并遵循 [Contributing Guide](https://github.com/Phil-Fan/Dev-Notes/blob/main/.github/CONTRIBUTING.md)。
- 提交或修改资源前请确认链接有效，并参考 [Code of Conduct](https://github.com/Phil-Fan/Dev-Notes/blob/main/.github/CODE_OF_CONDUCT.md)。
- 使用 [Issue Templates](https://github.com/Phil-Fan/Dev-Notes/issues/new/choose) 与 [Pull Request Template](https://github.com/Phil-Fan/Dev-Notes/blob/main/.github/pull_request_template.md) 保持讨论高效。

![Star history](https://api.star-history.com/svg?repos=Phil-Fan/Dev-Notes&type=Date)

## Acknowledgments

- 使用 [huacnlee/autocorrect](https://github.com/huacnlee/autocorrect/), [DavidAnson/markdownlint-cli2-action](https://github.com/DavidAnson/markdownlint-cli2-action) 与 [gaurav-nelson/github-action-markdown-link-check](https://github.com/gaurav-nelson/github-action-markdown-link-check) 进行自动化检查。
- 使用 [Shields.io](https://shields.io) 和 [Simple Icons](https://simpleicons.org) 生成项目 Badges。
- 感谢所有 **Contributors**!

[![Contributors](https://stg.contrib.rocks/image?repo=Phil-Fan/Dev-Notes)](https://github.com/Phil-Fan/Dev-Notes/graphs/contributors)
