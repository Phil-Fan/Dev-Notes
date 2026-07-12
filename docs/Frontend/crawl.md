# 网络相关软件使用

## 抓包 - Wireshark

### 配置

You don‘t have permission to capture on local interfaces 的问题

[解决 Wireshark: You don‘t have permission to capture on local interfaces 的问题 - 知乎](https://zhuanlan.zhihu.com/p/637004817)

```shell
sudo launchctl enable system/org.wireshark.ChmodBPF
sudo launchctl load '/Library/LaunchDaemons/org.wireshark.ChmodBPF.plist'
```

## 抓包 - Proxifier

[Proxifier - The Most Advanced Proxy Client](https://www.proxifier.com/)

Proxifier 的主要功能：

- 截取 Http 和 Https 网络封包
- 支持重发网络请求，方便后端调试
- 支持修改网络请求参数
- 支持网络请求的截获并动态修改
- 支持模拟慢速网络

### 配置方法

1. 顶部 Profile 菜单 - Advanced Options - HTTP Proxy - Enabled HTTP proxy servers support
2. 顶部 Profile 菜单 - Proxy Server - Add

   ```text
   name: 127.0.0.1
   Port: 8088
   type: HTTPS
   ```

3. 顶部 Profile 菜单 - Proxificaiton rules - Add - Application - 加号 - 选择要抓包的应用程序

## 抓包 - Yakit

## 抓包 - Charles

Charles 的主要功能：

- 截取 Http 和 Https 网络封包
- 支持重发网络请求，方便后端调试
- 支持修改网络请求参数
- 支持网络请求的截获并动态修改
- 支持模拟慢速网络

### 配置软件方法

[Download a Free Trial of Charles • Charles Web Debugging Proxy](https://www.charlesproxy.com/download/)

### IOS 手机抓包

[charles 对 iOS 手机的 https 进行抓包（图文教程）\_charles 怎么抓 ios 手机包-CSDN 博客](https://blog.csdn.net/weixin_43837268/article/details/121938674)

## 抓包 - Burpsuite

Burp Suite 是一个集成化的渗透测试工具，它包含了多个用于攻击和分析 Web 应用程序的工具。主要功能包括：

### 主要功能

1. **Proxy（代理）**
   - 拦截并修改客户端和服务器之间的请求和响应
   - 支持 HTTP/HTTPS 流量分析
   - 可以手动修改、转发或丢弃请求

2. **Scanner（扫描器）**
   - 自动扫描 Web 应用程序漏洞
   - 检测常见安全问题如 SQL 注入、XSS 等
   - 生成详细的漏洞报告

3. **Repeater（中继器）**
   - 手动修改和重发 HTTP 请求
   - 分析服务器响应
   - 测试不同参数对响应的影响

4. **Intruder（入侵）**
   - 自动化攻击测试
   - 支持多种攻击模式
   - 可用于暴力破解、模糊测试等

### 使用步骤

1. 配置浏览器代理为 Burp Suite（默认 127.0.0.1:8080）
2. 安装 Burp 的 CA 证书以拦截 HTTPS 流量
3. 开启拦截功能，观察和分析 HTTP/HTTPS 请求
4. 根据需要使用不同模块进行测试

## 抓包实战 - 必至居预约

[微信开放文档](https://developers.weixin.qq.com/miniprogram/security/gateway/test/snifferpacket.html)

## 抓包实战 - zdty 体测预约

一个平平无奇的周日晚上，在上课的 PhilFan 收到 fufu 在群里发的消息

~~"zdty 真垃圾，都是明文传"~~

顺带传了一张预约好的体测照片，不过这个时间段不是还没有开放咩？？

于是 PhilFan 决定稍微抓抓看，~~看看有多垃圾~~，复习以下刚学到的 HTTP 抓包技能。~~（世界是一个巨大的草台班子~~

另外需要注意的是，现在已经没有必要使用代码进行预约了，因为 app 预约也不麻烦（就是玩一下 hhh

> [!TIP]
> **以下行为均以学习计网知识为目的，模仿带来的任何风险由使用者自己承担，请注意保护好自己的隐私信息**

### 第一步——如何抓包手机 APP

- 第一种是用电脑给手机提供热点，相当于电脑当作了手机的流量来源，直接在电脑上使用抓包工具（如`wireshark`等）进行分析即可。

  ![image](https://img.philfan.cn/Tools__Software__assets__Web.assets__image-20240318085112013.webp)

- 第二种我也没有试过，直接使用手机端的抓包 APP 进行分析。

### 第二步——找到对应的报文

打开 wireshark，选择 HTTP 进行筛选

为了不抓到其他无关信息，还是**尽量关一下其他网站和 APP**

打开 zdty，体测预约，看到类似如下信息说明可以抓到

![image](https://img.philfan.cn/Tools__Software__assets__Web.assets__image-20240318082144366.webp)

以 4 月 12 日体测为例，点开体测预约，我们发现有一个报文

![image](https://img.philfan.cn/Tools__Software__assets__Web.assets__image-20240318082347175.webp)

> **由课上知识我们知道**：
>
> HTTP 报文由请求行、请求头、空白行 (`\r\n`)、请求体
>
> 请求行由三部分构成：第一部分说明请求类型为 get 方法请求，第二部分（用/分开）是资源 URL，第三部分说明使用的是 HTTP1.1 版本。

很奇怪的是，这里我们看到这个 GET 请求的 URL，直接将 token 和日期什么的进行明文传递了。

（朴素认知下，这是不是意味着只要嗅探到你的浙大体艺预约报文，就可以获得你的 token，~~进而可以取消你的预约~~）

![image](https://img.philfan.cn/Tools__Software__assets__Web.assets__image-20240318082934711.webp)

分析上图我们可以发现请求头的一些信息，重复刚才的步骤多次可以找到一定规律

- id:3325（应该是体测时间的排序，且相邻时间数字也是相邻的）
- testDate：体测的日期
- timeSolt：体测的时间段
- jToken：不太懂具体是什么作用，推测是进行用户的识别
- \_\_：不清楚具体作用，推测为时间戳。

再试着点一次预约，我们发现了一个新的报文

![image](https://img.philfan.cn/Tools__Software__assets__Web.assets__image-20240318083929415.webp)

分析这个请求的 URL，发现多了几个参数

- testPointName：紫金港田径场体测中心（应该是体测地点，~~也可以改成快乐星球~~
- tel：你的电话
- periodId：学年，这次应该是 2024

其实到找到你的 token，知道你要预约的时间段和年份，就可以抓了。

> [!NOTE]
> 浙大体艺是用什么框架
> token,cookie,session,cache 的区别

### 第三步——使用代码进行报文模拟

这一步其实就没有什么难度了

相当于你只需要知道这个 URL，对这个 URL 发 GET 请求就可以了

~~询问 gpt 就行了~~

- 使用 curl 命令
- 使用 PowerShell
- 使用 Python 的`request`库即可

注意要将刚才的信息抓下来填好

```python
# 示例
import requests

BASE_URL = "http://tyys.zju.edu.cn"
JSESSIONID = ""
JTOKEN = ""
TEL = ""

def schedule_appointment(schedule_id, test_date, time_slot_id, test_point_name="快乐星球", test_option_id="", period_id="2024"):

    url = f"{BASE_URL}/pft/app/schedule/student/event/submit"
    params = {
        "scheduleId": schedule_id,
        "testPointName": test_point_name,
        "testDate": test_date,
        "timeSoltId": time_slot_id,
        "testOptionId": test_option_id,
        "tel": TEL,
        "periodId": period_id,
        "jToken": JTOKEN,
    }
    cookies = {
        "JSESSIONID": JSESSIONID
    }
    response = requests.get(url, params=params, cookies=cookies)
    print(response.status_code)
    print(response.text)

# Example usage
schedule_appointment("3322", "2024-04-12", "13:30-14:00")
```

可以发现，我的体测地点变成了快乐星球（😂

![image](https://img.philfan.cn/Tools__Software__assets__Web.assets__d519771d06acb8610067b01d27799f0.webp)

同理，可以抓到取消预约的 URL

其中`scheduledId`参数需要获取"我的预约"列表，再抓取响应报文获得

```python
def cancel_appointment(scheduled_id):
    url = f"{BASE_URL}/pft/app/schedule/student/my/undo"
    params = {
        "scheduledId": scheduled_id,
        "jToken": JTOKEN
    }
    response = requests.get(url, params=params)
    print(response.status_code)
```

## Clash 给手机提供代理

> [!TIP]
>

1. 确定电脑可以通过 clash 进行正常连接，或者能通过 SSR 连接

2. 打开 Clash 的`Allow Lan` ，这一步是为了让 Clash 允许局域网连接（在 SSR 中，则是允许来自局域网的连接）

3. 电脑进入`cmd`，输入`ipconfig`找到电脑自己的 IPv4 地址，例如`192.168.127.1`

   这里 192.168 是 C 类 IP，是内网中返回的

4. 看看 Clash 界面的 Port 是多少，不用管那个 Socks Port。例如，Port 是`1125`

   在 SSR 中，是看本地端口，例如，本地端口是 1125

5. 手机或其它设备先连接上电脑 win10 的自带热点，进入手机 **WiFi** 的详细设置界面

6. 把选项 **代理** 从 **无** 改成 **手动** ，选项 **主机名** 设置为`192.168.127.1`，选项 **代理服务器端口** 改为`1125`，确认即可

   <img src="https://img.philfan.cn/Tools__Software__assets__Web.assets__Screenshot_202024-02-02_20at_2000.24.51.jpeg.webp" alt="Screenshot 2024-02-02 at 00.24.51.jpeg" style="zoom: 25%;" />

   <img src="https://img.philfan.cn/Tools__Software__assets__Web.assets__Screenshot_202024-02-02_20at_2000.25.19.jpeg.webp" alt="Screenshot 2024-02-02 at 00.25.19.jpeg" style="zoom: 25%;" />

## 使用“共享文件夹”实现 iPhone 与 PC 间文件快速传输

> 参考文献：[如何通过“共享文件夹”实现 iPhone 与 PC 间文件快速传输](https://zhuanlan.zhihu.com/p/145540093)

### PC 端设置

- 设置读取/写入权限

（1）考虑到信息安全问题，建议将共享用户数量限制为 1，根据使用情况自行设定。

（2）完全控制权限慎选。

![image](https://img.philfan.cn/Tools__Software__assets__Web.assets__v2-39f794731fac3c347391bf965fcf9490_1440w.webp)

![image](https://img.philfan.cn/Tools__Software__assets__Web.assets__v2-44103f753f47d507913fe5ab3a66a8c2_1440w.webp)

- 获取 IP 地址

使用`Win+R`,输入`cmd`,输入`ipconfig`

### 手机端设置

打开 iPhone 端“文件”——点击右上角三个点——选择“连接服务器”——输入 IP 地址——点击连接——选择注册用户——输入电脑名称及密码——完成。然后打开“文件”应用，就可以看到共享文件夹了。

![image](https://img.philfan.cn/Tools__Software__assets__Web.assets__v2-5d3c86fd875daf87211ce71fa8e1f548_1440w.webp)
