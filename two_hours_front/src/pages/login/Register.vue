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
                    <div class="information">欢迎注册</div>
                    <div class="information">畅享百万资源</div>
                    <div style="visibility: hidden">占行</div>
                    <!-- 详细-->
                    <div class="details">如果您已经拥有账户，您可以 </div>
                    <!-- 超链接-->
                    <router-link class="register" :to="{name:'Login'}" >点我登录</router-link>
                </div>
                <!-- center -->
                <div id="center">
                    <transition name="el-fade-in-linear">
                        <img style="transition:3s" v-show="!show" src="imgs/login/center.png" alt="图片下班了~">
                    </transition>
                </div>
                <!-- form表单 -->
                <div id="form"> <!-- 设置校验及反馈图标 -->
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item> <!-- 账号 长度限制24 自带清除 -->
                            <el-input class="input" v-model="form.id" @blur="idBlur" placeholder="学号或工号用于登录" maxlength="24" autocomplete="off" clearable></el-input>
                        </el-form-item>
                        <el-form-item> <!-- 密码 自带显示密码 -->
                            <el-input class="input" v-model="form.psw" placeholder="密码" maxlength="24" autocomplete="off" clearable show-password></el-input>
                        </el-form-item>
                        <el-form-item> <!-- 确认密码 自带显示密码 -->
                            <el-input class="input" v-model="form.checkPsw" @blur="checkPswBlur" placeholder="确认密码" maxlength="24" autocomplete="off" clearable show-password></el-input>
                        </el-form-item>
                        <el-form-item v-show="verifyCodeShow"> <!-- 验证码 -->
                            <el-input id="verifyCodeBox" class="input" v-model="form.verifyCode" maxlength="4" autocomplete="off" placeholder="验证码"></el-input>
                        </el-form-item>
                        <el-form-item> <!-- 同意协议 -->
                            <span id="user-rules"><el-checkbox id="iCheckbox" v-model="checked" label=" "></el-checkbox>我同意<router-link id="agree-rules" :to="{name:'PrivacyPolicy'}">《安全协议》和《隐私协议》</router-link></span>
                        </el-form-item>
                        <el-form-item>  <!-- 注册确认按钮 -->
                            <el-button type="primary" @click="onSubmit" id="confirm"><span id="btLogin">注册</span></el-button>
                        </el-form-item>
                        <el-form-item>  <!-- 版权信息 -->
                            <span id="form-info">Copyright © 2022 Jczone. All rights reserved.</span>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 验证码图片单独定位 -->
                <div id="verifyCode">
                    <img id="verifyCodeImg" src="/checkCodeServlet" @click="changeVerifyImg" alt="图片下班了~">  <!-- 验证码图片 -->
                </div>
            </el-main>
        </el-container>

    </div>

</template>

