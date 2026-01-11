# ROS 入门指南

ROS (Robot Operating System) 是机器人操作系统，用于编写机器人软件。

:::tip 什么是 ROS？

ROS 不是传统意义上的操作系统，而是一个**中间件**或**框架**，运行在 Linux (Ubuntu) 之上，提供机器人开发所需的通信、硬件抽象、设备驱动等功能。

**类比理解：**
- Linux 是电脑的"地基"
- ROS 是盖房子的"脚手架"
- 你写的代码是"房子"

:::

---

## 核心概念

### ROS 的三大核心

:::info

节点 (Node) 是 ROS 中的独立进程，每个节点负责一个具体任务。 公司里的不同部门员工，各司其职。
- 摄像头节点 - 负责采集图像
- 激光雷达节点 - 负责采集距离数据
- 导航节点 - 负责规划路径

话题 (Topic) 是节点间传递数据的"管道"，采用**发布-订阅**模式。公司里的公告栏，任何人都可以发布消息，任何人都可以订阅消息。

- 单向通信（发布者 → 订阅者）
- 异步通信（非实时）
- 一对多（一个发布者，多个订阅者）

**示例：**
- `/camera/image_raw` - 摄像头图像话题
- `/cmd_vel` - 速度控制话题
- `/scan` - 激光雷达数据话题

服务 (Service) 是节点间的双向通信，采用**请求-响应**模式。客户请求服务，服务器处理后返回结果。

**特点：**
- 双向通信（请求 → 响应）
- 同步通信（等待响应）
- 一对一（一个客户端，一个服务端）

**示例：**
- `/spawn` - 生成新的海龟
- `/clear` - 清空轨迹
- `/kill` - 删除海龟

:::

### 其他核心概念

| 概念 | 说明 | 类比 |
|------|------|------|
| **消息 (Message)** | 话题中传递的数据类型 | 快递包裹 |
| **主节点 (Master)** | ROS 的"总机"，管理所有节点和话题 | 公司前台 |
| **工作空间 (Workspace)** | 存放 ROS 代码的目录 | 项目文件夹 |
| **功能包 (Package)** | ROS 的软件单体（类似库） | npm 包 |

---

## 环境安装

### 系统要求

- **操作系统：** Ubuntu 18.04 / 20.04
- **ROS 版本：** Melodic (18.04) / Noetic (20.04)

### 一键安装（推荐）

