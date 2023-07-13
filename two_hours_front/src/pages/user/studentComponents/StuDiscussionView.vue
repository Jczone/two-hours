<template>
    <div>
        <!-- 讨论详情 -->
        <div>
            <el-card :body-style="{ padding: '0px'}" style="margin-top: 2em">
                <div  id="DiscussionCards">
                    <el-row>
                        <el-col :span="1">
                            <el-avatar id="discussionUserAvatar" size="large" :src="discussion.userAvatar" fit="cover"></el-avatar>
                        </el-col>
                        <el-col :span="23">
                            <!-- 发布者和时间 -->
                            <div style="margin-top: 20px;">
                                <span id="discussionUser">发布者：{{discussion.username}}</span>
                                <span id="discussionDate">{{discussion.formatDate}}</span>
                            </div>
                            <!-- 标题 -->
                            <div style="margin-top: 10px;">
                                <span id="discussionTitle">{{discussion.title}}</span>
                            </div>
                            <!-- 内容 -->
                            <div id="discussionContent" v-html="discussion.content">{{discussion.content}}</div>
                            <!-- 功能栏 -->
                            <div id="discussionController">
                                <span class="discussionDetail"><i class="el-icon-view"style="margin-right: 0.5em"></i>{{discussion.hits}}</span>
                                <span class="discussionDetail"><i class="ali-iconzan3"style="font-size:1em;margin-right: 0.5em"></i>{{discussion.likes}}</span>
                                <!-- 点赞按钮 -->
                                <span class="functionReply" style="position: absolute; left: 91.3%;">
                                    <i v-if="!isLiked" class="ali-iconzan3" style="font-size: 1em"  @click="discussionLike()"></i>
                                    <!-- 已点过赞 -->
                                    <i v-if="isLiked" class="ali-iconzan4" style="font-size: 0.9em" @click="cancelLike()"></i>
                                </span>
                                <!-- 回复按钮 -->
                                <span class="functionReply" style="position: absolute; left: 94.5%;" @click="createReply(null)">
                                    <i class="el-icon-chat-dot-square"></i>
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>

        <div style="margin: 30px;font-size: 18px">评论区</div>

        <!-- 回复列表 -->
        <div>
            <el-card :body-style="{ padding: '0px' }">
                <!-- 回复卡片 -->
                <div id="RepliesCards">
                    <!-- 暂无回复 -->
                    <div v-if="replies === undefined" id="NoReplies">暂无回复</div>
                    <!-- 每条回复 -->
                    <div  v-for="(item,index) in replies"
                          :key="item.replyId"
                          id="RepliesRow">
                        <!-- 分割线 -->
                        <el-divider v-if="index !== 0" class="ReplyDivider"></el-divider>
                        <!-- 回复内容 -->
                        <div>
                            <el-row>
                                <!-- 头像 -->
                                <el-col :span="1">
                                    <el-avatar size="medium" :src="item.fromUserAvatar" fit="cover"></el-avatar>
                                </el-col>
                                <!-- 内容 -->
                                <el-col  :span="22" style="position: relative">
                                    <!-- 用户名和时间 -->
                                    <div style="margin-bottom: 10px">
                                        <span class="fromUserName">{{item.fromUsername}}</span>
                                        <span class="ReplyDate">{{item.formatDate}}</span>
                                    </div>
                                    <!-- 回复内容 -->
                                    <div>
                                        <!-- @目标用户 -->
                                        <span v-if="item.toUsername" class="toUsername">@{{item.toUsername}}：</span>
                                        <p v-html="item.content" class="ReplyContent">{{item.content}}</p>
                                    </div>
                                    <!-- 功能区 -->
                                    <div style="text-align: right">
                                        <!-- 回复 -->
                                        <span v-if="item.fromUid !== user.userId"
                                              class="functionReply"
                                              @click="createReply(item.fromUid)"><i class="el-icon-chat-dot-square"></i> </span>
                                        <!-- 编辑 -->
                                        <span v-if="item.fromUid === user.userId"
                                              class="functionReply EditReply"
                                              @click="editReply(item)"><i class="el-icon-edit"></i> </span>
                                        <!-- 删除-->
                                        <span v-if="item.fromUid === user.userId"
                                              class="functionReply ReplyDelete"
                                              @click="deleteReply(item.replyId)"
                                              style="margin-left: 20px"><i class="el-icon-delete"></i> </span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div style="height: 20px"></div>
            </el-card>
        </div>

        <!--编辑回复对话框表单 -->
        <el-dialog
                v-if="closeDialog"
                title="输入内容"
                :visible.sync="EditDialogVisible"
                @close="dialogHandleClose"
                width="60%">
            <!-- 内容编辑 -->
            <div class="discussionInput">在此输入</div>
            <Ckeditor4 v-model="replyData.content"></Ckeditor4>
            <el-button type="text"
                       style="font-size: 16px;margin-top: 15px"
                       @click="onCommit(replyData)">
                保存编辑
            </el-button>
        </el-dialog>

    </div>
