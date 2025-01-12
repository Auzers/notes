# Linux 

## 1 Linux 操作系统

- Linux kernel 内核
- GNU 工具
- GUI Desktop 环境
- APPlication 应用

Linux 实际上是**GNU/Linux**

### 1.1 Linux kernel 内核

- Linux kernel 内核
  - 硬件
  - 软件
  - 内存管理
  - 文件管理 

### 1.2 GNU 工具：

原本在Unix上的一些命令和工具，被模仿（移植）到了Linux上
供Linux使用的这套工具：coreutils coreutilities软件包

-  用来处理文件的工具
-  用来操作文本的工具
-  用来管理进程的工具

**shell**:
提供给用户使用的软件用户拿它来使用电脑，并且和电脑交互

命令行壳层提供一个命令行界面(**CLI**)，而图形壳层提供一个用户图形界面(**GUI**)

Linux shell --> CLI

### 1.3 GUI
直观体现为桌面操作系统

- X windows
- KDE(最多的) 
- GNOME
- Unity

## 2 Bash shell

### 2.1 cd ls等
```shell
# 切换到根目录 /
auzers@auzers-virtual-machine:~/Desktop$ cd /  # 记得cd 后面有一个blank
# 列出当前目录的内容
auzers@auzers-virtual-machine:/$ ls
bin    dev   lib    libx32      mnt   root  snap      sys  var
boot   etc   lib32  lost+found  opt   run   srv       tmp
cdrom  home  lib64  media       proc  sbin  swapfile  usr
# 切换到当前用户的主目录 
auzers@auzers-virtual-machine:/$ cd
# 列出当前目录的内容
auzers@auzers-virtual-machine:~$ ls
Desktop  Documents  Downloads  Music  Pictures  Public  snap  Templates  Videos
```

```shell
auzers@auzers-virtual-machine:/home$ cd auzers
auzers@auzers-virtual-machine:~$ cd /
auzers@auzers-virtual-machine:/$ cd home/
auzers@auzers-virtual-machine:/home$ ls
auzers
auzers@auzers-virtual-machine:/home$ cd auzers/
auzers@auzers-virtual-machine:~$
```

- 这部分说明`~`就是用户`home`目录
- `$`  #等待用户输入
- `cd`  #change directory
- `cd ..` #返回上一级目录
- `cd -` #返回上一次操作的目录
- `ls`  #list

```shell
auzers@auzers-virtual-machine:~$ ls -a
.              .bashrc  Documents  .mozilla  Public                     Videos
..             .cache   Downloads  Music     snap
.bash_history  .config  .gnupg     Pictures  .sudo_as_admin_successful
.bash_logout   Desktop  .local     .profile  Templates
auzers@auzers-virtual-machine:~$ ls -l
total 80
drwxr-xr-x 16 auzers auzers 4096 Jan 10 04:08 ./
drwxr-xr-x  3 root   root   4096 Jan  9 18:27 ../
-rw-------  1 auzers auzers  113 Jan 10 04:04 .bash_history
-rw-r--r--  1 auzers auzers  220 Jan  9 18:27 .bash_logout
-rw-r--r--  1 auzers auzers 3771 Jan  9 18:27 .bashrc
drwx------ 13 auzers auzers 4096 Jan 10 04:22 .cache/
drwx------ 12 auzers auzers 4096 Jan 10 04:22 .config/
drwxr-xr-x  2 auzers auzers 4096 Jan 10 04:02 Desktop/
drwxr-xr-x  2 auzers auzers 4096 Jan  9 18:33 Documents/
drwxr-xr-x  2 auzers auzers 4096 Jan  9 18:33 Downloads/
drwx------  3 auzers auzers 4096 Jan  9 18:33 .gnupg/
drwxr-xr-x  3 auzers auzers 4096 Jan  9 18:33 .local/
drwx------  4 auzers auzers 4096 Jan 10 02:40 .mozilla/
drwxr-xr-x  2 auzers auzers 4096 Jan  9 18:33 Music/
drwxr-xr-x  2 auzers auzers 4096 Jan  9 18:33 Pictures/
-rw-r--r--  1 auzers auzers  807 Jan  9 18:27 .profile
drwxr-xr-x  2 auzers auzers 4096 Jan  9 18:33 Public/
drwx------  3 auzers auzers 4096 Jan 10 04:02 snap/
-rw-r--r--  1 auzers auzers    0 Jan 10 03:58 .sudo_as_admin_successful
drwxr-xr-x  2 auzers auzers 4096 Jan  9 18:33 Templates/
drwxr-xr-x  2 auzers auzers 4096 Jan  9 18:33 Videos/

```

