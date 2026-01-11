# Windows

本文档记录 Windows 常用软件安装与使用技巧，以及常见问题解决方案。

:::tip 文档目的

- 遇到重复问题时不再反复搜索
- 快速在新设备上搭建工作环境
- 避免因环境问题导致项目停滞

:::

---

## 终端与 PowerShell

### 快速打开终端

| 快捷键 | 功能 |
|--------|------|
| `Win + R` → `cmd` | 打开命令提示符 |
| `Win + X` → `Windows Terminal` | 打开 Windows 终端 |

### 常用命令

```shell
# 文件操作
del filename              # 删除文件
ls                        # 列出文件（cmd 用 dir）
cd xxx                    # 切换目录
d:                        # 切换到 D 盘
cd /d D:\Code             # 跨盘符切换目录

# 系统命令
ipconfig                  # 查看 IP 信息
clear                     # 清屏（cmd 用 cls）
```

### PowerShell 执行策略

:::details 无法加载 profile.ps1

**问题**：无法加载文件 `WindowsPowerShell\profile.ps1`

**解决方法**：

1. `Win + X` 打开 **Windows PowerShell (Admin)**
2. 查看当前执行策略：

```powershell
Get-ExecutionPolicy -List
```

3. 更改执行策略：

```powershell
# 仅对当前用户
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# 对所有用户
Set-ExecutionPolicy RemoteSigned -Scope LocalMachine
```

4. 输入 `Y` 确认更改
5. 重新打开终端验证

:::

### 文件信息管理

修改文件的创建时间、修改时间等属性。

```powershell
# 查看文件所有属性
Get-ItemProperty -Path <path> | Format-List * -Force

# 查看指定属性
Get-ItemProperty -Path <path> -Name <property_name>

# 修改属性
Set-ItemProperty -Path <path> -Name <property_name> -Value <value>

# 清除属性
Clear-ItemProperty -Path <path> -Name <property_name>
```

**常用属性：**

- `CreationTime` - 创建时间
- `LastWriteTime` - 最后修改时间
- `LastAccessTime` - 最后访问时间

### 系统信息查询

```shell
# 查看 MAC 地址
ipconfig/all

# 查看用户列表
net user

# 查看系统架构
wmic os get osarchitecture

# 查看完整系统信息
systeminfo
```

### 工具软件

**wget** - 命令行下载工具

