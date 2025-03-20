---
title: Linux 常用命令与系统管理
date: 2025-03-17
tags:
  - Linux
---

# Linux 常用命令与系统管理
!!! note ""
    对Linux的简单复习


## 1. 基础命令

### 1.1 文件与目录操作

- `ls -a -l` (别名: `ll` , `la` ) - 列出文件和目录
- `cd` - 切换目录
- `pwd` - 显示当前工作目录
- `mkdir` - 创建目录
- `touch` - 创建文件
- `cat` - 查看文件内容
- `more` - 以翻页形式查看文件内容
- `less` - 可以使用 PgUp/PgDn 翻页查看文件
- `cp` - 复制文件或目录
- `mv` - 移动或重命名文件
- `rm` - 删除文件或目录

### 1.2 文件查找与内容过滤

- `which` - 查找命令的程序文件路径
- `find` - 查找指定的文件
  - `find <src> -name "被查找文件名"` - 按名称查找
  - `find <src> -size +|-n[kmg]` - 按大小查找
- `grep` - 过滤文本内容
- `wc` - 统计行数、字数、字节数
- `|` - 管道符，将左侧命令输出作为右侧命令输入
- `echo` - 输出文本
- `tail` - 显示文件末尾内容
- `>` 和 `>>` - 重定向符， `>` 覆盖， `>>` 追加

### 1.3 打包与压缩

- `tar -zcvf` - 打包并以 gzip 压缩
- `tar -zxvf` - 解压缩 gzip 文件
- `tar -cvf` - 仅打包，不压缩
**压缩示例:**
```bash
tar -zcvf test.tar.gz test/
``` 
**解压缩示例:**
```bash
tar -zxvf test.tar.gz
```



**注意:** 命令后必须紧跟文件档名



## 2. 用户与权限管理

### 2.1 用户管理
- `root` - 超级管理员账户，拥有最高权限
- `su - <Username>` - 切换用户
- `exit` - 退回上一级用户
- `sudo` - 临时以 root 权限执行命令
  
**为普通用户配置管理员权限:**
1. 切换到 root 用户，执行 `visudo`
2. 在文件最后添加 `<username> ALL=(ALL) NOPASSWD: ALL`
3. 通过 `wq` 保存并退出

### 2.2 用户组管理
- Linux 权限管控的单元是用户级别和用户组级别
- `groupadd <用户组名>` - 创建用户组
- `groupdel <用户组名>` - 删除用户组
- `useradd [-g -d] <用户名>` - 创建用户
  - `-g` 指定用户组，不指定则创建同名组
  - `-d` 指定用户家目录，不指定则默认在 `/home/用户名`
- `userdel [-r] <用户名>` - 删除用户
  - `-r` 删除用户的家目录，不使用则保留家目录
- `id [用户名]` - 查看用户所属的组
- `usermod -aG <用户组> <用户名>` - 将用户加入指定用户组
- `getent` - 查看当前系统中的用户和用户组

### 2.3 权限管理
- 权限细节分为十个槽位:

![权限槽位](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250317155917580.png)

- 权限类型: 
  - `r` - 读
  - `w` - 写
  - `x` - 可执行

- `chmod [-R] <权限> <文件或文件夹>` - 修改权限
  - `[-R]` 对文件夹内的全部内容应用同样的操作
  - 例: `chmod u=rwx,g=rx,o=x hello.txt` - 将文件权限修改为 `rwxr-x--x`

- 权限的数字表示法:

![权限数字](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250317161109345.png)

- `chown [-R] <用户>:<用户组> <文件或文件夹>` - 修改所属用户和用户组
  - 此命令只能由 root 用户使用



## 3. 系统管理

### 3.1 软件安装
- CentOS: `.rpm` 文件, `yum` 命令
- Ubuntu: `.deb` 文件, `apt` 命令
- `apt -y install|remove|search <软件名称>`
  - 需要 root 权限
  - 例: `apt install wget` - 安装 wget
  - `apt remove wget` - 移除 wget
  - `apt search wget` - 搜索 wget

### 3.2 服务管理
- `systemctl` - 控制系统服务
  - `systemctl status <服务名>` - 查看服务状态
  - `systemctl stop <服务名>` - 停止服务
  - `systemctl start <服务名>` - 启动服务
  - `systemctl disable <服务名>` - 取消服务开机自启动
  - `systemctl enable <服务名>` - 设置服务开机自启动
  - 注意：部分软件安装后不会自动集成到 systemctl 中

### 3.3 软链接
- `ln -s <源文件或目录> <目标路径>` - 创建软链接
  - `-s` 表示创建软链接，类似 Windows 中的快捷方式

### 3.4 日期和时区
- `date -d <格式化字符串>` - 显示日期
- 修改时区:
  ```shell
  rm -f /etc/localtime
  ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
  ```
- NTP 自动校准系统时间:
  ```shell
  sudo apt install ntp
  systemctl start ntpd
  systemctl enable ntpd  # 实现定期校准
  ```

