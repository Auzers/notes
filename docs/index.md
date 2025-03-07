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

-   :octicons-bookmark-16:{ .lg .middle } __Recommend pages__

    ---

    - [C++速成](computer/C++/ac_cpp.md)
    - [基于autohotkey实现的极简键位映射](tools/autohotkey/auto.md)
    - [git整理](tools/git/git.md)
    - [CS61A笔记](computer/CS61A/CS61A_notes.md) 
    
-   :simple-materialformkdocs:{ .lg .middle } __Else__

    ---
    - 本站内容（除特别声明外）采用[**署名-非商业性使用-保持一致 4.0 国际 (CC BY-NC-SA 4.0)**](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议进行许可。
    - 如加载速度慢，请{--使用魔法--}
    - 样式参考
        - [Wcowin](https://github.com/Wcowin/Wcowin.github.io)
        - [TonyCrane](https://github.com/TonyCrane/note/)


<!-- -   :material-format-font:{ .lg .middle } __待填__

    ---

    
    - 
    
-   :simple-aboutdotme:{ .lg .middle } __关于__

    ---

    - 
    -  -->

</div>

<span style="display: block; text-align: center; font-size: 18px;">
[:material-chart-line: Statistics ](javascript:toggle_statistics();) 
[:octicons-link-16: My friends!](./links/index.md)   
</span>

<div id="statistics" markdown="1" class="card" style="width: 27em; border-color: transparent; opacity: 0; margin-left: auto; margin-right: 0; font-size: 110%">
<div style="padding-left: 1em;" markdown="1">
<!-- 页面总数：<span id="page-count"></span><br>
总字数：<span id="word-count"></span><br>
代码块行数：<span id="code-lines"></span><br>  -->
网站运行时间：<span id="web-time"></span>  
<!-- <span id="busuanzi_container_site_uv">访客总人数：<span id="busuanzi_value_site_uv"></span>人   -->
<span id="busuanzi_container_site_pv">总访问次数：<span id="busuanzi_value_site_pv"></span>次
</div>
</div>


<script>
function updateTime() {
    var date = new Date();
    var now = date.getTime();
    var startDate = new Date("2024/12/22 09:10:00");
    var start = startDate.getTime();
    var diff = now - start;
    var y, d, h, m;
    y = Math.floor(diff / (365 * 24 * 3600 * 1000));
    diff -= y * 365 * 24 * 3600 * 1000;
    d = Math.floor(diff / (24 * 3600 * 1000));
    h = Math.floor(diff / (3600 * 1000) % 24);
    m = Math.floor(diff / (60 * 1000) % 60);
    if (y == 0) {
        document.getElementById("web-time").innerHTML = d + "<span class=\"heti-spacing\"> </span>天<span class=\"heti-spacing\"> </span>" + h + "<span class=\"heti-spacing\"> </span>小时<span class=\"heti-spacing\"> </span>" + m + "<span class=\"heti-spacing\"> </span>分钟";
    } else {
        document.getElementById("web-time").innerHTML = y + "<span class=\"heti-spacing\"> </span>年<span class=\"heti-spacing\"> </span>" + d + "<span class=\"heti-spacing\"> </span>天<span class=\"heti-spacing\"> </span>" + h + "<span class=\"heti-spacing\"> </span>小时<span class=\"heti-spacing\"> </span>" + m + "<span class=\"heti-spacing\"> </span>分钟";
    }
    setTimeout(updateTime, 1000 * 60);
}
updateTime();

function toggle_statistics() {
    var statistics = document.getElementById("statistics");
    if (statistics.style.opacity == 0) {
        statistics.style.opacity = 1;
    } else {
        statistics.style.opacity = 0;
    }
}
</script>




邮件(1) 微信(2) 
{ .annotate }

1. :material-email: lingbie2082@gmail.com || 1058564630@qq.com
2. 右下角微信图标 || 微信号: w1058564630




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

