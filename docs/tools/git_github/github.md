# 有关GitHub和Git的使用方法与技巧

!!! abstract 
    相关视频：

    - [github基本使用](https://www.bilibili.com/video/BV1e541137Tc/?spm_id_from=333.337.search-card.all.click&vd_source=df5a597928fba384c94060640080e142)
    - [git使用](https://www.bilibili.com/video/BV1db4y1d79C/?spm_id_from=333.788.comment.all.click&vd_source=df5a597928fba384c94060640080e142)
    - [git连接远程仓库和本地仓库](https://www.acwing.com/blog/content/2148/)



## Git演示

## Git是什么?

## Git的三个概念:
-  a.提交commit（git是一种版本控制软件，可以把一个人乃至多个人代码的变更以提交的形式做一个存储，当代码写崩的时候可以找回历史记录）
- b.仓库repository（项目的源文件夹是一个本地仓库，也可以将项目提交到云仓库github、码云）
- c.分支branch（多人同时在开发同一个项目，可以开辟不同的分支，各写各的，最后完成合并）

## 如何快速上手别人的Github项目？（查看这几项足够了）

1. **git clone** :该命令可将项目下载到本地
   - github下载项目命令格式：（在文件夹中右键运行Git Bash Here，然后运行下列命令）
   - 
     ```bash
     git clone path
     #EG: git clone https://github.com/Auzers/notes.git
     ```
2. **Star** :star数量一定程度反应了该项目的受欢迎程度
3. **README.md** :项目基本使用方法的说明
4. **issue** :可对该项目提问题
5. **LICENSE** :该项目证书
   - 一般是**MIT**前缀的做好相关说明就可以随便使用

## 找开源项目的一些途径

- https://github.com/trending/（一些开发项目的作者会在此网站上推荐自己的项目）
- https://github.com/521xueweihan/HelloGitHub（推荐，比较有知名度的项目）
- https://github.com/ruanyf/weekly
- https://www.zhihu.com/column/mm-fe（b站冯雨，偏前端）

## 特殊的查找资源小技巧-常用前缀后缀
   **XXX是你要搜索的内容，其他单词用于强化搜索**

- 找百科大全 awesome xxx
- 找例子 xxx sample
- 找空项目架子 xxx starter / xxx boilerplate
- 找教程 xxx tutorial

## 常用命令总结

- 克隆仓库：
  ```bash
  git clone path
  ```
- 初始化仓库：
```bash
git init
```

- 第一次提交：<br>
  1. 添加文件到暂存区：
  ```bash
  git add -A
  ```
  2. 把暂存区的文件提交到仓库：
  ```bash 
  git commit -m "提交信息" #注意空格
  ```
- 查看提交的历史记录：
```bash
git log --stat #(按q可退出)
```
- 维护项目的日常：<br>
  1. 工作区回滚：
  ```bash
  git checkout <filename>
  ```
  2. 撤销最后一次提交：
  ```bash
  git reset HEAD^1
  ```
  **以上功能在vscode中安装gitlens插件后可以使用图形化界面实现**<br>
- 分支：<br>
  1. 以当前分支为基础新建分支：
  ```bash
  git checkout -b branchname
  ```
  2. 列举所有的分支：
  ```bash
  git branch
  ```
  3. 单纯地切换到某个分支：
  ```bash
  git checkout <branchname>
  ```
  4. 删掉特定的分支：
  ```bash
  git branch -D <branchname>
  ```
  5. 合并分支：
  ```bash 
  git merge <branchname>
  ```
- Git和GitHub远程仓库：<br>
  1. 推送当前分支最新的提交到远程：
  ```bash
  git push
  ```
  2. 拉取远程分支最新的提交到本地：
  ```bash
  git pull
  ```
  ---

[**原文链接**](https://blog.csdn.net/m0_46130595/article/details/120550904)
