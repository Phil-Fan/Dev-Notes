# 用户与权限管理

Linux 是多用户操作系统，合理的用户和权限管理是系统安全的基础。

## 用户管理

### 用户信息

```bash
# 查看当前用户
whoami
id

# 查看所有用户
cat /etc/passwd
cut -d: -f1 /etc/passwd

# 查看登录用户
who
w
```

### 用户操作

```bash
# 添加用户
sudo useradd username
sudo useradd -m -s /bin/bash username  # 创建家目录和指定 Shell

# 设置密码
sudo passwd username

# 删除用户
sudo userdel username          # 只删除用户
sudo userdel -r username       # 删除用户和家目录

# 修改用户
sudo usermod -aG sudo username  # 添加到 sudo 组
sudo usermod -s /bin/zsh username # 修改 Shell
```

## 组管理

### 组信息

```bash
# 查看所有组
cat /etc/group
getent group

# 查看用户所属组
groups username
id username
```

### 组操作

```bash
# 添加组
sudo groupadd developers

# 删除组
sudo groupdel developers

# 添加用户到组
sudo usermod -aG developers username
gpasswd -a username developers     # 另一种方法

# 从组中移除用户
sudo gpasswd -d username developers
```

## 文件权限

### 权限表示

```bash
# 符号表示
r w x
| | |
| | └─ 执行 (execute) = 1
| └─── 写入 (write) = 2
└───── 读取 (read) = 4

# 数字表示
rwx = 7 (4+2+1)
rw- = 6 (4+2)
r-- = 4
```

### 权限类型

Linux 文件权限分为三组：

```
-rwxr-xr-- file.txt
 ││  ││  ││
 ││  ││  └─── 其他人 (others)
 ││  └─────── 组 (group)
 └─────所有者 (user)
```

### chmod - 修改权限

```bash
# 符号模式
chmod u+x script.sh           # 所有者添加执行权限
chmod g+w file.txt            # 组添加写权限
chmod o-r file.txt            # 其他人移除读权限
chmod a+r file.txt            # 所有人添加读权限

# 数字模式
chmod 755 script.sh           # rwxr-xr-x
chmod 644 file.txt            # rw-r--r--
chmod 700 private.txt          # rwx------ (仅所有者)

# 递归修改
chmod -R 755 /var/www/html

# 示例
chmod +x script.sh             # 添加执行权限
chmod go-w file.txt           # 移除组和其他人的写权限
```

### chown - 修改所有者

```bash
# 修改所有者
sudo chown user file.txt

# 修改组
sudo chown :group file.txt

# 同时修改所有者和组
sudo chown user:group file.txt

# 递归修改
sudo chown -R user:group /path/to/dir
```

### chgrp - 修改组

```bash
sudo chgrp group file.txt
```

## 特殊权限

### SUID (Set User ID)

```bash
# 设置 SUID
chmod u+s /usr/bin/passwd
chmod 4755 file.txt             # 4755 = SUID + 755

# 示例： passwd 命令需要 SUID
# 普通用户执行 passwd 时，临时获得 root 权限
```

### SGID (Set Group ID)

```bash
# 设置 SGID
chmod g+s /path/to/dir
chmod 2755 directory            # 2755 = SGID + 755

# 在目录中创建的文件继承目录的组
```

### Sticky Bit

```bash
# 设置 Sticky Bit
chmod +t /tmp
chmod 1755 directory            # 1755 = Sticky + 755

# 示例：/tmp 目录
# 只有文件所有者才能删除自己的文件
```

## 进程管理

### ps - 查看进程

```bash
# 查看所有进程
ps aux
ps -ef

# 查看指定进程
ps aux | grep nginx
ps -p 1234                     # 查看 PID 1234

# 树形显示
ps axjf
pstree
```

### top/htop - 实时监控

```bash
# 实时显示进程
top
htop                           # 更友好的界面

# 常用按键
M - 按内存排序
P - 按 CPU 排序
k - 杀死进程
q - 退出
```

### kill - 终止进程

```bash
# 发送信号
kill PID                       # 默认发送 SIGTERM (15)
kill -9 PID                     # 强制终止 SIGKILL (9)
kill -15 PID                    # 优雅终止 SIGTERM (15)

# 按名称杀死进程
killall process_name
pkill process_name

# 常用信号
SIGTERM (15)  - 优雅终止（可捕获）
SIGKILL (9)   - 强制终止（不可捕获）
SIGHUP (1)    - 重新加载配置
SIGINT (2)    - 中断（Ctrl+C）
```

### 后台运行

```bash
# 后台运行
command &

# 将后台进程调到前台
fg

# 将前台进程调到后台
bg

# 查看后台任务
jobs

# 脱离终端
nohup command &
disown
```

## 管道与重定向

### 管道

```bash
# 标准管道
command1 | command2

# 示例
ps aux | grep nginx
cat file.txt | grep pattern
ls -l | sort -k5
```

### tee - 分支输出

```bash
# 同时输出到文件和屏幕
command | tee output.txt

# 追加模式
command | tee -a output.txt
```

### 重定向

```bash
# 标准输出重定向
command > file.txt             # 覆盖
command >> file.txt            # 追加

# 标准错误重定向
command 2> error.txt
command 2>> error.txt

# 同时重定向
command &> output.txt          # 标准输出和错误
command > output.txt 2>&1      # 等价写法

# 丢弃输出
command > /dev/null 2>&1
```

## 系统监控

### 系统信息

```bash
# 系统信息
uname -a                       # 详细信息
uname -r                       # 内核版本
hostname                       # 主机名

# 硬件信息
lscpu                           # CPU 信息
free -h                         # 内存使用
df -h                           # 磁盘使用
lsblk                           # 块设备

# 系统负载
uptime
top
```

### 网络监控

```bash
# 网络连接
ss -tulpn                       # TCP 连接
netstat -tulpn                  # 传统方式

# 网络流量
iftop
nethogs

# 测试连接
ping google.com
traceroute google.com
mtr google.com
```

:::tip 权限速查表

| 权限 | 数字 | 说明 |
|------|------|------|
| rwxrwxrwx | 777 | 所有人可读写执行 |
| rwxr-xr-x | 755 | 所有者完全权限，其他人只读 |
| rw-r--r-- | 644 | 标准文件权限 |
| rw------- | 600 | 私有文件 |
| rwxrwxrwt | 1777 | Sticky + 777 |
| rwsr-xr-x | 2755 | SGID + 755 |
| rwsr-xr-x | 4755 | SUID + 755 |

:::
