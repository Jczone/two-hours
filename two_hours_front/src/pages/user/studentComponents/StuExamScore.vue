<template>
    <div>
        <!-- 考试详情 -->
        <el-card :body-style="{ padding: '0px'}" style="margin-top: 2em">
            <div id="examCards">
                <!-- 标题和时间 -->
                <div style="margin-top: 1.2em;">
                    <span id="examTitle">{{exam.title}}</span>
                    <span id="examDate">{{exam.formatCreateDate}}</span>
                </div>
                <!-- 内容 -->
                <div id="examDetails" v-html="exam.detail">{{exam.detail}}</div>
            </div>
        </el-card>
        <!-- 分界线 -->
        <el-divider id="myDivider"><div style="font-size: 18px">考试成绩</div></el-divider>

        <!-- 考生数据 -->
        <el-card id="subjectCard">
            <!-- 功能区 -->
            <div id="functionCard">
                <span style="font-size:16px; margin-left: 0.8em; position: relative;">
                    <span class="tagBox">
                        <user-avatar class="userAvatar" :src="studentExam.userAvatar" :width="45" :height="45"></user-avatar>
                        <span class="username">{{studentExam.username}}</span>
                        <el-tag class="subjectTag" v-if="studentExam.submit">已交卷</el-tag>
                        <el-tag class="subjectTag" v-else type="danger"  >未交卷</el-tag>
                        <el-tag class="subjectTag" type="success" v-if="studentExam.isCheckedBool">已判卷</el-tag>
                        <el-tag class="subjectTag" type="warning" v-else-if="studentExam.submit">待评分</el-tag>
                        <el-tag class="subjectTag" type="success" v-if="studentExam.systemCheckedBool">客观题：{{studentExam.objectiveScore}}分</el-tag>
                        <el-tag class="subjectTag" type="success" v-if="studentExam.isCheckedBool">总分：{{studentExam.score}}分</el-tag>
                    </span>
                </span>
                <el-button type="text" class="conSubjectButton" @click="allHidden">全部折叠</el-button>
                <el-button type="text" class="conSubjectButton" @click="allShow">全部展开</el-button>
            </div>
            <!-- 数据区 -->
            <div v-if="studentExam.submit" class="subjectContent">
                <el-collapse v-model="activeNames">
                    <el-collapse-item v-for="(solution,i) in studentExam.solutions" :key="i" :name="i">
                        <!-- 标题行：显示题号/题型/得分 -->
                        <template slot="title">
                            <el-row style="width: 90em;font-size: 15px">
                                <!-- 题号 -->
                                <el-col :span="1" style="text-align: right">
                                    <div style="margin-right: 0.8em">{{i+1}}.</div>
                                </el-col>
                                <!-- 题型和分数 -->
                                <el-col :span="2">
                                    <!-- 选择题 -->
                                    <div v-if="solution.subjectType === 1">
                                        <el-tag class="normalTag subjectTypeTag" v-if="solution.answerNum > 1">多选（{{subjects[i].choice.score}}分）</el-tag>
                                        <el-tag class="normalTag subjectTypeTag" v-else>单选（{{subjects[i].choice.score}}分）</el-tag>
                                    </div>
                                    <!-- 填空题 -->
                                    <div v-else-if="solution.subjectType === 2">
                                        <el-tag class="normalTag subjectTypeTag">填空（{{subjects[i].filling.score}}分）</el-tag>
                                    </div>
                                    <!-- 判断题 -->
                                    <div v-else-if="solution.subjectType === 3">
                                        <el-tag class="normalTag subjectTypeTag">判断（{{subjects[i].trueFalse.score}}分）</el-tag>
                                    </div>
                                    <!-- 简答题 -->
                                    <div v-else-if="solution.subjectType === 4">
                                        <el-tag class="normalTag subjectTypeTag">简答（{{subjects[i].questionAnswer.score}}分）</el-tag>
                                    </div>
                                </el-col>
                                <!-- 得分 -->
                                <el-col :span="2">
                                    <!-- 选择题 -->
                                    <div v-if="solution.subjectType === 1">
                                        <el-tag type="success" class="normalTag scoreTag" v-if="solution.score === subjects[i].choice.score" >得分：{{solution.score}}分</el-tag>
                                        <el-tag type="warning" class="normalTag scoreTag" v-else-if="solution.score > 0" >得分：{{solution.score}}分</el-tag>
                                        <!-- 0分项目 -->
                                        <el-tag type="danger"  class="normalTag scoreTag" v-else >得分：{{solution.score}}分</el-tag>
                                    </div>
                                    <!-- 填空题 -->
                                    <div v-else-if="solution.subjectType === 2">
                                        <el-tag type="success" class="normalTag scoreTag" v-if="solution.score === subjects[i].filling.score" >得分：{{solution.score}}分</el-tag>
                                        <el-tag type="warning" class="normalTag scoreTag" v-else-if="solution.score > 0" >得分：{{solution.score}}分</el-tag>
                                        <!-- 0分项目 -->
                                        <el-tag type="danger"  class="normalTag scoreTag" v-else >得分：{{solution.score}}分</el-tag>
                                    </div>
                                    <!-- 判断题 -->
                                    <div v-else-if="solution.subjectType === 3">
                                        <el-tag type="success" class="normalTag scoreTag" v-if="solution.score === subjects[i].trueFalse.score" >得分：{{solution.score}}分</el-tag>
                                        <el-tag type="warning" class="normalTag scoreTag" v-else-if="solution.score > 0" >得分：{{solution.score}}分</el-tag>
                                        <!-- 0分项目 -->
                                        <el-tag type="danger"  class="normalTag scoreTag" v-else >得分：{{solution.score}}分</el-tag>
                                    </div>
                                    <!-- 简答题 -->
                                    <div v-else-if="solution.subjectType === 4">
                                        <span v-if="studentExam.isCheckedBool">
                                            <el-tag type="success" class="normalTag scoreTag" v-if="solution.score === subjects[i].questionAnswer.score" >得分：{{solution.score}}分</el-tag>
                                            <el-tag type="warning" class="normalTag scoreTag" v-else-if="solution.score > 0" >得分：{{solution.score}}分</el-tag>
                                            <!-- 0分项目 -->
                                            <el-tag type="danger"  class="normalTag scoreTag" v-else >得分：{{solution.score}}分</el-tag>
                                        </span>
                                        <span v-else >
                                            <el-tag type="info"  class="normalTag scoreTag" >待评分</el-tag>
                                        </span>
                                    </div>
                                </el-col>
                            </el-row>
                        </template>
                        <!-- 展示答题数据和标准答案 -->
                        <div class="stdDiv" style="font-size:16px;width: 90%;position: relative;left: 2em">
                            <!-- 选择题 -->
                            <div v-if="solution.subjectType == 1">
                                <!-- 用户答案 -->
                                <div class="stdDiv">
                                    <el-tag type="success">用户答案</el-tag>
                                    <!-- 多选题 -->
                                    <span v-if="solution.answerNum > 1">
                                        <span v-for="(answers,an) in solution.answerOptions" :key="'an'+an">
                                            <span style="margin: 0 0.4em" v-if="answers.answerBool">选项{{an+1}}</span>
                                        </span>
                                    </span>
                                    <!-- 单选题 -->
                                    <span v-else>
                                        <span v-for="(options1,op1) in subjects[i].choiceOptions" :key="'op1'+op1">
                                            <span style="margin: 0 0.4em" v-if="options1.num == solution.answer">选项{{op1+1}}</span>
                                        </span>
                                    </span>
                                </div>
                                <!-- 标准答案 -->
                                <div class="stdDiv">
                                    <el-tag>标准答案</el-tag>
                                    <span v-for="(options,op) in subjects[i].choiceOptions" :key="'op'+op">
                                        <span style="margin: 0 0.4em" v-if="options.isAnswerBool">选项{{op+1}}</span>
                                    </span>
                                </div>
                            </div>
                            <!-- 填空题 -->
                            <div v-else-if="solution.subjectType == 2">
                                <!-- 用户答案 -->
                                <div class="stdDiv">
                                    <el-tag type="success">用户答案</el-tag>
                                    <span class="lrDiv" v-for="(aBlank,num1) in solution.answerOptions" :key="'u'+num1">{{num1+1}}.{{aBlank.answer}}</span>
                                </div>
                                <!-- 标准答案 -->
                                <div class="stdDiv">
                                    <el-tag>标准答案</el-tag>
                                    <span class="lrDiv" v-for="(stdBlank,num2) in subjects[i].fillingBlanks" :key="'a'+num2">{{num2+1}}.{{stdBlank.content}}</span>
                                </div>
                            </div>
                            <!-- 判断题 -->
                            <div v-else-if="solution.subjectType == 3">
                                <!-- 用户答案 -->
                                <div class="stdDiv">
                                    <el-tag type="success">用户答案</el-tag>
                                    <span class="lrDiv">{{solution.answerStr}}</span>
                                </div>
                                <!-- 标准答案 -->
                                <div class="stdDiv">
                                    <el-tag>标准答案</el-tag>
                                    <span class="lrDiv">{{subjects[i].trueFalse.answerStr}}</span>
                                </div>
                            </div>
                            <!-- 简答题 -->
                            <div v-else-if="solution.subjectType == 4">
                                <!-- 用户答案 -->
                                <div class="stdDiv">
                                    <el-tag type="success">用户答案</el-tag>
                                    <div v-html="solution.answer">{{solution.answer}}</div>
                                </div>
                                <!-- 标准答案 -->
                                <div class="stdDiv">
                                    <el-tag>标准答案</el-tag>
                                    <span v-html="subjects[i].questionAnswer.answer">{{subjects[i].questionAnswer.answer}}</span>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <!-- 用户未提交 -->
            <div v-else style="text-align: center;color:#797979">暂无数据</div>
        </el-card>
    </div>
