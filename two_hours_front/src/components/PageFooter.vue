<template>
    <div>
        <!--底部区-->
        <el-footer id="footer">
                <span id="pageInfo">
                    Copyright © 2022 繁星辰工作室 Fan-Xin-Chen Jczone
                </span>
        </el-footer>
    </div>
</template>

<script>
    export default {
        name: "PageFooter"
    }
</script>

<style scoped>
    /*
     * 底栏样式
     */
    /* 底栏布局样式 */
    ::v-deep #footer {
        margin-top: 80px;
        background-color: #212121;
        text-align: center;
        line-height: 50px;
        /* 设置底栏黑色扩张至边框 */
        outline: #212121 solid 15px;
    }
    /* 底栏文字样式-id 选择器 */
    #pageInfo {
        color: #ffffff;
        font-size: 14px;
        opacity: 0.75;
    }
</style>