- `ls -a` #用于显示所有文件，包括隐藏文件可以简写为`la`
- `ls -l` #可以列举出文件的详细信息可以简写为`ll`(最常用)

```shell
LS(1)                            User Commands                           LS(1)

NAME
       ls - list directory contents

SYNOPSIS
       ls [OPTION]... [FILE]...

DESCRIPTION
       List  information  about  the FILEs (the current directory by default).
       Sort entries alphabetically if none of -cftuvSUX nor --sort  is  speci‐
       fied.

       Mandatory  arguments  to  long  options are mandatory for short options
       too.

       -a, --all
              do not ignore entries starting with .

       -A, --almost-all
              do not list implied . and ..

       --author
```
  
- `man ls` #查看ls命令的manual(手册)，查看ls的详细说明文档看，可以使用`pgup`和`pgdn`来翻页
- `.` #单点符，表示当前目录
- `..` #双点符，表示父目录

### 2.2 文件扩展匹配符

```shell
auzers@auzers-virtual-machine:~$ cd Documents/doc
auzers@auzers-virtual-machine:~/Documents/doc$ ls
'a-2.3 _copy_1.txt'  'a -2.3_copy_2 .txt'   a.txt
auzers@auzers-virtual-machine:~/Documents/doc$ mv 'a -2.3_copy_2 .txt' a-2.3_copy_2.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls
'a-2.3 _copy_1.txt'   a-2.3_copy_2.txt   a.txt
auzers@auzers-virtual-machine:~/Documents/doc$ mv 'a-2.3 _copy_1.txt' a-2.3_copy_1.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls
a-2.3_copy_1.txt  a-2.3_copy_2.txt  a.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls a-2.3*
a-2.3_copy_1.txt  a-2.3_copy_2.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls a*
a-2.3_copy_1.txt  a-2.3_copy_2.txt  a.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls a-2.?8
ls: cannot access 'a-2.?8': No such file or directory
auzers@auzers-virtual-machine:~/Documents/doc$ ls a-2.?*
a-2.3_copy_1.txt  a-2.3_copy_2.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls a-2.?
ls: cannot access 'a-2.?': No such file or directory
auzers@auzers-virtual-machine:~/Documents/doc$ 
auzers@auzers-virtual-machine:~/Documents/doc$ ls -l a-*
-rw-rw-r-- 1 auzers auzers 0 Jan 10 23:15 a-2.3_copy_1.txt
-rw-rw-r-- 1 auzers auzers 0 Jan 10 23:15 a-2.3_copy_2.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls *.txt
a-2.3_copy_1.txt  a-2.3_copy_2.txt  a.txt

```
- 为什么会有单引号包裹 #包含**特殊字符**，包括空格，$，&等
- `*` #代替多个字符
- `？` #代替一个字符
  
### 2.3 元字符通配符

### 2.4 touch 

