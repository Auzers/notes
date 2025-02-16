# git使用

!!! abstract "" 
    相关视频：

    - [git相关-1](https://www.bilibili.com/video/BV1db4y1d79C/?spm_id_from=333.788.comment.all.click&vd_source=df5a597928fba384c94060640080e142)
    - [git相关-2](https://www.bilibili.com/video/BV1PG411L7of?share_source=copy_web&vd_source=5d7da9075f18e5d133f46c25ab52f885&spm_id_from=333.788.videopod.sections)
    - [github基本使用](https://www.bilibili.com/video/BV1e541137Tc/?spm_id_from=333.337.search-card.all.click&vd_source=df5a597928fba384c94060640080e142)
    - [git连接远程仓库和本地仓库](https://www.acwing.com/blog/content/2148/)
## 1 图解

![image](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/PixPin_2025-02-16_13-08-59.png)

## 2 本地仓库和远端仓库关联

- 远程仓库：在 github, gitlab, gitee 等平台上面对应的本地仓库称被称为**远程仓库**
- github 是一个代码托管平台，通过 github 可以实现代码分享和协同开发

### 示例

github 创建一个仓库后关联到本地的一般步骤及解释  
这里采用 **ssh** 方式 

| 命令                                                               | 作用                                                 |
| ------------------------------------------------------------------ | ---------------------------------------------------- |
| `echo "# gittest" >> README.md`                                    | 创建 `README.md` 并写入 `# gittest`                  |
| `git init`                                                         | 初始化 Git 仓库                                      |
| `git add README.md`                                                | 添加 `README.md` 到暂存区                            |
| `git commit -m "first commit"`                                     | 提交文件到本地仓库                                   |
| `git branch -M main`                                               | 重命名当前分支为 `main`                              |
| `git remote add origin git@github.com:username/repositoryname.git` | 关联远程 GitHub 仓库， `origin` 是远端仓库的 `alias` |
| `git push -u origin main`                                          | 推送 `main` 分支到远程仓库，并将 `main` 作为默认分支 |

- 如果已经有了本地仓库并且已经进行过提交，直接执行后两个命令即可

## 3 产生冲突与解决办法

![image](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/PixPin_2025-02-16_13-09-41.png)

- 使用 `git pull`
- 如果正常合并，证明无需手动解决冲突，接下来正常 `git push` 即可
- 如果没有正常合并说明存在某些冲突需要手动解决  
**示例**：  
对于 `conflict.txt` 文件

```
本地：hello from local
```

```
远程:hello from github
```

执行 `git pull` 后

```Bash
Auto-merging conflict.txt
CONFLICT (content): Merge conflict in conflict.txt
Automatic merge failed; fix conflicts and then commit the result.
```

接下来查看冲突文件并解决冲突  
打开 `conflict.txt`

```markdown
<<<<<<< HEAD
本地修改：Hello from Local!
=======
远程修改：Hello from GitHub!
>>>>>>> main

```

手动更改，留下需要的部分  
最后：

```bash
git add conflict.txt
git commit -m "Resolved merge conflict"
git push origin main
```

- 克隆远程项目到本地  
  `git clone <url>`

## 4 commit 修正

 - 使用 `--amend` 命令  

**示例：**
对于 `a.txt` 文件

```
12356789
```

发现漏写了 4  
但是已经进行 `commit -m 'a的第一次提交'`  
随后为 `a.txt` 加上 4

```
123456789
```

如果再进行一次 `commit -m 'a的第二次提交（修正第一次）'` 则显得冗余  
可以使用 `commit --amend -m 'a的第一次提交'` 来修正第一次提交，查看日志时只会显示一条提交记录

## 5 版本建设中的分支管理

### 为什么要进行分支管理

- 开发分支上修改，之后合并到产品分支上  
 ![image](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/PixPin_2025-02-16_13-10-52.png)

### 操作

![image](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/PixPin_2025-02-16_13-11-16.png)

| 命令                              | 作用                                                       | 适用场景         |
| --------------------------------- | ---------------------------------------------------------- | ---------------- |
| `git init -b dev`                 | 仅在**新建仓库**时生效                                     | 仓库还未初始化   |
| `git checkout -b dev`             | 创建 `dev` 分支并切换过去                                  | 仓库已存在       |
| `git switch -c dev`               | 创建 `dev` 分支并切换过去（新语法）                        | 仓库已存在       |
| `git checkout dev`                | 切换到 `dev` 分支（已存在时）                              | `dev` 分支已存在 |
| `git switch dev`                  | 切换到 `dev` 分支（已存在时，推荐）                        | `dev` 分支已存在 |
| `git branch -D <dev>`             | 强制删除 `dev` 分支（不管是否合并）-d 是删除已合并过的分支 | `dev` 分支已存在 |
| `git branch -m <原名称> <新名称>` | 重命名分支                                                 | --               |
| `git merge <被合并分支名称>`      | 合并分支                                                   | 合并到当前分支   |
| `git branch`                      | 查看版本库有哪些分支                                       | --               |
| `git push origin <dev>`           | 将 dev 分支推送给远程                                      | --               |
| `git push origin -d <dev>`        | 删除远程仓库的 dev 分支                                    | --               |

- 更改 github 上的默认分支：setting->Branches->Default branch->更改

## 6 从版本库中恢复文件

- vscode 中的 gitlens 插件已经图形化实现了 bash 命令

## 7 gitignore

 1. 在项目根目录创建 .gitignore 文件
 2. 把想忽略的目录直接添加即可

### 模式匹配

1. 空行不匹配任何文
2. `#` 用于注释， `\` 表示转义，实体\要加 `"\"`
3. `*` 可以匹配任何字符 0 或多次， `?` 可以匹配任何字符 1 次，但是都不可以匹配 `/`
4. `/` 用于分隔目录：
	- 当 `/` 在开头时，表示从 .gitignore 文件所在目录开始匹配，否则所有下级同名文件都将匹配。
	- 当 `/` 在末尾时，只匹配目录，否则匹配同名的所有文件和目录
5. 原先被排除的文件，使用 `!` 模式后该文件将会重新被包含，但如果该文件的父级目录被拍出来，那么使用 `!` 也不会被再次包含。
6. `[]` 匹配字符列表, 如 `a[mn]z` 可以匹配 `amz` 和 `anz`
7. `**` 用于匹配多级目录，如 `a/**/b` 可以匹配 `a/b` , `a/x/b` , `a/x/y/b` 

**示例：**
1. 忽略所有内容
2. 忽略所有目录
3. 忽略 pulic 目录下的所有文件除了 `favicom.ico` 文件
4. 只保留 public 目录下的 a{一个字符}z.{后缀名}的所有文件

```.gitignore
*                           # 1
*/                          # 2
public/                     # 3 错误写法，参考第五点
!pulic/favicon.ico          # 3 错误写法
public/*                    # 3 正确写法
!pulic/favicon.ico          # 3 正确写法
/*
!/public/
/pulic/*
!/public/a?z.*
```

查看某个文件或文件夹是否被忽略：  
`git check-ignore -v 目标文件名`

PS-1：.gitignore 只能忽略哪些没有被追踪的文件，所以先纳入版本管理后写入 .gitignore 是无效的  
EG：假设项目结构如下

```arduino
project/
├── .gitignore
├── config.json
├── data/
│   ├── secret.txt
│   ├── public_info.txt

```

已经执行了

```bash
git add config.json data/secret.txt
git commit -m "Add config and secret files"
```

然后在 .gitignore 中添加:

```arduino
config.json
data/secret.txt
```

**此时不起作用**

PS-2：已被.gitignore 忽略的文件无法再添加到版本库中

## 8 git 日志

![image](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/PixPin_2025-02-16_13-13-11.png)

## 9 github 标签管理

- 为什么打标签：当开发到了一个阶段，为了凸显这次提交比较重要，可以为其打上标签。例如发布节点 (v1.0, v2.0)

### 打标签

![image](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/PixPin_2025-02-16_13-13-40.png)
1. `git log --oneline` 查看 head 指向哪一次提交
2. `git tag <标签名称> <提交id>` 打上标签 `git tag <标签名称> -a -m '注释' <提交id>` 注释标签
3. `git log --oneline` 查看是否成功打上标签

### 推送标签

- 简单使用 `git push` 不会把标签推送到远端
- 如何推送见上

### 版本发行

- 仓库界面中点击 `create a release`
- 按要求操作即可

## github 仓库的 fork 和 pr

- fork 不是 git 操作，而是一个 github 操作，是服务端的代码仓库克隆
- fork 后会在自己的 github 仓库创建一个新的仓库，包含了 upstream repository (即原仓库)的所有内容 
- 可以对 fork 得到的仓库自由提交，并通过 PR (pull request) 贡献回原仓库 
- 由于 fork 出的新仓库是基于原仓库，但是二者后续开发中大概率不同，所以被称为"分叉"

### 操作步骤

1. fork 目标仓库到自己的仓库
2. clone fork 得到的仓库库到本地，此时已经建立本地仓库和远程仓库的关联
3. 进行修改
4. 同步到远程
5. 提出 PR, 等待原仓库用户审核

## 11 ssh 密钥进行 github 身份验证

1. 创建 ssh 密钥对

```bash
ssh -keygen
```

   密码没必要设置，没用！接着会在用户目录下生成 `.ssh` 文件夹
   
   - id_rsa - **私钥**，
   - id_rsa.pub - **公钥**

2. 将公钥粘贴到 github (settings 中找到 ssh)
3. 测试连接

```bash
ssh -T git@github.com
```

收到 `Hi！...` 证明连接成功



## 💡cheatsheet

| **命令**                              | **作用**                                  |
| ------------------------------------- | ----------------------------------------- |
| `git init`                            | 初始化 Git 仓库（创建 `.git` 目录）       |
| `git clone <仓库URL>`                 | 克隆远程仓库到本地                        |
| `git status`                          | 查看当前仓库状态（文件修改、暂存等）      |
| `git add <文件名>`                    | 添加文件到暂存区（stage）                 |
| `git add .`                           | 添加所有修改的文件到暂存区                |
| `git commit -m "提交信息"`            | 提交暂存区的更改到本地仓库                |
| `git commit --amend -m "新提交信息"`  | 修改上一次提交的信息                      |
| `git log --oneline`                   | 简洁查看提交历史                          |
| `git log --graph --all --decorate`    | 以图形方式显示所有分支的提交历史          |
| `git diff`                            | 查看未暂存的修改内容                      |
| `git diff --staged`                   | 查看已暂存但未提交的修改内容              |
| `git branch`                          | 查看本地分支列表                          |
| `git branch <分支名>`                 | 创建新分支                                |
| `git branch -d <分支名>`              | 删除本地分支（已合并）                    |
| `git branch -D <分支名>`              | 强制删除本地分支（未合并）                |
| `git checkout <分支名>`               | 切换到指定分支                            |
| `git checkout -b <分支名>`            | 创建并切换到新分支                        |
| `git switch <分支名>`                 | 切换到指定分支（`checkout` 的新替代方式） |
| `git merge <分支名>`                  | 合并指定分支到当前分支                    |
| `git rebase <分支名>`                 | 变基当前分支到指定分支                    |
| `git cherry-pick <提交ID>`            | 选取某个提交并应用到当前分支              |
| `git remote -v`                       | 查看远程仓库地址                          |
| `git remote add origin <仓库URL>`     | 添加远程仓库                              |
| `git remote remove origin`            | 移除远程仓库                              |
| `git push origin <分支名>`            | 推送本地分支到远程                        |
| `git push -u origin <分支名>`         | 推送分支并建立跟踪关系                    |
| `git push --force`                    | 强制推送（慎用）                          |
| `git pull origin <分支名>`            | 拉取远程仓库最新代码                      |
| `git fetch`                           | 拉取远程更新但不合并                      |
| `git stash`                           | 暂存当前未提交的修改                      |
| `git stash pop`                       | 取出最近的 stash 并删除该记录             |
| `git stash list`                      | 查看 stash 列表                           |
| `git tag`                             | 查看本地标签                              |
| `git tag <标签名>`                    | 创建标签                                  |
| `git tag -d <标签名>`                 | 删除本地标签                              |
| `git push origin --tags`              | 推送所有本地标签到远程                    |
| `git push origin :refs/tags/<标签名>` | 删除远程标签                              |
| `git reset --hard <提交ID>`           | **强制回退到指定提交（慎用）**            |
| `git revert <提交ID>`                 | 生成一个反向提交，撤销指定提交            |

🚀 **只包含许多常用命令**


