# K3s 部署方案

## 先把三件事讲清楚

### 1. K3s 是什么

K3s 是一个轻量 Kubernetes 发行版，把很多标准 Kubernetes 组件和依赖打包成一个更小、更容易部署的系统；它自带 containerd、Flannel、CoreDNS 等基础组件，面向 edge、ARM、小集群和开发环境。K3s 官方也明确支持 `arm64/aarch64`。([K3s][2])

对你来说，K3s 的价值是：

* 三台机器就能很快拉起来
* ARM 设备友好
* 比完整 kubeadm 集群更省资源、更省配置
* 便于后续统一部署 Triton、DeepStream、ROS 2 服务、监控和私有镜像仓库

### 2. GPU Operator 是什么

GPU Operator 是 NVIDIA 在 Kubernetes 里自动化管理 GPU 软件栈的组件。它会帮你在节点上部署和管理一整套 GPU 相关组件，包括：

* NVIDIA 驱动
* NVIDIA Container Toolkit
* Kubernetes device plugin
* GPU Feature Discovery
* DCGM / DCGM Exporter 监控组件
  等等。([NVIDIA Docs][3])

它的作用可以理解成：
**“让 Kubernetes 真正认识并使用 NVIDIA GPU。”**

没有它时，你通常要自己在每台机器上手工装驱动、装 toolkit、配容器运行时、装 device plugin。
有了它，这些步骤可以被统一编排。

### 3. 你这个场景要不要立刻上 GPU Operator

**我建议：先上 K3s，不要一开始就把 GPU Operator 作为必须项。**

原因是 GPU Operator 官方前提里有一个很关键的限制：如果你使用它的 **驱动容器** 模式，那么所有跑 GPU workload 的 worker 节点必须是**相同 OS 版本**；如果节点已经预装驱动，则可以混用不同 OS。([NVIDIA Docs][4])

而你这套机器天然是异构的：

* Spark 有自己的 DGX OS / NVIDIA 软件栈；Spark 文档明确它自带完整软件栈，并且有 Docker 容器运行时相关文档。([NVIDIA Docs][5])
* Thor 走 Jetson / JetPack 路线；JetPack 自带 Jetson Linux、NVIDIA 驱动和容器运行时能力，Thor 官方 Docker 指南也是直接装 Docker + NVIDIA Container Toolkit。([NVIDIA Docs][6])

所以你这套更像是：
**“每台机器原生就有自己的 NVIDIA 运行时，Kubernetes 只需要学会调度 GPU。”**
这意味着 GPU Operator 如果用，应该优先考虑**预装驱动 / 预装 toolkit 模式**，而不是让它统一接管三台机器的底层驱动安装。GPU Operator 官方也专门给了“预装驱动”和“预装驱动 + 预装 Container Toolkit”的安装方式；后者还特别说明适用于 DGX Systems with NVIDIA Base OS。([NVIDIA Docs][4])

## 最推荐的目标架构

### 节点角色

* **Spark**

  * K3s server
  * 私有镜像仓库
  * 模型仓库 / 对象存储
  * Prometheus / Grafana / Loki
  * 可选：轻量推理服务、批处理任务

* **Thor-1**

  * K3s agent
  * GPU worker
  * 视觉 / 多模态 / 流媒体推理节点

* **Thor-2**

  * K3s agent
  * GPU worker
  * 第二个推理节点 / 冗余节点 / 业务分流节点

### 网络分工

* **管理面**：三台机器的 RJ45 都接 LAN 路由器
* **数据面**：

  * Spark QSFP1 ↔ Thor-1 QSFP28
  * Spark QSFP2 ↔ Thor-2 QSFP28

Spark 的 CX-7/QSFP 口官方 Spark stacking 文档明确是 **Ethernet only**，官方示例也是用 netplan 配置点对点互连。([NVIDIA Docs][7])

## 第一步：先把系统层统一好

先不要急着装 K3s，先把下面几件事做对：

### 1. 节点命名

三台机器必须有唯一 hostname。K3s 官方明确要求不能重名。([K3s][8])

建议：

* `spark`
* `thor1`
* `thor2`

### 2. 管理网固定 IP

例如：

* `spark`：`192.168.50.10`
* `thor1`：`192.168.50.11`
* `thor2`：`192.168.50.12`

K3s server/agent 先全部通过管理网通信。

### 3. QSFP 点对点地址

例如：

* Spark ↔ Thor-1：`172.16.1.1/30`、`172.16.1.2/30`
* Spark ↔ Thor-2：`172.16.2.1/30`、`172.16.2.2/30`

### 4. 默认路由只走管理网

这是最重要的设计之一。
K3s API、SSH、镜像下载、日志监控都走管理网；QSFP 只留给高吞吐业务流量。

