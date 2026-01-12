# Docker

[Docker Compose - 安装和基本使用\_docker-compose 安装-CSDN 博客](https://blog.csdn.net/Que_art/article/details/135192479)

:::info

Docker Compose（容器编排工具）：Docker Compose 是一个用于定义和运行多容器 Docker 应用的工具。

功能：

- **多容器管理**：允许用户在一个 YAML 文件中定义和管理多个容器
- **服务编排**：配置容器间的网络和依赖关系
- **一键部署**：使用 docker-compose up 命令启动、停止和

Docker（容器平台）：一个开放源代码的容器化平台，允许开发者将应用及其依赖打包进轻量级、可移植的容器中。

功能：

- **容器化**：将应用和其运行环境封装在一个容器中
- **镜像管理**：创建、存储和分发容器镜像
- **容器运行**：可以运行在任何支持 Docker 的环境中

:::

## 安装

### linux

```shell title="安装 docker"
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

```shell title="查看是否安装成功"
docker --version
```

```shell
[root@localhost ~]# docker-compose --version
Docker Compose version v2.16.0
```

#### 换源

```shell
sudo vim /etc/docker/daemon.json
```

插入下面的句子，最后不要加逗号（前面要加逗号，如果是最后一条则不加）

```json
{
  "registry-mirrors": ["https://dockerhub.icu"]
}
```

### windows

[【从零开始】Docker Desktop：听说你小子要玩我 - 阿里云开发者社区](https://developer.aliyun.com/article/1601101)

1. [官网](https://www.docker.com/products/docker-desktop/)下载
2. 安装
3. 重启一下电脑，这步可能会遇到什么用户组的问题，先重启。我重启以后问题消失

   ```shell title="查看是否安装成功"
   docker --version
   ```

4. 修改镜像源

![image](https://philfan-pic.oss-cn-beijing.aliyuncs.com/web_pic/Tools__Language__assets__Docker.assets__20241219162658.webp)

```json title="镜像源设置"
{
  "registry-mirrors": [
    "https://docker.hpcloud.cloud",
    "https://docker.m.daocloud.io",
    "https://docker.unsee.tech",
    "https://docker.1panel.live",
    "http://mirrors.ustc.edu.cn",
    "https://docker.chenby.cn",
    "http://mirror.azure.cn",
    "https://dockerpull.org",
    "https://dockerhub.icu",
    "https://hub.rat.dev"
  ]
}
```

### 常规操作

上传文件：点击`files`在右键选择`import`选择文件夹即可，上传以后重启服务

## 卸载

1.删除 docker 及安装时自动安装的所有包

```shell title="删除 docker 及安装时自动安装的所有包"
apt-get autoremove docker docker-ce docker-engine  docker.io  containerd runc
```

2.查看 docker 是否卸载干净

```shell title="查看 docker 是否卸载干净"
dpkg -l | grep docker
```

3.删除无用的相关的配置文件

```shell title="删除无用的相关的配置文件"
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P
```

4.删除没有删除的相关插件

```shell title="删除没有删除的相关插件"
apt-get autoremove docker-ce-*
```

5.删除 docker 的相关配置&目录

```shell title="删除 docker 的相关配置&目录"
rm -rf /etc/systemd/system/docker.service.d
rm -rf /var/lib/docker
```

6.确定 docker 卸载完毕

```shell title="确定 docker 卸载完毕"
docker --version
```

## 使用

```shell title="启动 docker"
sudo systemctl start docker
```

```shell title="停止 docker"
sudo systemctl stop docker
```

```shell title="重启 docker"
sudo systemctl restart docker
```

```shell title="查看 docker 状态"
sudo systemctl status docker
```

```shell title="查看 docker 日志"
sudo journalctl -u docker
```

### 镜像管理

:::tip 常用镜像操作

**拉取镜像：**

```shell
# 拉取最新版本
docker pull nginx

# 拉取指定版本
docker pull nginx:1.24

# 拉取多个镜像
docker pull mysql:8.0 redis:7.0
```

**查看镜像：**

```shell
# 列出所有镜像
docker images

# 查看镜像详细信息
docker inspect nginx:latest
```

**删除镜像：**

```shell
# 删除单个镜像
docker rmi nginx:latest

# 删除多个镜像
docker rmi nginx redis mysql

# 强制删除运行中的容器镜像
docker rmi -f nginx

# 删除所有未使用的镜像
docker image prune -a
```

**构建镜像：**

```shell
# 构建镜像并打标签
docker build -t myapp:v1.0 .

# 使用 Dockerfile 构建并指定文件路径
docker build -f /path/to/Dockerfile -t myapp .
```

:::

### 容器管理

:::tip 容器生命周期管理

**运行容器：**

```shell
# 基本运行
docker run nginx

# 后台运行并映射端口
docker run -d -p 8080:80 --name my-nginx nginx

# 交互式运行
docker run -it ubuntu bash

# 挂载本地目录
docker run -v /host/path:/container/path nginx

# 设置环境变量
docker run -e ENV=value -e NODE_ENV=production node-app

# 自动重启（除非手动停止）
docker run --restart=unless-stopped nginx
```

**查看容器：**

```shell
# 查看运行中的容器
docker ps

# 查看所有容器（包括已停止）
docker ps -a

# 查看容器详细信息
docker inspect my-nginx

# 查看容器日志
docker logs my-nginx

# 实时查看容器日志
docker logs -f my-nginx

# 查看容器资源使用情况
docker stats my-nginx
```

**容器操作：**

```shell
# 启动已停止的容器
docker start my-nginx

# 停止运行中的容器
docker stop my-nginx

# 重启容器
docker restart my-nginx

# 强制停止容器
docker kill my-nginx

# 删除已停止的容器
docker rm my-nginx

# 强制删除运行中的容器
docker rm -f my-nginx

# 进入运行中的容器
docker exec -it my-nginx bash

# 在容器中执行命令
docker exec my-nginx nginx -v
```

:::

### 数据卷管理

:::tip 数据持久化

**创建和管理数据卷：**

```shell
# 创建数据卷
docker volume create my-data

# 列出所有数据卷
docker volume ls

# 查看数据卷详细信息
docker inspect my-data

# 删除未使用的数据卷
docker volume prune

# 删除指定数据卷
docker volume rm my-data
```

**使用数据卷：**

```shell
# 挂载数据卷到容器
docker run -d -v my-data:/app/data nginx

# 挂载本地目录到容器
docker run -d -v /path/to/local:/path/in/container nginx

# 只读挂载
docker run -d -v /path/to/local:/path/in/container:ro nginx
```

:::

### 网络管理

:::tip 容器网络配置

**网络操作：**

```shell
# 创建网络
docker network create my-network

# 列出所有网络
docker network ls

# 查看网络详细信息
docker network inspect my-network

# 删除网络
docker network rm my-network

# 连接容器到网络
docker network connect my-network my-nginx

# 断开容器网络连接
docker network disconnect my-network my-nginx
```

**使用网络运行容器：**

```shell
# 使用指定网络运行容器
docker run --network my-network --name my-app nginx

# 创建桥接网络并运行多个容器
docker network create my-bridge
docker run --network my-bridge --name web nginx
docker run --network my-bridge --name api node-app
```

:::

### Dockerfile 编写指南

:::tip Dockerfile 最佳实践

**基础示例：**

```dockerfile
# 使用官方镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production

# 运行应用
CMD ["node", "app.js"]
```

**多阶段构建（优化镜像大小）：**

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM node:18-alpine

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production

EXPOSE 3000
CMD ["node", "dist/app.js"]
```

**Dockerfile 编写技巧：**

```dockerfile
# 1. 选择合适的基础镜像
FROM ubuntu:latest  # ❌ 太大
FROM ubuntu:20.04   # ✅ 指定版本
FROM alpine:3.18    # ✅✅ 更小更安全

# 2. 合并 RUN 指令减少层数
RUN apt-get update        # ❌ 多层
RUN apt-get install -y curl

RUN apt-get update && \   # ✅ 合并一层
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# 3. 利用构建缓存
COPY package*.json ./     # ✅ 先复制依赖文件
RUN npm install           # ✅ 依赖变化才会重新安装
COPY . .                  # 最后复制代码

# 4. 使用 .dockerignore
# node_modules
# npm-debug.log
# .git
# *.md

# 5. 非 root 用户运行
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs
```

:::

### 实用技巧

:::info 开发工作流

**快速清理：**

```shell
# 删除所有已停止的容器
docker container prune

# 删除所有未使用的镜像
docker image prune -a

# 删除所有未使用的数据卷、网络、镜像、容器
docker system prune -a --volumes

# 查看 Docker 占用的磁盘空间
docker system df
```

**导出和导入：**

```shell
# 导出镜像
docker save -o myapp.tar myapp:v1.0

# 导入镜像
docker load -i myapp.tar

# 导出容器
docker export my-container > my-container.tar

# 导入容器为新镜像
docker import my-container.tar new-image:latest
```

**日志管理：**

```shell
# 查看容器日志最后 100 行
docker logs --tail 100 my-nginx

# 查看最近 10 分钟的日志
docker logs --since 10m my-nginx

# 查看指定时间范围的日志
docker logs --since "2024-01-01T00:00:00" --until "2024-01-02T00:00:00" my-nginx
```

:::

### 常见问题

:::warning 故障排查

**容器启动失败：**

```shell
# 查看容器日志
docker logs my-container

# 查看容器最近的日志
docker logs --tail 50 my-container

# 检查容器状态
docker inspect my-container
```

**端口冲突：**

```shell
# 查看端口占用
sudo netstat -tulpn | grep :8080

# 或使用 lsof
sudo lsof -i :8080

# 使用不同端口
docker run -p 8081:80 nginx
```

**权限问题：**

```shell
# 将用户添加到 docker 组（避免每次 sudo）
sudo usermod -aG docker $USER

# 刷新用户组
newgrp docker
```

**镜像拉取缓慢：**

```shell
# 配置镜像加速器（在 daemon.json 中配置）
# 或使用代理
docker pull --platform linux/amd64 nginx
```

:::

### 文档

:::tip 文档结构

**说明：**

- version：指定 Compose 文件格式 yaml 的规则版本，版本决定可用的配置选项
- service：定义了应用中的服务，每个服务可以使用不同的镜像、环境设置和依赖关系
  - web：自己构建的镜像
    - build：用于构建镜像，指定构建镜像的 dockerfile 的上下文路径
    - ports：映射容器和宿主机的端口
    - volumes：挂载本地目录到指定容器目录，用于数据持久化或在容器之间共享数据
    - links：与 redis 服务连接
- redis：构建指定镜像 redis
- image：从指定的镜像中启动容器，可以是存储仓库、标签以及镜像 ID
- volumes：用于数据持久化和共享的数据卷定义，常用于数据库存储、配置文件、日志等数据的持久化

**实例：**

```yml
version: "3.9"
services:
    web:
    build: .
    ports:
        - "8000:5000"
    volumes:
        - .:/code
        - logvolume01:/var/log
    links:
        - redis
    redis:
    image: redis
volumes:
    logvolume01: {}
```

:::

```shell
docker-compose up
```
