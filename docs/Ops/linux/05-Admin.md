# 系统管理

系统管理涉及服务管理、软件安装、系统监控和故障排除等日常维护工作。

## 服务管理

### systemd 服务

```bash
# 服务状态
systemctl status service_name
systemctl is-active service_name    # 是否运行中
systemctl is-enabled service_name   # 是否开机启动

# 启动/停止/重启
sudo systemctl start service_name
sudo systemctl stop service_name
sudo systemctl restart service_name
sudo systemctl reload service_name    # 重载配置

# 开机启动
sudo systemctl enable service_name
sudo systemctl disable service_name

# 查看服务列表
systemctl list-units --type=service
systemctl list-units --all
```

### 常用服务

```bash
# 网络服务
sudo systemctl status networking
sudo systemctl restart NetworkManager

# SSH 服务
sudo systemctl status ssh
sudo systemctl enable ssh

# 防火墙
sudo ufw status
sudo ufw enable
sudo ufw allow 22/tcp
```

## 软件管理

### Debian/Ubuntu (apt)

```bash
# 更新包列表
sudo apt update

# 升级系统
sudo apt upgrade

# 安装软件
sudo apt install package_name

# 删除软件
sudo apt remove package_name       # 保留配置
sudo apt purge package_name       # 删除配置

# 搜索软件
apt search keyword
apt show package_name

# 清理
sudo apt autoremove               # 删除不需要的包
sudo apt autoclean                # 清理缓存
```

### RedHat/CentOS (yum/dnf)

```bash
# 更新包列表
sudo yum update

# 安装软件
sudo yum install package_name

# 删除软件
sudo yum remove package_name

# 搜索软件
yum search keyword
yum info package_name
```

### Snap

```bash
# 安装 Snap
sudo snap install package_name

# 列出已安装
snap list

# 更新
sudo snap refresh package_name

# 删除
sudo snap remove package_name
```

## 日志管理

### 查看日志

```bash
# 系统日志
sudo journalctl
sudo journalctl -f                # 实时查看
sudo journalctl -u service_name   # 特定服务

# 传统日志
tail -f /var/log/syslog
tail -f /var/log/auth.log

# 应用日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 日志分析

```bash
# 查看最近错误
journalctl -p err -n 20

# 查看启动日志
journalctl -b

# 查看指定时间
journalctl --since "1 hour ago"
journalctl --until "yesterday"

# 搜索关键词
journalctl | grep error
```

## 磁盘管理

### 磁盘空间

```bash
# 磁盘使用情况
df -h                           # 人类可读格式
df -i                           # inode 使用情况

# 目录大小
du -sh /path/to/dir            # 目录总大小
du -sh * | sort -h             # 按大小排序

# 查找大文件
find / -type f -size +100M      # 大于 100MB
find / -type f -size +100M -exec ls -lh {} \;

# 清理空间
sudo apt clean                  # 清理包缓存
sudo journalctl --vacuum-time=7d  # 清理 7 天前的日志
```

### 磁盘挂载

```bash
# 查看块设备
lsblk
sudo fdisk -l

# 挂载分区
sudo mount /dev/sdb1 /mnt/data

# 卸载
sudo umount /mnt/data

# 开机自动挂载
# 编辑 /etc/fstab
UUID=xxxx-xxxx  /mnt/data  ext4  defaults  0  2
```

## 性能监控

### 系统监控

```bash
# CPU 使用
top
htop
mpstat 1 5                     # 每秒显示一次

# 内存使用
free -h
vmstat 1 5

# 磁盘 I/O
iostat -x 1 5
iotop

# 网络监控
ss -s
nload
```

### 进程监控

```bash
# 查看进程树
pstree -p

# 查看进程资源使用
ps aux --sort=-%mem | head -10
ps aux --sort=-%cpu | head -10

# 实时监控
watch -n 1 'ps aux | grep python'
```

## 定时任务

### crontab - 定时任务

```bash
# 编辑定时任务
crontab -e

# 查看定时任务
crontab -l

# 删除定时任务
crontab -r
```

### Cron 表达式

```text
* * * * * command
│ │ │ │ │
│ │ │ │ └─ 星期几 (0-7, 0 和 7 都表示周日)
│ │ │ └─── 月份 (1-12)
│ │ └───── 日期 (1-31)
│ └─────── 小时 (0-23)
└───────── 分钟 (0-59)
```

### 示例

```bash
# 每天凌晨 2 点执行
0 2 * * * /backup/script.sh

# 每小时执行一次
0 * * * * /check/status.sh

# 每周一早上 8 点执行
0 8 * * 1 /weekly/task.sh

# 每 5 分钟执行一次
*/5 * * * * /monitor/check.sh

# 使用 @ 特殊关键字
@reboot              # 系统启动时执行
@daily               # 每天执行
@hourly              # 每小时执行
```

## 网络配置

### 网络信息

```bash
# IP 地址
ip addr show
ifconfig                       # 传统方式

# 路由信息
ip route show
route -n

# 测试连接
ping -c 4 google.com
traceroute google.com
mtr google.com                  # 结合 ping 和 traceroute
```

### 防火墙 (ufw)

```bash
# 启用防火墙
sudo ufw enable

# 默认策略
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许端口
sudo ufw allow 22/tcp           # SSH
sudo ufw allow 80/tcp           # HTTP
sudo ufw allow 443/tcp          # HTTPS

# 查看状态
sudo ufw status verbose
```

## 备份与恢复

### 文件备份

```bash
# 打包压缩
tar -czvf backup.tar.gz /path/to/dir

# 排除文件
tar -czvf backup.tar.gz --exclude='*.log' /path/to/dir

# 解压
tar -xzvf backup.tar.gz

# 指定解压目录
tar -xzvf backup.tar.gz -C /path/to/dest
```

### rsync 同步

```bash
# 基本同步
rsync -av /source/ /dest/

# 远程同步
rsync -avz /source/ user@remote:/dest/

# 删除目标中源没有的文件
rsync -av --delete /source/ /dest/

# 显示进度
rsync -avz --progress /source/ /dest/

# 断点续传
rsync -avz --partial /source/ /dest/
```

### 系统备份

```bash
# 备份整个系统
sudo rsync -aAXv / /mnt/backup/

# 排除目录
sudo rsync -aAXv --exclude=/dev \
  --exclude=/proc --exclude=/sys \
  --exclude=/tmp --exclude=/mnt \
  / /mnt/backup/
```

## 故障排除

### 系统问题

```bash
# 查看系统日志
sudo dmesg                      # 内核消息
sudo journalctl -xb              # 上次启动的日志

# 检查磁盘错误
sudo badblocks -v /dev/sda1

# 检查文件系统
sudo fsck /dev/sda1

# 内存测试
sudo memtest86+
```

### 网络问题

```bash
# 检查网络连接
ping -c 4 8.8.8.8

# 检查 DNS
nslookup google.com
dig google.com

# 检查端口
netstat -tulpn | grep :80
ss -tulpn | grep :22

# 抓包分析
sudo tcpdump -i eth0 port 80
```

:::tip 维护建议

1. **定期更新系统** - `sudo apt update && sudo apt upgrade`
2. **监控系统资源** - 使用 `htop`、`iotop` 等工具
3. **定期备份重要数据** - 使用 `rsync` 或 `tar`
4. **查看日志文件** - `/var/log/syslog`、`journalctl`
5. **定期清理磁盘** - `apt autoremove`、清理日志

:::
