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
                    <div class="information">重置密码</div>
                    <div class="information">用密保问题找回</div>
                    <div style="visibility: hidden">占行</div>
                    <!-- 详细-->
                    <div class="details">想起您的密码了？您可以 </div>
                    <!-- 超链接-->
                    <router-link class="returnLogin" :to="{name:'Login'}" >点我返回</router-link>
                </div>
                <!-- center -->
                <div id="center">
                    <transition name="el-fade-in-linear">
                        <img style="transition:3s" v-show="!show" src="imgs/login/center.png" alt="图片下班了~">
                    </transition>
                </div>
                <!-- form表单 -->
                <div id="form">
                    <el-form ref="form" :model="form" label-width="80px">
                        <!-- 显示-验证ID后隐藏 -->
                        <el-form-item v-if="showForm1">  <!-- form标题 -->
                            <div class="input-title">在此输入您的ID</div>
                        </el-form-item>
                        <el-form-item v-if="showForm1"> <!-- 账号 长度限制24 自带清除 -->
                            <el-input class="input" v-model="form.id" placeholder="用户ID" maxlength="24" clearable></el-input>
                        </el-form-item>
                        <el-form-item v-if="showForm1">  <!-- 确认按钮 -->
                            <el-button type="primary" @click="onSubmit1" class="confirm"><span class="btLogin">确认</span></el-button>
                        </el-form-item>
                        <!-- 隐藏-验证ID后显示 -->
                        <el-form-item v-if="showForm2">  <!-- 问题1 -->
                            <div class="input-title">{{form.question1}}</div>
                        </el-form-item>
                        <el-form-item v-if="showForm2"> <!-- 答案1 -->
                            <el-input class="input" v-model="form.answer1is" maxlength="24" clearable></el-input>
                        </el-form-item>
                        <el-form-item v-if="showForm2">  <!-- 问题2 -->
                            <div  class="input-title">{{form.question2}}</div>
                        </el-form-item>
                        <el-form-item v-if="showForm2"> <!-- 答案2 -->
                            <el-input class="input" v-model="form.answer2is" maxlength="24" clearable></el-input>
                        </el-form-item>
                        <el-form-item v-if="showForm2">  <!-- 确认按钮 -->
                            <el-button type="primary" @click="onSubmit2" class="confirm"><span class="btLogin">确认</span></el-button>
                        </el-form-item>
                        <!-- 隐藏-验证回答后显示 -->
                        <el-form-item v-if="showForm3"> <!-- 密码 自带显示密码 -->
                            <el-input class="input" v-model="form.psw" placeholder="新密码" maxlength="24" autocomplete="off" clearable show-password></el-input>
                        </el-form-item>
                        <el-form-item v-if="showForm3"> <!-- 确认密码 自带显示密码 -->
                            <el-input class="input" v-model="form.checkPsw" placeholder="确认密码" maxlength="24" autocomplete="off" clearable show-password></el-input>
                        </el-form-item>
                        <el-form-item v-if="showForm3">  <!-- 确认按钮 -->
                            <el-button type="primary" @click="onSubmit3" class="confirm"><span class="btLogin">确认</span></el-button>
                        </el-form-item>
                        <!-- 版权信息始终显示 -->
                        <el-form-item>  <!-- 版权信息 -->
                            <span id="form-info">Copyright © 2022 Jczone. All rights reserved.</span>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>



    </div>

</template>

