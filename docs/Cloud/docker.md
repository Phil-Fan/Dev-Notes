# Docker

Docker = Software + Dependencies，重点是 OS

在整个生态中的位置

```text
Linux
 ├─ Namespace / Cgroups
 ├─ OverlayFS
➡️Docker
 ├─ Image
 ├─ Container
 ├─ Dockerfile
 ├─ Compose
OCI
 ├─ containerd
 ├─ runc
Cloud Native
 ├─ Kubernetes
 ├─ Helm
 ├─ CI/CD
```

## 使用

Image 相关

```bash
docker images            # 查看本地镜像
docker pull nginx        # 拉取镜像
```

Container 相关

```bash
docker ps                # 运行中的容器
docker ps -a             # 所有容器

docker run nginx
docker run -p 8080:80 nginx
```

📌 **docker run 实际干了三件事**：

1. 拉镜像（如果本地没有）
2. 创建容器
3. 启动容器

container 生命周期

```bash
docker start container
docker stop container
docker restart container
docker rm container
docker exec -it container bash # 进入容器
```

```bash
docker logs container
docker inspect container
docker stats
```

## 原理

```text
Docker CLI
    ↓
Docker Daemon (dockerd)
    ↓
containerd
    ↓
runc
    ↓
Linux Kernel (Namespace / Cgroups)
```

需要掌握三个核心概念：

- Image（镜像）
- Container（容器）
- Dockerfile（构建镜像的“脚本”）

### Image（镜像）

- **只读模板**
- 应用 + 依赖 + 运行环境
- 分层存储

📌 类比：**类 / 模板**

### Container（容器）

- 镜像的运行实例
- 本质是一个被隔离的进程

📌 类比：**对象 / 实例**

### Dockerfile

- 构建镜像的“脚本”
- 声明式

demo1 python 程序

```dockerfile
FROM python:3.10
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
```

demo2 Next.js SSR with pnpm

```dockerfile
# ---------- 构建阶段 ----------
FROM node:18-alpine AS builder

# 启用 corepack（官方推荐）
RUN corepack enable
WORKDIR /app
# 只拷贝依赖描述文件
COPY package.json pnpm-lock.yaml ./
# 安装依赖（含 dev）
RUN pnpm install
# 拷贝源码
COPY . .
# 构建 Next.js
RUN pnpm build


# ---------- 运行阶段 ----------
FROM node:18-alpine

RUN corepack enable
WORKDIR /app

# 拷贝构建产物
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json

# 暴露端口
EXPOSE 3000

# 启动 SSR 服务
CMD ["pnpm", "start"]
```

### Registry（镜像仓库）

- Docker Hub
- 私有仓库
- Harbor（企业常用）

## 安装

```shell title="安装 docker"
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

```shell title="查看是否安装成功"
docker --version
```

```shell
docker-compose --version
>>> Docker Compose version v2.16.0
```

### 换源

```shell
sudo vim /etc/docker/daemon.json
```

插入下面的句子，最后不要加逗号（前面要加逗号，如果是最后一条则不加）

```json
{
  "registry-mirrors": ["https://dockerhub.icu"]
}
```
