<template>
    <div>
        <el-row>
            <!-- 封面 -->
            <el-col :span="8" style="position: relative; margin-top: 100px">
                <!-- 封面上传 -->
                <el-upload
                        id="courseCoverUploader"
                        action="/Files/courseCoverUpload"
                        :show-file-list="false"
                        :on-success="handleCourseCoverSuccess"
                        :before-upload="beforeAvatarUpload">
                    <!-- 此处设置有默认封面 -->
                    <el-image v-if="CoverImageUrl" :src="CoverImageUrl" :fit="coverImgFit" id="courseCoverImage"></el-image>
                    <i class="el-icon-plus uploader-icons">上传封面</i>
                </el-upload>
            </el-col>
            <!-- 标题 -->
            <el-col :span="12" style="position: relative; left: 12%">
                <!-- 标题 -->
                <div id="courseName_Manager">{{ course.courseName }}</div>
                <!-- 创建时间和标签 -->
                <div id="courseCreateTimeAndTags_Manager">
                    <div style="text-align: center;margin-bottom: 5px">创建时间：{{ course.formatDateShort }}</div>
                    <span>
                        {{course.isPublicStr}}：
                        <el-tooltip :content="course.isPublicBool?'公开课程任何人都能加入':'私有课程任何人都无法加入'" placement="top">
                            <el-switch v-model="course.isPublicBool" @change="updateCourseState"></el-switch>
                        </el-tooltip>
                    </span>
                    <span style="margin-left: 20px">
                        {{course.isStartStr}}：
                         <el-tooltip :content="course.isStartBool?'课程已开启':'请等待管理员审核'" placement="top">
                            <el-switch disabled active-color="#13ce66" v-model="course.isStartBool"></el-switch>
                         </el-tooltip>
                    </span>
                </div>
                <el-divider id="infoDivider"></el-divider>
                <!-- 简介 -->
                <div id="courseDescribes_Manager">
                    <div style="margin-top: 20px">简介：{{ courseDescribes }}</div>
                </div>
                <!-- 编辑按钮 -->
                <div id="editCourseInfoButton">
                    <el-button type="text" style="font-size: 16px" @click="updateCourseInfo(courseDescribes)">编辑简介</el-button>
                </div>
            </el-col>
        </el-row>
        <!-- 编辑区 -->
        <el-dialog
                title="编辑简介"
                :visible.sync="updateCourseInfoEditorShow"
                width="50%"
                id="updateCourseInfoEditor">
            <el-input
                    id="updateCourseInfoEditorTags"
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="updateCourseInfoEditorContent"
                    maxlength="240"
                    show-word-limit>
            </el-input>
            <el-button type="text"
                       style="font-size: 16px;margin-top: 15px"
                       @click="saveCourseInfo">
                保存编辑
            </el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "courseTab",
        data(){
            return{
                // 课程信息
                course:{
                    coverImg:'',
                },
                courseDescribes: '',
                // 图像适应
                coverImgFit:'cover',
                // 上传图片路径
                CoverImageUrl:'',
                // 更新课程简介对话框
                updateCourseInfoEditorShow:false,
                updateCourseInfoEditorContent:'',
            }
        },
        created() {
           this.getCourse();
        },
        methods:{
            // 获取课程信息
            getCourse(){
                this.$axios.get("/CourseView/getCourseInfo").then((res)=>{
                    if(res.data.flag){
                        // 保存用户数据
                        this.course = res.data.data;
                        this.courseDescribes = this.course.describes;
                        this.CoverImageUrl = this.course.coverImg;
                    }else{
                        // 服务故障
                        this.$message.error("数据拉取失败！");
                        this.$router.replace({
                            name:'UserMainPage'
                        })
                    }
                });
            },
            // 封面上传成功的钩子-回显并写入数据库
            handleCourseCoverSuccess(res, file) {
                // this.CoverImageUrl = URL.createObjectURL(file.raw);
                // 删除旧图 todo :由于异步导致的无法及时判断数据库写入状态，故默认成功，但不排除可能失败
                this.$axios.post("/Files/deleteCourseCoverImg",this.course);
                // 写入图片路径
                this.course.coverImg = res;
                // 更新课程数据
                this.updateCourse();
            },
            // 更新课程数据
            updateCourse(){
                this.$axios.post("/Course/updateInfo",this.course).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                        this.$message.success(res.data.msg);
                        // 子组件更新后父组件数据刷新
                        this.$emit("refresh");
                        this.getCourse();
                    }else{
                        // 服务故障
                        this.$message.error(res.data.msg);
                    }
                });
            },
            // 上传图片之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            beforeAvatarUpload(file) {
                const isJPG = file.type === ('image/jpeg');
                const isPNG = file.type === ('image/png');

                const isLt40M = file.size / 1024 / 1024 < 40;
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt40M) {
                    this.$message.error('上传头像图片大小不能超过 40MB!');
                }
                return isJPG||isPNG && isLt40M;
            },
            // 课程状态修改
            updateCourseState(){
                // 更新状态
                this.course.isPublic = this.course.isPublicBool ? 1:0;
                this.updateCourse();
            },
            // 编辑课程简介
            updateCourseInfo(courseDescribes){
                this.updateCourseInfoEditorShow = true;
                this.updateCourseInfoEditorContent = courseDescribes;
            },
            // 保存编辑
            saveCourseInfo(){
                // 数据绑定
                this.course.describes = this.updateCourseInfoEditorContent;
                // 保存到数据库
                this.$axios.post("/Course/updateInfo",this.course).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                        this.$message.success(res.data.msg);
                        // 刷新课程数据
                        this.getCourse();
                        // 关闭编辑窗口
                        this.updateCourseInfoEditorShow=false;
                    }else{
                        // 服务故障-回滚数据
                        this.course.describes = this.courseDescribes;
                        this.$message.error(res.data.msg);
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    /**
    * 课程管理区
    */
    /* 封面修改 */
    #courseCoverUploader{
        border: 1px dashed #a7a7a7;
        border-radius: 6px; /* 圆角 */
        cursor: pointer;    /* 鼠标样式 */
        left: 18%;
        position: relative;
        overflow: hidden;   /* 隐藏滚动 */
        height: 300px;
    }
    /* 封面图 */
    ::v-deep #courseCoverImage{
        width: 540px;
        height: 300px;
    }
    /* 边框高亮显示 */
    #courseCoverUploader:hover {
        border-color: #409EFF;
    }
    /* 上传文字 */
    .uploader-icons {
        font-size: 20px;
        font-family: "微软雅黑";
        color: #dfe1e1;
        /* 定位 */
        top: 45%;
        left: 40%;
        position: absolute;
        z-index: 5;
    }
    /* 课程名称 */
    #courseName_Manager{
        /* 定位 */
        position: absolute;
        top: 100px;
        left: 40%;
        /* 字体样式 */
        font-size: 30px;
        font-family: "等线";
        font-weight: 600;
        /* 边框大小 */
        margin-left: 10px;
        margin-top: 10px;
        text-align: center;
    }
    /* 创建时间 */
    #courseCreateTimeAndTags_Manager{
        /* 定位 */
        position: absolute;
        left: 34%;
        top: 150px;
        /* 字体样式 */
        font-size: 21px;
        font-family: "微软雅黑";
        font-weight: 400;
        color: #8c939d;
        margin-top: 5px;
    }
    /* 分界线 */
    #infoDivider{
        left: -5%;
        width:110%;
        position: absolute;
        top: 225px;
    }
    /* 简介 */
    #courseDescribes_Manager{
        /* 定位 */
        position: absolute;
        left: 5%;
        top: 230px;
        /* 字体样式 */
        font-size: 25px;
        font-family: "微软雅黑";
        font-weight: 400;
        color: #000000;
        /* 形式 */
        text-align: left;
        text-indent: 2em;
    }
    /* 简介编辑按钮 */
    #editCourseInfoButton{
        position: absolute;
        left: 91%;
        top: 600px;
    }
    /* 编辑简介对话框 */
    #updateCourseInfoEditor{
        /*margin-top: 150px;*/
    }
    /* 编辑提示 */
    ::v-deep #updateCourseInfoEditorTags{
        font-size: 18px;
        color: #000000;
        height: 200px;
    }
</style>