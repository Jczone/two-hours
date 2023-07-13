<template>
    <div>
        <el-row>
            <!-- 封面 -->
            <el-col :span="8" style="position: relative; top: 100px">
                <!-- 封面 -->
                <div id="courseCoverImage">
                    <el-image :src="course.coverImg" :fit="coverImgFit" id="courseCoverImageIn">
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline courseCoverImgAlt"></i>
                        </div>
                    </el-image>
                </div>
            </el-col>
            <!-- 标题 -->
            <el-col :span="12" style="position: relative; left: 12%">
                <!-- 标题 -->
                <div id="courseName_Manager">{{ course.courseName }}</div>
                <!-- 创建时间和标签 -->
                <div id="courseCreateTimeAndTags_Manager">
                    <div>
                        <span class="courseCreator">{{ course.username }}</span>
                        <span class="courseCreator">{{ course.formatDateShort }}</span>
                    </div>
                    <span>
                        {{course.isPublicStr}}：
                        <el-tooltip :content="course.isPublicBool?'公开课程':'课程已设置私有'" placement="top">
                            <el-switch disabled v-model="course.isPublicBool"></el-switch>
                        </el-tooltip>
                    </span>
                    <span style="margin-left: 20px">
                        {{course.isStartStr}}：
                         <el-tooltip :content="course.isStartBool?'课程已开启':'课程待审核'" placement="top">
                            <el-switch disabled active-color="#13ce66" v-model="course.isStartBool"></el-switch>
                         </el-tooltip>
                    </span>
                </div>
                <el-divider id="infoDivider"></el-divider>
                <!-- 简介 -->
                <div id="courseDescribes_Manager">
                    <div style="margin-top: 20px">简介：{{ courseDescribes }}</div>
                </div>
                <!-- 退出课程 -->
                <div id="quitCourseButton" @click="quitCourse(course)">退出课程</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "StuCourseTab",
        data(){
            return{
                // 课程信息
                course:{
                    coverImg:'',
                },
                courseDescribes: '',
                // 图像适应
                coverImgFit:'cover',
            }
        },
        mounted() {
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
            quitCourse(courseData){
                // 弹框确认
                this.$confirm('此操作将清除您在课程中全部学习记录并退出课程，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let course = {courseId:courseData.courseId};
                    // 执行删除
                    this.$axios.post("/CourseUser/quitCourse",course).then(resp=>{
                        if(resp.data.flag){
                            // 退出成功，返回UserMainPage
                            this.$router.replace({
                                name:'UserMainPage'
                            })
                        }else{
                            this.$message.error('服务故障，请稍后重试！');
                        }
                    })
                }).catch(() => {
                    // 取消删除
                    this.$message.info('操作取消！');
                });
            },
        }
    }
</script>

<style scoped>
    /**
    * 课程管理区
    */
    /* 封面 */
    ::v-deep #courseCoverImage{
        left: 18%;
        position: relative;
    }
    ::v-deep #courseCoverImageIn{
        height: 300px;
        width: 540px;
        border-radius: 6px; /* 圆角 */
    }
    .courseCoverImgAlt{
        position: absolute;
        left: 45%;
        top: 45%;
        font-size: 1.5em;
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
        left: 38%;
        top: 150px;
        /* 字体样式 */
        font-size: 21px;
        font-family: "微软雅黑";
        font-weight: 400;
        color: #8c939d;
        margin-top: 5px;
    }
    .courseCreator{
        text-align: center;
        margin-left:10px;
        margin-bottom: 5px;
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
    /* 退出课程按钮 */
    #quitCourseButton{
        position: absolute;
        left: 91%;
        top: 600px;
        color: #707070;
        font-size: 16px;
        font-weight: 600;
    }
    #quitCourseButton:hover{
        cursor: pointer;
        color: #252525;
    }

</style>