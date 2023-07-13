<template>
    <div>
        <el-container>
            <!-- 顶栏容器 -->
            <el-header id="elDaoHang">
                <!--导航栏-->
                <el-menu
                        id="dhBar"
                        :default-active="activeIndex"
                        mode="horizontal"
                        @select="handleSelect"
                        background-color="#4858c9"
                        text-color="#ffffff">
                    <!--引导列/品牌名-->
                    <el-menu-item index="0">
                        <span class="dhClaText"><white-logo></white-logo></span>
                    </el-menu-item>
                    <!--列一/消息中心-->
                    <el-menu-item index="1" class="items"><span id="dhText3" class="dhClaText">消息中心</span></el-menu-item>
                    <!--列二/用户-->
                    <el-submenu index="2" class="items">
                        <template slot="title">
                                <span id="dhText4" class="dhClaText">
                                    <user-avatar :src="user.userAvatar"/> <!-- 用户头像 -->
                                    {{username}}
                                </span>
                        </template>
                        <el-menu-item index="3"><span id="dhTextA" class="dhClaText subText">修改信息</span></el-menu-item>
                        <el-menu-item index="4"><span id="dhTextB" class="dhClaText subText">退出登录</span></el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>

            <!-- 修改个人信息对话框 -->
            <el-dialog
                    title="修改数据"
                    :visible.sync="updateUserInfoDialogVisible"
                    width="30%">
                <el-form ref="form" :model="user" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="user.username"></el-input>
                    </el-form-item>

                    <el-form-item label="联系方式">
                        <el-input v-model="user.telephone"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>

                    <el-form-item label="密保问题1">
                        <el-input type="textarea" v-model="user.question1"></el-input>
                    </el-form-item>

                    <el-form-item label="答案1">
                        <el-input type="textarea" v-model="user.answer1"></el-input>
                    </el-form-item>

                    <el-form-item label="密保问题2">
                        <el-input type="textarea" v-model="user.question2"></el-input>
                    </el-form-item>

                    <el-form-item label="答案2">
                        <el-input type="textarea" v-model="user.answer2"></el-input>
                    </el-form-item>
                    <!-- 头像上传 -->
                    <el-form-item>
                        <el-upload
                                id="userAvatarUploader"
                                action="/Files/userAvatarUpload"
                                :show-file-list="false"
                                :on-success="handleUserAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <!-- 此处设置有默认封面 -->
                            <el-image id="userAvatar" v-if="userAvatarUrl" :src="userAvatarUrl" :fit="coverImgFit"></el-image>
                            <i class="el-icon-plus" id="userAvatarUploader-icons">上传头像</i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">提交</el-button>
                        <el-button @click="updateUserInfoDialogVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 加入课程对话框 -->
            <el-dialog
                    title="查找课程"
                    :visible.sync="findCourseDialogVisible"
                    style="z-index: 5"
                    width="80%">
                <!-- 课程查找条件 -->
                <el-form ref="form" :inline="true" :model="findCondition" label-width="80px">
                    <!-- 课程名称输入框 -->
                    <el-form-item label="课程名称">
                        <el-input v-model="findCondition.courseName" clearable></el-input>
                    </el-form-item>
                    <!-- 显示私有选择框 -->
                    <el-form-item label="私有课程">
                        <template>
                            <el-select v-model="showPrivate">
                                <el-option
                                        v-for="item in yesOrNo"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <!-- 显示关闭选择框 -->
                    <el-form-item label="关闭课程">
                        <template>
                            <el-select v-model="showClose">
                                <el-option
                                        v-for="item in yesOrNo"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <!-- 提交按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="selectCourseInfo">提交</el-button>
                        <el-button @click="findCourseDialogVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
                <!-- 可加入课程 -->
                <el-row>
                    <el-col :span="5"
                            v-for="(item,index) in findCourses"
                            :key="index"
                            class="CourseCard"
                            style="margin: 2%"
                            v-show="!isJoinThisCourse(item.courseId)
                                && (item.isPublic || showPrivate)
                                && (item.isStart || showClose)">  <!-- 隐藏已加入课程 -->
                        <el-card :body-style="{ padding: '0px' }" class="courseCards">
                            <div @click="addCourseToDB(item)">
                                <!-- 封面 -->
                                <el-image
                                        class="courseCoverImg"
                                        :src="item.coverImg"
                                        :fit="coverImgFit">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline courseCoverImgAlt"></i>
                                    </div>
                                </el-image>
                                <!-- 标题 -->
                                <div class="courseName">{{item.courseName}}</div>
                                <!-- 创建者和创建时间 -->
                                <div class="courseCreatorAndCreateTime">
                                    <span class="courseCreator"> {{ item.username }} </span>
                                    <span class="TimeAndTags">
                                        <span>{{ item.formatDateShort }}</span>
                                        <el-tag class="courseTag" type="success" v-show="item.isPublic==1">公开</el-tag>
                                        <el-tag class="courseTag" type="info" v-show="item.isPublic==0 ">私有</el-tag>
                                        <el-tag class="courseTag" type="success" v-show="item.isStart==1">开启</el-tag>
                                        <el-tag class="courseTag" type="warning" v-show="item.isStart==0 ">关闭</el-tag>
                                    </span>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-dialog>

            <!-- 创建课程 -->
            <el-dialog
                    title="创建课程"
                    :visible.sync="createCourseInfoDialogVisible"
                    width="36%">
                <el-form :model="createCourseInfo" style="position: relative" :rules="rules" ref="createCourseInfo">
                    <el-form-item label="课程名称" style="width: 50%" prop="courseName">
                        <el-input v-model="createCourseInfo.courseName"></el-input>
                    </el-form-item>
                    <el-form-item label="是否公开" prop="isPublic">
                        <el-switch v-model="createCourseInfo.isPublic"></el-switch>
                    </el-form-item>
                    <!-- 封面上传 -->
                    <el-upload
                            id="uploader"
                            action="/Files/courseCoverUpload"
                            :show-file-list="false"
                            :on-success="handleCourseCoverSuccess"
                            :before-upload="beforeAvatarUpload">
                        <!-- 此处设置有默认封面 -->
                        <el-image v-if="CoverImageUrl" :src="CoverImageUrl" fit="scale-down" class="headImage"></el-image>
                        <i class="el-icon-plus uploader-icons">上传封面</i>
                    </el-upload>

                    <!-- 课程介绍textarea -->
                    <el-form-item label="课程介绍" prop="describes">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="createCourseInfo.describes"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="createCourseMethod(createCourseInfo)">立即创建</el-button>
                        <el-button @click="createCourseInfoDialogVisible=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <!-- 公告区 -->
            <el-main>
                <template style="position: relative">
                    <el-carousel :interval="5000" type="card">
                        <el-carousel-item v-for="notice in courseNotice" :key="notice.noticeId" class="noticeController">
                            <div id="noticeCardBody" @click="showNotice(notice)">
                                <!-- 通知标题-->
                                <div class="medium" id="noticeTitle">{{ notice.title }}</div>
                                <!-- 通知详情 -->
                                <div class="medium" id="noticeDetails">
                                    <span id="noticeCreator">发布人：{{ notice.username }}</span>
                                    <span id="noticeHits">点击量：{{ notice.hits }}</span>
                                    <span id="noticeCreateTime">{{ notice.formatDate }}</span>
                                </div>
                                <!-- 通知内容 -->
                                <div class="medium" id="noticeContent" v-html="notice.content">{{ notice.content }}</div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </template>
            </el-main>

            <!-- 公告详情-抽屉 -->
            <notice-drawer v-model="noticeDrawer" :notice="noticeDrawerContent"></notice-drawer>

            <!-- 课程区 -->
            <el-main>
                <!-- 课程标签栏 -->
                <el-tabs type="border-card"  @tab-click="tabController">
                    <!-- 我学的课 -->
                    <el-tab-pane label="我学的课" class="tab-pane">
                        <!-- 添加课程按钮 -->
                        <el-button type="primary" style="margin-left: 40px" @click="addCourse" round>添加课程</el-button>
                        <!-- 学生课程 -->
                        <el-row>
                            <el-col :span="4" v-for="(item,index) in studyCourse" :key="index" class="CourseCard">
                                <el-card :body-style="{ padding: '0px' }" class="courseCards">
                                    <div @click="toUserCourse(item.courseId)">
                                        <!-- 封面 -->
                                        <el-image
                                                class="courseCoverImg"
                                                :src="item.coverImg"
                                                :fit="coverImgFit">
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline courseCoverImgAlt"></i>
                                            </div>
                                        </el-image>
                                        <!-- 标题 -->
                                        <div class="courseName">{{ item.courseName }}</div>
                                        <!-- 创建者和创建时间  -->
                                        <div class="courseCreatorAndCreateTime">
                                            <span class="courseCreator">{{item.username }} </span>
                                            <span class="TimeAndTags">
                                                <span>{{ item.formatDateShort }}</span>
                                                <el-tag class="courseTag" type="success" v-show="item.isPublic==1">公开</el-tag>
                                                <el-tag class="courseTag" type="info" v-show="item.isPublic==0 ">私有</el-tag>
                                                <el-tag class="courseTag" type="success" v-show="item.isStart==1">开启</el-tag>
                                                <el-tag class="courseTag" type="warning" v-show="item.isStart==0 ">关闭</el-tag>
                                            </span>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <!-- 我教的课 -->
                    <el-tab-pane label="我教的课" class="tab-pane">
                        <!-- 创建课程按钮 -->
                        <el-button type="primary" style="margin-left: 40px" @click="createCourse" round>创建课程</el-button>
                        <!-- 教师课程 -->
                        <el-row>
                            <el-col :span="4"
                                    v-for="(item,index) in teachCourse"
                                    :key="index"
                                    class="CourseCard">
                                <el-card :body-style="{ padding: '0px' }" class="courseCards">
                                    <div @click="toCourseManager(item.courseId)">
                                        <!-- 封面 -->
                                        <el-image
                                                class="courseCoverImg"
                                                :src="item.coverImg"
                                                :fit="coverImgFit"
                                                placeholder="图片睡觉了~">
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline courseCoverImgAlt"></i>
                                            </div>
                                        </el-image>
                                        <!-- 标题 -->
                                        <div class="courseName">{{ item.courseName }}</div>
                                        <!-- 创建者和创建时间 -->
                                        <div class="courseCreatorAndCreateTime">
                                            <span class="courseCreator" >{{ item.username }} </span>
                                            <span class="TimeAndTags">
                                                <span>{{ item.formatDateShort }}</span>
                                                <el-tag class="courseTag" type="success" v-show="item.isPublic==1">公开</el-tag>
                                                <el-tag class="courseTag" type="info" v-show="item.isPublic==0 ">私有</el-tag>
                                                <el-tag class="courseTag" type="success" v-show="item.isStart==1">开启</el-tag>
                                                <el-tag class="courseTag" type="warning" v-show="item.isStart==0 ">关闭</el-tag>
                                            </span>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-main>

            <!-- 底部区 -->
            <page-footer></page-footer>
        </el-container>
    </div>