K3s 官方 quick start 的方式很简单：

### 在 Spark 上装 server

```bash
curl -sfL https://get.k3s.io | sh -
```

单机 server 会带上 datastore、control plane、kubelet 和 container runtime，构成完整集群。([K3s][9])

然后取 token：

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

### 在两台 Thor 上装 agent

```bash
curl -sfL https://get.k3s.io | \
  K3S_URL=https://10.162.61.178:6443 \
  K3S_TOKEN=K105a233cc05cc8543f6d7651fb9f59828c6c52611f92e6f75cd8efa69a789b5c61::server:cdd1481c2c3ced181ab8cd906a74ace9 \
  sh -
```

这就是 K3s 官方推荐的 agent 加入方式。([K3s][9])

## 第三步：确认节点注册

在 Spark 上：

```bash
sudo kubectl get nodes -o wide
```

你应该看到三台节点。

## 节点污点和标签

我建议给 Spark 打控制节点和基础服务标签，给两台 Thor 打 GPU worker 标签。

例如：

```bash
kubectl label node thor1 accelerator=nvidia role=gpu-worker
kubectl label node thor2 accelerator=nvidia role=gpu-worker
kubectl label node spark role=control-storage
```

这样后面部署服务时：

* 监控、registry、MinIO、控制类服务优先去 Spark
* 推理 workload 去 Thor

## 不建议让 Spark 兼任大量业务 GPU worker

Spark 虽然很强，但它已经承担：

* control plane
* 镜像仓库
* 存储与监控
* 集群入口

所以除非是开发测试，不建议让 Spark 同时承载大量实时推理流量。不然控制面和业务面容易互相影响。

## 它主要解决什么问题

GPU Operator 主要负责四类事：

### 1. 驱动管理

如果节点没装 NVIDIA 驱动，它可以通过 driver container 帮你装。

### 2. 容器运行时配置

它可以帮助配置 NVIDIA Container Toolkit，让容器拿到 GPU。

### 3. 设备发现与调度

它会部署 NVIDIA device plugin，让 Kubernetes 把 GPU 作为可调度资源暴露出来。

### 4. 监控与标签

它会部署 GFD、DCGM Exporter 等，让节点自动带 GPU 标签，并输出 GPU 指标。([NVIDIA Docs][3])

## 我建议分两阶段

### 阶段 A：先不用 GPU Operator，先验证集群

先把三台机器本机 GPU 运行时都确认好，再上最小可用 K3s。

重点验证：

* Spark 上能跑 NVIDIA 容器
* 两台 Thor 上能跑 NVIDIA 容器
* 每台机器本地都能跑 CUDA / PyTorch / Triton 基础测试

Thor 官方 Docker 指南明确给出了安装 Docker + NVIDIA Container Toolkit + 设置默认 runtime 的步骤，并给了 GPU 可用的 PyTorch 容器测试例子。([NVIDIA Docs][10])

这个阶段你可以先装 **NVIDIA k8s device plugin** 或者看是否通过轻量方式暴露 GPU，先不把整套 Operator 拉满。

### 阶段 B：如果你要统一监控、统一 GPU 资源治理，再引入 GPU Operator

如果后面你需要：

* DCGM Exporter 监控
* 自动 GPU 节点标签
* 统一 operator 化管理
* 统一 time-slicing / sharing 策略

再评估 GPU Operator。

## 原则

**尽量按“预装驱动 / 预装 toolkit”模式装，不要让它接管底层驱动安装。**

因为：

* Spark 这边已有 NVIDIA 软件栈，GPU Operator 官方对“预装驱动 + 预装 toolkit”给了专门参数，还特别说明适用于 DGX 系统。([NVIDIA Docs][4])
* Thor 这边 JetPack 自带 Jetson Linux、驱动和容器运行时路线，Thor 官方文档也是先把 CTK 装好。([NVIDIA Docs][6])

## 最保守的安装思路

先创建 namespace 并满足 PSA 要求：

```bash
kubectl create ns gpu-operator
kubectl label --overwrite ns gpu-operator pod-security.kubernetes.io/enforce=privileged
```

这是 GPU Operator 官方前提之一。([NVIDIA Docs][4])

然后使用 Helm 安装，但关闭 driver 和 toolkit：

```bash
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia
helm repo update

helm install --wait --generate-name \
  -n gpu-operator --create-namespace \
  nvidia/gpu-operator \
  --version=v25.10.1 \
  --set driver.enabled=false \
  --set toolkit.enabled=false
```

这对应官方的“Pre-Installed NVIDIA GPU Drivers and NVIDIA Container Toolkit”模式。([NVIDIA Docs][4])

