# OpenClaw

## Docker 部署

```shell
git clone https://github.com/openclaw/openclaw
```

```shell
cd openclaw
./docker-setup.sh
```

配置好之后遇到了`Pairing required` 的问题，是 token 错误。

```shell
vi ~/.openclaw/openclaw.json
```

```json
{
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "controlUi": { // 这个需要手动添加
      "enabled": true,
      "allowInsecureAuth": true
    },
    "auth": {
      "mode": "token",
      "token": "xxx" // 这个手动复制到 webUI 当中
    },
    "tailscale": {
      "mode": "serve"
    }
  }
}
```

连接之后，需要 ssh 远程转发端口

```shell
ssh -N -L 18789:127.0.0.1:18789 user@ip
```

这样就可以访问`http://127.0.0.1:18789` 来访问 OpenClaw 的界面

由于我们加上了 `tailscale` 的配置，所以需要配置一下 tailscale 的网络

```shell
tailscale status
tailscale serve --bg http://127.0.0.1:18789
tailscale serve status
```

### 常用指令

```shell
docker compose down
docker compose up -d
docker ps
```

```shell
docker compose exec openclaw-cli --help
docker restart openclaw-openclaw-gateway-1
docker compose run --rm openclaw-cli configure
docker compose run --rm openclaw-cli dashboard --no-open
docker compose run --rm openclaw-cli gateway
```

## IM 接入

可以参考这一篇进行安装，但是 Discord 需要有网络环境配置

[Openclaw 全流程部署指南 (Discord 篇) - 知乎](https://zhuanlan.zhihu.com/p/2003215600378454774)
