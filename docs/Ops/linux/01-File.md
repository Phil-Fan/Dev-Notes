# Linux 文件操作

Linux 文件系统是树形结构，从根目录 `/` 开始。掌握文件操作是 Linux 管理的基础。

## 目录导航

### 基本命令

```bash
pwd          # 显示当前工作目录
cd /path      # 切换到指定目录
cd ~          # 切换到用户主目录
cd -          # 切换到上一个目录
cd ..         # 切换到上级目录
```

### 目录浏览

```bash
ls                # 列出当前目录内容
ls -a             # 显示所有文件（包括隐藏文件）
ls -l             # 长格式显示详细信息
ls -lh            # 人类可读的文件大小
ls -lt            # 按修改时间排序
ls -R             # 递归显示子目录
tree              # 以树形结构显示目录
```

:::tip 快速跳转
使用 `fasd` 或 `autojump` 可以实现智能目录跳转：

```bash
# 安装 fasd
sudo apt install fasd  # Debian/Ubuntu

# 添加到 ~/.bashrc
eval "$(fasd --init auto)"

# 快速跳转到常用目录
z project    # 跳转到包含 project 的最近访问目录
```

:::

## 文件管理

### 创建与删除

```bash
# 创建目录
mkdir dir                    # 创建单个目录
mkdir -p path/to/dir        # 递归创建多级目录
mkdir -p {dir1,dir2,dir3}   # 同时创建多个目录

# 创建文件
touch file.txt              # 创建空文件或更新时间戳

# 删除文件/目录
rm file.txt                 # 删除文件（会提示确认）
rm -f file.txt             # 强制删除文件
rm -r directory            # 递归删除目录
rm -rf directory           # 强制递归删除（危险！）
```

:::warning 危险操作
`rm -rf` 命令不可恢复，使用前务必确认路径正确！建议先用 `ls` 查看目标目录内容。

:::

### 复制与移动

```bash
# 复制文件
cp file1.txt file2.txt             # 复制文件
cp -r dir1/ dir2/                 # 递归复制目录
cp -p file.txt backup.txt        # 保留文件属性复制

# 移动/重命名
mv old.txt new.txt                # 重命名文件
mv file.txt /path/to/dir         # 移动文件到目录
mv dir1/ dir2/                    # 移动目录
```

## 文件查找

### locate - 快速查找

```bash
updatedb                          # 更新文件数据库（需 root）
locate filename                   # 查找文件（支持通配符）
locate -i "*.jpg"                 # 忽略大小写查找
```

### find - 强大查找

```bash
# 按名称查找
find . -name "*.log"              # 查找所有 .log 文件
find . -iname "*.PNG"             # 忽略大小写

# 按类型查找
find . -type f                    # 只查找文件
find . -type d                    # 只查找目录

# 按大小查找
find . -size +10M                 # 大于 10MB
find . -size -1k                  # 小于 1KB
find . -size +500k -size -10M     # 500KB 到 10MB 之间

# 按时间查找
find . -mtime -7                  # 7 天内修改的文件
find . -mtime +30                 # 30 天前修改的文件
find . -mmin -60                  # 60 分钟内修改的文件

# 组合查找
find . -name "*.py" -mtime -7      # 最近 7 天修改的 Python 文件

# 查找后执行操作
find . -name "*.tmp" -delete       # 删除所有 .tmp 文件
find . -type f -exec chmod 644 {} \;  # 批量修改权限
find . -name "*.jpg" -exec cp {} /backup \;  # 批量复制
```

### which - 查找命令

```bash
which python3                     # 查找命令路径
whereis ls                        # 查找命令、源码和手册页
type -a ls                        # 显示命令类型（别名/函数/内置）
```

## 文件链接

### 硬链接 vs 软链接

| 特性 | 硬链接 | 软链接（符号链接） |
| --- | --- | --- |
| 跨文件系统 | ❌ 不支持 | ✅ 支持 |
| 删除原文件 | ✅ 数据保留 | ❌ 链接失效 |
| inode | 相同 | 不同 |
| 用途 | 节省空间、备份 | 快捷方式、路径引用 |

```bash
# 创建软链接
ln -s /path/to/file link_name    # 创建符号链接

# 创建硬链接
ln /path/to/file hard_link       # 创建硬链接

# 查看链接
ls -l                            # 显示链接信息
readlink link_name               # 查看链接指向
```

## 命令历史

### history 使用

```bash
history                          # 显示所有历史命令
history 20                       # 显示最近 20 条
history -c                       # 清空历史
!100                             # 执行第 100 条命令
!!                               # 执行上一条命令
!vim                             # 执行最近一条 vim 开头的命令
!?test?                          # 执行包含 test 的最近命令
```

### 历史扩展

```bash
^old^new                         # 替换上一条命令中的字符串
!!:s/foo/bar                     # 替换上一条命令中的 foo 为 bar
!$                               # 上一条命令的最后一个参数
!*                               # 上一条命令的所有参数
```

:::tip 快捷操作

- `Ctrl + R` - 搜索历史命令（反向增量搜索）
- `Ctrl + A` - 移到命令开头
- `Ctrl + E` - 移到命令结尾
- `Ctrl + U` - 删除到命令开头
- `Ctrl + K` - 删除到命令结尾

:::
