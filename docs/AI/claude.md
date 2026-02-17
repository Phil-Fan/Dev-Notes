# MCP/Skills? Claude Code 使用实践、洞察

就在最近，Anthropic 发布了 Opus 4.6 模型，OpenAI 发布了 GPT 5.3 Codex，而国内也开启了百模大战：Seeddance\ MiniMax\Kimi\GLM\Deepseek，而在不久后的春节假期，更是可以预见的会有一大波新模型和新产品发布。

真的让人感觉 **“坐地日行八万里”** ，无法预测一个月后的技术是什么景象。

分享一下最近几个月了解、学习和使用到的 Agent 工具，以及基于此**开发的产品——Poco**

## 能不能好好说话 —— 这些名词到底是什么意思

- **MCP**: Model Context Protocol，顾名思义，它是一个协议，让 AI 可以以一致的方式去连接「外部工具」或者「外部数据源」。

![MCP 外部工具连接示意图](https://i-blog.csdnimg.cn/direct/b4dfeec741cd4832a8038883ee85cded.png)

- **Skills**: 技能，其实就是一些 Markdown 文件 + 操作脚本，其核心思想是「**渐进式披露**」，即分层加载，需要的时候把对应的需要的内容加载到上下文当中。这里以官方的 PPTX skill 举例

![Skills 示例截图](https://img.philfan.cn/20260206190733885.webp)

这里放一个[宝玉](https://baoyu.io)佬博客当中总结的图片

![MCP 与 Skills 渐进式披露示意图](https://img.philfan.cn/2026/02/b0b420a43da93ced1ea97b5de4fca457.webp)

- **Subagents**: 子 Agent，相当给不同 agents 分不同的角色，有不同的任务

和 Agent 交互有时候并不像野兽先生的游戏，你只要付钱（token），agent 就会按照你的要求完成各种任务。假设一个场景，假如你作为一个 Agent，被锁在一个单独的房间里，接受主人的任务。下面两种情况你会选择哪种？

- A: “讲解一下这些论文，用中文回复”并发来十篇 pdf 文献
- B: 同样是十篇文献，你有一台带有谷歌搜索引擎的电脑，并且你有一本研究综述

答案其实显而易见。

带有谷歌搜索引擎的电脑（外部工具）其实就是 MCP 所负责的任务，去提供更多、更广的数据和工具，来帮助模型完成任务。
而研究综述（外部知识、工作流记忆）就是 Skills 所负责的任务，相当于是一本完成任务的说明书，按照说明书复现对应的任务流程。

## 好像了解了，那这些工具都有什么用？

最近其实在互联网上已经有非常多的讨论了，这里分享一些我自己使用的体验，以及看到 98 上同学们的案例以及一些网络上的案例。

其实目前的 demo 可能并不是特别惊艳，但其实在迭代速度如此快的当下，未来一周、未来一月能做到什么程度真的不敢想象。

所以有一句暴论： **「Claude Code + MCP + Skill + Memory 已经有了通用的雏形」**

### 案例 1：搜索 + 总结 - 信息源拓宽、信息搜集

里以我做的一个为了验证高德 MCP 能力做的「**早 C 晚 A**」概念的网站 <https://coffee.philfan.cn> 为例

这个网站的 Idea 其实特别简单，可视化地标注一些想打卡的咖啡店和酒吧。让又喝咖啡又喜欢喝小酒的同学能打卡

而众所周知校内咖啡社已经做出了 zjg 校区咖啡地图，参考[这篇推文](https://mp.weixin.qq.com/s/bsIqfcUtDKU_7Y4jX_kuPw)。

这篇推文当中标记了所有咖啡店的点位，但是并没有给出具体的坐标，而我自己一个个去手动标注坐标又太蠢了。作为一个懒鬼，我就想尝试使用其他方法。

能否让 CC 来帮我标注学校里面和学校周围的咖啡店呢？我想到了之前看到的**高德地图的 MCP 工具**。

我把咖啡社写的[这篇推文](https://mp.weixin.qq.com/s/bsIqfcUtDKU_7Y4jX_kuPw)当做语料喂给了 CC，让他帮我整理校内的咖啡店的位置，并标注在地图上面。

等待了一些时间，地图上确实出现了文中所有提到的咖啡店。当然它并没有一轮就把所有点位就标注清楚，所以经过我 2-3 轮的「你标注错了 xxx，重新搜！」，它确实将紫金港校区的点位都标记正确了，

![高德 MCP 标注咖啡店地图截图](https://img.philfan.cn/20260206193528547.webp)

接下来，我给 MCP 的**核心指令**是「帮我找到玉泉校区附近尽可能多的咖啡馆、酒吧清吧、livehouse，并按照我的数据结构进行标注」。这样，「早 C 晚 A」核心概念的网站就搭建完成了。而我在其中并没有手动搜索或者标记坐标点位，完全由 CC+ 高德 MCP 自己完成，MCP 在这里的作用就是接收 CC 的调用请求，去访问高德对应的 API 接口信息后，拿到返回信息后让 CC 来判断如何进行接下来的操作。

后面，我还测试了与搜索 MCP 的联动：我希望让星巴克、瑞幸和库迪**呈现对应品牌 Logo 的颜色**，这里我并没有直接告诉 CC 他们 logo 的颜色具体是什么，而是让 CC 自己去网络上搜索（我安装了一个**exa 搜索 mcp**）

![通过搜索 MCP 获取品牌配色截图](https://img.philfan.cn/20260206192928004.webp)

这个功能只进行了一轮对话就完成了。

这个网站的功能目前还比较朴素，不过和咖啡社的同学聊了一下，可以作为校园咖啡地图的未来版本上线。

这个网站从 idea 到上线也只有半天的时间，所有代码开源在 <https://github.com/Phil-Fan/zju-coffee> ，如果对这个有兴趣的同学可以提 PR 练练手。

> 另外需要吐槽一下高德，之前的 ZJU Charger 上线以后，每天三四百的访问量，0 付费纯公益的网站，竟然已经有高德的销售打电话让我付 5w 一年的 API 使用费了 hhh。所以之后可能会迁移到其他地图服务上。

其实，早 C 晚 A 网站在功能上非常简单，但是这个操作过程中，**MCP 作为外部工具和外部信息源，却能复用在更多场景中。**

另外，@九月天温凉 前辈开发了一个查询本周十大热门话题的 [skill](https://www.cc98.org/topic/6403987),虽然爬虫会有问题，但是帖子反应出的一个思想：把高频的工作流封装成一个个 skill，小到自己每天复用，大到团队内共享工具，已经成为目前的主流共识了。

### 案例 2：处理与生成不同格式的文件、使用软件

1. 处理生成 docx、ppt 等不同格式的文件：官方自带的 docx ppt excel 等 skill 可以对很多不同格式的文件进行处理和生成
2. Nano Banana Pro 的 skill 用来画图与 PPT 制作 [op7418/NanoBanana-PPT-Skills](https://github.com/op7418/NanoBanana-PPT-Skills)
3. 图像绘制：在 `https://www.cc98.org/topic/6420038` 当中，给出了一个生成四格漫画的 workflow，其实稍加修改就可以做成一个可以复用的 Skills，并和其他工作流进行结合
4. 软件使用：在开发的过程中，有一个 part 需要使用 blender 帮我做一个模型，但是我完全没有接触过 Blender，但是有一个 Blender MCP，我就可以使用 CC 控制 Blender，帮我做模型
5. 视频剪辑：Remotion、[Ceeon/videocut-skills](https://github.com/Ceeon/videocut-skills)

### 案例 3：注入专家知识

很多大厂总结了前端经验、软件开发经验、部署流程经验，相当于都是免费的「专家工具包」

1. [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)：An AI SKILL that provide design intelligence for building professional UI/UX multiple platforms 比如 @ParadoxZ 前辈的这一篇帖子 [纯靠 AI 做出了一个满意的 ToDo 软件 - CC98 论坛](https://www.cc98.org/topic/6419965)
2. @舒肤佳肥皂 前辈之前发了 [【编程技术】纯靠 ai，上线了我的第一个 app](https://www.cc98.org/topic/6419933) 在这个帖子当中，和 gemini 交流沟通解决了上线部署遇到的问题。
在 UI 风格、Xcode 模拟与操作上，其实现在也有很多的官方的 skills，比如 vercel 推出的最佳实践 [vercel-labs/skills](https://github.com/vercel-labs/skills) 用于 UI 设计与开发；

### 案例 4：处理科研工作流

昨天看到 [免费给一些 AI agent 的内测名额](https://www.cc98.org/topic/6420342) 这个帖子，原 lz 在帖子里面提到了这个垂直领域（生物 AI4science）的 Agent 的优点有四

1. 无需像传统方式那样逐篇查找文献、研读细节，可快速直接对比预设实验方法，大幅节省调研时间。
2. 无需切换多个网站检索，能直接精准获取实验所需的序列、结构及关键信息，操作便捷性拉满。
3. 生成的实验方法、方案大体方向均准确，可满足基础实验设计及思路验证需求。
4. 与 DeepSeek 对比，优势明显：一是提供的参考文献不准确，导致使用时心里不踏实，缺乏可信度；二是无法匹配最新文献，基于旧文献生成的实验设计存在滞后性，不符合科研时效性需求。

简要分析这四点优势，总结的关键点集中在 **信息搜集 + 信息处理**：信息搜集需要能更好的召回相关文献，而不是模型自己输出的文献。信息处理需要更好地符合你的科研习惯和小领域的风格。

相信这位同学所在的公司一定在 agent loop、数据源和记忆功能上下了很大功夫，但是毕竟生物科学领域比较垂直，如果大家想在自己的领域、自己的学习生活中也实现这样的效果，MCP+Skill 或许是你可以尝试的选择。

这其实恰好就是 MCP 和 Skill 想要解决的问题，给模型接上 MCP 就是要获取更多的信息源和工具集（比如 websearch 能力），使用或开发 Skills，就是教会模型你的写作风格，需要注意的事项，实验设计的专业知识等等，让模型更懂你的任务、更懂你的风格。

目前也看到了一些科研场景的 MCP 和 Skill

- [blader/humanizer](https://github.com/blader/humanizer): Claude Code skill that removes signs of AI-generated writing from text
- [claude-scientific-skills](https://github.com/k-dense-ai/claude-scientific-skills): A set of ready to use scientific skills for Claude
- [Orchestra-Research/AI-research-SKILLs](https://github.com/Orchestra-Research/AI-research-SKILLs)：AI 类研究的 Skills

示意图可查看仓库文档目录：[skills.png](https://github.com/Orchestra-Research/AI-research-SKILLs/blob/main/docs/skills.png)

如果有其他有趣的 MCP 或者 Skill，也欢迎大家在下面不吝分享一下！

## 听起来不错，怎么开始用？

### 第一步 - 安装

如果你使用的 CLI 工具：比如 [Claude Code](https://code.claude.com/docs/zh-CN/overview)、Codex

#### Skill

```bash
/plugin marketplace add anthropics/skills
```

也可以使用 skillsmp 中提供的命令进行安装。Skill 可以全局配置（放在你的用户目录，每个文件夹都可以用），也可以按项目配置（只能用在当前项目）。

#### MCP

```bash
claude mcp add exa -e EXA_API_KEY=your-api-key -- npx -y exa-mcp-server
```

如果你使用的是 IDE：比如 Cursor，可以参考对应软件的安装方法。

### 第二步 - 推荐资源与一些最佳实践

> 这里夹带私货放一下我网站上的总结[https://dev.philfan.cn/awesome](https://dev.philfan.cn/awesome) 和我之前的帖子记录了我使用的一些 AI 产品、开发工具、妙妙小工具

1. **CC 配置最佳实践**
   - [Claude Code 创始人最佳实践分享](https://x.com/bcherny/status/2007179832300581177) bcherny 的 Claude Code 配置，非常推荐看看。
   - [everything-claude-code](https://github.com/affaan-m/everything-claude-code) 一个大佬总结的 CC 设置
2. **找 skills**
   - [SkillsMP](https://skillsmp.com/) 一个 Skills 浏览网站（这个作者已经恰到 manus 的饭了哈哈哈
   - [ClawHub](https://clawhub.ai/) Claudbot 的 Skills 集市
   - GitHub 上有很多 Awesome 仓库，可以按需搜索
   - **Skill 虽好，不要贪杯**。配置太多 Skill 也会挤占上下文窗口，并严重影响 Claude Code 的启动时间。所以如果不常用的 Skill 就应该遮蔽起来。
3. **MCP 推荐**
   - [Context7 MCP](https://github.com/upstash/context7) 搜索官方文档
   - [Playwright MCP](https://github.com/microsoft/playwright-mcp) 操作浏览器
   - [Exa MCP](https://docs.exa.ai/reference/exa-mcp) 搜索
   - [高德地图 MCP Server](https://lbs.amap.com/api/mcp-server/summary): 高德地图 API 的 MCP Server
   - [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp): Chrome DevTools for coding agents
   - [Awesome MCP Servers](https://mcpservers.org/)
4. **关于 Subagents 一些有趣的**
   - Claude 新出了 agent teams，看起来很有趣
   - OpenCode（开源版的 Claude Code）的插件 oh-my-opencode 当中有 Ultrawork，挺有意思的，就是比较费 token
   - 之前有一个开源项目 [666ghj/BettaFish: 微舆](https://github.com/666ghj/BettaFish)也有类似的尝试

### 为什么我认为所有人都应该「试试」Agent 型的工具

在 Claude 一个 [Workshop](https://www.youtube.com/watch?v=TqC1qOfiVcQ&t=356s)当中，Claude Code 的开发者 [Thariq Shihipar](https://www.thariq.io/) 认为 Agent 需要有三个基建。

1. 它需要一个**文件系统**，agent 生成的文件可保存，可新建。
2. 它需要 **Bash**（Bash 是一个命令行解释器，可以执行命令，比如 ls、cd、mkdir、rm 等），这样它就可以使用已经有着丰富生态的 shell 工具，完成搜索、检查、运行生成的文件，操作你的 word、excel、代码、浏览器，拿到结果和报错，把人从「胶水工」中解放出来
3. 它需要一个 **容器**，让 agent 运行更安全，不会把你的文件都删光光（`rm -rf /*`）

![Agent SDK Loop 架构图](https://img.philfan.cn/20260109191832998.webp)

如果你现在使用 AI 解决问题的流程是：与 Chatgpt、Gemini、Claude 这种 ChatBot 进行对话，把对话的结果复制到编辑器当中，运行一下，如果报错了或者文字不满意，经过我 Review 以后，把对应的问题复制会 Chatbot 当中进行解决。

结论是：**那我强烈建议你尝试使用 Agent 型的工具解决小部分或者更多你所遇到的问题**。

仔细考虑这个场景，我们在其中充当的角色其实是「**赛博胶水工**」或者是「**C + V 工程师**」，把 AI 生成的文本、结果粘贴到 word 中，再把报错或者写的不好的部分粘贴会 Chatbot 当中解决。

## 我们的产品 Poco - Your Pocket Coworker

![Poco 产品海报](https://img.philfan.cn/20260121000302111.webp)

Poco 意思是 Your Pocket Coworker，是 @光头不砍树 和我在经过了使用了 Claude Code 后进行的产品化探索。

Logo 是一个带着 Claude 颜色镜框的小狗，我们希望把 Claude Code 的能力拓展到云端，“装入口袋"

一句话介绍： **Poco = 套壳的 Claude Code/跑在沙盒的 Openclaw/云端的 CoWork/开源的 Manus**

### Poco 能做什么

1. 支持接入 MCP、Skills，可以从 github 快速导入 skill
2. 对话模式/定时任务/计划模式
3. 支持了很多 Claude Code 内置功能：AskUserTool 的转发、Slash Command、系统提示词更改等
4. 支持 Subagent
5. 对话界面进行了很多优化，可以看到不同格式的产物（代码、markdown、ppt、word、xlsx 等等），我们还学习 Manus，添加了沙盒执行过程的重放，能够看到 agent 每一步查看浏览器和执行命令的完整过程
6. 可以接入 GitHub

### 一些使用案例

没有邀请码，**前端、后端、Docker 环境全部开源**在 [https://github.com/poco-ai/poco-agent](https://github.com/poco-ai/poco-agent)。我们也提供了部署脚本，可以自己部署。

- 线上体验地址 <https://philfan-poco.ms.show/zh/home> 。目前项目还处于比较早期的阶段，并没有上用户登录，所有对话都是所有用户可见的。

### 故事

在和周围同学的沟通当中，我发现 Claude Code 有几个痛点

- 产品名字中带一个 Code，隐形隔离了很多非开发背景的同学
- 很多同学不喜欢人不喜欢命令行界面
- 配环境苦手

当然 Anthropic 自己也注意到了这些痛点，所以他们推出了 Cowork 产品。让 CC 的能力覆盖到非技术背景、非编程场景的需求。

Poco 的诞生，基于以下一些认知

1. Claude Code 不止可以 Code，使用 MCP（外部工具与数据）+ Skill（专家知识和工作流指导）可以覆盖更多场景。**「Claude Code + MCP + Skill + Memory 已经有了通用的雏形」** 这个相似的洞察其实已经成为客观共识，各个大厂都在开发与炒作（Coze2.0 还推出了 Skills 交易商店，虽然 Coze 的定位不知道为什么来回改）
2. Claude Code 的能力还没有被广泛接收和了解，**CC 套壳还有很大想象空间**
3. **本地和云端各有利弊**，最近本地的 Agent 产品很多，本地部署目前还是少数人的游戏，而云端可能更符合（昨天 OpenAI 宣布其 Frontier 产品，我们的猜想已经逐步成为行业的共识）
4. AI 产品大爆发，**有灵魂、懂交互、能交付、会炒作**的产品才能跨越周期
5. AI 应用必须随着模型能力提升而提升，否则很快就会被淘汰。所以技术上我们采用了 Claude Agent SDK，能吃上热乎的新能力。

## 推荐阅读

推荐一些我认为比较优质的相关文章和视频，如果感兴趣的同学可以深入研究一下。

- [Claude Agent SDK [Full Workshop] — Thariq Shihipar, Anthropic - YouTube](https://www.youtube.com/watch?v=TqC1qOfiVcQ&t=356s): Claude 的 Workshop，干货很多
- [Agent Skills 终极指南：入门、精通、预测 - 一泽 Eze](https://mp.weixin.qq.com/s/jUylk813LYbKw0sLiIttTQ)
- [Building Agents with Skills: Equipping Agents for Specialized Work | Claude](https://claude.com/blog/building-agents-with-skills-equipping-agents-for-specialized-work)
- [Claude Code 创始人最佳实践分享](https://x.com/bcherny/status/2007179832300581177)
- [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

一些论坛上比较有趣的讨论

- @我叫杨帅昊 [我永远都不会原谅那个 24 小时待命的赛博工贼... - CC98 论坛](https://webvpn.zju.edu.cn/https/77726476706e69737468656265737421e7e056d22433310830079bab/topic/6420852)
- @九月天温凉 [CC98 十大 skill](https://www.cc98.org/topic/6403987)
- @ephemerall [四格漫画](https://www.cc98.org/topic/6420038)
- @ParadoxZ [纯靠 AI 做出了一个满意的 ToDo 软件 - CC98 论坛](https://www.cc98.org/topic/6419965)
- @舒肤佳肥皂 [【编程技术】纯靠 ai，上线了我的第一个 app](https://www.cc98.org/topic/6419933)

最后的最后，本文没有使用任何 AI 进行润色，有些表达有漏洞的话见谅

码字不易，如果可以到[Poco - Github 链接](https://github.com/poco-ai/poco-agent)为我们的项目点一个免费的 star，就是对我更新内容最大的支持～
