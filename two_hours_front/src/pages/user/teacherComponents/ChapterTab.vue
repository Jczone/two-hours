<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--按钮-->
            <el-col :span="7">
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-button type="primary" plain @click="uploadChapterActive">发布章节</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <!--搜索表单-->
            <el-col :span="7" :offset="9">
                <search-box @onSubmit="searchChapter"></search-box>
            </el-col>
        </el-row>

        <!--添加资料对话框表单-->
        <el-dialog
                title="编辑章节"
                :visible.sync="fileUploadDialogVisible"
                width="40%">
            <!-- 输入标题-->
            <div class="createChapterInfo">输入标题</div>
            <el-input
                    id="updateCourseInfoEditorTags"
                    type="textarea"
                    v-model="chapterDataEdit.title"
                    maxlength="60"
                    show-word-limit>
            </el-input>
            <div class="createChapterInfo">上传视频</div>
            <!-- 资料上传 -->
            <div style="width: 100%">
                <!-- 上传组件 -->
                <el-upload
                        drag
                        multiple
                        v-if="uploadShow"
                        width="80%"
                        :show-file-list="false"
                        action="/Files/chapterVideoUpload"
                        :on-success="handleFileSuccess"
                        :before-upload="beforeFileUpload">
                    <i class="el-icon-upload" style="margin-top: 15%"></i>
                    <div class="el-upload__text" style="text-align: center">将视频文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">视频大小不超过400MB</div>
                </el-upload>
                <!-- 文件名回显 -->
                <div  v-if="!uploadShow" id="uploadSuccessShowName">
                    <span>文件名：{{uploadFilename}}</span>
                    <i class="el-icon-circle-check" id="uploadSuccessShowIcon"></i>
                </div>
            </div>
            <!-- 上传按钮 -->
            <el-button type="text"
                       style="font-size: 16px;margin-top: 15px"
                       @click="saveEditChapter">
                保存编辑
            </el-button>
        </el-dialog>

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
                    <el-row class="editChapters">
                        <el-col :span="6" :offset="1">
                            <i class="chapterViews el-icon-view"><span style="margin-left: 6px">{{item.views}}</span></i>
                        </el-col>
                        <el-col :span="6">
                            <i class="chapterLikes ali-iconzan3"><span style="margin-left: 6px">{{item.likes}}</span></i>
                        </el-col>
                        <el-col :span="3" :offset="3">
                            <i class="editChapter el-icon-edit" @click="editChapter(item)"></i>
                        </el-col>
                        <el-col :span="3">
                            <i class="deleteChapter el-icon-delete" @click="deleteChapter(item)"></i>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <div v-if="chapterData.length === 0">
                <div style="margin-left: 40vw;margin-top:20vh;color:#aaaaaa">暂无数据</div>
            </div>
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
        name: "ChapterTab",
        components:{
            SearchBox,
        },
        data(){
            return{
                // 搜索表单数据模型
                searchTitle:{
                    title:'',
                },
                // 文件上传对话框
                fileUploadDialogVisible:false,
                // 上传文件显示
                uploadShow:true,
                // 编辑状态激活
                isEditChapter:false,
                // 文件上传成功后显示文件名并隐藏上传组件
                uploadFilename:'',
                // 章节视频编辑数据
                chapterDataEdit: {
                    chapterId:'',
                    chapterUrl:'',
                    title:'',
                },
                // 编辑源数据-用于检查是否有文件修改
                chapterOriginal:'',
                // 章节视频数据
                chapterData:[],
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
                        this.$message.success("操作成功！")
                    }else{
                        this.$message.error("服务故障，请稍后重试！")
                    }
                })
            },
            /* 上传视频 弹出上传框，并提供设置章节名称 */
            uploadChapterActive(){
                // 显示上传框
                this.uploadShow = true;
                // 重置数据
                this.uploadFilename = '';
                this.chapterDataEdit.title = '';
                this.fileUploadDialogVisible = true;
            },
            // 查询章节
            searchChapter(title){
                this.searchTitle.title = title;
                // 执行查询
                this.getChapterByTitle();
                /* 清空查询条件 */
                this.searchTitle.title='';
            },
            // 文件上传成功的钩子-回显并写入数据
            handleFileSuccess(res, file) {
                if(res !== ''){
                    // 组织章节信息
                    this.chapterDataEdit.title = file.name;
                    this.chapterDataEdit.chapterUrl = res;
                    // 关闭上传组件
                    this.uploadShow = false;
                    // 回显文件名
                    this.uploadFilename = file.name;
                }else{
                    this.$message.error("上传失败！");
                }
            },
            // 文件类型和大小检查
            beforeFileUpload(file) {
                const isVideo = file.type.indexOf('video') !== -1;
                const isLt400M = file.size / 1024 / 1024 < 400;
                if (!isVideo) {
                    this.$message.error('仅支持上传视频!');
                }
                if (!isLt400M) {
                    this.$message.error('视频大小不能超过 400MB!');
                }
                return isLt400M && isVideo;
            },
            // 编辑或创建章节
            saveEditChapter(){
                // 整理数据
                if(this.chapterDataEdit.title === ''){
                    this.$message.error("章节名不能为空！");
                    return 0;
                }
                if(this.isEditChapter){ // 编辑状态
                    this.$axios.post("/Chapter/updateChapter",this.chapterDataEdit).then((res)=>{
                        if(res.data.flag){
                            // 刷新数据
                            this.getChapterByTitle();
                            // 关闭对话框
                            this.fileUploadDialogVisible = false;
                            // 判断是否需要清理旧视频
                            if(this.chapterOriginal.chapterUrl !== this.chapterDataEdit.chapterUrl){ // url被更新
                                // 删除旧视频
                                this.$axios.post("/Files/deleteChapterVideo",this.chapterOriginal);
                            }
                        }else{
                            this.$message.error("创建失败，请稍后重试！")
                        }
                    })
                    this.isEditChapter = false;
                }else{ // 新建状态
                    this.$axios.post("/Chapter/createChapter",this.chapterDataEdit).then((res)=>{
                        if(res.data.flag){
                            // 刷新数据
                            this.getChapterByTitle();
                            // 关闭对话框
                            this.fileUploadDialogVisible = false;
                        }else{
                            this.$message.error("创建失败，请稍后重试！")
                        }
                    })
                }
            },
            // 启动视频
            startChapter(chapterId){
                this.$router.push({
                    name:'ChapterView',
                    params:{
                        chapterId:chapterId,
                    }
                })
            },
            // 编辑章节
            editChapter(chapter){
                // 显示上传框
                this.uploadShow = true;
                // 启动编辑状态-对话框提交后请求编辑接口
                this.isEditChapter = true;
                // 重置数据
                this.uploadFilename = '';
                this.chapterOriginal = chapter;
                this.chapterDataEdit.chapterId = chapter.chapterId;
                this.chapterDataEdit.title = chapter.title;
                this.chapterDataEdit.chapterUrl = chapter.chapterUrl;
                this.fileUploadDialogVisible = true;
            },
            // 删除章节
            deleteChapter(chapter){
                // 弹框确认
                this.$confirm('此操作将删除该章节, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post("/Chapter/deleteChapter",chapter).then((res)=>{
                        if(res.data.flag){
                            // 刷新章节数据
                            this.getChapterByTitle();
                            // 删除源视频
                            this.$axios.post("/Files/deleteChapterVideo",chapter);
                        }else{
                            this.$message.error("删除失败，请稍后重试！");
                        }
                    })
                }).catch(() => {
                    // 取消删除
                    this.$message.info('取消删除');
                });
            },
        }
    }