</template>

<script>
    import UserAvatar from "@/components/UserAvatar";
    export default {
        name: "StuExamScore",
        components:{
            UserAvatar,
        },
        data(){
            return{
                exam:{},            // 考试信息
                activeNames:[],     // 试题激活项
                studentExam:{},     // 考试数据
                subjects:[],        // 试题集合
            }
        },
        created() {
            this.getExam();
        },
        methods:{
            // 查询考试数据
            getExam(){
                let exam = {examId:this.$route.params.examId};
                this.$axios.post("/Exam/getExamById", exam).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.exam = res.data.data;
                        this.getSubject();      // 获取标准答案
                        this.getStudentExam();  // 获取考试信息
                    }else{
                        // 服务故障
                        this.$message.error("信息获取失败！");
                    }
                });
            },
            // 查询试题数据
            getSubject(){
                this.$axios.post("/Paper/getPaperByExamId", this.exam).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.subjects = res.data.data;
                    }else{
                        // 服务故障
                        this.$message.error("信息获取失败！");
                    }
                });
            },
            // 获取本人的考试信息
            getStudentExam(){
                this.$axios.post("/Answer/getOneUserAnswer",this.exam).then((res)=>{
                    if(res.data.flag){
                        this.studentExam = res.data.data;
                        console.log(this.studentExam);
                    }else{
                        // 服务故障
                        this.$message.error("信息获取失败！");
                    }
                });
            },
            // 全部折叠
            allHidden(){
                this.activeNames = [];
            },
            // 全部展开
            allShow(){
                this.allHidden();
                /* 激活全部题组 */
                for(let i = 0;i<this.studentExam.solutions.length;i++) this.$set(this.activeNames,i,i);
            },
        },
    }
