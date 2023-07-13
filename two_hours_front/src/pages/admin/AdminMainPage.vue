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
                    <!--品牌Logo-->
                    <el-menu-item index="0">
                        <span class="topNavigationBarText"><white-logo></white-logo></span>
                    </el-menu-item>
                    <!--列二/用户-->
                    <el-submenu index="1" class="topElMenuItems">
                        <template slot="title"><span style="font-size: 20px">系统管理</span></template>
                        <el-menu-item index="2"><span class="topNavigationBarText subText">退出登录</span></el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>

            <!-- 主空间 -->
            <el-main>
                <el-row>
                    <!-- 侧边导航栏 -->
                    <el-col :span="3" id="sideNavigationBar">
                        <el-menu
                                :default-active="sideActiveIndex"
                                id="sideNavigationBarMenu"
                                @select="sideNavigationBarSelect">
                            <el-menu-item index="1" class="sideElMenuItem">
                                <span class="sideElMenuItemContent">
                                    <i class="el-icon-bell"></i>系统公告
                                </span>
                            </el-menu-item>

                            <el-divider></el-divider>   <!-- 分割线-->

                            <el-menu-item index="2" class="sideElMenuItem">
                                <span class="sideElMenuItemContent">
                                    <i class="el-icon-reading"></i>课程管理
                                </span>
                            </el-menu-item>

                            <el-menu-item index="3" class="sideElMenuItem">
                                <span class="sideElMenuItemContent">
                                    <i class="el-icon-user"></i>用户管理
                                </span>
                            </el-menu-item>

                            <el-menu-item index="4" class="sideElMenuItem">
                                <span class="sideElMenuItemContent">
                                    <i class="el-icon-medal"></i>考试系统
                                </span>
                            </el-menu-item>

                            <el-submenu index="5" class="sideElMenuItem">
                                <template slot="title">
                                    <span class="sideElMenuItemContent">
                                        <i class="el-icon-discover"></i>平台建设
                                    </span>
                                </template>
                                <el-menu-item index="5-1">
                                    <span class="sideElMenuItemChildContent">
                                        <i class="el-icon-house"></i>首页管理
                                    </span>
                                </el-menu-item>
                                <el-menu-item index="5-2">
                                    <span class="sideElMenuItemChildContent">
                                        <i class="el-icon-collection"></i>课程概览
                                    </span>
                                </el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                    <!-- 内容显示区 -->
                    <el-col :span="21">
                        <div style="overflow-x: hidden;min-height: 670px">
                            <!-- 标签标题 -->
                            <div id="tabName">{{tabName}}</div>
                            <!-- 分割线 -->
                            <el-divider></el-divider>
                            <!-- 标签页区 -->
                            <router-view></router-view>
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
    import WhiteLogo from "@/components/WhiteLogo";
    import PageFooter from "@/components/PageFooter";
    export default {
        name: "AdminMainPage",
        components:{
            WhiteLogo,
            PageFooter,
        },
        // 数据模型
        data(){
            return {
                admin:{
                    adminId:'',
                },
                // 顶部导航栏激活项
                topActiveIndex:'',
                // 激活的导航栏项
                sideActiveIndex:'',
                // 选中选项卡的标题
                tabName:'',
            }
        },
        // 启动方法
        created(){
            this.openLoading();
            this.getAdmin();
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
            // 获取管理员数据
            getAdmin(){
                this.$axios.get("/Admin/isAdminLogin").then((res)=>{
                    if(res.data.flag){
                        // 保存用户数据
                        this.admin.adminId = res.data.data.adminId;
                    }else{
                        this.$router.replace({
                            name:'Login'
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
                    case '2': // 退出登陆
                        this.$axios.get("/LoginCon/loginOut").then((res)=>{
                            if(res.data.flag){ // session清理
                                this.$router.replace({
                                    name:'Login',
                                    query:{
                                        type:123
                                    }
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
                    case '1': // 系统公告
                        this.tabName = '系统公告';
                        this.$router.push({
                            name:'AdmNoticeTab'
                        })
                        return;
                    case '2': // 课程管理
                        this.tabName = '课程管理';
                        this.$router.push({
                            name:'AdmCourseTab'
                        })
                        return;
                    case '3': // 用户列表
                        this.tabName = '用户列表';
                        this.$router.push({
                            name:'AdmUserManage'
                        })
                        return;
                    case '4': // 考试系统
                        this.tabName = '考试系统';
                        this.$router.push({
                            name:''
                        })
                        return;
                    case '5-1': // 首页管理
                        this.tabName = '首页管理';
                        this.$router.push({
                            name:''
                        })
                        return;
                    case '5-2': // 课程概览
                        this.tabName = '课程概览';
                        this.$router.push({
                            name:''
                        })
                        return;
                }
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
        left: 77%;
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
    /* 导航栏主体 */
    #sideNavigationBarMenu {
        margin-top: 40px;
    }
    ::v-deep .el-divider--horizontal {
        margin: 10px 0;
    }
    /* 侧边栏内容项父栏 */
    .sideElMenuItem{
        position: relative;
    }
    /* 侧边栏内容项 */
    .sideElMenuItemContent{
        left: 20%;
        position: relative;
        font-size: 18px;
    }
    .sideElMenuItemChildContent{
        left: 22%;
        position: relative;
        font-size: 17px;
    }
    /* 标签页标题 */
    #tabName{
        font-size: 25px;
        margin-left: 10px;
        margin-top: 5px;
        margin-bottom: 15px;
    }

</style>