下载地址：[GNU Wget](https://eternallybored.org/misc/wget/)

安装：将 `wget.exe` 放入 `C:\Windows\System32`

**nc (netcat)** - 网络工具

下载地址：[netcat 1.11](https://eternallybored.org/misc/netcat/)

---

## 环境变量

### Python 路径优先级

如果设置了环境变量但无法启动 Python，尝试将 Python 路径放在 PATH 最前面。

### 命令行启动软件

**目标**：通过命令行直接打开软件

**方法**：创建快捷方式文件夹并添加到 PATH

1. 创建文件夹存放软件快捷方式（如 `D:\Shortcuts`）
2. 将快捷方式重命名为易记的名称
3. 添加文件夹路径到用户变量 PATH
4. CMD 中输入快捷方式名称即可启动软件

:::tip 快捷方式重命名

快捷方式可以自定义名称，命令行中使用该名称即可启动软件。

:::

---

## 系统设置

### 禁用 Win+G 录屏

适用于虚拟机中需要使用该快捷键的情况。

**步骤：**

1. `Win + I` 打开设置
2. 搜索 "Game Bar"
3. 关闭所有选项

### 驯服微软拼音输入法

**工具推荐：**

- [imewlconverter](https://github.com/studyzy/imewlconverter/releases) - 词库转换工具
- [搜狗输入法词库](https://pinyin.sogou.com/dict/) - 词库搜索

**高级功能：**

:::info

自定义短语:导入行业特殊词汇右键输入法设置 → 词库和自学习 → 自定义短语 → 导入行业特殊词汇

专业词典:默认未完全启用，需手动开启

V 模式:快速输入中文年月日和公式

U 模式:输入特殊符号

Emoji 面板: `Ctrl + Shift + B` 打开符号面板

:::

### Win11 优化

**必备工具：[Dism++](https://github.com/Chuyu-Team/Dism-Multi-language/releases)**

#### 恢复 Win10 右键菜单

```shell title="PowerShell (管理员)"
# 恢复经典右键菜单
reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve

# 重启资源管理器
taskkill /f /im explorer.exe
start explorer.exe
```

#### 恢复 Win10 开始菜单

1. `Win + R` 输入 `regedit`
2. 导航至：`HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced`
3. 右键 → 新建 → DWORD (32 位) 值
4. 命名为 `Start_ShowClassicMode`
5. 双击设置数值数据为 `1`
6. 重启电脑

---

## 蓝屏排查

### WinDBG 分析 DMP 文件

**下载 WinDBG：** [64 位下载](https://download.microsoft.com/download/A/A/A/AAAC035D-DA3F-4F0C-ADA4-37C8E5D34E3D/setup/WinSDKDebuggingTools_amd64/dbg_amd64.msi)

**配置步骤：**

1. 运行 WinDBG，按 `Ctrl + S` 打开符号表设置
2. 粘贴符号表地址：

```
SRV*C:\Symbols*http://msdl.microsoft.com/download/symbols
```

3. `Ctrl + D` 打开 DMP 文件
4. 首次打开时勾选 "Don't ask again in this WinDbg session"，点否

:::tip 打开第二个 DMP 文件

使用 `Shift + F5` 清除上一个分析记录。

:::

**关键信息：**

1. 查找 `Probably caused by:` - 蓝屏原因
2. 点击 `!analyze -v` 查看 `BUGCHECK_STR:` - 错误代码

**常见错误：**

- **memory_management** - 内存管理问题

[参考：Windows Bug Check Code](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/bug-check-code-reference)

---

## 硬件相关

### 修复 Type-C 接口松动

使用针头将接口两侧的钩子撑开。

[参考：USB TYPE-C 拆解](https://www.lulian.cn/news/88-cn.html)

### 盒盖不息屏

1. 设置中搜索 "关闭盖子"
2. 选择 "关闭盖子时" 操作为 "不采取任何操作"

### 投屏设置

1. `Win + A` 打开操作中心
2. 点击 "投影" 或 "连接"
3. 显示设置中调整分辨率

---

## 网络配置

### 查看保存的 WiFi 密码

```shell
# 查看 WiFi 配置
netsh wlan show profiles

# 查看指定 WiFi 密码
netsh wlan show profile name="WiFi名称" key=clear
```

### 关闭系统代理

适用于 Clash 忘记关闭导致无法上网的情况。

**步骤：**

1. `Win + X` 打开网络连接
2. 高级网络设置 → Internet 选项
3. 连接 → 局域网设置
4. 取消勾选 "代理服务器"

---

## C 盘清理

### 清理无用文件

| 方法 | 说明 | 工具 |
|------|------|------|
| 磁盘清理 | 删除系统更新残留 | 系统自带 |
| Geek 卸载 | 彻底卸载软件及注册表 | [Geek Uninstaller](https://geekuninstaller.com/download) |
| CCleaner | 清理注册表和临时文件 | 官网免费版 |
| TreeSize | 分析目录占用空间 | 免费版 |

:::warning Geek 卸载

Geek 会删除软件的所有文件夹（包括用户文件），使用前请转移重要数据！

:::

### 移动系统文件夹

**移动桌面、文档、下载：**

右键文件夹 → 属性 → 位置 → 移动到其他盘

**移动 VSCode 配置：**

```shell title="CMD (管理员)"
# 移动文件夹
# 剪切 %USERPROFILE%\.vscode 到 D:\.vscode

# 创建符号链接
cmd /c mklink /D "%USERPROFILE%\.vscode" "D:\.vscode\"
```

**移动临时文件夹：**

修改环境变量 `TEMP` 和 `TMP` 到其他盘。

---

## Edge 浏览器

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + Tab` | 下一个标签页 |
| `Ctrl + Shift + Tab` | 上一个标签页 |
| `Ctrl + H` | 历史记录 |
| `Ctrl + J` | 下载 |

<iframe src="https://support.microsoft.com/zh-cn/microsoft-edge/microsoft-edge-%E4%B8%AD%E7%9A%84%E9%94%AE%E7%9B%98%E5%BF%AB%E6%8D%B7%E6%96%B9%E5%BC%8F-50d3edab-30d9-c7e4-21ce-37fe2713cfad" width="100%" height="600px"></iframe>

---

## C/C++ 环境

### 概念对比

- **MSVC** - Microsoft Visual C++ 编译器
- **MinGW** - Windows 上的 GCC 移植
- **gcc/g++** - GNU C/C++ 编译器
- **qmake** - Qt 构建工具
- **cmake** - 跨平台构建工具

### MinGW 安装

1. 下载 [MinGW](https://sourceforge.net/projects/mingw/files/latest/download)
2. 勾选 `base` 和 `g++`
3. Installation → Apply Changes
4. 添加 `...\MinGW\bin` 到 PATH 环境变量
5. 验证安装：

```shell
gcc -v
g++ -v
```

### VS Code 配置

1. 安装 `C/C++` 插件
2. 创建 `.vscode` 配置文件
3. 配置 `tasks.json` 和 `launch.json`

[参考：VS Code 配置 C/C++ 环境](https://blog.csdn.net/qq_42417071/article/details/137438374)

---

## Excel

### 快捷选择

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + Shift + ↓` | 选择当前列到底部 |
| `Ctrl + Shift + →` | 选择当前行到右侧 |

---

## 邮箱配置

### Outlook 添加浙大邮箱

| 配置项 | IMAP | POP3 |
|--------|------|------|
| 接收服务器 | `imap.zju.edu.cn:143` | `pop3.zju.edu.cn:110` |
| SSL 端口 | `993` | `995` |
| 发送服务器 | `smtp.zju.edu.cn:25` | `smtp.zju.edu.cn:25` |
| SSL 端口 | `994` | `994` |
| 用户名 | 完整邮箱地址 | 完整邮箱地址 |

### Outlook 添加 QQ 邮箱

1. QQ 邮箱设置 → 开启 IMAP/SMTP 服务
2. 绑定手机号并发送验证短信
3. 获取授权码（作为密码使用）

---

## 其他工具

### VLC 媒体播放器

**添加到 PATH：** 将 VLC 目录加入系统环境变量

**命令行使用：**

```shell
vlc <address>                    # 播放
vlc -f <address>                  # 全屏播放
vlc --rate <speed> <address>      # 倍速播放
```

**快捷键：**

- `[` - 减慢速度
- `]` - 加快速度

### 雷电模拟器

适用于手游在 PC 上运行。

下载地址：[雷电模拟器官网](https://www.ldmnq.com/)

应用场景：使用墨墨背单词等 App
