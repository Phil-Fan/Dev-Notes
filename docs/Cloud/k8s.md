# Kubernetes

## 安装

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=450905506&bvid=BV1gj411E7W3&cid=1332974538&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="640px" height="320px"></iframe>

### 安装 kubectl

```shell
sudo apt-get update
# apt-transport-https 可以是一个虚拟包；如果是这样，你可以跳过这个包
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
```

```shell title="添加 Kubernetes GPG 密钥"
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.34/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
sudo chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg # allow unprivileged APT programs to read this keyring
```

```shell title="添加 Kubernetes 稳定仓库"
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.34/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo chmod 644 /etc/apt/sources.list.d/kubernetes.list   # 有助于让诸如 command-not-found 等工具正常工作
```

```shell title="更新 APT 包索引"
sudo apt-get update
sudo apt-get install -y kubectl
```

### 安装 minikube

[minikube start | minikube](https://minikube.sigs.k8s.io/docs/start/)

```shell title="下载 minikube"
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_arm64.deb
sudo dpkg -i minikube_latest_arm64.deb
```

```shell title="添加用户到 docker 组"
sudo usermod -aG docker $USER && newgrp docker
```

```shell title="启动 minikube"
minikube start
```

```shell title="验证安装"
kubectl cluster-info
```

```shell title="验证节点"
kubectl get nodes
```

应该看到类似下面的输出：

```shell
NAME       STATUS   ROLES    AGE   VERSION
minikube   Ready    control-plane   1m    v1.30.0
```

## 使用

### 启动

### Debug

查看 Pod 日志：

```shell title="查看 Pod 日志"
kubectl logs nginx-xxxxxx
```

```shell title="进入 Pod"
kubectl exec -it nginx-xxxxxx -- bash
```

```shell title="查看 Pod 的详细信息"
kubectl describe pod nginx-xxxxxx
```

最常用来排查镜像拉取失败、CrashLoopBackOff 等。

```shell title="删除 Deployment"
kubectl delete deployment nginx
```

## 原理

### Pod

### ReplicaSet

### Deployment（概念）

### Service（概念）

## 部署验证 —— 部署第一个应用

### Deployment

先创建一个 Deployment 文件：

`nginx-deploy.yaml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest
          ports:
            - containerPort: 80
```

```shell title="部署 Deployment"
kubectl apply -f nginx-deploy.yaml
```

```shell title="查看 Pod"
kubectl get pods -l app=nginx
```

你应该看到类似：

```shell
nginx-5c68965b8f-bvzfm   1/1   Running   0   10s
nginx-5c68965b8f-k92lg   1/1   Running   0   10s
```

### Service

创建文件：

`nginx-svc.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-svc
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
```

部署：

```shell title="部署 Service"
kubectl apply -f nginx-svc.yaml
```

查看：

```shell title="查看 Service"
kubectl get svc
```

你会看到：

```shell
nginx-svc   NodePort   ...   80:30080/TCP
```

### 访问

```shell title="直接访问"
curl http://localhost:30080
```

```shell title="使用 minikube 提供的内置代理"
minikube service nginx-svc
```

它会自动打开浏览器访问。

### 滚动更新（Rolling Update）

修改 Deployment，将镜像改为：

```yaml
image: nginx:1.21.0
```

重新 apply：

```shell title="重新 apply"
kubectl apply -f nginx-deploy.yaml
```

```shell title="查看 rollout 进度"
kubectl rollout status deployment/nginx
```

```shell title="回滚"
kubectl rollout undo deployment/nginx
```
