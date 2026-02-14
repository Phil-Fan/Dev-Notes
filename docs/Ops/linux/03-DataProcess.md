# 文本数据处理

Linux 提供了强大的文本处理工具，能够高效地搜索、过滤、转换和分析文本数据。

## grep - 文本搜索

grep 是最常用的文本搜索工具，支持正则表达式。

### 基本用法

```bash
# 在文件中搜索
grep "pattern" file.txt
grep "error" /var/log/syslog

# 递归搜索目录
grep -r "TODO" ./src

# 忽略大小写
grep -i "hello" file.txt

# 反向匹配（不包含）
grep -v "comment" file.txt

# 显示行号
grep -n "function" script.py

# 统计匹配行数
grep -c "import" *.py

# 只显示文件名
grep -l "pattern" *.txt
```

### 正则表达式

```bash
# 行首匹配
grep "^root" /etc/passwd

# 行尾匹配
grep "bash$" /etc/passwd

# 空行
grep "^$" file.txt

# 匹配任意字符
grep "hel.o" file.txt

# 匹配 0 个或多个
grep "hel*o" file.txt

# 或运算
grep -E "error|warning" log.txt

# 匹配数字
grep -E "[0-9]+" file.txt
```

### 常用选项

```bash
# 显示上下文
grep -C 3 "pattern" file.txt    # 前后各 3 行
grep -A 5 "pattern" file.txt    # 之后 5 行
grep -B 5 "pattern" file.txt    # 之前 5 行

# 递归搜索
grep -r "import" ./src

# 排除文件
grep -r "TODO" ./src --exclude-dir={node_modules,vendor}
grep -r "TODO" ./src --exclude="*.min.js"

# 只显示匹配部分
grep -o "[0-9]+\.[0-9]+" file.txt

# 使用扩展正则
grep -E "error|warning|fatal" log.txt
```

## sed - 流编辑器

sed 用于文本替换和转换。

### 基本替换

```bash
# 替换第一个匹配
sed 's/old/new/' file.txt

# 替换所有匹配
sed 's/old/new/g' file.txt

# 删除匹配行
sed '/pattern/d' file.txt

# 直接修改文件
sed -i 's/old/new/g' file.txt
```

### 高级用法

```bash
# 删除空行
sed '/^$/d' file.txt

# 删除注释行
sed '/^#/d' file.txt

# 在指定行后插入
sed '/pattern/a\new line' file.txt

# 在指定行前插入
sed '/pattern/i\new line' file.txt

# 打印指定行
sed -n '10,20p' file.txt        # 第 10-20 行
sed -n '/pattern/p' file.txt    # 匹配的行

# 多个替换
sed -e 's/foo/bar/' -e 's/baz/qux/' file.txt
```

### 实用示例

```bash
# 删除行首空格
sed 's/^[ \t]*//' file.txt

# 删除行尾空格
sed 's/[ \t]*$//' file.txt

# 删除 Windows 换行符
sed 's/\r$//' file.txt

# 在每行前添加编号
sed '= file.txt | sed 'N;s/\n/: /'

# 提取域名
echo "https://www.example.com/path" | sed 's|^[^/]*//||' | sed 's|/.*||'
```

## jq - JSON 处理

jq 是轻量级的 JSON 命令行处理器。

1. 一切从 `.` 开始
2. `[]` 表示遍历数组
3. `|` 管道传递
4. `select()` 过滤
5. `{}` 构造新 JSON
6. `map()` 批量处理
7. `group_by()` 分组

假设你有一个 `experiments.json`：

```json
{
  "project": "image-classification",
  "experiments": [
    {
      "id": 1,
      "model": "resnet50",
      "dataset": "cifar10",
      "metrics": {
        "accuracy": 0.91,
        "loss": 0.32
      },
      "epochs": 20,
      "gpu": true
    },
    {
      "id": 2,
      "model": "vit",
      "dataset": "cifar10",
      "metrics": {
        "accuracy": 0.94,
        "loss": 0.21
      },
      "epochs": 30,
      "gpu": true
    },
    {
      "id": 3,
      "model": "resnet18",
      "dataset": "mnist",
      "metrics": {
        "accuracy": 0.98,
        "loss": 0.05
      },
      "epochs": 10,
      "gpu": false
    }
  ]
}
```

### 案例 1️⃣：读取字段（最基础）

查看项目名

```bash
jq '.project' experiments.json
```

输出：

```json
"image-classification"
```

查看所有实验

```bash
jq '.experiments' experiments.json
```

`.` 表示当前 JSON 对象
`.key` 访问字段

### 案例 2️⃣：访问嵌套字段（模型精度）

```bash
jq '.experiments[].metrics.accuracy' experiments.json
```

输出：

```text
0.91
0.94
0.98
```

- `.experiments[]` 遍历数组
- `.metrics` 访问嵌套字段

### 案例 3️⃣：筛选实验（filter）

找 accuracy > 0.93 的模型

```bash
jq '.experiments[] | select(.metrics.accuracy > 0.93)' experiments.json
```

输出：

```json
{
  "id": 2,
  ...
}
{
  "id": 3,
  ...
}
```

只输出模型名和准确率

```bash
jq '.experiments[] 
    | select(.metrics.accuracy > 0.93) 
    | {model, accuracy: .metrics.accuracy}' experiments.json
```

输出：

```json
{
  "model": "vit",
  "accuracy": 0.94
}
{
  "model": "resnet18",
  "accuracy": 0.98
}
```

```text
|      管道
select() 过滤
{...}    构造新 JSON
```

### 案例 4️⃣：统计 & 聚合（机器学习常用）