</template>

<script>
    import UserAvatar from "@/components/UserAvatar";
    import WhiteLogo from "@/components/WhiteLogo";
    import NoticeDrawer from "@/components/NoticeDrawer";
    import PageFooter from "@/components/PageFooter";
    import SHAEncrypt from "@/components/SHAEncrypt";
    export default {
        name: "UserMainPage",
        components:{
            UserAvatar,
            WhiteLogo,
            PageFooter,
            NoticeDrawer,
        },
        // 数据模型
        data(){
            return {
                // 导航栏激活索引
                activeIndex: '',
                // 头像大小
                size:'large',
                // 用户信息
                user:'',
                // 用户头像展示
                userAvatarUrl:'',
                // 用户名
                username:'',
                // 课程公告
                courseNotice:'',
                // 公告抽屉
                noticeDrawer:false,
                noticeDrawerContent:'',     // 内容
                // 加入课程的信息
                studyCourse:[],
                // 教授课程的信息
                teachCourse:[],
                // 查找到的课程
                findCourses:[],
                findCoursesUserName:[],
                showPrivate:true,           // 展示私有课程
                showClose:true,             // 展示关闭课程
                yesOrNo: [{
                    value: true,
                    label: '显示'
                }, {
                    value: false,
                    label: '隐藏'
                }],
                // 课程查找条件-课程名称
                findCondition:{
                    courseName:'',
                },
                // 创建课程的信息
                createCourseInfo:{
                    courseName:'',
                    isPublic: 1,
                    coverImg:'',
                    describes:'',
                },
                // 头像路径-默认为封面1
                CoverImageUrl:'',
                // 修改个人信息对话框可见
                updateUserInfoDialogVisible: false,
                // 查找课程对话框可见
                findCourseDialogVisible: false,
                // 创建课程对话框可见
                createCourseInfoDialogVisible:false,
                // 课程封面格式
                coverImgFit:'cover',
                // 表单校验规则
                rules: {
                    courseName: {required: true, message: '请输入课程名称', trigger: 'blur'}
                },
            }
        },
        created(){
            this.openLoading();
            // 获取用户数据
            this.getUser();
            // 获取公告数据
            this.getNotice();
            // 获取我学的课信息
            this.getMyJoinCourse();
            // 获取我教的课信息
            this.getMyTeachCourse();
            // 缓存课程信息
            this.selectCourseInfo();
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
            // 获取用户数据
            getUser(){
                this.$axios.get("/Users/isUserLogin").then((res)=>{
                    if(res.data.flag){
                        // 保存用户数据
                        this.user = res.data.data;
                        this.username = this.user.username;
                    }else{
                        // 服务故障-跳转登陆界面
                        this.$router.push({name:'Login'});
                    }
                });
            },
            // 获取我学的课信息
            getMyJoinCourse(){
                // 获取我学的课
                this.$axios.get("/CourseView/getMyJoinCourse").then((res)=>{
                    if(res.data.flag){// 保存用户数据
                        this.studyCourse = res.data.data;
                        // 防止空指针异常
                        if(this.studyCourse === null)this.studyCourse = [];
                    }else{// 服务故障
                        this.$message.error("课程信息获取失败，请稍后重试！");
                    }
                });
            },
            // 获取我教的课信息
            getMyTeachCourse(){
                // 获取我教的课
                this.$axios.get("/CourseView/getMyTeachCourse").then((res)=>{
                    if(res.data.flag){// 保存用户数据
                        this.teachCourse = res.data.data;
                        // 防止空指针异常
                        if(this.teachCourse === null)this.teachCourse = [];
                    }else{// 服务故障
                        this.$message.error("课程信息获取失败，请稍后重试！");
                    }
                });
            },
            // 获取课程相关公告
            getNotice(){
                this.$axios.get("/Notice/getAll").then((res)=>{
                    if(res.data.flag){
                        // 保存公告数据
                        this.courseNotice = res.data.data;
                        // 防止空指针异常
                        if(this.courseNotice === null)this.courseNotice = [];
                    }else{
                        // 服务故障
                        this.$message.error("公告信息获取失败！");
                    }
                });
            },
            // 导航栏事件
            handleSelect(key){
                this.activeIndex = key;
                switch (key) {
                    case '0': // logo
                        this.$router.push({
                            name:'MainPage'
                        });
                        return;
                    case '1': // 消息中心
                        this.$router.push({
                            name:'NoticePage'
                        });
                        return;
                    case '3': // 修改信息
                        this.userAvatarUrl=this.user.userAvatar;
                        this.updateUserInfoDialogVisible = true;
                        return;
                    case '4': // 退出登陆
                        this.$axios.get("/LoginCon/loginOut").then((res)=>{
                            if(res.data.flag){
                                this.$router.push({
                                    name:'Login'
                                });
                            }else{
                                // 服务故障
                                this.$message.error("操作失败！");
                            }
                        });
                        return;
                }
            },
            // 头像上传成功的钩子-回显到界面
            handleUserAvatarSuccess(res, file) {
                this.userAvatarUrl = URL.createObjectURL(file.raw);
                // 删除旧图 todo :由于异步导致的无法及时判断数据库写入状态，故默认成功，但不排除可能失败
                this.$axios.post("/Files/deleteUserAvatar",this.user );
                // 写入图片路径
                this.user.userAvatar = res;
            },
            // 更新用户信息
            updateUserInfo(){
                this.$axios.post("/Users/updateInfo",this.user).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                        this.$message.success(res.data.msg);
                        this.updateUserInfoDialogVisible = false;
                        this.getUser(); // 更新用户数据
                    }else{
                        // 服务故障
                        this.$message.error(res.data.msg);
                    }
                });
            },
            // 展示公告
            showNotice(notice){
                this.noticeDrawer = true;
                this.noticeDrawerContent = notice;
                // 发送一次请求
                setTimeout(()=>{this.noticeDrawer = false; },500);
            },
            // 跳转到课程界面
            toUserCourse(courseId){
                let course={
                    courseId:courseId
                };
                // 添加课程id到session
                this.$axios.post("/CourseView/addCourseIdToSession", course).then((res)=>{
                    if(res.data.flag){
                       /* // 修改成功
                        this.$message.success("即将为您跳转n_n");*/
                        // 跳转到课程界面
                        this.$router.push({
                            name:'LearningPage'
                        })
                    }else{
                        // 服务故障
                        this.$message.error("服务处理失败，请重新尝试T_T");
                    }
                });
            },
            // 跳转到课程管理界面
            toCourseManager(courseId){
                let course={
                    courseId:courseId
                };
                this.$axios.post("/CourseView/addCourseIdToSession", course).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                       /* this.$message.success("即将为您跳转n_n");*/
                        this.$router.push({
                            name:'Management'
                        })
                    }else{
                        // 服务故障
                        this.$message.error("服务处理失败，请重新尝试T_T");
                    }
                });
            },
            // 标签控制器
            tabController(tab){
                switch (tab.index) {
                    case '0':
                        this.getMyJoinCourse();
                        break;
                    case '1':
                        this.getMyTeachCourse();
                        break;
                }
            },
            // 添加课程-打开课程查找列表
            addCourse(){
                this.selectCourseInfo();
                this.findCondition.courseName = '';
                this.findCourseDialogVisible = true;
                this.showPrivate=true;
                this.showClose=true;
            },
            // 根据条件查找相关课程
            selectCourseInfo(){
                this.$axios.post("/CourseView/selectCourseInfo",this.findCondition).then((res)=>{
                    if(res.data.flag){
                        // 保存用户数据
                        this.findCourses = res.data.data;
                        if(this.findCourses.length === 0){
                            this.$message.warning("未找到相关课程");
                        }
                    }else{
                        // 服务故障
                        this.$message.warning("未找到相关课程");
                    }
                });
            },
            // 判断用户是否已加入该课程
            isJoinThisCourse(courseId){
                let i = 0;
                for(i = 0; i < this.studyCourse.length; i++){
                    if(courseId === this.studyCourse[i].courseId)return true;
                }
                for(i = 0; i < this.teachCourse.length; i++){
                    if(courseId === this.teachCourse[i].courseId)return true;
                }
                return false;
            },
            // 加入课程
            addCourseToDB(course){
                // 弹出确认加入选择框
                this.$confirm('加入该课程?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => { // 确认加入
                    if(!course.isPublic){    // 是否公开
                        this.$message.error("课程未公开！");
                        return false;
                    }
                    else if(!course.isStart){  // 是否开启
                        this.$message.error("课程已关闭！");
                        return false;
                    }
                    else{   // 加入课程
                        let courseUser = {
                            courseId:course.courseId
                        };
                        this.$axios.post("/CourseUser/save",courseUser).then((res)=>{
                            if(res.data.flag){
                                // 修改成功
                                this.$message.success(res.data.msg);
                                // 关闭
                                this.findCourseDialogVisible = false;
                                // 刷新数据
                                this.getMyJoinCourse();
                                // 刷新公告
                                this.getNotice();
                            }else{
                                // 服务故障
                                this.$message.error(res.data.msg);
                            }
                        });
                    }
                });
            },
            // 创建课程
            createCourse(){
                // 重置数据和默认封面
                this.CoverImageUrl='/imgs/course/default.jpg';
                this.createCourseInfo.courseName = '';
                this.createCourseInfo.isPublic = true;
                this.createCourseInfo.coverImg = '';
                this.createCourseInfo.describes = '';
                this.createCourseInfo.createTime = '';
                // 打开对话框
                this.createCourseInfoDialogVisible = true;
            },
            // 封面上传成功的钩子-回显到界面
            handleCourseCoverSuccess(res, file) {
                this.CoverImageUrl = URL.createObjectURL(file.raw);
                // 写入图片路径
                this.createCourseInfo.coverImg = res;
            },
            // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
            beforeAvatarUpload(file) {
                const isJPG = file.type === ('image/jpeg');
                const isPNG = file.type === ('image/png');

                const isLt2M = file.size / 1024 / 1024 < 40;
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 40MB!');
                }
                return isJPG||isPNG && isLt2M;
            },
            // 创建课程-整理提交数据
            createCourseMethod(course) {
                // 整理数据
                if(course.courseName === ''){
                    this.$message.error("课程名不能为空！");
                    return 0;
                }
                // 布尔值转int
                if(course.isPublic === true){
                    course.isPublic = 1;
                }else{
                    course.isPublic = 0;    // bit
                }
                // 发送请求
                this.$axios.post("/Course/save",course).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                        this.$message.success(res.data.msg);
                        // 关闭
                        this.createCourseInfoDialogVisible = false;
                        // 刷新数据
                        this.getMyTeachCourse();
                    }else{
                        // 服务故障
                        this.$message.error(res.data.msg);
                    }
                });
            },
        }
    }
