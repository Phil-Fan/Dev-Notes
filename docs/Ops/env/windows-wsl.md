# WSL (Windows Subsystem for Linux)

WSL 让你在 Windows 上运行 Linux 环境，无需虚拟机开销。

## 安装 WSL

### 1️⃣ 启用 WSL 功能

> [!NOTE]
>
> PowerShell 命令
>
> ```powershell
> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
> Enable-WindowsOptionalFeature -Online -FeatureName VirtualMachinePlatform
> ```
>
> DISM 命令
>
> ```shell
> dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
> dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
> ```
>
> GUI 方式
>
> 1. Win + R 输入 `optionalfeatures`
> 2. 勾选「适用于 Linux 的 Windows 子系统」
> 3. 勾选「虚拟机平台」
> 4. 点击确定，重启电脑
>

### 2️⃣ 更新 WSL

```shell title="PowerShell (管理员)"
# 更新到最新版本
wsl --update

# 设置默认版本为 WSL 2
wsl --set-default-version 2
```

### 3️⃣ 安装 Linux 发行版

从 [Microsoft Store](https://apps.microsoft.com/detail/9mttcl66cpxj?hl=zh-cn&gl=US) 安装 Ubuntu 20.04.6 LTS

安装完成后首次启动，设置用户名和密码。

---

## 系统配置

### 换源（国内镜像加速）

```bash
# 备份原源
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 编辑源列表
sudo vim /etc/apt/sources.list
```

替换为阿里云/清华源（根据 Ubuntu 版本选择）

```bash
# 更新软件包
sudo apt update && sudo apt upgrade -y
```

### 禁用 Windows PATH

默认 WSL 会继承 Windows 的 PATH，可能导致命令冲突。

> [!TIP]
>
> 编辑 `/etc/wsl.conf`：
>
> ```bash
> sudo vi /etc/wsl.conf
> ```
>
> 添加以下内容：
>
> ```ini title="/etc/wsl.conf"
> [interop]
> enabled = false
> appendWindowsPath = false
> ```
>
> 重启 WSL：
>
> ```powershell title="PowerShell"
> wsl --shutdown
> ```
>

---

## SSH 配置

### 方案一：基础配置

适合本地开发使用。

#### 1. 安装 SSH 服务

```bash
sudo apt update
sudo apt install openssh-server net-tools -y
```

#### 2. 编辑配置文件

```bash
sudo vim /etc/ssh/sshd_config
```

修改以下配置：

```ini title="/etc/ssh/sshd_config"
Port 22
Port 2222                    # 额外端口，方便使用
ListenAddress 0.0.0.0
PasswordAuthentication yes
PermitRootLogin no           # 安全起见禁用 root 登录
```

#### 3. 启动服务

```bash
# 启动 SSH
sudo systemctl start ssh

# 开机自启
sudo systemctl enable ssh

# 查看状态
sudo systemctl status ssh

# 验证端口
sudo ss -tlnp | grep ssh
```

应该看到 `0.0.0.0:22` 和 `0.0.0.0:2222`

#### 4. 免密登录

```powershell title="Windows PowerShell"
# 生成密钥对
ssh-keygen -t ed25519 -C "wsl-ssh-key"

# 查看公钥
cat ~\.ssh\id_ed25519.pub
```

复制公钥内容，在 WSL 中添加：

```bash
# 创建并配置 authorized_keys
mkdir -p ~/.ssh
echo "粘贴的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

#### 5. 连接测试

```bash title="从 Windows 连接"
ssh -p 2222 username@localhost
```

### 方案二：镜像网络模式（推荐）

WSL2 新版本支持镜像网络模式，WSL 与宿主机共用 IP。

#### 1. 配置 `.wslconfig`

```powershell title="Windows PowerShell"
notepad $env:USERPROFILE\.wslconfig
```

添加以下内容：

```ini title=".wslconfig"
[wsl2]
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true

[experimental]
hostAddressLoopback=true
```

> [!TIP]
>
> - `networkingMode=mirrored` - WSL2 与宿主机共用 IP
> - `hostAddressLoopback=true` - 局域网可访问 WSL2 服务
> - `firewall=true` - 启用 Hyper-V 防火墙
>

#### 2. 重启 WSL

```powershell title="PowerShell (管理员)"
wsl --shutdown
wsl
```

验证版本：

```powershell
wsl --version
```

确保为 `2.0.0+`，推荐 `2.0.14.0` 以上。

#### 3. 配置 SSH 服务

```bash
# 安装
sudo apt install openssh-server -y

# 编辑配置
sudo vi /etc/ssh/sshd_config
```

修改端口（避免与 Windows 冲突）：

```ini
Port 8022
PasswordAuthentication yes
```

启动服务：

```bash
sudo service ssh restart
```

#### 4. 开放防火墙

> [!WARNING]
>
> 镜像模式下需要手动开放 Hyper-V 防火墙。
>
> ```powershell title="PowerShell (管理员)"
> # 查看虚拟机 ID
> Get-NetFirewallHyperVVMSetting
> 
> # 允许入站连接（替换为你的 VM ID）
> Set-NetFirewallHyperVVMSetting -Name '{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}' -DefaultInboundAction Allow
> ```
>

#### 5. 测试连接

```powershell title="Windows 本机"
ssh username@localhost -p 8022
```

```bash title="局域网其他设备"
ssh username@<Windows_IP> -p 8022
# 例如：ssh user@192.168.1.100 -p 8022
```

### 方案三：端口转发模式

适用于旧版本 WSL2 或 NAT 模式。

#### 1. 查找 WSL IP

```bash title="WSL 中执行"
ip addr show eth0 | grep inet
```

输出示例：`inet 172.22.183.12/20`

⚠️ 注意：WSL 重启后 IP 会变化。

#### 2. Windows 端口转发

```powershell title="PowerShell (管理员)"
# 配置端口转发
netsh interface portproxy add v4tov4 listenport=2222 listenaddress=0.0.0.0 connectport=2222 connectaddress=<WSL_IP>

# 开放防火墙
netsh advfirewall firewall add rule name="WSL SSH 2222" dir=in action=allow protocol=TCP localport=2222
```

#### 3. 自动更新转发脚本

WSL IP 变化时自动更新转发规则：

```powershell title="wsl-portproxy-daemon.ps1"
# WSL 端口转发后台守护脚本
# 保存为 wsl-portproxy-daemon.ps1 并以管理员身份运行

$listenPort = 2222   # Windows 对外暴露的端口
$connectPort = 2222  # WSL 内部 sshd 端口
$interval = 30       # 检查间隔（秒）

function Get-WslIP {
    try {
        $ip = wsl hostname -I 2>$null
        if ($ip) {
            return $ip.Trim().Split(" ")[0]
        }
    } catch {
        return $null
    }
    return $null
}

$lastIP = ""

Write-Host "🚀 WSL 端口转发守护进程启动 (每 $interval 秒检查一次)" -ForegroundColor Cyan

while ($true) {
    $wslIP = Get-WslIP
    if ($wslIP -and $wslIP -ne $lastIP) {
        Write-Host "✅ 检测到 WSL IP: $wslIP"

        # 删除旧规则
        netsh interface portproxy delete v4tov4 listenport=$listenPort listenaddress=0.0.0.0 2>$null | Out-Null

        # 添加新规则
        netsh interface portproxy add v4tov4 listenport=$listenPort listenaddress=0.0.0.0 connectport=$connectPort connectaddress=$wslIP

        Write-Host "🔄 已更新端口转发规则: Windows:0.0.0.0:$listenPort → WSL:$wslIP:$connectPort" -ForegroundColor Green

        $lastIP = $wslIP
    }
    Start-Sleep -Seconds $interval
}
```

运行：

```powershell
powershell.exe -ExecutionPolicy Bypass -File .\wsl-portproxy-daemon.ps1
```

---

## CUDA 安装

### 前置检查

```shell title="Windows 中查看支持的 CUDA 版本"
nvidia-smi
```

右上角 `CUDA Version` 显示支持的最高版本。

![nvidia-smi](https://img.philfan.cn/Tools__Environment__assets__settings-wsl.assets__image-20250816210945859.webp)

> [!WARNING]
>
> 限制
>
> ![Limitations](https://img.philfan.cn/Tools__Environment__assets__settings-wsl.assets__image-20250816204530654.webp)
>
> 不支持的功能
>
> ![Banned Features](https://img.philfan.cn/Tools__Environment__assets__settings-wsl.assets__image-20250816204600671.webp)

### 安装 CUDA Toolkit

以 CUDA 12.9 为例（从 [NVIDIA 官网](https://developer.nvidia.com/cuda-12-9-0-download-archive?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_local) 获取）：

```bash
# 1. 添加仓库
wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-wsl-ubuntu.pin
sudo mv cuda-wsl-ubuntu.pin /etc/apt/preferences.d/cuda-repository-pin-600

# 2. 下载安装包
wget https://developer.download.nvidia.com/compute/cuda/12.9.0/local_installers/cuda-repo-wsl-ubuntu-12-9-local_12.9.0-1_amd64.deb

# 3. 安装
sudo dpkg -i cuda-repo-wsl-ubuntu-12-9-local_12.9.0-1_amd64.deb
sudo cp /var/cuda-repo-wsl-ubuntu-12-9-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-9
```

### 配置环境变量

```bash
# 添加到 PATH
echo 'export PATH="/usr/local/cuda-12.9/bin:$PATH"' >> ~/.bashrc

# 添加库路径
echo 'export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/local/cuda-12.9/lib64' >> ~/.bashrc

# 重新加载
source ~/.bashrc
```

验证安装：

```bash
nvcc --version
```

### 多版本管理

> [!TIP]
>
> PATH 中靠前的路径优先级更高。
>
> 例如同时安装 CUDA 12.9 和 13.0：
>
> ```bash
> # 优先使用 12.9
> export PATH="/usr/local/cuda-12.9/bin:/usr/local/cuda-13.0/bin:$PATH"
> 
> # 优先使用 13.0
> export PATH="/usr/local/cuda-13.0/bin:/usr/local/cuda-12.9/bin:$PATH"
> ```
>

---

## Nsight 工具

### Nsight Systems

性能分析工具。

```bash
# 安装
chmod a+x NsightSystems-linux-public-2025.5.1.121-3638078.run
sudo ./NsightSystems-linux-public-2025.5.1.121-3638078.run

# 添加到 PATH
echo 'export PATH="/opt/nvidia/nsight-systems/2025.5.1/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Nsight Compute

GPU 核分析工具。

```bash
# 安装
chmod a+x nsight-compute-linux-2025.3.0.19-36273991.run
sudo ./nsight-compute-linux-2025.3.0.19-36273991.run

# 添加到 PATH
echo 'export PATH="/usr/local/NVIDIA-Nsight-Compute/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

> [!WARNING]
>
> 高版本 Nsight 生成的文件，低版本无法打开。团队使用时请保持版本一致。
>

---

## 常见问题

### WSL 无法启动

```powershell
# 完全重启 WSL
wsl --shutdown

# 检查 WSL 状态
wsl --status
```

### 网络无法访问

```bash
# WSL 中重启网络
sudo service networking restart

# 检查 DNS
cat /etc/resolv.conf
```

### 磁盘空间不足

```powershell
# 压缩 VHDX 磁盘文件
wsl --manage <distro> --set-sparse true
```

### 恢复 Windows PATH

编辑 `/etc/wsl.conf`：

```ini
[interop]
appendWindowsPath = true
```

然后重启 WSL。
