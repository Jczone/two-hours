<template>
    <div>
        <el-container>
            <!-- 顶栏 -->
            <el-header id="topNavigationBar">
                <!-- 顶部导航栏 -->
                <el-menu
                        :default-active="topActiveIndex"
                        mode="horizontal"
                        @select="topNavigationBarSelect"
                        background-color="#4858c9"
                        text-color="#ffffff">
                    <!--引导列/品牌名-->
                    <el-menu-item index="0">
                        <span class="topNavigationBarText"><white-logo></white-logo></span>
                    </el-menu-item>
                    <!--列二/用户-->
                    <el-submenu index="1" class="topElMenuItems">
                        <template slot="title">
                        <span class="topNavigationBarText">
                             <user-avatar :src="user.userAvatar"/> <!-- 用户头像 -->
                            {{user.username}}
                        </span>
                        </template>
                        <el-menu-item index="2"><span class="topNavigationBarText subText">我的课程</span></el-menu-item>
                        <el-menu-item index="3"><span class="topNavigationBarText subText">退出登录</span></el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
            <!-- 主空间 -->
            <el-main>
                <el-row>
                    <!-- 侧边导航栏 -->
                    <el-col :span="3" id="sideNavigationBar">

                        <!-- 课程信息小卡片-->
                        <div @click="editCourseInfo" id="courseInfoTag">
                            <!-- 封面 -->
                            <div style="text-align: center">
                                <el-image id="courseInfoCoverImg" :src="course.coverImg" :fit="coverImgFit">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline courseCoverImgAlt"></i>
                                    </div>
                                </el-image>
                            </div>
                            <!-- 标题 -->
                            <div id="courseInfoTagName">{{ course.courseName }}</div>
                            <!-- 创建时间和标签 -->
                            <div id="courseCreateTimeAndTags">
                                <span>{{ course.formatDateShort }}</span>
                                <el-tag class="courseTag" type="success" v-if="course.isPublic==1">公开</el-tag>
                                <el-tag class="courseTag" type="info" v-if="course.isPublic==0 ">私有</el-tag>
                                <el-tag class="courseTag" type="success" v-if="course.isStart==1">开启</el-tag>
                                <el-tag class="courseTag" type="warning" v-if="course.isStart==0 ">关闭</el-tag>
                            </div>
                        </div>
                        <!-- 导航栏菜单 -->
                        <el-menu
                                :default-active="sideActiveIndex"
                                id="sideNavigationBarMenu"
                                @select="sideNavigationBarSelect">
                            <el-menu-item index="1" class="sideElMenuItem">
                            <span class="sideElMenuItemContent">
                                <i class="el-icon-reading"></i><span>章节</span>
                            </span>
                            </el-menu-item>

                            <el-divider></el-divider>   <!-- 分割线-->

                            <el-menu-item index="2" class="sideElMenuItem">
                            <span class="sideElMenuItemContent">
                                <i class="el-icon-bell"></i><span>通知</span>
                            </span>
                            </el-menu-item>

                            <el-menu-item index="3" class="sideElMenuItem">
                            <span class="sideElMenuItemContent">
                                <i class="el-icon-menu"></i><span>课件</span>
                            </span>
                            </el-menu-item>

                            <el-menu-item index="4" class="sideElMenuItem">
                            <span class="sideElMenuItemContent">
                                <i class="el-icon-s-grid"></i><span>讨论</span>
                            </span>
                            </el-menu-item>

                            <el-menu-item index="6" class="sideElMenuItem">
                            <span class="sideElMenuItemContent">
                                <i class="el-icon-document"></i><span>实验</span>
                            </span>
                            </el-menu-item>

                            <el-menu-item index="7" class="sideElMenuItem">
                            <span class="sideElMenuItemContent">
                                <i class="el-icon-edit-outline"></i><span>考试</span>
                            </span>
                            </el-menu-item>

                            <el-divider></el-divider>   <!-- 分割线-->

                            <el-menu-item index="8" class="sideElMenuItem">
                            <span class="sideElMenuItemContent">
                                <i class="el-icon-setting"></i><span>设置</span>
                            </span>
                            </el-menu-item>
                        </el-menu>

                    </el-col>
                    <!-- 内容显示区 -->
                    <el-col  :span="21">
                        <div style="overflow-x: hidden;min-height: 710px">
                            <!-- 标签标题 -->
                            <el-page-header @back="goBack" title="返回" :content="tabName" id="pageHeader"></el-page-header>
                            <!-- 分割线 -->
                            <el-divider></el-divider>
                            <!-- 标签页区 -->
                            <router-view @refresh="refreshCourseInfo"></router-view>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
            <!-- 底部区 -->
            <page-footer></page-footer>
        </el-container>
    </div>