```shell
auzers@auzers-virtual-machine:~/Documents$ cd doc
auzers@auzers-virtual-machine:~/Documents/doc$ ls
a-2.3_copy_1.txt  a-2.3_copy_2.txt  a.txt
auzers@auzers-virtual-machine:~/Documents/doc$ touch 1.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls
1.txt  a-2.3_copy_1.txt  a-2.3_copy_2.txt  a.txt
auzers@auzers-virtual-machine:~/Documents/doc$ touch 1.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ll
total 8
drwxrwxr-x 2 auzers auzers 4096 Jan 11 08:22 ./
drwxr-xr-x 3 auzers auzers 4096 Jan 10 23:13 ../
-rw-rw-r-- 1 auzers auzers    0 Jan 11 08:23 1.txt
-rw-rw-r-- 1 auzers auzers    0 Jan 10 23:15 a-2.3_copy_1.txt
-rw-rw-r-- 1 auzers auzers    0 Jan 10 23:15 a-2.3_copy_2.txt
-rw-rw-r-- 1 auzers auzers    0 Jan 10 23:15 a.txt
```
### 2.5 cp

```shell
auzers@auzers-virtual-machine:~/Documents/doc$ cp 1.txt 2.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls
1.txt  2.txt  a-2.3_copy_1.txt  a-2.3_copy_2.txt  a.txt
auzers@auzers-virtual-machine:~/Documents/doc$ gedit 2.txt
```

- cp命令会覆盖,所以一般要求使用 `cp -i`使用前先询问管理员
如何复制一个文件夹

```shell
auzers@auzers-virtual-machine:~/Documents/doc$ cp ~/Documents/doc/ ~/Download
cp: -r not specified; omitting directory '/home/auzers/Documents/doc/'
auzers@auzers-virtual-machine:~/Documents/doc$ cp ~/Documents/doc/* ~/Downloads
auzers@auzers-virtual-machine:~/Documents/doc$ cd ..
auzers@auzers-virtual-machine:~/Documents$ cd ..
auzers@auzers-virtual-machine:~$ ls
 Desktop     Downloads           Music      Public   Templates
 Documents  'Downloads (copy)'   Pictures   snap     Videos
auzers@auzers-virtual-machine:~$ cd Downloads
auzers@auzers-virtual-machine:~/Downloads$ ls
1.txt  2.txt  2.txt]  a-2.3_copy_1.txt  a-2.3_copy_2.txt  a.txt
auzers@auzers-virtual-machine:~/Documents$ cp -r doc ~/Downloads
auzers@auzers-virtual-machine:~/Documents$ cd ~
auzers@auzers-virtual-machine:~$ cd Downloads
auzers@auzers-virtual-machine:~/Downloads$ ls
1.txt  2.txt  2.txt]  a-2.3_copy_1.txt  a-2.3_copy_2.txt  a.txt  doc

```

- 使用 `file/*` #但是此时没有连同文件夹一起复制过去
- 使用 `-r` #递归处理，表示将指定目录下的所有文件夹和子目录一起处理

### 2.6 mv

```shell
auzers@auzers-virtual-machine:~$ cd Downloads/
auzers@auzers-virtual-machine:~/Downloads$ ls
1.txt  2.txt  2.txt]  a-2.3_copy_1.txt  a-2.3_copy_2.txt  a.txt  doc
auzers@auzers-virtual-machine:~/Downloads$ mv doc/ ~/Documents/doc/
auzers@auzers-virtual-machine:~/Downloads$ cd !$
cd ~/Documents/doc/
auzers@auzers-virtual-machine:~/Documents/doc$ ls
1_linkfile  2.txt   a-2.3_copy_1.txt  a.txt
1.txt       2.txt]  a-2.3_copy_2.txt  doc
```

- `cd !$`  #跳转到上一个命令的最后一个目录
 
### 2.7 lnk链接文件

- 符号链接 （软链接）--快捷方式，快捷方式也是一个文件
**PS:**原来的文件夹必须存在
- 硬链接
不是一个文件，只是一个副本，在不同的硬盘中就会失效
**PS:**原来的文件夹同样必须存在