</script>

<style scoped>
    /* 信息卡片 */
    #examCards{
        width: 90%;
        min-height: 10em;
        margin: auto;
    }
    /* 考试标题 */
    #examTitle{
        margin-bottom: 1.2em;
        font-size: 28px;
        font-weight: 600;
        font-family: "微软雅黑";
    }
    /* 发表时间 */
    #examDate{
        color: #8a8a8a;
        margin-left: 1.2em;
    }
    /* 详情 */
    #examDetails{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    /* 分割线 */
    ::v-deep#myDivider{
        margin: 2em 0;
    }
    /**
     * 功能栏
     */
    /* 题目卡片区 */
    #subjectCard{
        padding: 0;
        position: relative;
    }
    /* 功能栏 */
    #functionCard{
        margin-bottom: 2em;
    }
    /* 展开折叠按钮 */
    .conSubjectButton{
        left: 95em;
        top: 0.5em;
        position: relative;
    }
    /**
     * 标题栏
     */
    /* 标签整体 */
    .tagBox{
        left: 2.5em;
        width: 90em;
        position: absolute;
    }
    /* 用户头像显示 */
    .userAvatar{
        top: 0.3em;
        position: relative;
    }
    /* 用户名显示 */
    .username{
        left: 2.4em;
        margin: 0 1em;
        bottom: 1em;
        position: absolute;
    }
    /*　题目标签　*/
    .subjectTag{
        margin: 0 0.4em;
        left: 5.5em;
        bottom: 0.7em;
        position: relative;
    }
    /**
     * 内容区
     */
    .subjectContent{
        width: 93%;
        left: 3em;
        position: relative;
    }
    /* 答案区tag */
    .normalTag{
        margin: 0 0.4em;
    }
    /* 题型tag */
    .subjectTypeTag{
        min-width: 85%;
    }
    /* 得分tag */
    .scoreTag{
        min-width: 75%;
    }
    /* div 标准 */
    .stdDiv{
        margin: 0.3em 0;
    }
    /* 左右空隙div */
    .lrDiv{
        margin: 0 0.3em;
    }
</style>