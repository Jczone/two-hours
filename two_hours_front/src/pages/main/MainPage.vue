<template>
    <div>
        <!--页面布局-->
        <el-container>
            <!--顶栏容器-->
            <el-header id="elDaoHang">
                <!--导航栏-->
                <el-menu
                        :default-active="activeIndex"
                        mode="horizontal"
                        @select="handleSelect">
                    <!--偏移条-->
                    <el-menu-item style="visibility:hidden"><span id="dhOffset1"></span></el-menu-item>
                    <!--引导列/Logo-->
                    <el-menu-item index="0">
                        <el-image id="dhTitle" src="imgs/index/logo.png" :fit="'scale-down'" alt="图片加载失败~"></el-image>
                    </el-menu-item>
                    <!--偏移条--><!--通过行内样式设置元素不可见-->
                    <el-menu-item style="visibility:hidden"><span id="dhOffset2"> </span></el-menu-item>
                    <!--列二/教师端登陆-->
                    <el-menu-item index="1"><span id="dhText1" class="dhClaText">登陆平台</span></el-menu-item>
                    <!--列三/学生端登陆-->
                    <el-menu-item index="2"><span id="dhText2" class="dhClaText">最新消息</span></el-menu-item>
                    <!--列四/消息中心-->
                    <el-menu-item index="3"><span id="dhText3" class="dhClaText">课程概览</span></el-menu-item>
                    <!--列五/联系-->
                    <el-submenu index="4">
                        <template slot="title"><span id="dhText4" class="dhClaText">联系我们</span></template>
                        <el-menu-item index="5"><span id="dhTextA" class="dhClaText">QQ</span></el-menu-item>
                        <el-menu-item index="6"><span id="dhTextB" class="dhClaText">微信</span></el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>

            <!--中心一区-->
            <el-main style="position: relative;">
                <!--轮播图-->
                <template>
                    <el-carousel :interval="3000" trigger="hover" height="600px">
                        <el-carousel-item v-for="item in FluteImgs" :key="item.imgId">
                            <!--图片点击和鼠标事件-->
                            <div id="flute" @click="clickImg(item)"
                                 @mouseenter="fluteImgContentShow = true"
                                 @mouseleave="fluteImgContentShow = false">
                                <!--轮播图-->
                                <el-image  id="fluteImg" alt="图片不见了~"
                                           :src="item.imgUrl" :fit="fit"></el-image>
                                <!--动画渐入渐出-->
                                <transition name="el-fade-in-linear">
                                    <div v-show="fluteImgContentShow">
                                        <!--遮罩图-->
                                        <div v-show="fluteImgContentShow" id="slider-overlay"></div>
                                        <!--轮播图内容-->
                                        <span id="fluteImgTitle">{{item.title}}</span>
                                        <p class="fluteImgContent" id="fluteImgSummary">{{item.summary}}</p>
                                        <p class="fluteImgContent" id="fluteImgDetails">{{item.details}}</p>
                                    </div>
                                </transition>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </template>
            </el-main>

            <!--中心二区-->
            <el-main style="margin-top: 40px">
                <div id="Title2">
                    <i class="el-icon-s-management" style="color: #13cded"></i>
                    精品课程</div>
                <el-row>
                    <!-- 卡片 -->
                    <el-col :span="18">
                        <el-row>
                            <el-col :span="6" v-for="item in FluteImgs" :key="item.imgId" :offset="2">
                                <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 40px">
                                    <el-image :src="item.imgUrl" class="cardImage" fit="cover"></el-image>
                                    <div style="padding: 14px">
                                        <div style="font-size: 18px">{{item.title}}</div>
                                        <div class="bottom clearFix"><!--todo 此处的时间待修复 -->
                                            <time class="time">{{ item.formatDate }}</time>
                                            <el-button type="text" class="cardButton">立即加入</el-button>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-col>
                    <!-- 时间线 -->
                    <el-col :span="5" :offset="1">
                        <el-timeline>
                            <el-timeline-item v-for="item in FluteImgs" :key="item.imgId" :timestamp="item.formatDate" placement="top">
                                <el-card :body-style="{ padding: '0px' }" >
                                    <div class="lineTitle">{{item.title}}</div>
                                    <div class="lineSummary">
                                        <i style="color: #e74c3d" class="el-icon-star-on"></i>
                                        {{item.summary}}
                                    </div>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-main>

            <page-footer></page-footer>
        </el-container>
    </div>
</template>