使用 [鱼香 ROS](https://fishros.org.cn) 的一键安装脚本：

```bash
# 下载安装脚本
wget http://fishros.com/install -O fishros

# 运行脚本
sudo bash fishros
```

:::tip 注意事项

- 安装 **Desktop 版本**（带可视化工具），不要选 Server 版
- 如果遇到 "no directory" 错误，把 `.` 换成 `bash`：

```bash
bash fishros
```

:::

### 手动安装

参考 [ROS 官方教程](http://wiki.ros.org/cn/ROS/Installation)

### 验证安装

```bash
# 启动 ROS 核心
roscore

# 新开终端，启动小海龟仿真
rosrun turtlesim turtlesim_node

# 再开一个终端，启动键盘控制
rosrun turtlesim turtle_teleop_key
```

如果能用键盘控制小海龟移动，说明安装成功！

---

## 常用命令

### ROS 运行命令

| 命令 | 功能 | 使用场景 |
|------|------|----------|
| `roscore` | 启动 ROS 主节点 | 所有 ROS 操作前必须先运行 |
| `rosrun` | 运行单个节点 | 快速测试单个功能 |
| `roslaunch` | 启动多个节点 | 正式运行系统 |

```bash
# roslaunch 示例
roslaunch package_name file.launch
```

### 话题 (Topic) 命令

```bash
# 查看所有活跃话题
rostopic list

# 查看话题信息（类型、发布者、订阅者）
rostopic info /topic_name

# 查看话题消息内容（实时显示）
rostopic echo /topic_name

# 查看话题消息类型
rostopic type /topic_name

# 查看消息类型的详细定义
rostopic type /topic_name | rosmsg show

# 手动发布消息到话题
rostopic pub /topic_name std_msgs/String "data: 'Hello'"

# 测量消息发布频率
rostopic hz /topic_name

# 测量消息带宽
rostopic bw /topic_name
```

:::tip 实用技巧

查看海龟的位置话题：

```bash
# 新开终端
rostopic echo /turtle1/pose
```

用键盘移动海龟时，会实时看到位置数据变化。

:::

### 服务 (Service) 命令

```bash
# 查看所有可用服务
rosservice list

# 查看服务类型
rosservice type /service_name

# 调用服务（重置海龟位置）
rosservice call /reset

# 查看服务参数
rosservice args /service_name
```

### 消息 (Message) 命令

```bash
# 查看所有消息类型
rosmsg list

# 查看消息详细定义
rosmsg show std_msgs/String

# 查看服务类型定义
rossrv show std_srvs/Empty
```

### 参数服务器命令

```bash
# 列出所有参数
rosparam list

# 获取参数值
rosparam get /param_name

# 设置参数值
rosparam set /param_name value

# 删除参数
rosparam delete /param_name

# 从文件加载参数
rosparam load file.yaml

# 保存参数到文件
rosparam dump file.yaml
```

---

## 工作空间与功能包

### 工作空间结构

```
catkin_ws/          # 工作空间根目录
├── src/            # 源代码空间（放功能包）
├── build/          # 编译空间（自动生成）
├── devel/          # 开发空间（可执行文件）
└── install/        # 安装空间（自动生成）
```

### 创建工作空间

```bash
# 创建目录
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/src

# 初始化工作空间
catkin_init_workspace

# 返回工作空间根目录
cd ~/catkin_ws

# 编译
catkin_make
```

### 创建功能包

```bash
cd ~/catkin_ws/src

# 创建功能包（依赖 std_msgs 和 rospy）
catkin_create_pkg my_package std_msgs rospy roscpp

# 返回根目录编译
cd ~/catkin_ws
catkin_make

# 设置环境变量（每次打开终端都要运行）
source devel/setup.bash
```

:::tip 永久设置环境变量

将以下命令添加到 `~/.bashrc`：

```bash
echo "source ~/catkin_ws/devel/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

:::

### 功能包结构

```
my_package/              # 功能包根目录
├── CMakeLists.txt       # 编译规则
├── package.xml          # 包信息（依赖、版本等）
├── src/                 # C++ 源代码
├── scripts/             # Python 脚本
├── include/             # C++ 头文件
├── launch/              # Launch 文件
├── msg/                 # 自定义消息
├── srv/                 # 自定义服务
└── config/              # 配置文件
```

---

## 数据记录与回放

### ROS Bag

ROS Bag 是 ROS 的数据记录工具，可以记录所有话题消息并回放。

```bash
# 记录所有话题
rosbag record -a

# 记录指定话题（生成 subset.bag）
rosbag record -O subset /topic1 /topic2

# 停止记录（Ctrl + C）
```

### 回放数据

```bash
# 查看 bag 文件信息
rosbag info subset.bag

# 正常速度回放
rosbag play subset.bag

# 2 倍速回放
rosbag play -r 2 subset.bag

# 暂停/恢复（空格键）
rosbag play --pause subset.bag
```

:::tip 应用场景

- 算法调试（不用每次都运行机器人）
- 数据采集（采集传感器数据后离线处理）
- 演示展示（提前录制好演示视频）

:::

---

## 可视化工具

### RViz - 3D 可视化

**RViz** 是 ROS 的主要 3D 可视化工具，用于显示机器人模型、传感器数据等。

```bash
# 启动 RViz
rosrun rviz rviz
```

**常用操作：**
- 鼠标左键：旋转视角
- 鼠标中键：平移视角
- 鼠标滚轮：缩放
- 鼠标右键：设置 2D/3D 切换

**添加显示内容：**
- 点击左下角 "Add" 按钮
- 选择要显示的类型（如 PointCloud2、LaserScan、Image）
- 设置对应的话题

### RQt - 2D 可视化

**RQt** 是 ROS 的 2D 可视化工具集。

```bash
# 节点关系图
rosrun rqt_graph rqt_graph

# 数据绘图
rosrun rqt_plot rqt_plot

# 图像查看
rqt_image_view

# 控制台
rqt_console
```

### PlotJuggler - 数据绘图

**PlotJuggler** 是强大的数据可视化工具，比 rqt_plot 更强大。

```bash
# 安装
sudo apt-get install ros-noetic-plotjuggler

# 安装 ROS 支持（用于播放 bag 文件）
sudo apt-get install ros-noetic-plotjuggler-ros

# 启动
roscore
rosrun plotjuggler plotjuggler
```

**使用方法：**
1. File → Load DataBag → 选择 `.bag` 文件
2. 将话题拖到右侧绘图区域
3. 实时查看数据变化

---

## Launch 文件

### 什么是 Launch 文件？

**Launch 文件**是 XML 格式的配置文件，用于一次性启动多个节点。

:::tip 为什么需要 Launch？

手动启动节点：
```bash
# 终端 1
roscore

# 终端 2
rosrun package1 node1

# 终端 3
rosrun package2 node2

# 终端 4
rosrun package3 node3
```

使用 Launch 文件：
```bash
roslaunch my_package all_nodes.launch
```

:::

### 基本 Launch 文件示例

```xml title="my_package/launch/demo.launch"
<launch>
  <!-- 启动节点 -->
  <node pkg="turtlesim" name="sim" type="turtlesim_node"/>

  <!-- 启动键盘控制 -->
  <node pkg="turtlesim" name="teleop" type="turtle_teleop_key" output="screen"/>

  <!-- 设置参数 -->
  <param name="background_r" value="128"/>

  <!-- 包含其他 launch 文件 -->
  <include file="$(find other_package)/launch/other.launch"/>
</launch>
```

**常用标签：**

| 标签 | 功能 | 常用属性 |
|------|------|----------|
| `<node>` | 启动节点 | `pkg`, `type`, `name`, `output` |
| `<param>` | 设置参数 | `name`, `value` |
| `<rosparam>` | 加载参数文件 | `file`, `command` |
| `<include>` | 包含其他 launch 文件 | `file` |
| `<arg>` | 定义参数 | `name`, `default`, `value` |

---

## 常用工具

### 系统监控

```bash
# 安装 htop（比 top 更好用的进程监控）
sudo apt-get install htop

# 启动
htop
```

### 日志清理

ROS 运行会产生大量日志文件，占用磁盘空间。

```bash
# 检查日志大小
rosclean check

# 删除日志
rosclean purge
```

---

## 进阶话题

### 自定义消息

1. 在功能包中创建 `msg` 目录：

```bash
roscd my_package
mkdir msg
```

2. 创建消息文件 `msg/Person.msg`：

```msg
string name
uint8 age
float32 height
```

3. 修改 `package.xml` 和 `CMakeLists.txt`：

```xml
<!-- package.xml -->
<build_depend>message_generation</build_depend>
<exec_depend>message_runtime</exec_depend>
```

```cmake
# CMakeLists.txt
find_package(catkin REQUIRED COMPONENTS
  roscpp
  rospy
  std_msgs
  message_generation
)

add_message_files(FILES Person.msg)

generate_messages(DEPENDENCIES std_msgs)
```

4. 编译并使用：

```bash
cd ~/catkin_ws
catkin_make
source devel/setup.bash
```

### 节点通信示例

**发布者节点 (Python)：**

```python title="scripts/publisher.py"
#!/usr/bin/env python
import rospy
from std_msgs.msg import String

def talker():
    rospy.init_node('talker', anonymous=True)
    pub = rospy.Publisher('chatter', String, queue_size=10)
    rate = rospy.Rate(10)  # 10 Hz

    while not rospy.is_shutdown():
        hello_str = "Hello World %s" % rospy.get_time()
        pub.publish(hello_str)
        rate.sleep()

if __name__ == '__main__':
    talker()
```

**订阅者节点 (Python)：**

```python title="scripts/subscriber.py"
#!/usr/bin/env python
import rospy
from std_msgs.msg import String

def callback(data):
    rospy.loginfo("I heard: %s", data.data)

def listener():
    rospy.init_node('listener', anonymous=True)
    rospy.Subscriber('chatter', String, callback)
    rospy.spin()  # 保持运行

if __name__ == '__main__':
    listener()
```

---

## 参考资源

- [鱼香 ROS](https://fishros.org.cn) - 国内最好的 ROS 中文教程
- [ROS Wiki](http://wiki.ros.org/) - 官方文档
- [古月居 ROS 21 讲](https://www.bilibili.com/video/BV1zt411T7zA) - 视频教程
