---
tags:
  - tools
---
# 基于autohotkey实现方向键的键位映射

**用键位映射解决写代码或文章时右手需要移动到方向键的问题**

## 1 下载并安装autohotkey

没什么可说的，[戳这里](https://www.autohotkey.com/)去官网下载，安装完成后不用管任何提示，直接在桌面右键后点击新建，选择`Autohotkey script`后选择`empty`(路径可以自己选择)

## 2 配置文件

右键生成的后缀为`ahk`的文件，点击`edit script`
随后将以下代码拷贝进去

```
Tab::Return
<!-- 禁用了Tab原来的功能 -->
Tab & k::
   Send, {Down}
Return

Tab & l::
   Send, {Right}
Return

Tab & j::
   Send, {Left}
Return

Tab & i::
   Send, {Up}
Return
```
实现的功能是将上下左右四个方向键映射到Tab + ikjl并禁用了Tab.保存后退出

## 3 生成exe文件

右键ahk文件选择`compile script`，随后会在`ahk`文件所在的目录下生成一个后缀为`exe`的文件.

## 4 启用键位映射

启动exe文件，此时应该已经实现映射功能。为了方便可以将此exe文件设置为开机自启用，同时要注意，Tab键已经被禁用(倘若使用的是我的代码)

## 附录

- 映射到`alt + ikjl`

```
<!-- 不建议禁用alt的原始功能 -->
!k::
   Send, {Down}
Return

!l::
   Send, {Right}
Return

!j::
   Send, {Left}
Return

!i::
   Send, {Up}
Return
```

- 最后的目录形式:
```
├── .ahk                      
├── .exe 
```


