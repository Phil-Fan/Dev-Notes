# 现代运行时

本文档介���现代 JavaScript/TypeScript 运行时和边缘计算平台。

## Cloudflare Workers

全球边缘计算平台，在 Cloudflare 的 300+ 数据中心运行代码。

### Cloudflare Workers 特点

- **全球分布**: 代码在离用户最近的边缘节点执行
- **零冷启动**: 始终保持热状态，无启动延迟
- **免费额度慷慨**: 每天 100,000 次请求
- **丰富生态**: 支持 KV、D1 数据库、R2 存储、Durable Objects

### Cloudflare Workers 快速开始

#### Cloudflare Workers 安装 Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

#### 创建项目

```bash
# 使用模板创建
npm create cloudflare@latest my-worker

# 或手动创建
mkdir my-worker && cd my-worker
npm init -y
npm install wrangler -D
```

#### 基础代码

```typescript
// src/index.ts
export default {
  async fetch(request, env, ctx) {
    return new Response('Hello Worker!');
  },
};
```

#### Cloudflare Workers 配置文件

```toml
# wrangler.toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# KV 命名空间绑定
[[kv_namespaces]]
binding = "KV"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# 环境变量
[vars]
API_URL = "https://api.example.com"
```

### Cloudflare Workers 常用命令

```bash
# 开发
wrangler dev                  # 本地开发服务器 (http://localhost:8787)
wrangler dev --remote         # 远程开发模式(连接生产环境资源)

# 部署
wrangler deploy               # 部署到 Cloudflare
wrangler deploy --env staging # 部署到 staging 环境

# 密钥管理
wrangler secret put API_KEY   # 设置环境变量(加密存储)
wrangler secret list          # 列出所有密钥

# 类型定义
wrangler types                # 生成 Env 类型定义

# 监控
wrangler tail                 # 实时查看 Worker 日志
wrangler deployments list     # 查看部署历史
```

### 最佳实践

#### 1. 缓存策略

```typescript
export default {
  async fetch(request, env, ctx) {
    const cache = caches.default;

    // 检查缓存
    let response = await cache.match(request);
    if (response) {
      return response;
    }

    // 缓存未命中，fetch 并缓存
    response = await fetch(request);

    // 只缓存成功的响应
    if (response.status === 200) {
      ctx.waitUntil(cache.put(request, response.clone()));
    }

    return response;
  },
};
```

#### 2. 错误处理

```typescript
export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (url.pathname.startsWith('/api/')) {
        return await handleAPI(request, env);
      }

      return new Response('Not Found', { status: 404 });
    } catch (err) {
      return new Response(err.message, { status: 500 });
    }
  },
};
```

#### 3. 环境变量使用

```typescript
type Env = {
  KV: KVNamespace;
  API_KEY: string;
  DB: D1Database;
};

export default {
  async fetch(request: Request, env: Env) {
    // 使用 KV 存储
    await env.KV.put('key', 'value');

    // 访问环境变量
    const apiKey = env.API_KEY;

    // 查询 D1 数据库
    const result = await env.DB.prepare('SELECT * FROM users').all();
  },
};
```

### 绑定服务

Workers 可以绑定多种 Cloudflare 服务：

```typescript
interface Env {
  // KV 存储
  KV: KVNamespace;

  // D1 数据库
  DB: D1Database;

  // R2 对象存储
  BUCKET: R2Bucket;

  // Durable Objects
  COUNTER: DurableObjectNamespace;

  // 其他 Worker
  API: Fetcher;
}
```

### Cloudflare Workers 相关链接