</template>

<script>
    import UserAvatar from "@/components/UserAvatar";
    import WhiteLogo from "@/components/WhiteLogo";
    import PageFooter from "@/components/PageFooter";
    export default {
        name: "LearningPage",
        components:{
            UserAvatar,
            WhiteLogo,
            PageFooter,
        },
        // 数据模型
        data(){
            return {
                user:{
                    username:'',
                    userAvatar:'',
                },
                // 课程信息
                course:{
                    coverImg:'',
                },
                // 顶部导航栏激活项
                topActiveIndex:'',
                // 激活的导航栏项
                sideActiveIndex:'',
                // 头像大小
                size:'large',
                // 图像适应
                coverImgFit:'cover',
                // 选中选项卡的序号
                tabName:'',
            }
        },
        // 启动方法
        created(){
            this.openLoading();
            this.getUser();
            this.getCourse();
            // 默认打开章节
            this.sideNavigationBarSelect('1');
        },
        // 方法模型
        methods: {
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
            // 返回主页
            goBack(){
                this.$router.go(-1);
            },
            // 获取用户数据
            getUser(){
                this.$axios.get("/Users/isUserLogin").then((res)=>{
                    if(res.data.flag){
                        // 保存用户数据
                        this.user.username = res.data.data.username;
                        this.user.userAvatar = res.data.data.userAvatar;
                    }else{
                        this.$router.replace({
                            name:'Login'
                        })
                    }
                });
            },
            // 获取课程信息
            getCourse(){
                this.$axios.get("/CourseView/getCourseInfo").then((res)=>{
                    if(res.data.flag){
                        // 保存用户数据
                        this.course = res.data.data;
                    }else{
                        // 服务故障
                        this.$message.error("数据拉取失败！");
                        this.$router.replace({
                            name:'UserMainPage'
                        })
                    }
                });
            },
            // 顶部导航栏激活事件
            topNavigationBarSelect(key){
                this.topActiveIndex = key;
                switch (key) {
                    case '0': // logo
                        this.$router.push({
                            name:'MainPage'
                        })
                        return ;
                    case '2': // 返回我的课程
                        this.$router.replace({
                            name:'UserMainPage'
                        })
                        return;
                    case '3': // 退出登陆
                        this.$axios.get("/LoginCon/loginOut").then((res)=>{
                            if(res.data.flag){ // session清理
                                this.$router.replace({
                                    name:'Login'
                                })
                            }else{
                                // 服务故障
                                this.$message.error("操作失败！");
                            }
                        });
                        return;
                }
            },
            // 侧边导航栏激活事件
            sideNavigationBarSelect(key){
                this.sideActiveIndex = key;
                switch (key) {
                    case '1': // 章节
                        this.tabName = '章节';
                        this.$router.replace({
                            name:'StuChapterTab'
                        })
                        return;
                    case '2': // 通知
                        this.tabName = '消息';
                        this.$router.replace({
                            name:'StuNoticeTab'
                        })
                        return;
                    case '3': // 资料
                        this.tabName = '资料';
                        this.$router.replace({
                            name:'StuFileTab'
                        })
                        return;
                    case '4': // 讨论
                        this.tabName = '讨论';
                        this.$router.replace({
                            name:'StuDiscussionTab'
                        })
                        return;
                    case '6': // 实验
                        this.tabName = '实验';
                        this.$router.replace({
                            name:'StuExperimentTab'
                        })
                        return;
                    case '7': // 考试
                        this.tabName = '考试';
                        this.$router.replace({
                            name:'StuExamTab'
                        })
                        return;
                    case '8': // 设置
                        this.tabName = '设置';
                        this.$router.replace({
                            name:''
                        })
                        return;
                }
            },
            // 课程管理激活
            editCourseInfo(){
                this.tabName = '欢迎访问学生端';
                this.$router.replace({
                    name:'StuCourseTab',
                })
            },
            // 刷新课程数据-课程管理页更新数据后父页同步
            refreshCourseInfo(){
                this.getCourse();
            },
        }
    }