## 但这里有个重要提醒

我这次查到的官方资料里，**没有看到一份明确写着“DGX Spark + Jetson AGX Thor + K3s”的 GPU Operator 官方支持矩阵**。
所以这一步我会保守建议：

* **先只在测试环境验证**
* **先从单个 Thor 节点试**
* 确认 device plugin、GFD、DCGM 正常
* 再决定是否全量部署

## 1. OS / 软件栈异构

这是你这套系统最大的现实问题。
GPU Operator 的 driver container 模式要求 GPU worker 节点 OS 一致；而你这套很可能不一致。官方明确说，若预装驱动，则可以允许不同 OS。([NVIDIA Docs][4])

结论：
**不要让 GPU Operator 统一管驱动。**

## 2. K3s 和 containerd 的关系

K3s 自带 containerd。GPU Operator/CTK 涉及 container runtime 兼容性时，要特别小心，不要一边让 JetPack/Thor 自己改 Docker runtime，一边又让集群侧去重写 containerd 配置，最后把 GPU runtime 搞乱。

## 3. Spark 的控制面不要和高负载业务混太多

单 server K3s 架构很适合你，但也意味着 Spark 是单点控制面。K3s 官方 HA 需要至少 3 个 server 节点；你现在的 3 台机器里，两台 Thor 更适合做 worker，所以这套集群的控制面本质上是单点。([K3s][1])

结论：

* 家庭实验室 / 开发环境：没问题
* 强生产要求：不够 HA

## 4. QSFP 只做数据面

Spark stacking 教程是 Spark-to-Spark 的，但里面有两个很值得借用的点：

* CX-7 口是 **Ethernet only**
* 它推荐用 netplan 配置点对点链路 ([NVIDIA Docs][7])

所以你可以借它的思路配置 Spark ↔ Thor 的高速口，但不要把 K3s API、默认路由、SSH 都压在 QSFP 上。

## 5. Node Feature Discovery

GPU Operator 默认会自动部署 NFD；如果集群里已经有 NFD，就要关掉重复部署。官方文档明确提到了这一点。([NVIDIA Docs][4])

## 6. Pod Security Admission

GPU Operator 的 namespace 需要 privileged enforcement 标签，否则很多组件起不来。官方也写得很明确。([NVIDIA Docs][4])

## 最稳的实施顺序

### 第 1 阶段

* 路由器 LAN 搭管理网
* Spark 两条 QSFP 分别直连两台 Thor
* 每台机器先本机验证 Docker + NVIDIA 容器运行正常
* Spark 装 K3s server
* 两台 Thor 加入 agent

### 第 2 阶段

* 部署基础服务：registry、MinIO、Prometheus、Grafana
* 给节点打标签
* 把推理工作负载先跑在 Thor 上

### 第 3 阶段

* 再决定是否引入 GPU Operator
* 若引入，优先走：

  * `driver.enabled=false`
  * `toolkit.enabled=false`
* 先小范围测试，再扩展

## 一句话结论

**K3s 是适合你这套 Spark + 2×Thor 的轻量 Kubernetes；部署上用 Spark 做单 server，Thor 做 agent 最合理。GPU Operator 是用来自动管理 GPU 驱动、toolkit、device plugin 和监控的，但对你这种异构 NVIDIA 平台，我建议把它当“第二阶段增强项”，并优先使用官方的“预装驱动/预装 toolkit”模式，而不是让它统一接管底层驱动。** ([K3s][1])

我可以下一条直接给你一份 **“三节点 K3s + 可选 GPU Operator”的实际部署顺序和命令清单**。

[1]: https://docs.k3s.io/architecture "Architecture | K3s"
[2]: https://docs.k3s.io/ "K3s - Lightweight Kubernetes | K3s"
[3]: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html "About the NVIDIA GPU Operator — NVIDIA GPU Operator"
[4]: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html "Installing the NVIDIA GPU Operator — NVIDIA GPU Operator"
[5]: https://docs.nvidia.com/dgx/dgx-spark/software.html "Software — DGX Spark User Guide"
[6]: https://docs.nvidia.com/jetson/jetpack/introduction/ "Introduction to NVIDIA JetPack SDK — JetPack"
[7]: https://docs.nvidia.com/dgx/dgx-spark/spark-clustering.html "Spark Stacking — DGX Spark User Guide"
[8]: https://docs.k3s.io/installation/requirements "Requirements | K3s"
[9]: https://docs.k3s.io/quick-start "Quick-Start Guide | K3s"
[10]: https://docs.nvidia.com/jetson/agx-thor-devkit/user-guide/latest/setup_docker.html "Docker Setup — Jetson AGX Thor Developer Kit - User Guide"