<script>
    import SHAEncrypt from "@/components/SHAEncrypt";
    export default {
        name: "Register",
        components:{
            SHAEncrypt,
        },
        // 数据模型
        data(){
            return {
                // 账号规则
                format: /^\w{4,24}$/,
                /* 动画控制器 */
                show: true,
                /* 表单数据模型 */
                form:{
                    id:'',
                    psw:'',
                    checkPsw:'',
                    verifyCode:'',
                },
                /* 同意协议 */
                checked: false ,
                // 已注册跳转
                registered:false,
                verifyCodeShow: false,
            }
        },
        // 组件激活
        activated() {
            // 刷新验证码
            this.changeVerifyImg();
            this.verifyCodeShow = true;
            // 开启动画
            this.show = false;
        },
        // 通过路由规则，离开该组件时被调用
        beforeRouteLeave (to, from, next) {
            // 关闭动画
            this.show = true;
            this.verifyCodeShow = false;
            if(this.Registered){
                // 数据销毁
                this.form.id = '';
                this.form.psw = '';
                this.form.checkPsw = '';
                this.form.verifyCode = '';
                this.checked = false;
                this.Registered = false;
            }
            next();
        },
        // 方法模型
        methods: {
            // 切换验证码图片
            changeVerifyImg(){
                document.getElementById("verifyCodeImg").src  = "/checkCodeServlet?"+new Date().getMilliseconds();
            },
            // 验证账号格式
            idBlur(){
                if(this.format.test(this.form.id) === false){
                    this.$message.error('账号长度应在4-24位之间！');
                    return false;
                }
                return true;
            },
            // 验证二次密码格式
            checkPswBlur(){
                if(this.form.psw !== this.form.checkPsw || this.form.checkPsw === ''){
                    this.$message.error('两次输入的密码不同！');
                    return false;
                }
                return true;
            },
            // 提交表单
            onSubmit(){
                // 检查数据格式
                if(!this.idBlur()){
                    return;
                }
                if(!this.checkPswBlur()){
                    return;
                }
                // 验证码格式
                let formCode = /^\w{4}$/;
                if(formCode.test(this.form.verifyCode) === false){
                    this.$message.error('验证码格式有误！');
                    return;
                }
                // 检查勾选协议
                if(this.checked === false){
                    this.$message.warning('请勾选同意协议~');
                    return;
                }
                // password加密
                this.form.psw = SHAEncrypt.methods.sha1(this.form.psw);
                // checkPassword加密
                this.form.checkPsw = SHAEncrypt.methods.sha1(this.form.checkPsw);
                // 发送表单给后端
                this.$axios.post("/LoginCon/register",this.form).then((res)=>{
                    if(res.data.flag){
                        // 执行数据销毁
                        this.Registered = true;
                        // 注册成功
                        this.$message.success(res.data.msg + "即将跳转到登陆界面！");
                        // 2秒后跳转
                        setTimeout(()=> {this.$router.push({name:'Login'});}, 2000);
                    }else{
                        this.form.psw = '';
                        this.form.checkPsw = '';
                        // 注册失败
                        this.$message.warning(res.data.msg);
                    }
                    // 切换验证码
                    this.changeVerifyImg();
                });
            },

        },
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
        color: #299E58;
        /* 文字间距 */
        letter-spacing: 1px;
    }
    /* 注册超链接悬浮 */
    .register:hover{
        text-decoration: underline;
        color: #228143;
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
    #form{
        /* 位置 */
        top: 18%;
        left: 52%;
        position: absolute;
        /* 窗口大小 */
        width: 30%;
        height: 50%;
    }
    /* 输入框 */
    ::v-deep .el-input__inner {
        font-size: 16px;
        height: 60px;
        border-radius: 8px;
        background-color: #EBF0F6;
    }
    /* 验证码输入 */
    ::v-deep #verifyCodeBox{
        width: 45%;
    }
    /* 注意项 */
    #user-rules{
        left: 10px;
        position: relative;
        font-size: 16px;
        font-weight: 500;
        color: #b5b7b4;
        /* 文字间距 */
        letter-spacing: 1px;
    }
    /* checkBox选中色 */
    .el-checkbox__input.is-checked .el-checkbox__inner{
        background-color:#299E58;
        border-color: #228143;
    }
    /* checkbox选中边框色 */
    .el-checkbox__input.is-focus .el-checkbox__inner{
        border-color: #299E58;
    }
    /* checkBox悬浮鼠标边框色*/
    .el-checkbox__inner:hover{
        border-color: #299E58;
    }
    /* 用户协议超链接 */
    #agree-rules{
        text-decoration: none;
        color:  #299E58;
    }
    /* 用户协议悬浮 */
    #agree-rules:hover{
        text-decoration: underline;
        color: #228143;
    }
    /* 登录按钮 */
    #confirm{
        height: 55px;
        width: 100%;
        /* 圆角半径 */
        border-radius: 10px;
        background-color: #299E58;
    }
    /* 登录按钮活动 */
    #confirm:hover{
        background-color: #228143;
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