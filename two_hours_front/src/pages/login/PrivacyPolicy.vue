<template>
    <div style="position: relative">
        <div style="width: 998px; position: relative; left: 40%">
            <h1 id="title">等你，在雨中</h1>
            <div class="mainText" >等你，在雨中，在造虹的雨中</div>
            <div class="mainText" >蝉声沉落，蛙声升起</div>
            <div class="mainText" >一池的红莲如红焰，在雨中</div>
            <div class="mainText" >你来不来都一样，竟感觉</div>
            <div class="mainText" >每朵莲都像你</div>
            <div class="mainText" >尤其隔着黄昏，隔着这样的细雨</div>
            <div class="mainText" >永恒，刹那，刹那，永恒</div>
            <div class="mainText" >等你，在时间之外，</div>
            <div class="mainText" >在时间之内，等你，在刹那，在永恒</div>
            <div class="mainText" >如果你的手在我的手里，此刻</div>
            <div class="mainText" >如果你的清芬</div>
            <div class="mainText" >在我的鼻孔，我会说，小情人</div>
            <div class="mainText" >诺，这只手应该采莲，在吴宫</div>
            <div class="mainText" >这只手应该</div>
            <div class="mainText" >摇一柄桂桨，在木兰舟中</div>
            <div class="mainText" >一颗星悬在科学馆的飞檐</div>
            <div class="mainText" >耳坠子一般的悬着</div>
            <div class="mainText" >瑞士表说都七点了。忽然你走来</div>
            <div class="mainText" >步雨后的红莲，翩翩，你走来</div>
            <div class="mainText" >像一首小令</div>
            <div class="mainText" >从一则爱情的典故里你走来</div>
            <div class="mainText" >从姜白石的词里，有韵地，你走来</div>
        </div>
        <!--
            等不到了，我要回家吃饭了
        -->
    </div>
</template>

<script>
    import StartLogicFlow from "@/components/myLogicFlow/StartLogicFlow";
    export default {
        name: "PrivacyPolicy",
        components:{
            StartLogicFlow
        }
    }
</script>

<style scoped>
    #title{
        font-size: 50px;
        text-indent: 50px;  /* 首行缩进 */
        font-family:"华文楷体";
    }
    #author{
        margin-top: 5px;
    }
    .detail{
        font-size: 18px;
        font-family:"华文楷体";
        letter-spacing: 1px;
        line-height: 2;
        text-align: center;
    }
    .mainText{
        font-size: 30px;
        font-family: "华文楷体";
        font-width: 400;
        letter-spacing: 2px;
        line-height: 2.2;
        text-align: left;
    }
</style>