<script>
    import SHAEncrypt from "@/components/SHAEncrypt";
    export default {
        name: "ForgetPsw",
        components:{
            SHAEncrypt,
        },
        // 数据模型
        data(){
            return {
                /* 动画控制器 */
                show: true,
                /* 表单数据模型 */
                form:{
                id:'',
                psw:'',
                checkPsw:'',
                answer1is:'',
                answer2is:'',

                question1:'问题1',
                answer1:'',
                question2:'问题2',
                answer2:'',
                },
                showForm1: true,
                showForm2: false,
                showForm3: false,
            }
        },
        mounted(){
            this.show = false;
        },
        // 方法模型
        methods: {
            // 提交表单1 验证账号
            onSubmit1(){
                let form =  /^\w{4,24}$/;
                // 验证账号格式
                if(form.test(this.form.id) === false){
                    this.$message.error('账号长度应在4-24位之间！');
                    return;
                }
                // 发送表单给后端
                this.$axios.post("/LoginCon/getQuestion",this.form).then((res)=>{
                    if(res.data.flag){
                        // 验证成功
                        this.form.question1 = res.data.data.question1;
                        this.form.question2 = res.data.data.question2;
                        if(this.form.question1 == null ||  this.form.question2 == null){
                            // 未设置密保问题
                            setTimeout(()=>{this.$message.success("您未设置密保问题，请联系管理员修改。即将跳转到登陆界面！");},0)
                            // 2秒后跳转
                            setTimeout(()=>{this.$router.push({name:'Login'});}, 2000);
                        }else{
                            this.$message.success("验证成功");
                            this.form.answer1 = res.data.data.answer1;
                            this.form.answer2 = res.data.data.answer2;
                            // 切换显示表单
                            this.showForm1 = false ;
                            this.showForm2 = true;
                        }
                    }else{
                        // 验证失败
                        this.$message.warning("账号不存在");
                    }
                });
            },
            // 提交表单2 验证自定义问题
            onSubmit2(){
                if(this.form.answer1 === this.form.answer1is && this.form.answer2 === this.form.answer2is){
                    // 验证成功 切换显示表单
                    this.showForm2 = false ;
                    this.showForm3 = true;
                    this.$message.success("验证成功");
                }else{
                    // 验证失败
                    this.$message.warning("答案错误");
                }
            },
            // 提交表单3
            onSubmit3(){
                if(this.form.psw !== this.form.checkPsw || this.form.checkPsw === ''){
                    this.$message.warning('两次输入的密码不同！');
                    return false;
                }else{
                    // password加密
                    this.form.psw = SHAEncrypt.methods.sha1(this.form.psw);
                    // checkPassword加密
                    this.form.checkPsw = SHAEncrypt.methods.sha1(this.form.checkPsw);
                    this.$axios.post("/LoginCon/updatePsw",this.form).then((res)=>{
                        if(res.data.flag){
                            // 修改成功
                            this.$message.success(res.data.msg + "即将跳转到登陆界面！");
                            // 2秒后跳转
                            setTimeout(()=> {this.$router.push({name:'Login'});}, 2000);
                        }else{
                            this.form.psw = '';
                            this.form.checkPsw = '';
                            // 验证失败
                            this.$message.warning(res.data.msg);
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    /*
     * 侧边图
     */
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
    /* 返回超链接 */
    .returnLogin{
        text-decoration: none;
        font-size: 18px;
        font-weight: 500;
        color: #3a75ff;
        /* 文字间距 */
        letter-spacing: 1px;
    }
    /* 返回超链接悬浮 */
    .returnLogin:hover{
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
    #form{
        /* 位置 */
        top: 27%;
        left: 52%;
        position: absolute;
        /* 窗口大小 */
        width: 30%;
        height: 50%;
    }
    /* 输入提示 */
    .input-title{
        color: #000000;
        font-size: 20px;
        font-family: "微软雅黑";
        font-weight: 400;
        /* 文字间距 */
        letter-spacing: 1px;
    }
    /* 输入框 */
    ::v-deep .el-input__inner {
        font-size: 16px;
        height: 60px;
        border-radius: 8px;
        background-color: #EBF0F6;
    }
    /* 确认按钮 */
    .confirm{
        height: 55px;
        width: 100%;
        /* 圆角半径 */
        border-radius: 10px;
        background-color: #4460F0;
    }
    /* 确认按钮活动 */
    .confirm:hover{
        background-color: #3024ba;
    }
    /* 确认文字 */
    .btLogin{
        color: #ffffff;
        font-size: 20px;
        font-weight: 500;
        font-family: "微软雅黑";
        /* 文字间距 */
        letter-spacing: 10px;
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