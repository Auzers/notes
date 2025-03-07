---
hide:
#   - navigation # 显示右
#   - toc #显示左
  - footer
  - feedback
comments: false
home: false
nostatistics: true
icon: material/home
---


<center><font class="custom-font ml3">梅啮寒岁 舟逆湍川</font></center>
<script src="https://cdn.statically.io/libs/animejs/2.0.2/anime.min.js"></script>
<style>
    .custom-font {
    font-size: 38px; /* 默认字体大小为8px */
    color: #757575;
}
@media (max-width: 768px) { /* 假设768px及以下为移动端 */
    .custom-font {
        font-size: 32px; /* 移动端字体大小为6px */
    }
}
</style>

<div class="grid cards" markdown>

-   :material-notebook-edit-outline:{ .lg .middle } 

    ---
    ![image](https://cdn.jsdelivr.net/gh/Auzers/drawingbed/school-work-851328_1920-modified.jpg){: style="display: block; margin: 0 auto; width: 600px; height: 350px; border-radius: 25px;" }

    <!-- - [x] 搜索{~~~>关键词~~}查询文章
    - [x] 如遇页面卡顿，请使用{--科学上网--} -->
    

</div>
<style>
    @media only screen and (max-width: 768px) {
        .responsive-image {
            display: none;
        }
    }
</style>


***  


<div class="grid cards" markdown>

-   :octicons-bookmark-16:{ .lg .middle } __推荐的文章__

    ---

    - [C++速成](computer/C++/ac_cpp.md)
    - [基于autohotkey实现的极简键位映射](tools/autohotkey/auto.md)
    - [git整理](tools/git/git.md)
    - [CS61A笔记](computer/CS61A/CS61A_notes.md) 
    
-   :simple-materialformkdocs:{ .lg .middle } __Else__

    ---
    - 本站内容（除特别声明外）采用[**署名-非商业性使用-保持一致 4.0 国际 (CC BY-NC-SA 4.0)**](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议进行许可。
    - 如加载失败或速度缓慢，请{--使用魔法--}
    - 样式参考
        - [Wcowin](https://github.com/Wcowin/Wcowin.github.io)
        - [TonyCrane](https://github.com/TonyCrane/note/)


<!-- -   :material-format-font:{ .lg .middle } __好用/好玩__

    ---

    
    - [好用/好玩网站分享](blog/Webplay.md)
    - [Mac/windows软件网站汇总](blog/macsoft.md)
    - [重庆旅游推荐路线](trip/InCQ/CQ.md)
    
-   :simple-aboutdotme:{ .lg .middle } __关于__

    ---

    - [留言板](waline.md)[^Knowing-that-loving-you-has-no-ending] 
    - [Blogger](blog/index.md)  
    - [:octicons-arrow-right-24: 了解我](about/geren.md)[^see-how-much-I-love-you] -->

</div>


<!-- [^Knowing-that-loving-you-has-no-ending]:太阳总是能温暖向日葵  
[^see-how-much-I-love-you]:All-problems-in-computer-science-can-be-solved-by-another-level-of-indirection -->




发邮件(1) 微信(2)
{ .annotate }

1. :material-email: lingbie2082@gmail.com || 1058564630@qq.com
2. 右下角微信图标，微信号：w1058564630 (防止图床崩了)



<style>
.md-grid {
  max-width: 1220px;
}
</style>




<style>
body {
  position: relative; /* 确保 body 元素的 position 属性为非静态值 */
}

body::before {
  --size: 35px; /* 调整网格单元大小 */
  --line: color-mix(in hsl, canvasText, transparent 80%); /* 调整线条透明度 */
  content: '';
  height: 100vh;
  width: 100%;
  position: absolute; /* 修改为 absolute 以使其随页面滚动 */
  background: linear-gradient(
        90deg,
        var(--line) 1px,
        transparent 1px var(--size)
      )
      50% 50% / var(--size) var(--size),
    linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50% /
      var(--size) var(--size);
  -webkit-mask: linear-gradient(-20deg, transparent 50%, white);
          mask: linear-gradient(-20deg, transparent 50%, white);
  top: 0;
  transform-style: flat;
  pointer-events: none;
  z-index: -1;
}

@media (max-width: 768px) {
  body::before {
    display: none; /* 在手机端隐藏网格效果 */
  }
}
</style>

