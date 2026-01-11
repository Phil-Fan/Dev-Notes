# Shell 脚本基础

Shell 是 Linux 的命令解释器，也是强大的脚本语言。Bash (Bourne Again Shell) 是最常用的 Shell。

## Shell 基础

### 脚本结构

```bash
#!/bin/bash                    # Shebang - 指定解释器
# Author: Your Name
# Description: Script description

set -e                        # 遇到错误时退出
set -u                        # 使用未定义变量时报错
set -o pipefail              # 管道命令失败时退出

# 脚本主体
echo "Hello, World!"
```

### 注释

```bash
# 单行注释

: <<'COMMENT'
多行注释
可以写多行内容
COMMENT
```

## 变量

### 变量定义与使用

```bash
# 定义变量（等号两边不能有空格）
name="John"
age=25

# 使用变量
echo $name
echo ${name}          # 推荐使用花括号

# 只读变量
readonly PI=3.14

# 删除变量
unset name
```

### 变量替换

```bash
# ${变量:-默认值} - 变量未设置或为空时使用默认值
echo ${name:-"Guest"}

# ${变量:=默认值} - 变量未设置或为空时设置并使用默认值
echo ${count:=0}

# ${变量:+替换值} - 变量设置时使用替换值
echo ${name:+"Hello"}

# ${#变量} - 获取变量长度
echo ${#name}

# 字符串操作
echo ${name:0:2}       # 截取子串（从位置 0 开始，长度 2）
echo ${name/j/J}       # 替换第一个匹配
echo ${name//j/J}      # 替换所有匹配
```

### 环境变量

```bash
# 查看环境变量
env
export

# 常用环境变量
echo $HOME             # 用户主目录
echo $USER             # 当前用户名
echo $PATH             # 命令搜索路径
echo $PWD              # 当前工作目录
echo $SHELL            # 当前 Shell
echo $RANDOM           # 随机数（0-32767）

# 导出环境变量（子进程可访问）
export MY_VAR="value"
```

## 数组

### 普通数组

```bash
# 定义数组
files=("file1.txt" "file2.txt" "file3.txt")

# 访问数组
echo ${files[0]}              # 第一个元素
echo ${files[@]}              # 所有元素
echo ${#files[@]}             # 数组长度

# 遍历数组
for file in "${files[@]}"; do
    echo "$file"
done

# 添加元素
files+=("file4.txt")

# 删除元素
unset files[1]
```

### 关联数组

```bash
# 声明关联数组
declare -A config

# 赋值
config[host]="localhost"
config[port]="3306"

# 访问
echo ${config[host]}
echo ${config[@]}

# 遍历
for key in "${!config[@]}"; do
    echo "$key: ${config[$key]}"
done
```

## 特殊变量

```bash
# 脚本参数
$0          # 脚本名称
$1 - $9     # 第 1 到第 9 个参数
$@          # 所有参数（每个参数独立）
$*          # 所有参数（作为整体）
$#          # 参数个数

# 返回状态
$?          # 上一条命令的退出状态（0=成功）
$$          # 当前脚本的 PID
$!          # 最近后台进程的 PID

# 命令历史
!!          # 上一条命令
!$          # 上一条命令的最后一个参数
```

## 输入输出

### 用户输入

```bash
# 读取输入
read name
echo "Hello, $name"

# 带提示信息
read -p "Enter your name: " name

# 超时输入
read -t 5 -p "Quick input (5s): " answer

# 密码输入（不显示）
read -s -p "Password: " password
```

### 输出

```bash
# 简单输出
echo "Hello World"

# 不换行输出
echo -n "No newline: "

# 格式化输出
printf "Name: %s, Age: %d\n" "John" 25

# 输出到文件
echo "Log message" >> log.txt
```

## 条件判断

### if 语句

```bash
# 单分支
if [ condition ]; then
    echo "Condition is true"
fi

# 双分支
if [ condition ]; then
    echo "True"
else
    echo "False"
fi

# 多分支
if [ condition1 ]; then
    echo "Case 1"
elif [ condition2 ]; then
    echo "Case 2"
else
    echo "Default"
fi
```

### 条件测试

```bash
# 文件测试
[ -f file.txt ]           # 文件存在且为普通文件
[ -d directory ]          # 目录存在
[ -e path ]               # 路径存在
[ -r file.txt ]           # 文件可读
[ -w file.txt ]           # 文件可写
[ -x file.txt ]           # 文件可执行
[ -s file.txt ]           # 文件非空

# 字符串比较
[ "$str1" = "$str2" ]     # 字符串相等
[ "$str1" != "$str2" ]    # 字符串不等
[ -z "$str" ]             # 字符串为空
[ -n "$str" ]             # 字符串非空

# 数值比较
[ $num1 -eq $num2 ]       # 等于
[ $num1 -ne $num2 ]       # 不等于
[ $num1 -gt $num2 ]       # 大于
[ $num1 -ge $num2 ]       # 大于等于
[ $num1 -lt $num2 ]       # 小于
[ $num1 -le $num2 ]       # 小于等于

# 逻辑运算
[ -a ]                     # 逻辑与（AND）
[ -o ]                     # 逻辑或（OR）
!                          # 逻辑非（NOT）

# 使用 [[ ]] 更强大（支持 &&、||、正则）
if [[ $name =~ ^J ]]; then
    echo "Name starts with J"
fi
```

## 循环

### for 循环

```bash
# 遍历列表
for item in item1 item2 item3; do
    echo "$item"
done

# 遍历范围
for i in {1..10}; do
    echo "Number: $i"
done

# C 风格
for ((i=0; i<10; i++)); do
    echo "$i"
done

# 遍历文件
for file in *.txt; do
    echo "Processing: $file"
done
```

### while 循环

```bash
# 基本用法
count=0
while [ $count -lt 5 ]; do
    echo "Count: $count"
    ((count++))
done

# 读取文件
while IFS= read -r line; do
    echo "$line"
done < file.txt
```

## 函数

```bash
# 定义函数
function_name() {
    local var="local"    # 局部变量
    echo "Function: $1"
    return 0             # 返回值（0-255）
}

# 调用函数
function_name "argument"

# 返回值
check_file() {
    if [ -f "$1" ]; then
        return 0         # 成功
    else
        return 1         # 失败
    fi
}

if check_file "file.txt"; then
    echo "File exists"
fi
```

## 通配符与扩展

### 通配符

```bash
*           # 匹配任意字符（0个或多个）
?           # 匹配单个字符
[abc]       # 匹配括号内任一字符
[a-z]       # 匹配小写字母
[^abc]      # 匹配非 abc 的字符
{a,b,c}     # 匹配 a 或 b 或 c
{1..5}      # 匹配 1 到 5
```

### 花括号扩展

```bash
# 创建多个文件
touch file{1..5}.txt              # file1.txt 到 file5.txt
touch {a,b,c}.sh                  # a.sh, b.sh, c.sh

# 批量操作
cp image.{png,jpg} /backup/       # 复制 png 和 jpg
mkdir -p {src,build,test}/utils   # 创建多级目录
```

:::tip 实用技巧

```bash
# 备份文件
cp file.txt{,.bak}                # 快速备份

# 重命名
mv old.{txt,md}                   # old.txt -> old.md
```

:::
