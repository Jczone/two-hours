<template>
    <span>
        <el-button @click="$_startLogicFlow">启动绘图区</el-button>
    </span>
</template>

<script>
    export default {
        name: "StartLogicFlow",
        methods:{
            $_startLogicFlow(){
                let href = '/#/MyLogicFlow';
                window.open(href,'_blank');
            }
        }
    }
</script>