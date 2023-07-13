<template>
    <div>
        <!-- 考试详情 -->
        <el-card :body-style="{ padding: '0px'}" style="margin-top: 2em">
            <div id="examCards">
                <!-- 标题和时间 -->
                <div style="margin-top: 1.2em;">
                    <span id="examTitle">{{exam.title}}</span>
                    <span id="examDate">{{exam.formatCreateDate}}</span>
                    <span id="haveTime">距离考试结束：{{day}}天{{hour}}时{{minute}}分{{second}}秒</span>
                </div>
                <!-- 内容 -->
                <div id="examDetails" v-html="exam.detail">{{exam.detail}}</div>
            </div>
        </el-card>
        <!-- 分割区 -->
        <div class="myDivider"></div>
        <!-- 题目区 -->
        <el-card id="subjectCard" v-if="show">
            <!-- 功能区 -->
            <div id="controlSubject">
                <start-logic-flow class="startLogicFlow"></start-logic-flow>
                <el-button type="text" class="conSubjectButton" @click="allHidden">全部折叠</el-button>
                <el-button type="text" class="conSubjectButton" @click="allShow">全部展开</el-button>
            </div>
            <!-- 题目区 -->
            <el-collapse v-model="activeNames">
                <div id="emptySubject" v-if="subjects.length === 0">暂无题目</div>
                <el-collapse-item v-for="(item,index) in subjects" :key="index" :name="index">
                    <!-- 标题 -->
                    <template slot="title">
                        <span style="margin-left: 1em; position: relative;">
                            <!-- 题号 -->
                            <span class="subjectNum">{{index+1}}</span>
                            <!-- 选择题 -->
                            <span v-if="item.subjectType === 1" class="tagBox">
                                <el-tag class="subjectTag" v-if="item.isSingleChoice">单选</el-tag>
                                <el-tag class="subjectTag" v-else>多选</el-tag>
                                <el-tag class="subjectTag" type="success">{{item.choice.score}}分</el-tag>
                            </span>
                            <!-- 填空题 -->
                            <span v-else-if="item.subjectType === 2" class="tagBox">
                                <el-tag class="subjectTag">填空</el-tag>
                                <el-tag class="subjectTag" type="success">{{item.filling.score}}分</el-tag>
                                <el-tag class="subjectTag" type="success" v-if="item.filling.isCapitalBool">大写区分</el-tag>
                                <el-tag class="subjectTag" type="success" v-if="item.filling.isOrderBool">答案有序</el-tag>
                            </span>
                            <!-- 判断题 -->
                            <span v-else-if="item.subjectType === 3" class="tagBox">
                                <el-tag class="subjectTag">判断</el-tag>
                                <el-tag class="subjectTag" type="success">{{item.trueFalse.score}}分</el-tag>
                            </span>
                            <!-- 简答题 -->
                            <span v-else-if="item.subjectType === 4" class="tagBox">
                                <el-tag class="subjectTag">简答</el-tag>
                                <el-tag class="subjectTag" type="success">{{item.questionAnswer.score}}分</el-tag>
                            </span>
                        </span>
                    </template>
                    <!-- 内容 -->
                    <div class="subjectContent">
                        <!-- 选择题 -->
                        <div v-if="item.subjectType === 1">
                            <!-- 题目 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">题目</el-tag>
                                <span v-html="item.choice.content">{{item.choice.content}}</span>
                            </div>
                            <!-- 单选 -->
                            <div v-if="item.isSingleChoice" class="divMargin choiceOption" v-for="(option,nums) in item.choiceOptions" :key="nums">
                                <el-radio v-model="solutions[index].answer" :label="option.num">
                                    <!-- 单选题向answer中存入了选择项的项序数，即num值-->
                                    <span style="margin-left: 0.5em">{{nums+1}}、{{option.content}}</span>
                                </el-radio>

                            </div>
                            <!-- 多选 -->
                            <div v-if="!item.isSingleChoice" class="divMargin choiceOption" v-for="(option,nums) in item.choiceOptions" :key="nums">
                                <el-checkbox v-model="solutions[index].answerOptions[nums].answerBool">
                                    <!-- 多选题向solution中的列表项存入了对应项是否选择的bool值，提交前需进行数据包装-->
                                    <span style="margin-left: 0.5em">{{nums+1}}、{{option.content}}</span>
                                </el-checkbox>
                            </div>
                        </div>
                        <!-- 填空题 -->
                        <div v-else-if="item.subjectType === 2">
                            <!-- 题目 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">题目</el-tag>
                                <span v-html="item.filling.content">{{item.filling.content}}</span>
                            </div>
                            <!-- 答案 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">回答：</el-tag>
                                <div class="fillingBlank" v-for="(option,nums) in solutions[index].answerOptions" :key="nums">
                                    <el-row>
                                        <el-col :span="1" style="position: relative">
                                            <div class="fillingBlankNum">答案{{nums+1}}</div>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-input v-model="option.answer"></el-input>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <!-- 判断题 -->
                        <div v-else-if="item.subjectType === 3">
                            <!-- 题目 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">题目</el-tag>
                                <span v-html="item.trueFalse.content">{{item.trueFalse.content}}</span>
                            </div>
                            <!-- 答案 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">回答：</el-tag>
                                <el-switch v-model="solutions[index].answerBool" active-text="对" inactive-text="错"></el-switch>
                            </div>
                        </div>
                        <!-- 简答题 -->
                        <div v-else-if="item.subjectType === 4">
                            <!-- 题目 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">题目</el-tag>
                                <span v-html="item.questionAnswer.content">{{item.questionAnswer.content}}</span>
                            </div>
                            <!-- 输入答案 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">回答：</el-tag>
                                <ckeditor4 style="margin-top: 0.5em" v-model="solutions[index].answer"></ckeditor4>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <!-- 考试提交 -->
            <div id="submitSolution">
                <el-button :disabled="disabled" type="primary" class="conSubjectButton" @click="submitSolution(solutions)">提交答案</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import Ckeditor4 from "@/components/Ckeditor4";
    import StartLogicFlow from "@/components/myLogicFlow/StartLogicFlow";
    export default {
        name: "StuExamDoing",
        components:{
            Ckeditor4,
            StartLogicFlow
        },
        data(){
            return{
                user:{},                // 考生数据
                exam:{},                // 考试信息
                subjects:[],            // 试题集合
                solutions:[],           // 答案集合
                activeNames: [],        // 试题激活项
                disabled:false,         // 按钮禁用
                show:false,
                intervalId:0,           // 计时器id
                day:10,
                hour:10,
                minute:59,
                second:59
            }
        },
        created() {
            this.getUser();
            // 启动计时
            this.intervalId = setInterval(this.getHaveTime, 1000);
        },
        beforeRouteLeave(to,from,next){
            // 关闭计时器
            clearInterval(this.intervalId);
            next();
        },
        methods:{
            // 获取用户数据
            getUser(){
                this.$axios.get("/Users/isUserLogin").then((res)=>{
                    if(res.data.flag){
                        // 保存用户数据
                        this.user = res.data.data;
                        // 获取考生数据
                        this.getExam();
                    }else{
                        // 服务故障-跳转登陆界面
                        this.$router.push({name:'Login'});
                    }
                });
            },
            // 查询考试数据
            getExam(){
                let exam = {examId:this.$route.params.examId};
                this.$axios.post("/Exam/getExamById", exam).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.exam = res.data.data;
                        this.getSubject();
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
                        this.allShow();         // 全部展开
                        this.getSolutions();    // 获取答题数据
                    }else{
                        // 服务故障
                        this.$message.error("信息获取失败！");
                    }
                });
            },
            // 查询答题数据
            getSolutions(){
                let exam = {examId:this.exam.examId};
                this.$axios.post("/Answer/getAnswer",exam).then((res)=>{
                    if(res.data.flag){
                        if(res.data.data.length > 0){
                            // 已参与过该考试
                            this.solutions = res.data.data;
                            // 单选题数据处理
                            for(let i in this.solutions){
                                if(this.solutions[i].subjectType === 1 && this.solutions[i].answerNum === 1){
                                    this.solutions[i].answer = parseInt(this.solutions[i].answer);
                                }
                            }
                            // 禁用提交按钮
                            this.disabled = true;
                            this.show = true;
                        }else{
                            // 未参与考试
                            this.initSolutions();   // 初始化答案数据模型
                        }
                    }else{
                        this.$message.error(res.data.msg);
                    }
                });
            },
            // 初始化答案数据模型
            initSolutions(){
                this.solutions = [];
                // 每一道题目对应一个答案数据模型
                for(let i in this.subjects){
                    let subject = this.subjects[i]; // 获取题目数据
                    let solution = {                // 封装答案数据
                        answerId:undefined,
                        examId:this.exam.examId,
                        subjectType:subject.subjectType,
                        subjectId:subject.subjectId,
                        subjectNum:subject.subjectNum,
                        userId:this.user.userId,
                        answerNum:1,
                        answerOptions:[],
                        answer:'',
                        answerBool:false, // 判断题封装
                    }
                    // 不同的题型初始化不同的项数据
                    if(subject.subjectType === 1 && !subject.isSingleChoice){   // 多选题
                        solution.answerNum = subject.choiceOptions.length;      // 封装项数
                        for(let j in subject.choiceOptions){
                            // 选择题初始化选项对应答案时，通过answerBool传递数据，最后也应该通过answerBool转换为answer
                            this.$set(solution.answerOptions, j,
                                {answerId:undefined, num:subject.choiceOptions[j].num, answer:'0',answerBool:false})
                        }
                    }else if(subject.subjectType === 2){    // 填空题
                        solution.answerNum = subject.fillingBlanks.length;      // 封装项数
                        for(let j in subject.fillingBlanks){
                            this.$set(solution.answerOptions, j,
                                {answerId:undefined, num:subject.fillingBlanks[j].num, answer:''})
                        }
                    }
                    this.$set(this.solutions,i,solution);
                }
                this.show = true;
            },
            // 计算剩余时间
            getHaveTime(){
                let date = new Date();
                if(date > this.exam.endDate){
                    clearInterval(this.intervalId); // 关闭计时器
                    return '考试已结束'               // 显示考试已结束
                }
                let endDate = Date.parse(this.exam.endDate);
                let haveTime = (endDate - date.getTime())/1000;
                // console.log(haveTime);
                //这是剩余的所有秒数
                this.day = parseInt(haveTime / (24 * 3600)); //剩余天数
                this.hour = parseInt((haveTime) % (24 * 3600) / 3600); //剩余小时
                this.minute = parseInt((haveTime) % 3600 / 60); //剩余分钟
                this.second = parseInt((haveTime) % 60);  //剩余秒数
            },
            // 全部折叠
            allHidden(){
                this.activeNames = [];
            },
            // 全部展开
            allShow(){
                this.allHidden();
                /* 激活全部题组 */
                for(let i = 0;i<this.subjects.length;i++) this.$set(this.activeNames,i,i);
            },
            // 提交答案 - 完成答案数据组织和持久化
            submitSolution(solutions){
                // 数据封装
                for(let i in solutions){
                    switch(solutions[i].subjectType){
                        case 1: // 选择题
                            if(solutions[i].answerNum !== null){    // 多选题
                                for(let j in solutions[i].answerOptions){
                                    if(solutions[i].answerOptions[j].answerBool) {
                                        solutions[i].answerOptions[j].answer = '1';
                                    }else{
                                        solutions[i].answerOptions[j].answer = '0';
                                    }
                                }
                            }
                            break;
                        case 2: // 填空题不需要封装
                            break;
                        case 3: // 判断题
                            if(solutions[i].answerBool){
                                solutions[i].answer='1';
                            }else{
                                solutions[i].answer='0';
                            }
                            break;
                        case 4: // 简答题不需要封装
                            break;
                    }
                }
                this.$axios.post("/Answer/submitAnswer",solutions).then((res)=>{
                    if(res.data.flag){
                        this.$message.success("提交成功！");
                        // 考试结束处理  禁用提交按钮
                        this.disabled = true;
                    }else{
                        this.$message.error(res.data.msg);
                    }
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
    /* 截止时间 */
    #haveTime{
        color: #8f8f8f;
        margin-left: 5em;
    }
    /* 详情 */
    #examDetails{
        margin-top: 20px;
        margin-bottom: 20px;
    }
    /* 分割线 */
    ::v-deep.myDivider{
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
    /* 题型选择栏 */
    #controlSubject{
        text-align: right;
        margin-bottom: 0.6em;
    }
    /* 展开折叠按钮 */
    .conSubjectButton{
        right: 6em;
        position: relative;
    }
    .startLogicFlow{
        right: 80em;
        position: relative;
    }
    /**
     * 题目区
     */
    /* 题目序号 */
    .subjectNum{
        left: 1em;
        position: relative;
    }
    /* 标签整体 */
    .tagBox{
        left: 3em;
        width: 100em;
        position: absolute;
    }
    /*　题目标签　*/
    .subjectTag{
        margin: 0 0.4em;
    }
    /**
     * 内容区
     */
    .divMargin{
        margin: 0.5em 0
    }
    /* 暂无题目 */
    #emptySubject{
        margin-left: 39vw;
        color:#8d8d8d;
        height:3em;
        line-height:2.5em;
        font-size: 16px
    }
    /* 内容区 */
    .subjectContent{
        width: 90%;
        font-size: 18px;
        left: 3em;
        position: relative;
    }
    /* 选择题选项 */
    .choiceOption{
        left: 1em;
        position: relative;
    }
    /* 填空题答案 */
    .fillingBlank{
        margin: 0.5em 0.5em;
    }
    /* 填空题序号 */
    .fillingBlankNum{
        position: relative;
        top: 0.3em;
        font-size: 14px;
        color: #646464
    }
    /* 提交栏 */
    #submitSolution{
        text-align: right;
        margin-top: 1em;
    }
</style>