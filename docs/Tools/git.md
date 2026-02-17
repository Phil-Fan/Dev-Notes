# Git

## 使用

- [Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN): 可视化学习 Git 操作

### 基本命令（Basics）

- `git init`：创建新的本地仓库（生成 .git 目录）
- `git status`：显示当前仓库状态
- `git add <文件名>`：将文件添加到暂存区
- `git commit`：提交暂存区内容为新提交  
  *Tips: Write good commit messages!*
- `git checkout <版本号>`：切换到指定提交或分支（如切换分支时，同时切换 HEAD）

### 信息查看

- `git help <command>`：查看某个命令的帮助文档
- `git log`：显示提交历史
- `git log --all --graph --decorate`：以 D.A.G 图的形式展示提交历史
- `git diff <文件名>`：比较工作区与暂存区的差异
- `git diff <版本号> <文件名>`：比较两个快照间文件的差异
- `git show` 查看某个提交的详细信息
- `git blame`：逐行显示最后一次修改的提交
- `git bisect`：二分查找 bug 所在的提交

### 分支与合并

- `git branch`：查看本地分支
- `git branch <分支名>`：新建分支
- `git switch <分支名>`：切换分支
- `git checkout -b <分支名>`：新建并切换到该分支（等价于上面两条的组合）
- `git merge <分支名>`：将指定分支合并到当前分支
- `git mergetool`：使用可视化工具解决合并冲突
  - `Ctrl-w w` 移动窗口
  - `:only` 关闭其他窗口，只留 MERGED
  - `:diffg LO` 用当前分支
  - `:diffg RE` 用对方分支
  - `git merge --continue`
- `git rebase`：变基（将一个分支的提交移到新基底上）
- `git rebase -i`：交互式变基操作

### 远程仓库管理（Remotes）

- `git remote`：列出所有远程仓库
- `git remote add <名称> <url>`：添加远程仓库
- `git push <远程> <本地分支>:<远程分支>`：推送本地分支到远程并更新引用
- `git branch --set-upstream-to=<远程>/<远程分支>`：设置本地分支与远程分支的跟踪关系
- `git fetch`：从远程获取对象和引用
- `git pull`：等同于 fetch + merge（拉取并合并）
- `git clone <url>`：克隆远程仓库
- `git clone --depth=1`：浅克隆，仅拉取最新历史

### 文件恢复与撤销（Undo）

- `git commit --amend`：修改最近一次提交的信息或内容
- `git reset <文件>`：将文件从暂存区移除
- `git restore`：还原工作区文件
- `git stash`：暂存当前修改，保持工作区整洁
- `git add -p`：交互式暂存文件部分内容
- `git revert`：新建一个提交用于撤销某次历史提交
- `git clean -n`：查看将要删除的文件
- `git clean -f`：删除所有未跟踪的文件

**`git stash` 本质上是把当前工作区和暂存区的修改打包成一个临时 commit 存到 `refs/stash` 里，并把工作区恢复干净。**

```bash
# 保存当前修改
git stash
git stash list
# 应用但不删除
git stash apply stash@{0}

# 应用并删除（常用）
git stash pop

# 删除某个 stash
git stash drop stash@{0}

# 清空所有 stash
git stash clear
```

## 进阶

- `git config`：配置和个性化 Git
- `git worktree`：支持多工作区，便于同时检出多个分支
- `.gitignore`：设置忽略跟踪的文件或目录
-

### Pre-Commit

