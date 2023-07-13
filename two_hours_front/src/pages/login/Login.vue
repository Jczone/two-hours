<template>
    <div>

        <el-container>
            <!-- 侧边图-->
            <el-aside width="300px">
                <img id="shape" src="imgs/login/shape.png" alt="Logo">
            </el-aside>
            <!-- 主空间 -->
            <el-main id="elMain">
                <!-- logo -->
                <div id="logo">
                    <router-link :to="{name:'MainPage'}"><el-image src="imgs/login/logo.png" id="logoImg" :fit="'scale-down'" alt="Logo"></el-image></router-link>
                </div>
                <!-- info -->
                <div id="info">
                    <!-- 介绍 -->
                    <div class="information">欢迎登录</div>
                    <div class="information">享优质教育资源</div>
                    <div style="visibility: hidden">占行</div>
                    <!-- 详细-->
                    <div class="details">如果您还没有账户，您可以 </div>
                    <!-- 超链接-->
                    <router-link class="register" :to="{name:'Register'}">点我注册</router-link>
                </div>
                <!-- center -->
                <div id="center">
                    <transition name="el-fade-in-linear">
                        <img style="transition:3s" v-show="!show" src="imgs/login/center.png" alt="图片下班了~">
                    </transition>
                </div>
                <!-- form标题 -->
                <div id="form-title"> {{pageTitle[type]}}</div>
                <!-- form表单 -->
                <div id="form">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item> <!-- 账号 长度限制24 自带清除 -->
                            <el-input class="input" v-model="form.id" placeholder="用户ID" maxlength="24" clearable></el-input>
                        </el-form-item>
                        <el-form-item> <!-- 密码 自带显示密码 -->
                            <el-input class="input" v-model="form.psw" placeholder="密码" maxlength="24" clearable show-password></el-input>
                        </el-form-item>
                        <el-form-item> <!-- 验证码 -->
                            <el-input id="verifyCodeBox" class="input" v-model="form.verifyCode" maxlength="4" placeholder="验证码"></el-input>
                        </el-form-item>
                        <el-form-item> <!-- 忘记密码 -->
                            <router-link id="forgotPsw-sy" :to="{name:'ForgetPsw'}">忘记密码？</router-link>
                        </el-form-item>
                        <el-form-item>  <!-- 登陆确认按钮 -->
                            <el-button type="primary" @click="onSubmit" id="confirm"><span id="btLogin">登录</span></el-button>
                        </el-form-item>
                        <el-form-item>  <!-- 版权信息 -->
                            <span id="form-info">Copyright © 2022 Jczone. All rights reserved.</span>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 验证码图片单独定位 -->
                <div id="verifyCode" v-show="verifyCodeShow">
                    <img src="/checkCodeServlet" id="verifyCodeImg" @click="changeVerifyImg" alt="图片下班了~">  <!-- 验证码图片 -->
                </div>

            </el-main>
        </el-container>

    </div>

</template>

<script>
    import SHAEncrypt from "@/components/SHAEncrypt";
    export default {
        name: "Login",
        components:{
            SHAEncrypt,
        },
        data(){
            return{
                // 用户类别-对应pageTitle数组下标
                type: '1',
                pageTitle:["管理员","欢迎登录"],
                // 动画控制器
                show: true,
                // 表单数据模型
                form:{
                    id: '',
                    psw: '',
                    verifyCode:'',
                    type:'',
                },
                verifyCodeShow:false,
            }
        },
        beforeMount() {
            // 获取用户类型
            this.getType();
        },
        mounted() {
            // 刷新验证码
            this.changeVerifyImg();
            this.verifyCodeShow = true;
            this.show = false;
        },
        // 方法模型
        methods: {
            // 从路由参数中获取类型
            getType(){
                this.type = this.$route.query.type;
                // 越界检测
                if(this.type !== '1' && this.type !== '123' )this.type = '1';
                if(this.type === '123')this.type = '0';
            },
            // 切换验证码图片
            changeVerifyImg(){
                document.getElementById("verifyCodeImg").src  = "/checkCodeServlet?"+new Date().getMilliseconds();
            },
            // 提交表单
            onSubmit(){
                // 补充用户信息
                this.form.type = this.type;
                let form =  /^\w{4,24}$/;
                // 验证账号格式
                if(form.test(this.form.id) === false){
                    this.$message.error('账号格式有误哦~');
                    return;
                }
                // 验证密码格式
                if(form.test(this.form.psw) === false){
                    this.$message.error('密码格式有误哦~');
                    return;
                }
                // 验证码格式
                let formCode = /^\w{4}$/;
                if(formCode.test(this.form.verifyCode) === false){
                    this.$message.error('验证码格式有误哦~');
                    return;
                }
                // password加密
                 this.form.psw = SHAEncrypt.methods.sha1(this.form.psw);
                // 发送表单给后端
                this.$axios.post("/LoginCon/login",this.form).then((res)=>{
                    if(res.data.flag){
                        // 登陆成功
                        this.$message.success("登陆成功！");
                        if(this.type === '1') // 用户登录
                        {
                            this.$router.push({
                                name:'UserMainPage',
                            })
                        }
                        else if (this.type === '0')// 管理员登录
                        {
                            this.$router.push({
                                name: 'AdminMainPage',
                            })
                        }
                    }else{
                        this.form.psw = '';
                        // 登录失败
                        this.$message.warning(res.data.msg);
                    }
                    // 切换验证码
                    this.changeVerifyImg();
                });
            },
        }
    }