```shell
auzers@auzers-virtual-machine:~$ cd Documents/doc/
auzers@auzers-virtual-machine:~/Documents/doc$ ls
1.txt  2.txt  2.txt]  a-2.3_copy_1.txt  a-2.3_copy_2.txt  a.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ln -s 1.txt 1_linkfile
auzers@auzers-virtual-machine:~/Documents/doc$ ls
1_linkfile  2.txt   a-2.3_copy_1.txt  a.txt
1.txt       2.txt]  a-2.3_copy_2.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ll
total 20
drwxrwxr-x 2 auzers auzers 4096 Jan 11 21:18 ./
drwxr-xr-x 3 auzers auzers 4096 Jan 10 23:13 ../
lrwxrwxrwx 1 auzers auzers    5 Jan 11 21:18 1_linkfile -> 1.txt
-rw-rw-r-- 1 auzers auzers   30 Jan 11 08:28 1.txt
-rw-rw-r-- 1 auzers auzers   30 Jan 11 08:32 2.txt
-rw-rw-r-- 1 auzers auzers   30 Jan 11 08:35 2.txt]
-rw-rw-r-- 1 auzers auzers    0 Jan 10 23:15 a-2.3_copy_1.txt
-rw-rw-r-- 1 auzers auzers    0 Jan 10 23:15 a-2.3_copy_2.txt
-rw-rw-r-- 1 auzers auzers    0 Jan 10 23:15 a.txt
```

- `ln -s 1.txt 1_linkfile` #为`1.txt`创建软链接 
- `ln` #创建硬链接

### 2.8 rm

- `rm -i` #最常用的删除命令
- `rm -rf -i` #询问用户后强制删除

### 2.9 mkdir 

### 2.10 [more](https://wangchujiang.com/linux-command/c/more.html) & [cat](https://wangchujiang.com/linux-command/c/cat.html) & [less](https://wangchujiang.com/linux-command/c/less.html)

- **cat**

```shell
auzers@auzers-virtual-machine:~/Documents/doc$ cat -n 1.txt
     1	#include<stdio.h>
     2	int main()
     3	dadad
auzers@auzers-virtual-machine:~/Documents/doc$ cat -A 1.txt
#include<stdio.h>$
int main()$
dadad$

```

- **more**

```shell
auzers@auzers-virtual-machine:~/Documents/doc$ more 1.txt
#include<stdio.h>
int main()
dadad
dasd1d
a
ds
fa
sd
f  
 f	
 f	 f	 f	 f	x fxs	f
  	d	qd	  sa d
  	asd 	
  	 	wqdda	
  	 	f 	 	 
 f
 
 wd	qwd	qw
 d 
 
 d
--More--(56%)
```
**PS:**中间的看上去像乱码一样的东西是1.txt文件中的内容

- **less**(可以使用PgUp PgDn翻页)


## 3 Bash shell 进阶

### 3.1 Linux 的任务管理器

- `top` #用于显示或管理执行中的程序
- `ps` #用于查看当前系统的进程状态
- `kill` #结束进程

### 3.2 挂载

