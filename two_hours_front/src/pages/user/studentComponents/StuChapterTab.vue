<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--搜索表单-->
            <el-col :span="7" :offset="16">
                <search-box @onSubmit="searchChapter"></search-box>
            </el-col>
        </el-row>

        <!-- 主空间 -->
        <el-row>
            <el-col :span="4" v-for="(item,index) in chapterData" :key="index" class="chapterCards">
                <el-card :body-style="{ padding: '0px' }">
                    <div @click="startChapter(item.chapterId)" class="showChapter">
                        <!-- 封面 -->
                        <video class="chapterCoverImg" :src="item.chapterUrl"></video>
                        <!-- 标题 -->
                        <div class="chapterTitle">{{ item.title }}</div>
                    </div>
                    <!-- 控制区 -->
                    <el-row class="chapterInfo">
                        <el-col :span="6" :offset="1">
                            <i class="chapterViews el-icon-view"><span style="margin-left: 6px">{{item.views}}</span></i>
                        </el-col>
                        <el-col :span="6">
                            <i class="chapterLikes ali-iconzan3"><span style="margin-left: 6px">{{item.likes}}</span></i>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    /**
     * 可以上传视频、搜索视频 √
     * 视频资料以卡片形式展示 √
     * 点击卡片，可以启动视频页 √
     * 视频可以被回复、被点赞、（此处可以借用回复功能） √
     */
    import SearchBox from "@/components/SearchBox";
    export default {
        name: "StuChapterTab",
        components:{
            SearchBox,
        },
        data(){
            return{
                // 搜索表单数据模型
                searchTitle:{
                    title:'',
                },
                // 章节视频数据
                chapterData:'',
                // 图片裁切
                coverImgFit:'cover',
            }
        },
        created() {
            this.openLoading();
            // 获取章节数据
            this.getChapterByTitle();
        },
        methods:{
            /* 加载动画 */
            openLoading(){
                let loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255,255,255,0.8)'
                });
                setTimeout(()=>{loading.close();},400)
            },
            // 条件查询章节视频
            getChapterByTitle(){
                this.$axios.post("/Chapter/selectChapterByTitle",this.searchTitle).then((res)=>{
                    if(res.data.flag){
                        // 刷新数据
                        this.chapterData = res.data.data;
                       /* this.$message.success("操作成功！")*/
                    }else{
                        this.$message.error("服务故障，请稍后重试！")
                    }
                })
            },
            // 查询章节
            searchChapter(title){
                this.searchTitle.title=title;
                // 执行查询
                this.getChapterByTitle();
                /* 清空查询条件 */
                this.searchTitle.title='';
            },
            // 启动视频
            startChapter(chapterId){
                this.$router.push({
                    name:'StuChapterView',
                    params:{
                        chapterId:chapterId,
                    }
                })
            },
        }
    }
</script>

<style scoped>
    /**
     * 卡片区
     */
    /* 用于解决总列值超过24导致的排版混乱 */
    ::v-deep .el-row {
        display: flex;
        flex-wrap: wrap;
    }
    /* 鼠标指针 */
    /* 卡片边距-调制参数 */
    .chapterCards{
        margin: 1.6%;
    }
    .showChapter:hover{
        cursor: pointer;
    }
    /* 标题高亮 */
    .showChapter:hover .chapterTitle{
        color: #3a75ff;
    }
    /* 封面大小 */
    .chapterCoverImg{
        width: 100%;
        height: 150px;
        position: relative;
    }
    /* 课程名称 */
    .chapterTitle{
        min-height: 40px;
        line-height: 1.3;
        font-size: 18px;
        font-family: "等线";
        font-weight: 600;
        margin: 8px 16px;
    }
    .chapterInfo{
        margin-top: 9px;
        margin-bottom: 9px;
    }
    /* 浏览量 */
    .chapterViews{
        font-size: 16px;
    }
    /* 喜欢量 */
    .chapterLikes{
        font-size: 16px;
    }


</style>