</script>

<style scoped>
    /*
     * 导航栏样式
     */
    #topNavigationBar{
        /* 粘性定位 */
        position: sticky;
        top: 0;
        z-index:5;  /* 防遮挡 */
        background-color: #4858c9;
        /* 设置底色扩张至边框 */
        outline: #4858c9 solid 8px;
    }
    /* 取消导航栏底框颜色 */
    .el-menu.el-menu--horizontal {
        border-bottom: solid 1px #4858c9;
    }
    /* 取消激活栏下划线 */
    .el-menu--horizontal>.el-menu-item.is-active,
    .el-menu--horizontal>.el-submenu.is-active{
        border-bottom: 2px solid #4858c9;
    }
    /* 导航栏文字样式 */
    .topNavigationBarText {
        font-size: 20px;
        color: #ffffff;
        font-weight: 500;
        font-family: "微软雅黑";
    }
    .subText{
        align-content: center;
    }
    /* 用户标签偏移 */
    .topElMenuItems{
        left: 76%;
        position: relative;
    }
    /*
     * 侧边导航栏-课程信息部分
     */
    #sideNavigationBar{
        min-height: 600px;
        margin-top: 40px;
        position: relative;
        left: -1%;
    }
    /* 课程信息 */
    #courseInfoTag{
        position: relative;
    }
    /* 图片大小 */
    ::v-deep #courseInfoCoverImg{
        width: 223px;
        /* 调制高度 */
        height: 126px;
    }
    /* 标题高亮 */
    #courseInfoTag:hover #courseInfoTagName{
        color: #3a75ff;
    }
    /* 课程名称 */
    #courseInfoTagName{
        font-size: 20px;
        font-family: "等线";
        font-weight: 600;
        /* 边框大小 */
        margin-left: 10px;
        margin-top: 10px;
        text-align: center;
    }
    /* 创建时间 */
    #courseCreateTimeAndTags{
        font-size: 16px;
        font-family: "微软雅黑";
        font-weight: 400;
        color: #8c939d;
        margin-top: 5px;
        left:3%;
        position: relative;
        text-align: center;
    }
    /* 权限标签 */
    .courseTag{
        position: relative;
        left: 3%;
        margin-left: 5px;
    }
    /*
     * 侧边导航栏-主体部分
     */
    #sideNavigationBarMenu {
        margin-top: 50px;
    }
    /* 侧边栏内容项父栏 */
    .sideElMenuItem{
        position: relative;
    }
    /* 鼠标悬浮样式 */
    .sideElMenuItem:hover #sItem1 #sItem2
    #sItem3 #sItem4 #sItem5 #sItem6 {
        background-color: #3987da;
    }
    /* 侧边栏内容项 */
    .sideElMenuItemContent{
        left: 25%;
        position: relative;
        font-size: 18px;
    }
    /* 侧边栏分割线 */
    ::v-deep .el-divider--horizontal {
        margin: 5px;
    }

    /* 返回签 */
    ::v-deep .el-page-header__left:hover{
        color: #3a75ff;
    }
    /* 返回签字体大小 */
    ::v-deep .el-page-header__title {
        font-size: 17px;
        font-weight: 500;
    }
    /* 返回签模型 */
    #pageHeader{
        width: 300px;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }


</style>