</script>

<style scoped>
    /* 上传框文本 */
    .createChapterInfo{
        font-size: 16px;
        margin-bottom: 10px;
    }
    /* 文件上传框 */
    ::v-deep .el-upload{
        width: 100% !important;
    }
    ::v-deep .el-upload-dragger{
        width: 100% !important;
        height: 300px !important;
    }
    /* 文件上传成功后回显文件名 */
    #uploadSuccessShowName{
        margin-top:16px;
        font-size: 16px;
    }
    #uploadSuccessShowIcon{
        color: #77ee77;
        margin-left: 8px;
    }
    /* 编辑提示 */
    ::v-deep #updateCourseInfoEditorTags{
        font-size: 18px;
        color: #000000;
        height: 50px;
        margin-bottom: 30px;
    }
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
     /* 编辑区 */
    .editChapters{
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
    /* 编辑按钮 */
    .editChapter{
        font-size: 19px;
    }
    /* 删除按钮 */
    .deleteChapter{
        font-size: 19px;
    }
    /* 编辑按钮 */
    .editChapter:hover{
        cursor: pointer;
        color: rgba(64, 241, 64, 0.87);
    }
    /* 删除按钮 */
    .deleteChapter:hover{
        cursor: pointer;
        color: rgba(249, 86, 86, 0.87);
    }
</style>