可以使用[`mount`](https://wangchujiang.com/linux-command/c/mount.html)命令选择挂载的目录,可以用[`umount`](https://wangchujiang.com/linux-command/c/umount.html)来取消挂载

- 为什么要有挂载？
- [`df`](https://wangchujiang.com/linux-command/c/df.html) #用于显示磁盘分区上的可使用的磁盘空间。默认显示单位为KB。可以利用该命令来获取硬盘被占用了多少空间，目前还剩下多少空间等信息。  
- `sudo fdisk -l` #观察硬盘实体使用情况

### 3.3 sort

### 3.4 grep

```shell
auzers@auzers-virtual-machine:~/Documents/doc$ cat -n 1.txt
     1	#include<stdio.h>
     2	int main()
     3	dadad
     4	dasd1d
     5	a
     6	ds
     7	fa
     8	sd
     9	f  
    10	 f	
    11	 f	 f	 f	 f	x fxs	f
    12	  	d	qd	  sa d
    13	  	asd 	
    14	  	 	wqdda	
    15	  	 	f 	 	 
    16	 f
    17	 
    18	 wd	qwd	qw
    19	 d 
    20	 
    21	 d
    22	 	qw
    23	 	d 
    24	 		qw
    25	 		d	
    26	 		qwd
    27	 			
    28	 			 d
    29	 			 	qw
    30	 			 	
    31	 			 	
    32	 			 	
    33	 			 		
    34	 			 		
    35	 			 		
    36	 			 		dwqdqwd
    37	 			 		
auzers@auzers-virtual-machine:~/Documents/doc$ grep -n qw 1.txt
18: wd	qwd	qw
22: 	qw
24: 		qw
26: 		qwd
29: 			 	qw
36: 			 		dwqdqwd

```

### 3.5 打包压缩归档解压缩
**压缩**
```shell
auzers@auzers-virtual-machine:~/Documents/doc$ ls
1_linkfile  2.txt   a-2.3_copy_1.txt  a.txt
1.txt       2.txt]  a-2.3_copy_2.txt  doc
auzers@auzers-virtual-machine:~/Documents/doc$ tar -zcvf mytxt.tar.gz doc
doc/
doc/2.txt
doc/a-2.3_copy_2.txt
doc/2.txt]
doc/a-2.3_copy_1.txt
doc/1.txt
doc/a.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls
1_linkfile  2.txt   a-2.3_copy_1.txt  a.txt  mytxt.tar.gz
1.txt       2.txt]  a-2.3_copy_2.txt  doc
auzers@auzers-virtual-machine:~/Documents/doc$ 
```

**解压缩**
```shell
auzers@auzers-virtual-machine:~/Documents/doc$ tar -zcvf mytest.tar.gz 1.txt
1.txt
auzers@auzers-virtual-machine:~/Documents/doc$ ls
1_linkfile  2.txt   a-2.3_copy_1.txt  a.txt  mytest.tar.gz
1.txt       2.txt]  a-2.3_copy_2.txt  doc    mytxt.tar.gz
auzers@auzers-virtual-machine:~/Documents/doc$ cp mytest.tar.gz ../
auzers@auzers-virtual-machine:~/Documents/doc$ cd ..
auzers@auzers-virtual-machine:~/Documents$ ls
doc  mytest.tar.gz
auzers@auzers-virtual-machine:~/Documents$ tar -zxvf mytest.tar.gz 
1.txt
auzers@auzers-virtual-machine:~/Documents$ ls
1.txt  doc  mytest.tar.gz
auzers@auzers-virtual-machine:~/Documents$ 
```

- `tar -zcvf` #打包后，以 gzip 压缩,仅打包，不压缩 `tar -cvf` **PS:**命令后必须紧跟文件档名

## 4 目录含义

- `/` Linux根目录
- `/bin` 二进制目录 GNU工具 ls等自带的命令
- `/cdrom` 一个挂载点（mount point），通常用于临时挂载 CD 或 DVD 驱动器的内容（如光盘的文件系统
- `/etc` 系统配置目录
- `/home` 主目录，显示所有用户目录
- `/lib` 库目录
- `/lost+found` ...
- `/mnt` 主要挂载目录，挂载---外在的设备和电脑进行链接（U盘等）
- `/run` 运行目录
- `/proc` 伪文件系统
- `/tmp` 临时文件
- `/var` 可变目录
- `/boot` 启动目录
- `/dev` 设备目录
- `/media` 媒体目录
- `opt` 可选目录（第三方的软件包和数据等）
- `/root` root用户的主目录 管理员
- `/sbin` 系统二进制目录 GNU高级管理员使用的命令工具
- `/srv` 服务目录
- `/usr` 用户二进制目录，GNU工具,可能有一些自己设置的命令


## 5 tips

- `ctrl + u` #删除光标之前的所有字符
- `ctrl + k` #删除光标之后的所有字符
- `ctrl + l` #清屏 
- `ctrl + c` #终止当前命令
- `ctrl + d` #退出shell
- `ctrl + z` #将当前命令放到后台
- `ctrl + y` #将后台命令恢复到前台
- `ctrl + a` #将光标移到行首
- `ctrl + e` #将光标移到行尾
- `ctrl + w` #删除光标前的一个单词
- `ctrl + r` #搜索历史命令  







