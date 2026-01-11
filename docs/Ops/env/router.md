# 路由器与网络代理

## 资料推荐

- **[恩山无线论坛](https://www.right.com.cn/forum/forum.php)** - 路由器固件与配置
- **[SuLingGG](https://github.com/SuLingGG)** - OpenWrt 编译
- **[ZJU-Connect](https://github.com/Mythologyli/ZJU-Connect)** - 校园网 RVPN 客户端

---

## 路由器基础

### LAN vs WAN

路由器就像一个**交通枢纽**，有两个主要的进出口：

:::info

LAN（局域网）

内部网络接口，连接家里的设备：

- 多个端口（4 个 RJ45）
- 分配私有 IP（192.168.1.x）
- 内置 DHCP 服务器
- 网关地址：192.168.1.1

WAN（广域网）

外部网络接口，连接互联网：

- 只有一个端口
- 获取公网 IP
- 负责 NAT 转换
- 处理内外网数据转发

:::

### 工作流程

```text
互联网 (WAN) ←→ 路由器 (NAT) ←→ 家里设备 (LAN)
     ↑                 ↑              ↑
  公网 IP          网关/防火墙      私有 IP
```

:::tip 形象理解

LAN 是**院子里的门**，WAN 是**通往大街的门**。路由器就是**门卫**，管理院子内外的人和物的进出。

:::

---

## 路由器固件

### Breed - 救命稻草

**Breed** 是路由器的 Bootloader（引导加载程序），相当于电脑的 BIOS。

```text
原厂固件坏了 → Breed 仍然活着 → 刷入新固件 → 救活路由器
```

**核心功能：**

- Web 界面刷写固件
- 固件备份与恢复
- 修改 MAC 地址
- **防止变砖**（刷机失败也能恢复）

:::tip NAND 坏块检查

路由器存储器会出现坏块，导致系统不稳定。检查方法：

```html
http://192.168.31.1/cgi-bin/luci/;stok=<你的 stok>/api/misystem/set_config_iotdev?bssid=Xiaomi&user_id=longdike&ssid=%0A%5B%20-z%20%22%24(dmesg%20%7C%20grep%20ESMT)%22%20%5D%20%26%26%20B%3D%22Toshiba%22%20%7C%7C%20B%3D%22ESMT%22%0Auci%20set%20wireless.%24(uci%20show%20wireless%20%7C%20awk%20-F%20'.'%20'%2Fwl1%2F%20%7Bprint%20%242%7D').ssid%3D%22%24B%20%24(dmesg%20%7C%20awk%20'%2FBad%2F%20%7Bprint%20%245%7D')%22%0A%2Fetc%2Finit.d%2Fnetwork%20restart%0A
```

运行后 2.4G WiFi 名称会变成 `ESMT` 或 `Toshiba`，后面数字就是坏块数量。无数字 = 无坏块！

:::

### OpenWrt vs Padavan

| 特性 | OpenWrt | Padavan |
|------|---------|---------|
| 基础 | Linux 嵌入式系统 | 基于 ASUSWRT |
| 扩展性 | 强（软件包丰富） | 弱（不支持扩展） |
| 难度 | 高（适合高级用户） | 低（适合普通用户） |
| 稳定性 | 需要配置 | 开箱即用 |
| 适用场景 | 高级功能、自定义 | 日常使用 |

**OpenWrt** - 可玩性极高

- 开源，完全自定义
- 软件包管理（OpenVPN、L2TP、AdGuardHome）
- 支持 IPv6、Shell 编程

**Padavan** - 稳定易用

- 轻量化、高效
- 支持 IPv6、VPN、代理
- Web UI 友好

---

## 代理基础

### 什么是代理？

:::tip 形象理解

**你**想给**朋友**送礼物，但朋友家不让**陌生人**进。

**正向代理**：你找**快递员**代送，朋友只知道快递员，不知道是你送的。

**反向代理**：朋友家门口有个**管家**，你找管家转交，朋友以为礼物是管家送的。

:::

### 正向代理

```text
你 → 代理服务器 → 目标网站
```

**作用：** 代替你发送请求，隐藏你的真实身份。

**应用场景：**

- 访问被封锁的网站
- 保护隐私
- 提高访问速度

### 反向代理

```text
客户端 → 反向代理 → 真实服务器
```

**作用：** 代替服务器接收请求，隐藏服务器真实身份。

**应用场景：**

- 负载均衡
- 缓存加速
- 安全防护

:::info

Nginx 反向代理

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
```

用户访问 `example.com`，Nginx 转发到本地 3000 端口。

Clash + 内网穿透

```text
外网用户 → Nginx (反向代理) → 本地 Clash (SOCKS5) → 目标服务
```

:::

---

## 代理协议

### SS / SSR / VMess

| 协议 | 特点 | 格式示例 |
|------|------|----------|
| **SS** | 简单高效，易被封锁 | `ss://aes-256-gcm:password@1.1.1.1:443#节点` |
| **SSR** | 支持混淆，抗封锁强 | `ssr://Base64编码(...)` |
| **VMess** | 动态端口，配置复杂 | `vmess://Base64编码(...)` |

### SOCKS5 vs HTTP 代理

| 特性 | SOCKS5 | HTTP 代理 |
|------|--------|-----------|
| 协议层级 | 传输层（TCP/UDP） | 应用层（HTTP/HTTPS） |
| 支持 UDP | ✅ | ❌ |
| 适用场景 | 全局代理、游戏 | 浏览器网页访问 |

**SOCKS5** 更底层，可以代理所有流量（包括游戏、BT 下载）。

---

## 代理工具

### Clash - 规则分流之王

**核心功能：**

- 规则分流（国内直连，国外走代理）
- 订阅多个节点
- RESTful API 动态控制

### TUN 模式 - 全局接管

**TUN（隧道模式）**：创建虚拟网卡，接管系统所有流量。

```text
你的设备 → TUN 虚拟网卡 → Clash（规则匹配） → 代理/直连
```

**优势：** 无需手动配置每个应用的代理。

### Subconverter - 订阅转换

**作用：** 将不同格式的订阅链接转换为目标格式。

```text
V2Ray 订阅 → Subconverter → Clash 订阅
```

**功能：**

- 格式互转（Clash、Surge、Quantumult 等）
- 规则合并
- 自定义规则

---

## IPv6

**IPv6** 是互联网协议第六版，解决 IPv4 地址耗尽问题。

| 特性 | IPv4 | IPv6 |
|------|------|------|
| 地址长度 | 32 位 | 128 位 |
| 地址数量 | 43 亿 | 几乎无限 |
| NAT | 需要 | 不需要 |
| 安全性 | 无 | 内置 IPSec |

**优势：**

- 设备可直接全球互联（无需 NAT）
- 内置安全性（IPSec）
- 自动配置（SLAAC 和 DHCPv6）

---

## 静态路由

**静态路由**：手动配置的路由规则，不会自动更新。

**组成要素：**

1. **目的 IP / 子网掩码** - 要去哪里
2. **出接口** - 从哪个口出去
3. **下一跳 IP** - 下一站是谁
4. **优先级** - 路由的优先顺序

:::tip 为什么需要静态路由？

当网络拓扑特殊时（如校园网多出口），需要手动指定流量走向。

:::

---

## ZJU-Rule + ZJU-Connect

> [新的 ZJU-Rule 解决方案 - CC98 论坛](https://www.cc98.org/topic/5769136/1#1)
> [Mythologyli/zju-connect: ZJU RVPN 客户端的 Go 语言实现](https://github.com/Mythologyli/ZJU-Connect)

原 ZJU-Rule 的公共服务已经停止了，但是我们仍然可以使用一些基于[subconverter](https://github.com/tindy2013/subconverter)的公共订阅转换

请注意，使用公共的订阅转换服务不能保证节点信息不被泄漏

1. 打开订阅转换网页 (以 [acl4ssr](https://acl4ssr-sub.github.io/) 为例)
2. 在远程配置（**不是后端地址**）输入`https://raw.githubusercontent.com/SubConv/ZJU-Rule/main/Clash/config/ZJU.ini`，并点击下拉栏中的地址
   ![image](https://philfan-pic.oss-cn-beijing.aliyuncs.com/web_pic/Tools__Environment__assets__settings-router.assets__20250503215349.webp)
3. 如果用 [acl4ssr](https://acl4ssr-sub.github.io/) 的话，有个后端地址选项，并不是所有后端口可用，自己试试看
4. 在订阅链接位置处粘贴订阅链接，如果需要配置 ZJU-Connect，需要在最后一行加入`tg://socks?server=127.0.0.1&port=1080&remarks=ZJU Connect`，然后在规则配置界面选择`ZJU-Connect`

```shell title="示例，填在订阅链接的位置"
ss://aes-256-gcm:password@1.1.1.1:443#测试节点
ssr://MTI3LjAuMC4xOjEyMzQ6YXV0aF9zaGExOnJjNC1tZDU6dGxzMS4yX3RpY2tldF9hdXRoOnZWMk5EVXpNdw
vmess://eyJhZGQiOiIxLjEuMS4xIiwicG9ydCI6NDQzLCJpZCI6IjEyMzQ1Njc4LWFiY2QtMTIzNC1hYmNkIn0=
tg://socks?server=127.0.0.1&port=1080&remarks=ZJU Connect
```

![image](https://philfan-pic.oss-cn-beijing.aliyuncs.com/web_pic/Tools__Environment__assets__settings-router.assets__image-20250715010941873.webp)

```text
你的设备 → TUN 虚拟网卡 → Clash（规则匹配，ZJU-Rule） → SOCKS5/V2Ray 代理 (ZJU-Connect) → 目标网站
```

:::tip Some Protocols

### SS（Shadowsocks）

- **特点**：简单高效，无混淆，易被封锁。
- **格式**：

```shell title="格式"
ss://加密方式:密码@服务器IP:端口#备注
```

```shell title="示例"
ss://aes-256-gcm:password@1.1.1.1:443#测试节点
```

### SSR（ShadowsocksR）

- **特点**：支持混淆和协议插件，抗封锁更强。
- **格式**：

```shell title="格式"
ssr://Base64编码(IP:端口:协议:加密:混淆:密码/?参数)
```

```shell title="示例"
ssr://MTI3LjAuMC4xOjEyMzQ6YXV0aF9zaGExOnJjNC1tZDU6dGxzMS4yX3RpY2tldF9hdXRoOnZWMk5EVXpNdw
```

### VMess（V2Ray 协议）

- **特点**：动态端口，抗封锁强，配置复杂。
- **格式**：

```shell title="格式"
vmess://Base64编码({"add":"IP","port":"443","id":"UUID"})
```

```shell title="示例"
vmess://eyJhZGQiOiIxLjEuMS4xIiwicG9ydCI6NDQzLCJpZCI6IjEyMzQ1Njc4LWFiY2QtMTIzNC1hYmNkIn0=
```

:::

ZJU-Connect 服务配置[zju-connect/docs/service.md at main · Mythologyli/zju-connect](https://github.com/Mythologyli/zju-connect/blob/main/docs/service.md)

[PlistEdit Pro - Advanced Mac plist and JSON editor](https://www.fatcatsoftware.com/plisteditpro/)