[Git 技巧：Pre-commit-CSDN 博客](https://blog.csdn.net/Topsort/article/details/140965269)

[pre-commit 钩子 中文](https://pre-commit.git-scm.cn/)

### submodule

```shell title="添加子模块"
git submodule add <repo-url> <path>
```

这会在你的 repo 中生成：

- `.gitmodules` 文件
- `<path>` 目录（但内部是一个独立 Git 仓库）

```shell title="初始化并克隆子模块"
git submodule update --init --recursive
```

```shell title="更新子模块指向的版本"
git pull origin main
```

```shell title="回到主仓库提交新的指针"
cd ..
git add .
git commit -m "update yyy submodule"
```

```shell title="删除子模块（必须完整删除）"
git submodule deinit -f third_party/yyy
git rm -f <path>
rm -rf .git/modules/<path>
```

## 配置

### git 的安装

### 创建个人令牌

[github 创建个人令牌](https://blog.csdn.net/qq_46941656/article/details/119737804)

```txt
Setting
-> Developer settings
-> Personal access tokens
-> Generate new token 保存密码到自己可以看到的位置
```

### 免密登陆

[git 保存密码](https://cloud.tencent.com/developer/article/2207770)

```shell
# 记住密码
git config --global credential.helper store
# 删除密码
git config --global --unset credential.helper
```

### github 配置 ssh

```shell
cd ~
ssh-keygen -t rsa -C "xxx@xxx.com" # 这里输入你的邮箱
cd .ssh
cat id_rsa.pub # 复制到 github 的 ssh 设置中
```

![ssh key](https://img.philfan.cn/Tools__Software__assets__Git.assets__20240816111626.webp)
点击右上角的 settings
![ssh key](https://img.philfan.cn/Tools__Software__assets__Git.assets__20240816111700.webp)

将刚才复制的内容粘贴到这里

验证是否成功

```shell
ssh -T git@github.com
```

显示如下信息表明设置成功
![ssh key](https://img.philfan.cn/Tools__Software__assets__Git.assets__20240816111807.webp)

### SSH

- 连接虚拟机

[win 系统使用 vscode 连接虚拟机](https://blog.csdn.net/qq_40300094/article/details/114639608)

```shell
ifconfig #记录 ip 地址
ssh user.name@ip
```

#### 设置 ssh 免密登录

在 win 主机上`ssh-keygen`生成一对公私钥，将公钥发送到服务器的`~/.ssh/authorized_keys`文件下

在 win 主机上的 ssh 配置中加入`IdentityFile`文件，即可实现免密登录

[理解公钥和私钥](https://zhuanlan.zhihu.com/p/113522792)

### git 代理

```shell title="代理的配置"
#http 代理
git config --global http.proxy 'http://127.0.0.1:7890'
#https 代理
git config --global https.proxy 'http://127.0.0.1:7890'
#http 代理
git config --global http.proxy 'socks5://127.0.0.1:7890'
#https 代理
git config --global https.proxy 'socks5://127.0.0.1:7890'

#取消 http 代理
git config --global --unset http.proxy
#取消 https 代理
git config --global --unset https.proxy
```

### .gitignore 的配置

有时候不想要`.git`,`.DS_Store` 等文件，那么就需要在`.gitignore`中写清楚

```shell
git rm -r --cached .DS_Store
git rm -r --cached **/.DS_Store
```

## 原理

missing semester

[版本控制 (Git) · the missing semester of your cs education](https://missing-semester-cn.github.io/2020/version-control/)

[6. Lecture 6 - 版本控制 git\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1Tp4y1H7jr/?p=6&vd_source=8b7a5460b512357b2cf80ce1cefc69f5)

## 问题与解决

### 连接不上 `port 443 Couldn‘t connect to server`

- 方案一：关闭 VPN
- 方案二：取消代理

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 拒绝连接 `connect to host github.com port 22: Connection refused`

- 使用`github 443` 端口

给`~/.ssh/config`文件里添加如下内容，这样 ssh 连接 GitHub 的时候就会使用 443 端口。

```txt title="~/.ssh/config"
Host github.com
  Hostname ssh.github.com
  Port 443
```

- `https`和`git`链接换着试试

```txt title="git config"
url = https://github.com/username/repo.git
url = git@github.com:username/repo.git
```

- 换梯子节点，检查 DNS 污染

### 推送失败 `src refspec master does not match any`

按照下面的顺序执行

```shell
git commit -m "init"
git remote add origin xxxxxxxx.git
git push -u origin master
```

### 远端链接失败 `fatal: Couldn‘t find remote ref master`

```shell
# 检查本地配置
git config user.name/git config --global user.name
git config user.email/git config --gloabl user.email

# 检查仓库配置
git remote -v
git remote rm origin
git remote add origin XXXX
```

### 文件过大 `RPC failed；curl 56 Recv failure: Connection was reset`

```shell
git config --global http.postBuffer 524288000
```

如果设置之后提交还是报错的话，可能是因为某几个文件过大造成的；

这时就需要用到 git-lfs 具体用法见[官网](https://git-lfs.github.com/)

```shell
git lfs install
git lfs track "*.so"
git add .gitattributes
```

### Host key verification failed

重新配置一下 ssh，删除`~/.ssh`文件夹，重新生成 ssh key，然后再次连接。

具体操作看`配置/github 配置ssh`一节
