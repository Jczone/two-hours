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
        <el-divider id="myDivider"><div style="font-size: 18px">数据统计</div></el-divider>
        <!-- 考生数据 -->
        <el-card id="subjectCard">
            <!-- 功能区 -->
            <div id="functionCard">
                <el-button type="text" class="conSubjectButton" @click="allHidden">全部折叠</el-button>
                <el-button type="text" class="conSubjectButton" @click="allShow">全部展开</el-button>
            </div>
            <!-- 数据区 -->
            <el-collapse v-model="activeNames">
                <!-- 无用户数据 -->
                <div id="emptySubject" v-if="studentExams.length === 0">暂无数据</div>
                <!-- 用户数据展示 -->
                <el-collapse-item v-else v-for="(item,index) in studentExams" :key="index" :name="index">
                    <!-- 标题 -->
                    <template slot="title">
                        <span style="font-size:15px;margin-left: 0.8em; position: relative;">
                            <!-- 序号 -->
                            <span class="subjectNum">{{index+1}}</span>
                            <!-- 选择题 -->
                            <span class="tagBox">
                                <user-avatar class="userAvatar" :src="item.userAvatar" :width="38" :height="38"></user-avatar>
                                <span class="username">{{item.username}}</span>
                                <el-tag class="subjectTag" v-if="item.submit">已交卷</el-tag>
                                <el-tag class="subjectTag" v-else type="danger"  >未交卷</el-tag>
                                <el-tag class="subjectTag" type="success" v-if="item.isCheckedBool">已判卷</el-tag>
                                <el-tag class="subjectTag" type="warning" v-else-if="item.submit">待评分</el-tag>
                                <el-tag class="subjectTag" type="success" v-if="item.systemCheckedBool">客观题：{{item.objectiveScore}}分</el-tag>
                                <el-tag class="subjectTag" type="success" v-if="item.isCheckedBool">总分：{{item.score}}分</el-tag>
                            </span>
                        </span>
                    </template>
                    <!-- 内容 -->
                    <div v-if="item.submit" class="subjectContent">
                        <!-- 折叠按钮 -->
                        <el-button type="text" style="margin-left: 5em" @click="solutionsShow(item)">展开</el-button>
                        <el-button type="text" style="margin-left: 1em" @click="solutionsHidden(item)">折叠</el-button>
                        <!-- 判卷区 -->
                        <el-collapse v-model="item.activeNames">
                            <el-collapse-item v-for="(solution,i) in item.solutions" :key="item.userId+i" :name="item.userId+i">
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
                                                <span v-if="item.isCheckedBool">
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
                                            <el-row style="width: 24em">
                                                <el-col :span="6">
                                                    <el-tag type="success">用户答案</el-tag>
                                                </el-col>
                                                <el-col :span="6"  v-if="!item.isCheckedBool">
                                                    <span style="color: #8a8a8a;font-size: 14px;">在此输入评分:</span>
                                                </el-col>
                                                <el-col :span="4" style="position:relative;" v-if="!item.isCheckedBool">
                                                    <el-input class="inputScore"
                                                              @blur="subjectiveScoreCheck(solution,subjects[i].questionAnswer.score)"
                                                              v-model.number="solution.score"></el-input>
                                                </el-col>
                                                <el-col :span="1" v-if="!item.isCheckedBool">
                                                    <span style="margin-left: 0.5em">分</span>
                                                </el-col>
                                            </el-row>
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
                        <!-- 功能区 -->
                        <el-row style="width: 30em;position: relative;left: 83em" class="editSubjectButton">
                            <el-col :span="4" v-if="!item.isCheckedBool">
                                <span style="position: relative;top:0.5em;left: 2.5em">总分</span>
                            </el-col>
                            <!-- 输入框 -->
                            <el-col :span="4" v-if="!item.isCheckedBool">
                                <el-input v-model.number="item.score" @focus="calTotalScore(item)" :disabled="item.isCheckedBool"></el-input>
                            </el-col>
                            <!-- 提交按钮 -->
                            <el-col :span="7">
                                <el-button type="primary"
                                           style="margin-left: 1em"
                                           @click="submitScore(item)"
                                           v-if="!item.isCheckedBool"
                                           plain round>确认得分</el-button>
                                <el-button type="primary"
                                           style="margin-left: 11em"
                                           @click="reJudge(item)"
                                           v-else
                                           plain round>重新评分</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 用户未提交 -->
                    <div v-else style="text-align: center;color:#797979">暂无数据</div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
    import UserAvatar from "@/components/UserAvatar";
    export default {
        name: "ExamInfoView",
        components:{
            UserAvatar,
        },
        data(){
            return{
                exam:{},            // 考试信息
                activeNames:[],     // 试题激活项
                studentExams:[],    // 学生列表
                subjects:[],        // 试题集合
            }
        },
        created(){
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
                        this.getStudentExams(); // 获取所有学生的考试信息
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
            // 获取所有学生的考试信息
            getStudentExams(){
                this.$axios.post("/Answer/getAllUserAnswer",this.exam).then((res)=>{
                    if(res.data.flag){
                        this.studentExams = res.data.data;
                        this.addActiveNames();
                    }else{
                        // 服务故障
                        this.$message.error("信息获取失败！");
                    }
                });
            },
            // 给所有学生数据添加项目控制器
            addActiveNames(){
                for(let i in this.studentExams){
                    this.studentExams[i]['activeNames'] = [];
                }
            },
            // 表格颜色控制
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%4 === 1) {
                    return 'warning-row';
                } else if (rowIndex%4 === 3) {
                    return 'success-row';
                }
                return '';
            },
            // 全部折叠
            allHidden(){
                this.activeNames = [];
            },
            // 全部展开
            allShow(){
                this.allHidden();
                /* 激活全部题组 */
                for(let i = 0;i<this.studentExams.length;i++) this.$set(this.activeNames,i,i);
            },
            // 展开答案列表
            solutionsShow(item){
                for(let j in item.solutions){
                    this.$set(item.activeNames,j,item.userId+j);
                }
            },
            // 折叠答案列表
            solutionsHidden(item){
                item.activeNames = [];
                this.allHidden();
            },
            // 分数检查
            subjectiveScoreCheck(solution,stdScore){
                if(solution.score > stdScore || solution.score < 0 || isNaN(solution.score)){
                    solution.score = 0;
                    this.$message.warning("输入格式有误");
                }
            },
            // 总分计算
            calTotalScore(item){
                item.score = 0 ;
                for(let i in item.solutions){
                    item.score += item.solutions[i].score;
                }
            },
            // 提交评分-参数为StudentExam类型
            submitScore(item){
                this.$confirm('确认分数无误后提交, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // item应提交给后台，保存其score和solutions中的score
                    this.$axios.post("/Answer/judgeOnesPaper",item).then((res)=>{
                        if(res.data.flag){  // 持久化完成
                            this.$message.success(res.data.msg);
                            // 刷新数据
                            this.getStudentExams();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                })
            },
            // 重新评分
            reJudge(item){
                this.$confirm('是否重新判卷?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post("/Answer/reJudge",item).then((res)=>{
                        if(res.data.flag){
                           item.isChecked = 0;
                           item.isCheckedBool = false;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                })
            },
        }
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
        text-align: center;
        margin-bottom: 1.2em;
    }
    /* 展开折叠按钮 */
    .conSubjectButton{
        left: 46em;
        position: relative;
    }
    /**
     * 标题栏
     */
    /* 暂无数据 */
    #emptySubject{
        margin-left: 39vw;
        color:#8d8d8d;
        height:3em;
        line-height:2.5em;
        font-size: 16px
    }
    /* 题目序号 */
    .subjectNum{
        left: 0.8em;
        position: relative;
    }
    /* 标签整体 */
    .tagBox{
        left: 2.5em;
        width: 100em;
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
        bottom: 0.5em;
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
    /* 输入框高度 */
    ::v-deep.el-input__inner{
        height: 30px;
    }
    /* 主观题评分输入框 */
    .inputScore{
        bottom: 0.2em;
        position: relative;
    }
    /* div 标准 */
    .stdDiv{
        margin: 0.3em 0;
    }
    /* 左右空隙div */
    .lrDiv{
        margin: 0 0.3em;
    }
    /**
     * 功能区-编辑题目按钮
     */
    .editSubjectButton{
        margin-top: 2em;
        font-size: 14px;
    }

</style>
