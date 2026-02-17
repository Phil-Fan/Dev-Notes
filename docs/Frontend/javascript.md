---
status:new
---

# JavaScript

[State of JavaScript 2024](https://2024.stateofjs.com/zh-Hans/)

## Nodejs

一个 JavaScript 运行时环境，基于 Chrome V8 引擎。

让你可以在浏览器外（如服务器端）运行 JavaScript。

作用类似于：

- Python 的解释器 python
- Java 的虚拟机 java

没有 Node.js，就不能直接在命令行运行 .js 程序。

### 安装

[Node.js — Download Node.js®](https://nodejs.org/en/download)

使用这个网站上面的安装的指令

[windows 安装 npm 教程\_npm 安装-CSDN 博客](https://blog.csdn.net/zhouyan8603/article/details/109039732)

[Node.js — Run JavaScript Everywhere](https://nodejs.org/en/)

安装以后可以把 nodejs 的本地仓库从 c 盘移出来

```shell
npm config set prefix "<path>\\nodejs\\node_global"
npm config set cache "<path>\\nodejs\\node_cache"
```

### 卸载

```shell
sudo npm uninstall npm -g
```

```shell
cd /usr/local/lib/node_modules/

rm -rf npm
```

```shell
sudo apt-get remove nodejs
sudo apt-get remove npm
sudo apt-get remove node
```

```shell
node -v
npm -v
```

## NPM - 包管理器

npm (Node Package Manager)

Node.js 自带的包管理工具。用来下载、安装和管理 JavaScript 库/框架。

类似于：

- Python 的 pip
- Java 的 maven/gradle

```bash title="检查版本"
node -v   # 查看 Node.js 版本
npm -v    # 查看 npm 版本
```

```bash title="初始化项目"
npm init
```

它会一步一步问你项目名、版本号、作者等。
如果只想快速生成默认配置：

```bash
npm init -y
```

会生成一个 `package.json` 文件，记录项目信息和依赖。

### 增

```bash
npm install 包名
```

```bash
npm i 包名
```

会把包写进 `node_modules/`，同时在 `package.json` 的 `dependencies` 里记录。

#### 全局安装

```bash title="全局安装"
npm install -g 包名
```

#### 只在开发环境安装

```bash title="只在开发环境需要"
npm install 包名 --save-dev
```

缩写：

```bash
npm i 包名 -D
```

写入 `devDependencies`，比如测试框架 jest、打包工具 webpack。

### 删

```bash
npm uninstall 包名
```

缩写：

```bash
npm un 包名
```

### 查

```bash title="查看已安装的依赖"
npm list
```

```bash title="更新依赖"
npm update 包名
```

```bash title="清除缓存"
npm cache clean --force
```

```bash title="升级npm"
npm install -g npm
```

## NVM

[nvm-sh/nvm](https://github.com/nvm-sh/nvm): Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions

```shell
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

```shell
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" --no-use # This loads nvm, without auto-using the default version
```

```shell title="验证"
nvm -vx
```

### 下载

使用 NVM 进行管理

```shell
nvm install stable
```

### 更换版本

```shell
nvm install 22
nvm use 22
```

## Vue

```shell title="cmd 验证安装"
npm -v
npm info vue
```

```shell title="配置镜像站点"
npm config set registry=http://registry.npm.taobao.org
```

```shell
npm install vue -g
npm install vue-router -g
```

```shell title="创建 vue 工程"
vue init webpack vue01
cd vue01
npm install
npm run dev

npm run build
```

成功界面，提示打开地址 `http://localhost:8080`

## JavaScript 全生态整理

### 核心语言 & 规范

| 工具/库    | 功能                    | GitHub 链接                                                                        |
| ---------- | ----------------------- | ---------------------------------------------------------------------------------- |
| ECMAScript | JavaScript 标准规范     | [https://github.com/tc39/ecma262](https://github.com/tc39/ecma262)                 |
| Babel      | JS 转译器（ES6+ → ES5） | [https://github.com/babel/babel](https://github.com/babel/babel)                   |
| TypeScript | JS 静态类型超集         | [https://github.com/microsoft/TypeScript](https://github.com/microsoft/TypeScript) |

---

### 运行环境

| 工具    | 功能                           | GitHub 链接                                                          |
| ------- | ------------------------------ | -------------------------------------------------------------------- |
| Node.js | JS 服务器端运行环境            | [https://github.com/nodejs/node](https://github.com/nodejs/node)     |
| Deno    | 安全 JS/TS runtime             | [https://github.com/denoland/deno](https://github.com/denoland/deno) |
| Bun     | 高性能 JS/TS runtime & bundler | [https://github.com/oven-sh/bun](https://github.com/oven-sh/bun)     |

---

### 前端框架 / UI 框架

| 工具      | 功能                    | GitHub 链接                                                              |
| --------- | ----------------------- | ------------------------------------------------------------------------ |
| React     | UI 库                   | [https://github.com/facebook/react](https://github.com/facebook/react)   |
| Vue.js    | 渐进式框架              | [https://github.com/vuejs/vue](https://github.com/vuejs/vue)             |
| Angular   | 全功能框架              | [https://github.com/angular/angular](https://github.com/angular/angular) |
| Svelte    | 编译型 UI 框架          | [https://github.com/sveltejs/svelte](https://github.com/sveltejs/svelte) |
| Solid.js  | 高性能响应式框架        | [https://github.com/solidjs/solid](https://github.com/solidjs/solid)     |
| Next.js   | React SSR/SSG/Fullstack | [https://github.com/vercel/next.js](https://github.com/vercel/next.js)   |
| Nuxt.js   | Vue SSR/Fullstack       | [https://github.com/nuxt/nuxt](https://github.com/nuxt/nuxt)             |
| Remix     | React 全栈框架          | [https://github.com/remix-run/remix](https://github.com/remix-run/remix) |
| Astro     | 多框架静态站点生成器    | [https://github.com/withastro/astro](https://github.com/withastro/astro) |
| SvelteKit | Svelte 全栈框架         | [https://github.com/sveltejs/kit](https://github.com/sveltejs/kit)       |

---

### 后端框架

| 工具       | 功能                | GitHub 链接                                                                  |
| ---------- | ------------------- | ---------------------------------------------------------------------------- |
| Express.js | 轻量 Web 框架       | [https://github.com/expressjs/express](https://github.com/expressjs/express) |
| Koa        | 极简 Web 框架       | [https://github.com/koajs/koa](https://github.com/koajs/koa)                 |
| NestJS     | TypeScript 后端框架 | [https://github.com/nestjs/nest](https://github.com/nestjs/nest)             |
| Fastify    | 高性能 Node 框架    | [https://github.com/fastify/fastify](https://github.com/fastify/fastify)     |

---

### 状态管理

| 工具                         | 功能               | GitHub 链接                                                                                      |
| ---------------------------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| Redux Toolkit                | Redux 官方最佳实践 | [https://github.com/reduxjs/redux-toolkit](https://github.com/reduxjs/redux-toolkit)             |
| Zustand                      | 轻量状态管理       | [https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)                           |
| MobX                         | 响应式状态管理     | [https://github.com/mobxjs/mobx](https://github.com/mobxjs/mobx)                                 |
| Recoil                       | React 状态管理     | [https://github.com/facebookexperimental/Recoil](https://github.com/facebookexperimental/Recoil) |
| React Query / TanStack Query | 数据获取 & 缓存    | [https://github.com/TanStack/query](https://github.com/TanStack/query)                           |
| Jotai                        | 原子化状态管理     | [https://github.com/pmndrs/jotai](https://github.com/pmndrs/jotai)                               |

---

### 构建 / 打包

| 工具      | 功能                 | GitHub 链接                                                                          |
| --------- | -------------------- | ------------------------------------------------------------------------------------ |
| Webpack   | 模块打包器           | [https://github.com/webpack/webpack](https://github.com/webpack/webpack)             |
| Rollup    | ES 模块打包          | [https://github.com/rollup/rollup](https://github.com/rollup/rollup)                 |
| Parcel    | 零配置打包           | [https://github.com/parcel-bundler/parcel](https://github.com/parcel-bundler/parcel) |
| Vite      | 极速开发 + 构建      | [https://github.com/vitejs/vite](https://github.com/vitejs/vite)                     |
| esbuild   | 极快打包 & 转译      | [https://github.com/evanw/esbuild](https://github.com/evanw/esbuild)                 |
| Turbopack | Next.js 官方 bundler | [https://turbo.build/pack](https://turbo.build/pack)                                 |
| Snowpack  | 构建 & dev server    | [https://github.com/snowpackjs/snowpack](https://github.com/snowpackjs/snowpack)     |

---

### 包管理

| 工具 | 功能              | GitHub 链接                                                        |
| ---- | ----------------- | ------------------------------------------------------------------ |
| npm  | 官方包管理器      | [https://github.com/npm/cli](https://github.com/npm/cli)           |
| Yarn | Facebook 包管理器 | [https://github.com/yarnpkg/yarn](https://github.com/yarnpkg/yarn) |
| pnpm | 高性能包管理器    | [https://github.com/pnpm/pnpm](https://github.com/pnpm/pnpm)       |

---

### 测试

| 工具       | 功能          | GitHub 链接                                                                        |
| ---------- | ------------- | ---------------------------------------------------------------------------------- |
| Jest       | 单元测试      | [https://github.com/facebook/jest](https://github.com/facebook/jest)               |
| Mocha      | 测试框架      | [https://github.com/mochajs/mocha](https://github.com/mochajs/mocha)               |
| Chai       | 断言库        | [https://github.com/chaijs/chai](https://github.com/chaijs/chai)                   |
| Vitest     | Vite 集成测试 | [https://github.com/vitest-dev/vitest](https://github.com/vitest-dev/vitest)       |
| Cypress    | E2E 测试      | [https://github.com/cypress-io/cypress](https://github.com/cypress-io/cypress)     |
| Playwright | E2E 自动化    | [https://github.com/microsoft/playwright](https://github.com/microsoft/playwright) |

---

### Lint / 代码格式化 / 新一代工具

| 工具     | 功能                                                          | GitHub 链接                                                                  |
| -------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| ESLint   | JS/TS 静态分析                                                | [https://github.com/eslint/eslint](https://github.com/eslint/eslint)         |
| Prettier | 代码格式化                                                    | [https://github.com/prettier/prettier](https://github.com/prettier/prettier) |
| Biome    | 一体化 Linter & Formatter & Bundler（ESLint + Prettier 替代） | [https://github.com/biomejs/biome](https://github.com/biomejs/biome)         |
| Rome     | 一体化工具链                                                  | [https://github.com/rome/tools](https://github.com/rome/tools)               |
| SWC      | 高性能 JS/TS 编译器                                           | [https://github.com/swc-project/swc](https://github.com/swc-project/swc)     |

---

### UI / 组件库

| 工具              | 功能           | GitHub 链接                                                                                |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------ |
| Material-UI (MUI) | React 组件库   | [https://github.com/mui/material-ui](https://github.com/mui/material-ui)                   |
| Ant Design        | UI 组件库      | [https://github.com/ant-design/ant-design](https://github.com/ant-design/ant-design)       |
| Chakra UI         | React UI 框架  | [https://github.com/chakra-ui/chakra-ui](https://github.com/chakra-ui/chakra-ui)           |
| Tailwind CSS      | 原子化 CSS     | [https://github.com/tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) |
| Headless UI       | 无样式 UI 组件 | [https://github.com/tailwindlabs/headlessui](https://github.com/tailwindlabs/headlessui)   |
| Storybook         | UI 组件文档    | [https://github.com/storybookjs/storybook](https://github.com/storybookjs/storybook)       |

### 数据库 & ORM

| 工具         | 功能           | GitHub 链接                                                                      |
| ------------ | -------------- | -------------------------------------------------------------------------------- |
| Sequelize    | Node ORM       | [https://github.com/sequelize/sequelize](https://github.com/sequelize/sequelize) |
| Prisma       | ORM & 类型安全 | [https://github.com/prisma/prisma](https://github.com/prisma/prisma)             |
| TypeORM      | ORM 框架       | [https://github.com/typeorm/typeorm](https://github.com/typeorm/typeorm)         |
| Objection.js | ORM            | [https://github.com/Vincit/objection.js](https://github.com/Vincit/objection.js) |
| Mongoose     | MongoDB ODM    | [https://github.com/Automattic/mongoose](https://github.com/Automattic/mongoose) |

---

### 工具链 / DevOps

| 工具      | 功能                 | GitHub 链接                                                            |
| --------- | -------------------- | ---------------------------------------------------------------------- |
| Husky     | git hook 管理        | [https://github.com/typicode/husky](https://github.com/typicode/husky) |
| Lerna     | monorepo 管理        | [https://github.com/lerna/lerna](https://github.com/lerna/lerna)       |
| Nx        | monorepo 工具        | [https://github.com/nrwl/nx](https://github.com/nrwl/nx)               |
| Turborepo | 高性能 monorepo 构建 | [https://github.com/vercel/turbo](https://github.com/vercel/turbo)     |

## 历史

JavaScript（简称 JS）是由 Netscape 公司的 Brendan Eich 在 1995 年十天内开发出来的一种脚本语言。最初设计用于浏览器端的动态网页内容生成，JavaScript 迅速成为 Web 开发的核心技术之一，与 HTML 和 CSS 并列为前端开发的三大支柱。

- **诞生背景**：JavaScript 诞生于 Web 1.0 时代，最初被称为 Mocha，后改名为 LiveScript，最后才成为 JavaScript。
- **发展历程**：从最初的客户端脚本语言，JavaScript 逐步演变成一门强大的编程语言，现今不仅用于浏览器端，还在服务器端广泛应用。

- 是编程语言，Web 的核心技术之一
- JavaScript 是遵循 ECMAScript 标准的脚本语言，与 Java 没有任何关系
- 现在也可用于通用编程：Node.js

## 语法

用于实现网页的交互功能，由 `<script>` 标签引入

```javascript
//变量
var x = 5;
let y = 10;
const z = 15;

//函数
function add(a, b) {
  return a + b;
}
```

```html
<script>
  console.log("Hello, World!");

  fetch("https://api.example.com")
    .then((response) => response.json())
    .then((data) => (document.body.innerHTML = data.message));
</script>
<script async src="my-super-cool-script.js"></script>
```

事件监听

```javascript
document.getElementById("myButton").addEventListener("click", function () {
  alert("Button clicked!");
});
```

## 三方库

### jQuery

曾经风光无限的 JavaScript 库，它简化了 HTML 与 JavaScript 之间的操作。

近些年来越来越少的开发者会用到它，因为现在几乎都是使用的 Vue 和 React 前端框架，这些前端框架提出了一个概念叫做虚拟 DOM，通过虚拟 DOM 技术，我们在实际的开发中减少了大量的 DOM 操作，自然就不需要使用简化 DOM 操作的 jQuery。

由于 jQuery 过去的风光，所以现在很多前端项目依然还在使用 jQuery 进行维护，同时由于编写油猴脚本需要大量操作 DOM，所以如果需要编写油猴脚本，还是要学一学 jQuery。

那么说了这么多，通过下面的例子我们来看看 jQuery 到底起了什么作用：

比如我们要通过 ID 获取到一个 DOM 元素，使用原生 JavaScript 进行获取就是 document.getElementById("app");，而通过 jQuery 获取就可以简化为$("#app")。

通过上面的例子可以看到 jQuery 在操作 DOM 元素时大大的简化了代码量。

## Beyond

- JavaScript 的缺点：性能不足（解释型）、弱类型
- WebAssembly（WASM）：在浏览器中运行的跨平台字节码格式
  - 由 C、C++、Rust 等编译型语言编译生成
  - 可以直接在浏览器中运行，性能接近原生代码
  - 可以与 JavaScript 互操作
  - 适合于需要高性能的应用，如游戏、图像、视频处理等

### TS | TypeScript

TypeScript（简称 TS）是由微软开发的一种开源编程语言，是 JavaScript 的超集，增加了静态类型和类等特性。

**静态类型：** 通过类型检查减少运行时错误，提高代码的可维护性。

```typescript
let message: string = "Hello, TypeScript!";
```

​
**类和接口：** 支持面向对象编程，增强代码结构性。

```typescript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    console.log("Hello, " + this.name);
  }
}

let person = new Person("Alice");
person.greet();

import { add } from "./math";
console.log(add(2, 3));
```

​
**模块化：** 支持模块化编程，提高代码复用性和组织性。

```typescript
import { add } from "./math";
console.log(add(2, 3));
```