</template>

<script>
    import Ckeditor4 from "@/components/Ckeditor4";
    export default {
        name: "StuDiscussionView",
        components:{
            Ckeditor4,
        },
        data(){
            return{
                user:'',
                discussion:'',
                replies:[],
                // 已点过赞
                isLiked:false,
                // 讨论发布对话框
                EditDialogVisible:false,
                // 对话框销毁器
                closeDialog:false,
                // 新建回复
                replyData: {
                    replyId: '',
                    discussionId:'',
                    fromUid:'',
                    toUid:'',
                    content:'',
                },
                // 编辑回复而不是创建回复
                editNotCreate:false,
            }
        },
        created() {
            this.openLoading();
            // 初始化信息
            this.getUser();
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
            // 获取用户数据
            getUser(){
                this.$axios.get("/Users/isUserLogin").then((res)=>{
                    if(res.data.flag){
                        // 保存用户数据
                        this.user = res.data.data;
                        // 初始化讨论数据
                        this.getDiscussion();
                    }else{
                        // 服务故障-跳转登陆界面
                        this.$router.push({name:'Login'});
                    }
                });
            },
            // 获取讨论的具体数据
            getDiscussion(){
                let discussion = {discussionId:this.$route.params.discussionId};
                this.$axios.post("/Discussion/getDiscussionById",discussion).then((res)=>{
                    if(res.data.flag){
                        this.discussion = res.data.data;
                        // 5秒后增加一次浏览量
                        setTimeout(()=>{ this.$axios.post("/Discussion/addHits",this.discussion)},5000);
                        // 获取该讨论下的全部回复
                        this.getReplies();
                        // 是否点过赞
                        this.getIsLiked();
                    }else{
                        this.$message.error("讨论数据获取失败，请稍后重试！");
                    }
                })
            },
            // 获取该讨论的全部回复
            getReplies(){
                let discussion = {discussionId:this.discussion.discussionId};
                this.$axios.post("/Reply/getReplies",discussion).then((res)=>{
                    if(res.data.flag){
                        this.replies = res.data.data;
                        if(this.replies.length === 0)this.replies = undefined;
                    }else{
                        this.$message.error("回复数据获取失败，请稍后重试！");
                    }
                })
            },
            // 获取是否点赞记录
            getIsLiked(){
                let discussion = {discussionId:this.discussion.discussionId};
                this.$axios.post("/Discussion/isLiked",discussion).then((res)=>{
                    if(res.data.flag){
                        if(res.data.data > 0){
                            this.isLiked = true;
                        }else{
                            this.isLiked = false;
                        }
                    }else{
                        this.$message.error("数据获取失败！");
                    }
                });
            },
            // 点赞讨论
            discussionLike(){
                let discussion = {discussionId:this.discussion.discussionId};
                this.$axios.post("/Discussion/likeThis",discussion).then((res)=>{
                    if(res.data.flag){
                       // 刷新讨论数据
                       this.getDiscussion();
                    }else{
                        this.$message.error("数据获取失败！");
                    }
                });
            },
            // 取消点赞
            cancelLike(){
                let discussion = {discussionId:this.discussion.discussionId};
                this.$axios.post("/Discussion/cancelLike",discussion).then((res)=>{
                    if(res.data.flag){
                        // 刷新讨论数据
                        this.getDiscussion();
                    }else{
                        this.$message.error("数据获取失败！");
                    }
                });
            },
            // 创建回复
            createReply(toUid){
                // 数据封装
                this.replyData.discussionId = this.discussion.discussionId;
                this.replyData.fromUid = this.user.userId;
                this.replyData.toUid  = toUid;
                this.replyData.content = '';
                // 启动输入框
                this.EditDialogVisible=true;
                this.closeDialog=true;
            },
            // 编辑回复
            editReply(reply){
                // 数据封装
                this.replyData.replyId = reply.replyId;
                this.replyData.discussionId = reply.discussionId;
                this.replyData.fromUid = reply.fromUid;
                this.replyData.toUid  = reply.toUid;
                this.replyData.content  = reply.content;
                // 打开编辑回复提交开关-Dialog提交时调用编辑接口
                this.editNotCreate = true;
                // 启动输入框
                this.EditDialogVisible=true;
                this.closeDialog=true;
            },
            // 删除回复
            deleteReply(replyId){
                // 弹框确认
                this.$confirm('此操作将删除该回复, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let reply = {replyId:replyId};
                    // 执行删除
                    this.$axios.post("/Reply/deleteReplyById",reply).then(resp=>{
                        if(resp.data.flag){
                            // 删除成功，刷新数据
                            this.getReplies();
                            this.$message.success('删除成功！');
                        }else{
                            this.$message.error('删除失败！');
                        }
                    })
                }).catch(() => {
                    // 取消删除
                    this.$message.info('取消删除');
                });
            },
            // 回复Dialog销毁
            dialogHandleClose(){
                // 手动销毁
                this.closeDialog = false;
            },
            // 提交Dialog编辑
            onCommit(reply){
                if(this.editNotCreate){ // 编辑回复
                    this.$axios.post("/Reply/editReplies",reply).then((res)=>{
                        if(res.data.flag){
                            this.$message.success("编辑成功！");
                            // 刷新讨论数据
                            this.getReplies();
                            this.EditDialogVisible = false;
                            this.replyData.content = '';
                        }else{
                            this.$message.error("回复失败，请稍后重试！");
                        }
                    })
                    // 使用后关闭编辑模式
                    this.editNotCreate = false;
                }else{  // 创建回复
                    this.$axios.post("/Reply/createReplies",reply).then((res)=>{
                        if(res.data.flag){
                            this.$message.success("回复成功！");
                            // 刷新讨论数据
                            this.getReplies();
                            this.EditDialogVisible = false;
                            this.replyData.content = '';
                        }else{
                            this.$message.error("回复失败，请稍后重试！");
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped>
    /**
     * 讨论卡片
     */
    #DiscussionCards{
        width: 90%;
        margin: auto;
    }
    /* 发布者头像 */
    #discussionUserAvatar{
        margin-top: 30px;
    }
    /* 发布者 */
    #discussionUser{
        font-size: 18px;
        color: #000000;
    }
    /* 发表时间 */
    #discussionDate{
        color: #8a8a8a;
        margin-left: 20px;
    }
    /* 讨论标题 */
    #discussionTitle{
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: 600;
        font-family: "微软雅黑";
    }
    /* 内容 */
    #discussionContent{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    /* 回复按钮 */
    .functionReply{
        font-size: 20px;
        color: #3a75ff;
    }
    .functionReply:hover{
        cursor:pointer;
    }
    /* 讨论功能栏 */
    #discussionController{
        text-align: left;
        margin-bottom: 20px;
        position: relative
    }
    /* 浏览和点赞 */
    .discussionDetail{
        font-size: 17px;
        color: #3a3a3a;
        margin-left: 40px;
    }
    /**
     * 回复卡片
     */
    #RepliesCards{
        width: 90%;
        margin: auto;
    }
    /* 暂无回复 */
    #NoReplies{
        margin-top: 18px;
        text-align: center;
        color: #8a8a8a;
    }
    /* 每条回复 */
    #RepliesRow{
        margin-top: 18px;
    }
    /* 回复分割线 */
    .ReplyDivider{
        /* 定位 */
        width: 107%;
        position: relative;
        left: -4%;
        margin-bottom: 18px;
    }
    /* 回复人姓名 */
    .fromUserName{
        color: #818181;
    }
    /* 回复时间 */
    .ReplyDate{
        color: #818181;
        margin-left: 20px;
    }
    /*　＠目标姓名　*/
    .toUsername{
        color: #3a75ff;
    }
    /*　回复内容　*/
    .ReplyContent{
        margin-top: -10px;
    }
    /* 输入框标题 */
    .discussionInput{
        margin: 20px 0 ;
        font-size: 16px;
    }

</style>