<script>
    import PageFooter from "@/components/PageFooter";
    export default {
        name: "MainPage",
        components: {
            PageFooter
        },
        data(){
            return {
                // 导航栏数据模型
                activeIndex: '',
                // 轮播图数据模型
                FluteImgs:[],
                fit:'cover',
                fluteImgContentShow:true,   // 轮播图动画控制器
            }
        },
        created(){
            // 加载所有轮播图
            this.selectAllRotationImg();
        },
        // 方法模型
        methods: {
            // 预加载所有轮播图
            selectAllRotationImg(){
                /* 请求全部轮播图数据 */
                this.$axios.get("/RotationImgs").then((res)=>{
                    this.FluteImgs = res.data.data;
                });
            },
            // 导航栏事件
            handleSelect(key) {
                let n = Number(key);
                /* 格式检查 */
                if (isNaN(n)) {
                    this.$message.error('账号类型错误，请刷新重试！');
                } else {
                    switch (key) {
                        case '0': // 主页
                            this.$router.push({
                                name:'MainPage',
                            })
                            return;
                        case '1': // 用户
                            this.$router.push({
                                name:'Login',
                                query:{
                                    type:key
                                }
                            })
                            return;
                        case '2': // 信息
                            this.$router.push({
                                name:'SystemNotice',
                            })
                            return;
                        case '3': // 课程概览
                            this.$message.info('模块构建中..');
                            return;
                        case '5': // QQ联系
                            const h = this.$createElement;
                            this.$notify({
                                title: '欢迎联系',
                                dangerouslyUseHTMLString: true,
                                message: '<strong>您可以添加客服QQ：123456789<strong>'
                            });
                            return;
                        case '6': // 微信联系
                            const hs = this.$createElement;
                            this.$notify({
                                title: '欢迎联系',
                                dangerouslyUseHTMLString: true,
                                message: '<strong>您可以添加客服微信：123456789<strong>'
                            });
                            return;
                    }
                }
            },
            // 轮播图点击事件-跳转到对应课程
            clickImg(item){
                // todo 待处理课程信息
                // console.log(item.title);
                // location.href ="Admins/"+item.imgId;
            }
        }
    }
</script>

<style scoped>
    /**
     * 布局样式
     */
    /* 子元素选择器 */
    body > .el-container {
        margin-bottom: 0;
    }
    /*
     * 顶栏悬浮样式控制器
     */
    #elDaoHang{
        /* 粘性定位 */
        position: sticky;
        top: 0;
        z-index:5;  /* 设置堆叠顺序 */
    }
    /* 导航栏文字样式*/
    .dhClaText {
        font-size: 18px;
    }
    /* 导航栏标题样式 */
    ::v-deep #dhTitle{
        width: 208px;
        height: 63px;
        margin-left: 20px;
        margin-bottom: 5px;

    }
    /* 偏移条大小设置 */
    #dhOffset1{
        margin-left: 150px;
    }
    #dhOffset2{
        margin-right: 800px;
    }
    /* 导航栏底框颜色 */
    ::v-deep .el-menu.el-menu--horizontal {
        border-bottom: solid 1px #ffffff;
    }
    ::v-deep.el-menu--horizontal>.el-menu-item.is-active {
        border-bottom: 2px solid #ffffff;
        color: #303133;
    }
    ::v-deep.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
        border-bottom: 2px solid #ffffff;
        color: #303133;
    }
    /*
     * 轮播图样式
     */
    /* 偶数轮播图效果 - 标签选择器 */
    .el-carousel__item:nth-child(2n),.el-carousel__item:nth-child(2n+1){
        background-color: transparent;/* 设置透明色 */
    }
    /* 父标签定位 */
    #flute{
        position: relative;
        height: 100%;
    }
    /* 鼠标指针变换*/
    #flute:hover{
        cursor: pointer;
    }
    /* 轮播图遮罩*/
    #slider-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.60);
    }
    /* 轮播图设置 */
    #fluteImg{
        width: 100%;
        height: 100%;
        opacity: 0.85;
        position: relative;
    }
    /* 轮播图标题*/
    #fluteImgTitle {
        /* 位置设置 */
        left: 0;
        top: 30%;
        width: 100%;
        text-align: center;
        position: absolute;
        /* 样式设置 */
        color: #f4f4f4;
        opacity:1.00;
        font-size: 60px;
        font-family: "微软雅黑";
    }
    /* 轮播图内容*/
    .fluteImgContent {
        /* 位置设置 */
        left: 0;
        width: 100%;
        text-align: center;
        position: absolute;
        /* 样式设置 */
        color: #f4f4f4;
        opacity: 0.95;
        font-family: "黑体";
    }
    /* 轮播图内容简介 */
    #fluteImgSummary{
        top: 40%;
        opacity: 0.85;
        font-size: 23px;
    }
    /* 轮播图内容详情 */
    #fluteImgDetails{
        top: 50%;
        font-size: 30px;
    }

    /* 标题 */
    #Title2{
        margin-left: 6vw;
        margin-bottom: 40px;
        font-size: 30px;
        font-weight: 600;
    }
    /*
     * 小卡片
     */
    .cardImage {
        width: 100%;
        height: 220px;
    }
    .time {
        font-size: 16px;
        color: #999;
    }
    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    /* 清除浮动 */
    .clearFix:before,
    .clearFix:after {
        display: table;
        content: "";
    }
    .clearFix:after {
        clear: both
    }
    .cardButton {
        padding: 0;
        float: right;
    }

    /* 时间线 */
    .lineTitle{
        font-size: 17px;
        font-weight: 600;
        margin: 8px 20px;
    }
    .lineSummary{
        font-size: 15px;
        margin: 8px 20px;
    }

</style>