- [官方文档](https://developers.cloudflare.com/workers/)
- [API 参考](https://developers.cloudflare.com/workers/runtime-apis/)
- [示例教程](https://developers.cloudflare.com/workers/tutorials/)
- [Wrangler CLI](https://github.com/cloudflare/workers-sdk)
- [GitHub](https://github.com/cloudflare/workers-sdk)

---

## Deno

现代 JavaScript/TypeScript 运行时，由 Node.js 创建者开发。

### Deno 特点

- **安全第一**: 默认沙箱，显式权限控制
- **原生 TypeScript**: 开箱即用，无需配置
- **内置工具**: 测试、格式化、linting、打包一体化
- **兼容性**: Deno 2.0+ 支持 npm 和 Node.js API

### Deno 快速开始

#### Deno 安装

```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Windows (PowerShell)
irm https://deno.land/install.ps1 | iex

# Homebrew
brew install deno
```

#### Deno 第一个程序

```typescript
// main.ts
console.log('Hello Deno!');

Deno.serve({ port: 8000 }, async (req) => {
  return new Response('Hello from Deno!');
});
```

```bash
deno run --allow-net main.ts
```

### Deno 常用命令

```bash
# 运行
deno run script.ts           # 运行脚本
deno run -A script.ts        # 允许所有权限
deno run --allow-net script.ts  # 允许网络访问
deno run --watch script.ts   # 监听模式(自动重启)

# 开发
deno test                    # 运行测试
deno test --coverage         # 生成覆盖率报告
deno fmt                    # 格式化代码
deno check main.ts          # 类型检查
deno lint                  # 代码检查

# 任务(需在 deno.json 中配置)
deno task dev               # 运行 dev 任务
deno task build             # 运行 build 任务
```

### 权限系统

```bash
# 允许网络访问
deno run --allow-net main.ts

# 允许文件读取
deno run --allow-read main.ts

# 允许文件写入
deno run --allow-write main.ts

# 允许环境变量访问
deno run --allow-env main.ts

# 允许所有权限(开发环境)
deno run -A main.ts

# 允许特定路径
deno run --allow-read=/etc,/tmp main.ts
```

### Deno 配置文件

```json
{
  "tasks": {
    "dev": "deno run --allow-net --watch main.ts",
    "test": "deno test --allow-all",
    "build": "deno compile --allow-net --allow-read main.ts"
  },
  "imports": {
    "std/": "https://deno.land/std@"
  },
  "compilerOptions": {
    "allowJs": true,
    "lib": ["deno.window"]
  }
}
```

### 测试

```typescript
// main_test.ts
import { assertEquals } from "jsr:@std/assert";

Deno.test("add function", () => {
  assertEquals(add(1, 2), 3);
});

Deno.test("async function", async () => {
  const result = await fetchData();
  assertEquals(result.status, "ok");
});
```

### Web 框架：Fresh

[Fresh](https://fresh.deno.dev/) 是 Deno 官方推荐的现代 Web 框架。

```bash
# 创建 Fresh 项目
deno run -A -r https://fresh.deno.dev my-app
cd my-app
deno task dev
```

### Deno 相关链接

- [官方文档](https://docs.deno.com/runtime/)
- [标准库](https://docs.deno.com/runtime/fundamentals/standard_library/)
- [Fresh 框架](https://fresh.deno.dev/)
- [GitHub](https://github.com/denoland/deno)

---

## Bun

极速 JavaScript 运行时、打包器、测试运行器和包管理器。

### Bun 特点

- **性能出众**: 比 Node.js 快 2-4 倍
- **All-in-One**: 运行时、包管理器、测试、打包一体化
- **原生 TypeScript**: 无需配置即可运行
- **Node.js 兼容**: 可使用大多数 npm 包

### Bun 快速开始

#### Bun 安装

```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
irm bun.sh/install.ps1 | iex

# Homebrew
brew tap oven-sh/bun
brew install bun

# 包管理器
npm install -g bun
```

#### Bun 第一个程序

```typescript
// server.ts
const server = Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello Bun!");
  },
});

console.log(`Listening on ${server.url}`);
```

```bash
bun run server.ts
```

### Bun 常用命令

```bash
# 包管理
bun install                  # 安装依赖
bun add package              # 添加依赖
bun add -d package           # 添加开发依赖
bun remove package           # 移除依赖
bun update                   # 更新依赖

# 运行
bun run script.ts
bun run dev                  # 运行 package.json 中的 dev 脚本
bun --watch script.ts        # 监听模式

# 测试
bun test                     # 运行测试
bun test --watch             # 监听模式测试

# 构建
bun build ./index.ts --outdir ./build

# 运行 Node.js 应用
bun run node-app.js
```

### 内置测试

```typescript
// math.test.ts
import { expect, test } from "bun:test";

test("add", () => {
  expect(add(1, 2)).toBe(3);
});

test("async", async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});
```

### 高性能文件服务器

```typescript
const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // 静态文件服务
    if (url.pathname === '/') {
      return new Response(Bun.file("./index.html"));
    }

    // API 路由
    if (url.pathname.startsWith('/api')) {
      return Response.json({ message: 'API endpoint' });
    }

    return new Response('Not Found', { status: 404 });
  },
});
```

### 使用 Hono 框架

```bash
bun add hono
```

```typescript
import { Hono } from 'hono';
import { serve } from 'bun';

const app = new Hono();

app.get('/', (c) => c.text('Hello Hono + Bun!'));
app.get('/api/:name', (c) => c.json({ name: c.req.param('name') }));

serve({
  fetch: app.fetch,
  port: 3000,
});
```

### 与 Node.js 兼容

```bash
# 大多数 Node.js 应用可以直接用 Bun 运行
bun run node-app.js

# 安装 npm 包
bun install express
```

```typescript
// Express 应用也可以用 Bun 运行
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express on Bun!');
});

app.listen(3000);
```

### 性能优化

```typescript
// Bun 的原生文件读取非常快
const file = Bun.file("data.txt");
const text = await file.text();

// 快速写入文件
await Bun.write("output.txt", "Hello World");

// 高性能 HTTP 服务器
Bun.serve({
  port: 3000,
  fetch: {
    // 使用 WebSocket
    websocket: {
      message(ws, message) {
        ws.send(message);
      },
    },
  },
});
```

### Bun 相关链接

- [官方文档](https://bun.sh/docs)
- [GitHub](https://github.com/oven-sh/bun)
- [Discord 社区](https://bun.sh/discord)

---

## 对比

### 性能对比

| 运行时 | 启动时间 | 内存占用 | 吞吐量 |
|--------|----------|----------|--------|
| Bun    | 极快     | 低       | 最高   |
| Deno   | 快       | 中       | 高     |
| Node   | 慢       | 高       | 中     |

### 使用场景

#### Cloudflare Workers 场景

- ✅ 边缘计算和 CDN 场景
- ✅ 全球分布式应用
- ✅ 无服务器函数
- ✅ API 网关和代理

#### Deno 场景

- ✅ 安全要求高的应用
- ✅ TypeScript 项目
- ✅ CLI 工具开发
- ✅ 后端 API 服务

#### Bun 场景

- ✅ 性能敏感应用
- ✅ 高并发服务
- ✅ 构建工具链
- ✅ 替代 Node.js 运行现有应用

### 选择建议

1. **边缘计算**: Cloudflare Workers
2. **新项目 + TypeScript**: Deno 或 Bun
3. **性能优先**: Bun
4. **安全优先**: Deno
5. **现有 Node.js 项目**: 尝试 Bun(兼容性最好)