</script>

<style scoped>
    /* 侧边图 */
    #shape{
        height:97.7vh;
    }
    /*
     * main 元素定位
     */
    #elMain{
        position: relative;
    }
    /* Logo */
    #logo{
        top: 15%;
        left: 1%;
        position: absolute;
    }
    ::v-deep #logoImg{
        width: 240px;
        height: 79px;
    }
    /* info */
    #info{
        /* 位置 */
        top: 35%;
        left: 1%;
        position: absolute;
        /* 窗口大小 */
        width: 18%;
        height: 30%;
    }
    /* 介绍 */
    .information{
        font-family: "微软雅黑";
        font-size: 35px;
        margin-bottom: 8px;
        /* 文字间距 */
        letter-spacing: 3px;
    }
    /* 详细 */
    .details{
        font-family: "微软雅黑";
        font-size: 20px;
        color: #3c3f45;
        margin-bottom: 7px;
        /* 文字间距 */
        letter-spacing: 1px;
    }
    /* 注册超链接*/
    .register{
        text-decoration: none;
        font-size: 18px;
        font-weight: 500;
        color: #3a75ff;
        /* 文字间距 */
        letter-spacing: 1px;
    }
    /* 注册超链接悬浮 */
    .register:hover{
        text-decoration: underline;
        color: #4a95f1;
    }
    /* center */
    #center{
        top: 20%;
        left: 20%;
        position: absolute;
    }
    /*
     * form 表单
     */
    /* 输入框 */
    ::v-deep .el-input__inner {
        font-size: 16px;
        height: 60px;
        border-radius: 8px;
        background-color: #EBF0F6;
    }
    #form-title{
        /* 位置偏移 */
        top: 20%;
        left: 67%;
        position: absolute;
        color: #808892;
        font-size: 20px;
        font-family: "微软雅黑";
        /* 文字间距 */
        letter-spacing: 1px;
    }
    #form{
        /* 位置 */
        top: 27%;
        left: 52%;
        position: absolute;
        /* 窗口大小 */
        width: 30%;
        height: 50%;
    }
    /* 验证码输入 */
    ::v-deep #verifyCodeBox{
        width: 45%;
    }
    /* 忘记密码超链接 */
    #forgotPsw-sy{
        left: 10px;
        position: relative;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        color: #b5b7b4;
        /* 文字间距 */
        letter-spacing: 1px;
    }
    /* 忘记密码悬浮 */
    #forgotPsw-sy:hover{
        text-decoration: underline;
        color: #888a88;
    }
    /* 登录按钮 */
    #confirm{
        height: 55px;
        width: 100%;
        /* 圆角半径 */
        border-radius: 10px;
        background-color: #4460F0;
    }
    /* 登录按钮活动 */
    #confirm:hover{
        background-color: #3024ba;
    }
    /* 登录文字 */
    #btLogin{
        color: #ffffff;
        font-size: 20px;
        font-weight: 500;
        font-family: "微软雅黑";
        /* 文字间距 */
        letter-spacing: 10px;
    }
    /* 验证码单独设置 */
    #verifyCode{
        /* 位置 */
        top: 44.2%;
        left: 69.5%;
        position: absolute;
    }
    /* 验证码 */
    #verifyCodeImg{
        /* 大小 */
        width: 190px;
        height: 75px;
    }
    /* 版权信息*/
    #form-info{
        /* 位置偏移 */
        left: 30px;
        position: relative;
        color: #808892;
        font-size: 14px;
        font-family: "微软雅黑";
        /* 文字间距 */
        letter-spacing: 1px;
    }

</style>