```bash
jq '[.experiments[].metrics.accuracy] | add / length' experiments.json
```

输出：`0.9433333333`

### 案例 5️⃣：按 dataset 分组，并计算平均 accuracy

```bash
jq '
.experiments
| group_by(.dataset)
| map({
    dataset: .[0].dataset,
    avg_accuracy: (map(.metrics.accuracy) | add / length)
  })
' experiments.json
```

输出：

```json
[
  {
    "dataset": "cifar10",
    "avg_accuracy": 0.925
  },
  {
    "dataset": "mnist",
    "avg_accuracy": 0.98
  }
]
```

## awk - 文本分析

awk 是强大的文本处理工具，适合格式化和数据分析。

### 基本语法

```bash
# 基本结构
awk 'pattern { action }' file.txt

# 打印整行
awk '{print}' file.txt

# 打印指定列
awk '{print $1}' file.txt        # 第一列
awk '{print $1, $3}' file.txt    # 第一和第三列

# 指定分隔符
awk -F: '{print $1}' /etc/passwd
awk -F, '{print $2}' file.csv
```

### BEGIN 和 END

```bash
# 计算文件行数
awk 'END {print NR}' file.txt

# 计算列总和
awk '{sum+=$1} END {print sum}' numbers.txt

# 格式化输出
awk 'BEGIN {print "Name\tAge"} {print $1, $2} END {print "Total:", NR}' file.txt
```

### 条件处理

```bash
# 过滤行
awk '$3 > 50 {print}' file.txt       # 第三列大于 50
awk '/pattern/ {print}' file.txt    # 包含 pattern 的行

# 统计
awk '{count++} END {print count}' file.txt
awk '{sum+=$1} END {print sum}' file.txt

# 内置函数
awk '{print length($0)}' file.txt    # 行长度
awk '{print tolower($0)}' file.txt   # 转小写
awk '{print toupper($0)}' file.txt   # 转大写
```

### awk 实用示例

```bash
# 统计文件大小
ls -l | awk '{sum+=$5} END {print sum}'

# 过滤进程
ps aux | awk '$3 > 1.0 {print $11, $3}'

# 提取 IP 地址
ifconfig | awk '/inet / {print $2}'

# 日志分析
awk '/error/ {count++} END {print "Errors:", count}' /var/log/syslog

# CSV 处理
awk -F, 'NR>1 {print $1, $3}' data.csv
```

## sort - 排序

```bash
# 基本排序
sort file.txt

# 反向排序
sort -r file.txt

# 数字排序
sort -n numbers.txt

# 按指定列排序
sort -k2 file.txt               # 按第 2 列
sort -t: -k3 -n /etc/passwd     # 按第 3 列（数字）

# 去重排序
sort -u file.txt

# 检查排序
sort -C file.txt                # 检查是否已排序
```

## uniq - 去重

```bash
# 去重（需要先排序）
sort file.txt | uniq

# 统计重复次数
sort file.txt | uniq -c

# 只显示重复行
sort file.txt | uniq -d

# 只显示不重复行
sort file.txt | uniq -u
```

## wc - 统计

```bash
# 统计行数、单词数、字节数
wc file.txt

# 只统计行数
wc -l file.txt

# 统计多个文件
wc -l *.txt

# 统计总行数
find . -name "*.py" | xargs wc -l | tail -1
```

## head/tail - 查看文件部分

```bash
# 查看前 10 行
head file.txt
head -n 20 file.txt

# 查看后 10 行
tail file.txt
tail -n 20 file.txt

# 实时查看日志
tail -f /var/log/syslog

# 查看中间行
sed -n '10,20p' file.txt
```

## cut - 提取列

```bash
# 按字节提取
cut -c 1-10 file.txt            # 第 1-10 个字符

# 按分隔符提取
cut -d: -f1 /etc/passwd          # 按 : 分隔，取第 1 列
cut -d, -f2,5 file.csv          # 取第 2 和第 5 列

# 按范围提取
cut -d: -f1-5 /etc/passwd        # 第 1-5 列
cut -d: -f3- /etc/passwd         # 第 3 列到末尾
```

## xargs - 参数构建

```bash
# 基本用法
echo "file1 file2" | xargs rm

# 指定参数数量
echo "1 2 3 4 5" | xargs -n 2

# 并行执行
find . -name "*.jpg" | xargs -P 4 convert

# 处理包含空格的文件名
find . -print0 | xargs -0 rm

# 与 find 结合
find . -name "*.log" -print0 | xargs -0 tar -czvf logs.tar.gz
```

## 组合使用

### 管道操作

```bash
# 查找并统计
grep "error" log.txt | wc -l

# 排序并去重
cat file.txt | sort | uniq

# 多步骤处理
cat data.csv | cut -d, -f3 | sort | uniq -c | sort -rn
```

### 管道操作实用示例

```bash
# 查找最大的文件
find . -type f -exec ls -l {} \; | awk '{print $5, $9}' | sort -rn | head -10

# 统计代码行数
find . -name "*.py" | xargs wc -l | tail -1

# 查找重复行
sort file.txt | uniq -d

# 提取 IP 并统计
awk '/connection/ {print $2}' log.txt | sort | uniq -c | sort -rn

# 日志分析
grep "ERROR" log.txt | awk '{print $1, $2}' | sort | uniq -c
```

:::tip 工具选择

- **grep** - 搜索文本
- **sed** - 替换和编辑文本
- **awk** - 格式化和分析数据
- **jq** - 处理 JSON 数据
- **sort/uniq** - 排序和去重
- **cut** - 提取列
- **xargs** - 构建命令参数

:::