### 3.5 Linux 目录含义
- `/` - Linux 根目录
- `/bin` - 二进制目录，GNU 工具，ls 等自带命令
- `/cdrom` - 挂载点，通常用于临时挂载 CD 或 DVD 驱动器
- `/etc` - 系统配置目录
- `/home` - 主目录，显示所有用户目录
- `/lib` - 库目录
- `/lost+found` - 文件系统恢复目录
- `/mnt` - 主要挂载目录，用于外部设备连接
- `/run` - 运行目录
- `/proc` - 伪文件系统
- `/tmp` - 临时文件
- `/var` - 可变目录
- `/boot` - 启动目录
- `/dev` - 设备目录
- `/media` - 媒体目录
- `/opt` - 可选目录（第三方软件包和数据）
- `/root` - root 用户的主目录
- `/sbin` - 系统二进制目录，GNU 高级管理员命令工具
- `/srv` - 服务目录
- `/usr` - 用户二进制目录，GNU 工具，可能有自设置的命令

### 3.6 环境变量
- 环境变量是操作系统中的一些全局变量，用于存储系统配置信息
- `env` 查看环境变量以键值对形式给出
- 当执行任何命令，都会从 `PATH` 中按顺序从目录中寻找
- `$` 用于取"变量"的值
- `PATH` 是一个环境变量加入路径一般 `export PATH=$PATH:自定义路径`
- 取得环境变量的值就可以通过语法： `$环境变量名` 来取得，比如 `echo $PATH`
- 临时设置变量的值， `export 变量名=变量值`
- 永久生效
	- 针对当前用户配置在 `~/bashrc` 中
	- 针对全部用户，配置在系统的： `/etc/profile` 文件中
	- 并通过语法 `source 配置文件` 生效

## 4. 网络配置

### 4.1 IP 地址
- 每台计算机都有 IP 地址，用于网络通信
- `ifconfig` - 查看本机 IP 地址 (如无法使用，安装 net-tools)
- 特殊 IP:
  - `127.0.0.1` - 本机地址
  - `0.0.0.0` - 可指代本机，用于端口绑定

### 4.2 主机名
- `hostname` - 查看主机名
- `hostnamectl set-hostname <主机名>` - 修改主机名 (需 root 权限)

### 4.3 域名解析
- 通过主机名找计算机 IP 地址 (域名解析)
- 若本地找不到，会联网查询公共 DNS 服务

### 4.4 网络请求和下载
- `ping [-c num] <IP或主机名>` - 测试网络连通性
  - `-c` 指定检查次数，不使用则无限检查
- `wget` - 非交互式文件下载器
  - `wget -b <url>` - 后台下载
  - `tail -f wget-log` - 跟踪下载进度
- `curl` - 发送 HTTP 请求
  - `curl -o <文件名> <url>` - 下载文件

### 4.5 端口
- 设备与外界通信的出入口，分为物理端口和虚拟端口
- 物理端口：可见的接口，如 USB 接口、RJ45 网口等
- 虚拟端口：操作系统与外部交互的出入口
  - IP 锁定计算机，端口锁定具体程序
- 端口类型:
  - 公认端口: 1~1023，系统内置或知名软件使用
  - 注册端口: 1024~49151，用户自定义使用
  - 动态端口: 49152~65535，临时使用
- `nmap <IP地址>` - 查看端口占用情况
- `netstat -anp|grep <端口号>` - 查看指定端口占用情况

## 5. 进程管理

### 5.1 任务管理器
- `top` - 显示或管理执行中的程序
- `ps` - 查看当前系统进程状态
- `kill` - 结束进程

### 5.2 进程查看与控制
- `ps -ef` - 查看全部进程信息
  - 从左到右显示: uid, pid, ppid, c (CPU 占用率), stime (启动时间), tty (终端序号), time (CPU 占用时间), cmd (启动路径)
  - `ps -ef|grep <关键字>` - 查找特定进程
- `kill -9 <进程ID>` - 强制终止进程
  - `-9` 表示强制中止

### 5.3 主机状态监控
- `top` - 查看主机状态

![top命令输出](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/image/20250317190402347.png)

## 6. 常用快捷键与技巧

- `Ctrl + c` - 强制停止当前命令
- `Ctrl + d` - 退出或登出 shell
- `Ctrl + l` - 清屏
- `Ctrl + a` - 光标移动到行首
- `Ctrl + e` - 光标移动到行尾
- `Ctrl + u` - 删除光标之前的所有字符
- `Ctrl + k` - 删除光标之后的所有字符
- `Ctrl + w` - 删除光标前的一个单词
- `Ctrl + r` - 搜索历史命令
- `Ctrl + z` - 将当前命令放到后台
- `Ctrl + y` - 将后台命令恢复到前台
- `Ctrl + ←/→` - 快速跳过单词
- `history` - 查看历史输入过的命令
- `!<命令前缀>` - 自动执行历史最近的匹配命令