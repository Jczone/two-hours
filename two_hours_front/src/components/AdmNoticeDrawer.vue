<template>
    <div>
        <el-drawer
                size="50%"
                :visible.sync="noticeDrawer">
            <div id="dBody">
                <!-- 通知标题-->
                <div class="dMedium" id="dNoticeTitle">{{ notice.title}}</div>
                <!-- 通知详情 -->
                <div class="dMedium" id="dNoticeDetails">
                    <span id="dNoticeDetailsHits">点击量：{{ notice.hits }}</span>
                    <span id="dNoticeDetailsDate">{{ notice.formatDate }}</span>
                </div>
                <!-- 通知内容 -->
                <div class="dMedium" id="noticeDrawerContent" v-html="notice.content">
                    <div v-html="notice.content">{{ notice.content }}</div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "AdmNoticeDrawer",
        props: {
            notice:{},
            value:{},
            addHits:{default:true}
        },
        data(){
            return{
                noticeDrawer:false,
            }
        },
        watch:{
            // 监听一次属性变化
            // 外部对value进行一次正负值变化，变化时长一般在500ms，使用setTimeout来避免变化太快导致监测失效
            value: function() {
                if(this.value === true){
                    this.noticeDrawer = true;
                    if(this.addHits === true){
                        this.addHitsFunction();
                    }
                }
            }
        },
        methods:{
            addHitsFunction(){
                setTimeout(()=>{
                    if(this.noticeDrawer === true){
                        // 3秒后增加一次浏览
                        this.$axios.post("/NoticeAdm/addHits",this.notice);
                    }
                },3000);
            }
        }
    }
</script>

<style scoped>
    /*
    * 公告抽屉
    */
    ::v-deep .el-drawer{
        background: #f4f4f7;
    }
    ::v-deep .el-drawer__body {
        overflow: hidden;
        margin-bottom: 25px;
    }
    /* 上边框 */
    ::v-deep .el-drawer__header {
        margin-bottom: 5px;
    }
    .dMedium{
        font-family: "微软雅黑";
        color: #252525;
    }
    #dBody{
        overflow-y: scroll;
        height: 100%;
        margin-left: 36px;
        padding-right: 12px;
    }
    /* 公告标题 */
    #dNoticeTitle{
        /* 居中 */
        text-align: center;
        font-size: 35px;
        width: 90%;
        position: relative;
        left: 5%;
    }
    /* 公告详情 */
    #dNoticeDetails{
        /* 上边距 */
        margin-top: 20px;
        /* 大小和间距 */
        font-size: 18px;
        letter-spacing: 1px;
        /* 暗色调 */
        color: #5c5c5c;
        position: relative;
    }
    #dNoticeDetailsHits{
        position: relative;
        left: 30%;
    }
    #dNoticeDetailsDate{
        position: relative;
        left: 40%;
    }
    /* 抽屉公告内容 */
    #noticeDrawerContent{
        /* 滚动条 */
        height: 660px;
        margin-top: 28px;
        /* 段落 */
        font-size: 20px;
        letter-spacing: 1px;
        line-height: 1.5;   /* 行高 */
    }
</style>