</script>

<style scoped>
    /*
     * 导航栏样式
     */
    #elDaoHang{
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
    .dhClaText {
        font-size: 20px;
        color: #ffffff;
        font-weight: 500;
        font-family: "微软雅黑";
    }
    /* 用户标签偏移 */
    .items{
        left: 70%;
        position: relative;
    }
    .subText{
        align-content: center;
    }
    /*
     * 公告区
     */
    /* 控制公告区背景色 */
    .el-carousel__item:nth-child(2n) {
        background-color: #4f66d3;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #4f66d3;
    }
    /* 通知信息设置 */
    .medium{
        font-family: "微软雅黑";
        color: #ffffff;
        /* 文本换行 */
        /* white-space:pre-wrap;*/
    }
    #noticeCardBody{
        overflow-y: auto;
        width: 102%;
        height: 100%;
    }
    /* 通知标题 */
    #noticeTitle{
        /* 上边距 */
        margin-top: 10px;
        /* 居中 */
        text-align: center;
        font-size: 40px;
    }
    /* 通知详情 */
    #noticeDetails{
        /* 上边距 */
        margin-top: 10px;
        /* 大小和间距 */
        font-size: 18px;
        letter-spacing: 1px;
        /* 暗色调 */
        color: #c2cbd9;
    }
    /* 发布人 */
    #noticeCreator{
        left: 20%;
        position: relative;
    }
    /* 点击量 */
    #noticeHits{
        left: 30%;
        position: relative;
    }
    /* 创建时间 */
    #noticeCreateTime{
        left: 40%;
        position: relative;
    }
    /* 内容 */
    #noticeContent{
        /* 位置 */
        margin-top: 10px;
        padding-left: 27px;
        padding-right: 27px;
        /* 段落 */
        font-size: 20px;
        letter-spacing: 1px;
        /*text-indent: 45px;  !* 首行缩进 *!*/
        line-height: 1.5;   /* 行高 */
    }
    /*
     * 课程卡片显示
     */
    .tab-pane{
        min-height: 500px;
    }
    /* 卡片边距-调制参数 */
    .CourseCard{
        margin: 1.6%;
    }
    /* 用于解决总列值超过24导致的排版混乱 */
    ::v-deep .el-row {
        display: flex;
        flex-wrap: wrap;
    }
    /* 鼠标指针 */
    .CourseCard:hover{
        cursor: pointer;
    }
    /* 图片高度-调制参数 */
    .courseCoverImg{
        width: 100%;
        height: 178px;
        position: relative;
    }
    .courseCards:hover .courseName{
        color: #3a75ff;
    }
    .courseCoverImgAlt{
        position: absolute;
        left: 45%;
        top: 45%;
        font-size: 1.5em;
    }
    /* 课程名称 */
    .courseName{
        font-size: 20px;
        font-family: "等线";
        font-weight: 600;
        margin-left: 10px;
        margin-top: 10px;
    }
    /* 作者和创建时间 */
    .courseCreatorAndCreateTime{
        font-size: 16px;
        font-family: "微软雅黑";
        font-weight: 400;
        margin-top: 4px;
        margin-left: 10px;
        margin-bottom: 9px;
        color: #8c939d;
        position: relative;
    }
    /* 时间和标签绝对位置 */
    .TimeAndTags{
        left: 30%;
        bottom: -7px;
        position: absolute;
    }
    /* 已加入标签 */
    .courseTag{
        left: 3%;
        bottom: 2px;
        position: relative;
        font-family: "微软雅黑";
        font-weight: 400;
        margin-left: 5px;
    }
    /*
     * 创建课程
     */
    /* 头像提交部分 */
    ::v-deep #uploader{
        border: 1px dashed #a7a7a7;
        border-radius: 6px; /* 圆角 */
        cursor: pointer;    /* 鼠标样式 */
        position: relative;
        overflow: hidden;   /* 隐藏滚动 */
        width: 300px;
        height: 168px;
    }
    /* 边框高亮显示 */
    ::v-deep #uploader:hover {
        border-color: #409EFF;
    }
    /* 上传文字 */
    .uploader-icons {
        font-size: 20px;
        font-family: "微软雅黑";
        color: #dfe1e1;
        /* 定位 */
        top: 45%;
        left: 33%;
        position: absolute;
        z-index: 5;
    }
    /*
     * 修改用户信息
     */
    #userAvatarUploader{
        border: 1px dashed #a7a7a7;
        border-radius: 6px; /* 圆角 */
        cursor: pointer;    /* 鼠标样式 */
        position: relative;
        overflow: hidden;   /* 隐藏滚动 */
        width: 168px;
        height: 168px;
    }
    #userAvatarUploader:hover{
        border-color: #409EFF;
    }
    /* 上传头像 */
    ::v-deep #userAvatar{
        width: 168px;
        height: 168px;
    }
    #userAvatarUploader-icons{
        font-size: 18px;
        font-family: "微软雅黑";
        color: #ffffff;
        /* 定位 */
        top: 45%;
        left: 25%;
        position: absolute;
        z-index: 5;
    }

</style>