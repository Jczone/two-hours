<template>
    <div>
        <!-- 讨论详情 -->
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
        <!-- 分割区 -->
        <div class="myDivider"></div>
        <!-- 题目区 -->
        <el-card id="subjectCard">
            <!-- 题目创建选择器 -->
            <div id="createSubject">
                <span id="addSubjectTitle">添加题目</span>
                <span class="addSubjectButton"><el-button type="primary" @click="addChoice" round plain>选择题</el-button></span>
                <span class="addSubjectButton"><el-button type="primary" @click="addFilling" round plain>填空题</el-button></span>
                <span class="addSubjectButton"><el-button type="primary" @click="addTrueFalse" round plain>判断题</el-button></span>
                <span class="addSubjectButton"><el-button type="primary" @click="addQuestionAnswer" round plain>简答题</el-button></span>
                <el-button type="text" class="conSubjectButton" @click="allHidden">全部折叠</el-button>
                <el-button type="text" class="conSubjectButton" @click="allShow">全部展开</el-button>
            </div>
            <!-- 题目区 -->
            <el-collapse v-model="activeNames" @change="handleChange">
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
                            <!-- 选项 -->
                            <div class="divMargin choiceOption" v-for="(option,nums) in item.choiceOptions" :key="nums">
                                {{nums+1}}、 {{option.content}}
                                <el-tag type="success" v-if="option.isAnswerBool">答案</el-tag>
                            </div>
                            <!-- 答案和解析 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">解析</el-tag>
                                <span v-html="item.choice.analysis">{{item.choice.analysis}}</span>
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
                                <el-tag class="subjectTag">答案</el-tag>
                                <div class="fillingBlank" v-for="(blank,nums) in item.fillingBlanks" :key="nums">
                                   {{nums+1}}、{{blank.content}}
                                </div>
                            </div>
                            <!-- 解析 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">解析</el-tag>
                                <span v-html="item.filling.analysis">{{item.filling.analysis}}</span>
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
                                <el-tag class="subjectTag">答案</el-tag>
                                <span>{{item.trueFalse.answerStr}}</span>
                            </div>
                            <!-- 答案和解析 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">解析</el-tag>
                                <span v-html="item.trueFalse.analysis">{{item.trueFalse.analysis}}</span>
                            </div>
                        </div>
                        <!-- 简答题 -->
                        <div v-else-if="item.subjectType === 4">
                            <!-- 题目 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">题目</el-tag>
                                <span v-html="item.questionAnswer.content">{{item.questionAnswer.content}}</span>
                            </div>
                            <!-- 答案 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">答案</el-tag>
                                <span v-html="item.questionAnswer.answer">{{item.questionAnswer.answer}}</span>
                            </div>
                            <!-- 答案和解析 -->
                            <div class="divMargin">
                                <el-tag class="subjectTag">解析</el-tag>
                                <span v-html="item.questionAnswer.analysis">{{item.questionAnswer.analysis}}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 功能区 -->
                    <div style="text-align: right">
                        <!-- 编辑按钮 -->
                        <span class="editSubjectButton" @click="editSubject(item)"><i class="el-icon-edit"></i></span>
                        <!-- 删除按钮 -->
                        <span class="deleteSubjectButton" @click="deleteSubject(item)"><i class="el-icon-delete"></i></span>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        <!-- 添加试题 -->
        <el-dialog :title="dialogTitle"
                   v-if="showEditSubject"
                   :visible.sync="showEditSubject"
                   width="50%">
            <!-- 表单 -->
            <el-form :model="editSubjectData"
                     ref="editSubjectForm"
                     style="margin-right: 2em"
                     label-width="6em">
                <!-- 选择题面板 -->
                <div v-if="editSubjectData.subjectType === 1">
                    <!-- 分值 -->
                    <el-form-item label="分值">
                        <el-row>
                            <el-col :span="2"><el-input v-model="editSubjectData.choice.score" ></el-input></el-col>
                            <el-col :span="2"><span style="margin-left: 0.5em">分</span></el-col>
                        </el-row>
                    </el-form-item>
                    <!-- 题目 -->
                    <el-form-item label="题目">
                        <ckeditor4 v-model="editSubjectData.choice.content"></ckeditor4>
                    </el-form-item>
                    <!-- 选项列表 -->
                    <el-form-item :label="'选项 '+(index+1)" v-for="(option,index) in editSubjectData.choiceOptions" :key="index">
                        <el-row>
                            <el-col :span="4">
                                <el-checkbox v-model="editSubjectData.choiceOptions[index].isAnswerBool" label="设为答案" border></el-checkbox>
                            </el-col>
                            <el-col :span="10"> <el-input v-model="editSubjectData.choiceOptions[index].content"></el-input></el-col>
                            <el-col :span="2">
                                <el-button type="danger" style="margin-left: 1em" icon="el-icon-delete" plain @click="deleteOption(index)"></el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <!-- 添加选项 -->
                    <el-form-item>
                        <el-button type="primary" @click="addOption" round plain>添加选项</el-button>
                    </el-form-item>
                    <!-- 解析 -->
                    <el-form-item label="解析">
                        <ckeditor4 v-model="editSubjectData.choice.analysis"></ckeditor4>
                    </el-form-item>
                </div>
                <!-- 填空题面板 -->
                <div v-if="editSubjectData.subjectType === 2">
                    <!-- 分值 -->
                    <el-form-item label="分值">
                        <el-row>
                            <el-col :span="2"><el-input v-model="editSubjectData.filling.score" ></el-input></el-col>
                            <el-col :span="2"><span style="margin-left: 0.5em">分</span></el-col>
                        </el-row>
                    </el-form-item>
                    <!-- 功能 -->
                    <el-form-item label="功能">
                        <el-row>
                            <el-col :span="4"><el-switch v-model="editSubjectData.filling.isOrderBool" active-text="答案有序"></el-switch></el-col>
                            <el-col :span="4"><el-switch v-model="editSubjectData.filling.isCapitalBool" active-text="大写区分"></el-switch></el-col>
                        </el-row>
                    </el-form-item>
                    <!-- 题目 -->
                    <el-form-item label="题目">
                        <ckeditor4 v-model="editSubjectData.filling.content"></ckeditor4>
                    </el-form-item>
                    <!-- 选项列表 -->
                    <el-form-item :label="'空项 '+(index+1)" v-for="(option,index) in editSubjectData.fillingBlanks" :key="index">
                        <el-row>
                            <el-col :span="10"> <el-input v-model="editSubjectData.fillingBlanks[index].content"></el-input></el-col>
                            <el-col :span="2">
                                <el-button type="danger" style="margin-left: 1em" icon="el-icon-delete" plain @click="deleteBlank(index)"></el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <!-- 添加选项 -->
                    <el-form-item>
                        <el-button type="primary" @click="addBlank" round plain>添加空项</el-button>
                    </el-form-item>
                    <!-- 解析 -->
                    <el-form-item label="解析">
                        <ckeditor4 v-model="editSubjectData.filling.analysis"></ckeditor4>
                    </el-form-item>
                </div>
                <!-- 判断题面板 -->
                <div v-if="editSubjectData.subjectType === 3">
                    <!-- 分值 -->
                    <el-form-item label="分值">
                        <el-row>
                            <el-col :span="2"><el-input v-model="editSubjectData.trueFalse.score" ></el-input></el-col>
                            <el-col :span="2"><span style="margin-left: 0.5em">分</span></el-col>
                        </el-row>
                    </el-form-item>
                    <!-- 题目 -->
                    <el-form-item label="题目">
                        <ckeditor4 v-model="editSubjectData.trueFalse.content"></ckeditor4>
                    </el-form-item>
                    <!-- 答案 -->
                    <el-form-item label="答案">
                        <el-switch v-model="editSubjectData.trueFalse.answerBool" active-text="对" inactive-text="错"></el-switch>
                    </el-form-item>
                    <!-- 解析 -->
                    <el-form-item label="解析">
                        <ckeditor4 v-model="editSubjectData.trueFalse.analysis"></ckeditor4>
                    </el-form-item>
                </div>
                <!-- 简答题面板 -->
                <div v-if="editSubjectData.subjectType === 4">
                    <!-- 分值 -->
                    <el-form-item label="分值">
                        <el-row>
                            <el-col :span="2"><el-input v-model="editSubjectData.questionAnswer.score" ></el-input></el-col>
                            <el-col :span="2"><span style="margin-left: 0.5em">分</span></el-col>
                        </el-row>
                    </el-form-item>
                    <!-- 题目 -->
                    <el-form-item label="题目">
                        <ckeditor4 v-model="editSubjectData.questionAnswer.content"></ckeditor4>
                    </el-form-item>
                    <!-- 答案 -->
                    <el-form-item label="答案">
                        <ckeditor4 v-model="editSubjectData.questionAnswer.answer"></ckeditor4>
                    </el-form-item>
                    <!-- 解析 -->
                    <el-form-item label="解析">
                        <ckeditor4 v-model="editSubjectData.questionAnswer.analysis"></ckeditor4>
                    </el-form-item>
                </div>
                <!-- 提交表单 -->
                <el-form-item>
                    <el-button type="primary" @click="submitSubject(editSubjectData)">提交</el-button>
                    <el-button type="info" @click="cancleEdit">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import Ckeditor4 from "@/components/Ckeditor4";
    export default {
        name: "ExamPaperManage",
        components:{
            Ckeditor4,
        },
        data(){
            return{
                exam:{},                // 考试信息
                subjects:[],            // 试题集合
                activeNames: [],        // 试题激活项
                showEditSubject: false, // 编辑试题表单
                editSubjectData: {      // 编辑试题数据模型
                    // 基本信息
                    paperId:undefined,
                    subjectId:undefined,
                    subjectNum:undefined,
                    subjectType:undefined,
                    // 题目内容
                    choice:{},
                    filling:{},
                    questionAnswer:{},
                    trueFalse:{},
                    // 项数组
                    choiceOptions:[],
                    fillingBlanks:[],
                },
                // 试题编辑状态
                isEditStatue:false,
                // 对话框标题
                dialogTitle:''
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
                for(let i = 0;i<this.subjects.length;i++) this.$set(this.activeNames,i,i);
            },
            // 展示区变化
            handleChange(val){
                // console.log(val)
            },
            // 添加选择题
            addChoice(){
                // 检查考试是否开启
                let currentDate = new Date();
                if(currentDate < Date.parse(this.exam.beginDate)){
                    // 数据清理
                    if(this.isEditStatue){
                        // 残存的编辑状态
                        // 在用户未提交编辑内容时，会停留在编辑状态，故要状态重置
                        this.resetForm();
                        this.isEditStatue = false;
                    }
                    // 确定题型并初始化题型数据-已有对应题目数据则不再初始化
                    if(this.editSubjectData.subjectType !== 1){
                        this.editSubjectData.subjectType = 1;   // 选择题
                        if(this.subjects.length>0) { // 题号增加
                            this.editSubjectData.subjectNum = this.subjects[this.subjects.length-1].subjectNum+1;
                        }else{
                            this.editSubjectData.subjectNum = 1;
                        }
                        this.editSubjectData.choice = {         // 题目数据初始化
                            content:'',
                            answerNum:4,
                            analysis:'',
                            score:5,
                        }
                        this.editSubjectData.choiceOptions = [   // 选项列表默认4个选项
                            {num:1,content:'',isAnswer:0,isAnswerBool:false},
                            {num:2,content:'',isAnswer:0,isAnswerBool:false},
                            {num:3,content:'',isAnswer:0,isAnswerBool:false},
                            {num:4,content:'',isAnswer:0,isAnswerBool:false}
                        ];
                    }
                    // 启动表单
                    this.dialogTitle = "选择题";
                    this.showEditSubject = true;
                }else{
                    this.$message.warning("为保护数据安全，考试开启后将无法编辑试题");
                }
            },
            // 添加选项
            addOption(){
                let number = 0;
                if(this.editSubjectData.choiceOptions.length>0) {
                    number = this.editSubjectData.choiceOptions[this.editSubjectData.choiceOptions.length-1].num+1
                    this.editSubjectData.choice.answerNum++;
                }else{  // 无选项
                    number = 1;
                    this.editSubjectData.choice.answerNum = 1;
                }
                this.$set(this.editSubjectData.choiceOptions,this.editSubjectData.choiceOptions.length,
                    {num: number, content:'', isAnswer:0, isAnswerBool:false})
            },
            // 移除选项
            deleteOption(index){
                this.$delete(this.editSubjectData.choiceOptions,index);
                this.editSubjectData.choice.answerNum--;
            },
            // 添加填空题
            addFilling(){
                // 检查考试是否开启
                let currentDate = new Date();
                if(currentDate < Date.parse(this.exam.beginDate)){
                    // 数据清理
                    if(this.isEditStatue){
                        // 残存的编辑状态
                        // 在用户未提交编辑内容时，会停留在编辑状态，故要状态重置
                        this.resetForm();
                        this.isEditStatue = false;
                    }
                    // 确定题型并初始化题型数据-已有对应题目数据则不再初始化
                    if(this.editSubjectData.subjectType !== 2){
                        this.editSubjectData.subjectType = 2;   // 填空题
                        if(this.subjects.length>0) { // 题号增加
                            this.editSubjectData.subjectNum = this.subjects[this.subjects.length-1].subjectNum+1;
                        }else{
                            this.editSubjectData.subjectNum = 1;
                        }
                        this.editSubjectData.filling = {         // 题目数据初始化
                            content:'',
                            answerNum:1,
                            analysis:'',
                            score:5,
                            isOrder:0,
                            isCapital:0,
                            isOrderBool:false,
                            isCapitalBool:false,
                        }
                        this.editSubjectData.fillingBlanks = [   // 填空默认一个答案
                            {num:1,content:''},
                        ];
                    }
                    // 启动表单
                    this.dialogTitle = "填空题";
                    this.showEditSubject = true;
                }else{
                    this.$message.warning("为保护数据安全，考试开启后将无法编辑试题");
                }
            },
            // 添加空项
            addBlank(){
                let number = 0;
                if(this.editSubjectData.fillingBlanks.length>0) {
                    number = this.editSubjectData.fillingBlanks[this.editSubjectData.fillingBlanks.length-1].num+1
                    this.editSubjectData.filling.answerNum++;
                }else{  // 无选项
                    number = 1;
                    this.editSubjectData.filling.answerNum = 1;
                }
                this.$set(this.editSubjectData.fillingBlanks,this.editSubjectData.fillingBlanks.length,
                    {num:number, content:''})
            },
            // 移除空项
            deleteBlank(index){
                this.$delete(this.editSubjectData.fillingBlanks,index);
                this.editSubjectData.filling.answerNum--;
            },
            // 添加判断题
            addTrueFalse(){
                // 检查考试是否开启
                let currentDate = new Date();
                if(currentDate < Date.parse(this.exam.beginDate)){
                    // 数据清理
                    if(this.isEditStatue){      // 残存的编辑状态
                        // 在用户未提交编辑内容时，会停留在编辑状态，故要状态重置
                        this.resetForm();
                        this.isEditStatue = false;
                    }
                    // 确定题型并初始化题型数据-已有对应题目数据则不再初始化
                    if(this.editSubjectData.subjectType !== 3){
                        this.editSubjectData.subjectType = 3;   // 判断题
                        if(this.subjects.length>0) { // 题号增加
                            this.editSubjectData.subjectNum = this.subjects[this.subjects.length-1].subjectNum+1;
                        }else{
                            this.editSubjectData.subjectNum = 1;
                        }
                        this.editSubjectData.trueFalse = {      // 题目数据初始化
                            content:'',
                            answer:'1',
                            analysis:'',
                            score:5,
                            answerStr:'是',  // 默认答案正确
                            answerBool:true,
                        }
                    }
                    // 启动表单
                    this.dialogTitle = "判断题";
                    this.showEditSubject = true;
                }else{
                    this.$message.warning("为保护数据安全，考试开启后将无法编辑试题");
                }
            },
            // 添加简答题
            addQuestionAnswer(){
                // 检查考试是否开启
                let currentDate = new Date();
                if(currentDate < Date.parse(this.exam.beginDate)){
                    // 数据清理
                    if(this.isEditStatue){
                        // 残存的编辑状态
                        // 在用户未提交编辑内容时，会停留在编辑状态，故要状态重置
                        this.resetForm();
                        this.isEditStatue = false;
                    }
                    // 确定题型并初始化题型数据-已有对应题目数据则不再初始化
                    if(this.editSubjectData.subjectType !== 4){
                        this.editSubjectData.subjectType = 4;   // 简答题
                        if(this.subjects.length>0) { // 题号增加
                            this.editSubjectData.subjectNum = this.subjects[this.subjects.length-1].subjectNum+1;
                        }else{
                            this.editSubjectData.subjectNum = 1;
                        }
                        this.editSubjectData.questionAnswer = {         // 题目数据初始化
                            content:'',
                            answer:'',
                            analysis:'',
                            score:10,
                        }
                    }
                    // 启动表单
                    this.dialogTitle = "简答题";
                    this.showEditSubject = true;
                }else{
                    this.$message.warning("为保护数据安全，考试开启后将无法编辑试题");
                }
            },
            // 编辑题目
            editSubject(subject){
                // 检查考试是否开启
                let currentDate = new Date();
                if(currentDate < Date.parse(this.exam.beginDate)){
                    this.editSubjectData.paperId = subject.paperId;
                    this.editSubjectData.subjectId = subject.subjectId;
                    this.editSubjectData.subjectType = subject.subjectType;
                    this.editSubjectData.subjectNum = subject.subjectNum;
                    switch (subject.subjectType) {
                        case 1: // 选择
                            this.editSubjectData.choice = subject.choice;
                            this.editSubjectData.choiceOptions = subject.choiceOptions;
                            this.dialogTitle = "选择题";
                            this.isEditStatue = true;   // 启动编辑模式
                            break;
                        case 2: // 填空
                            this.editSubjectData.filling = subject.filling;
                            this.editSubjectData.fillingBlanks = subject.fillingBlanks;
                            this.dialogTitle = "填空题";
                            this.isEditStatue = true;   // 启动编辑模式
                            break;
                        case 3: // 判断
                            this.editSubjectData.trueFalse = subject.trueFalse;
                            this.dialogTitle = "判断题";
                            this.isEditStatue = true;   // 启动编辑模式
                            break;
                        case 4: // 简答
                            this.editSubjectData.questionAnswer = subject.questionAnswer;
                            this.dialogTitle = "简答题";
                            this.isEditStatue = true;   // 启动编辑模式
                            break;
                    }
                    this.showEditSubject = true;        // 打开对话框
                }else{
                    this.$message.warning("为保护数据安全，考试开启后将无法编辑试题");
                }
            },
            // 删除题目
            deleteSubject(subject){
                // 检查考试是否开启
                let currentDate = new Date();
                if(currentDate < Date.parse(this.exam.beginDate)){
                    // 弹框确认
                    this.$confirm('此操作将删除该题目, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let paper = {paperId:subject.paperId};
                        // 执行删除
                        this.$axios.post("/Paper/deletePaperById",paper).then(res=>{
                            if(res.data.flag){
                                // 删除成功，刷新数据
                                this.getSubject();
                                this.$message.success('删除成功！');
                            }else{
                                this.$message.error('删除失败！');
                            }
                        })
                    }).catch(() => {
                        // 取消删除
                        this.$message.info('取消删除');
                    });
                }else{
                    this.$message.warning("为保护数据安全，考试开启后将无法编辑试题");
                }
            },
            // 试题编辑提交
            submitSubject(subjectOrg){
                // 数据处理
                if(subjectOrg.subjectType === 1){ // bool类型转换
                    for(let i in subjectOrg.choiceOptions){
                        if(subjectOrg.choiceOptions[i].isAnswerBool){
                            subjectOrg.choiceOptions[i].isAnswer = 1;
                        }
                        else {
                            subjectOrg.choiceOptions[i].isAnswer = 0;
                        }
                    }
                }else if(subjectOrg.subjectType === 2){
                    subjectOrg.filling.isOrder = subjectOrg.filling.isOrderBool ? 1:0;
                    subjectOrg.filling.isCapital = subjectOrg.filling.isCapitalBool ? 1:0;
                }else if(subjectOrg.subjectType === 3){
                    subjectOrg.trueFalse.answer = subjectOrg.trueFalse.answerBool ? '1':'0';
                }
                // 封装数据
                let subjectInfo = {subject:subjectOrg,examId:this.exam.examId};
                // 提交状态
                if(this.isEditStatue){  // 编辑题目状态，通过id更新题目
                    this.$axios.post("/Paper/updatePaper",subjectInfo).then((res)=>{
                        if(res.data.flag){
                            this.getSubject();          // 刷新数据
                            this.$message.success(res.data.msg);
                            this.resetForm();           // 重置表单
                            this.isEditStatue = false;  // 关闭编辑状态
                            this.showEditSubject = false;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                }else{  // 创建题目状态
                    this.$axios.post("/Paper/createPaper",subjectInfo).then((res)=>{
                        if(res.data.flag){
                            this.getSubject();          // 刷新数据
                            this.$message.success(res.data.msg);
                            this.resetForm();           // 重置表单
                            this.showEditSubject = false;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                }
            },
            // 取消试题编辑
            cancleEdit(){
               this.showEditSubject = false;
               this.resetForm();
            },
            // 重置表单
            resetForm(){
                this.editSubjectData.paperId = undefined;
                this.editSubjectData.subjectId = undefined;
                this.editSubjectData.subjectNum = undefined;
                this.editSubjectData.subjectType = undefined;
                this.editSubjectData.choice = {};
                this.editSubjectData.filling = {};
                this.editSubjectData.questionAnswer = {};
                this.editSubjectData.trueFalse = {};
                this.editSubjectData.choiceOptions = [];
                this.editSubjectData.fillingBlanks = [];
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
    ::v-deep.myDivider{
        margin: 2em 0;
    }
    /**
     * 题型栏
     */
    /* 题目卡片区 */
    #subjectCard{
        padding: 0;
        position: relative;
    }
    /* 题型选择栏 */
    #createSubject{
        text-align: center;
        margin-bottom: 1.2em;
    }
    /* 添加题目标题 */
    #addSubjectTitle{
        font-size: 15px;
        margin:0 1.5em;
        color: #8c8c8c;
    }
    /* 添加题目按钮 */
    .addSubjectButton{
        margin:0 1.5em;
    }
    /**
     * 题目区
     */
    /* 展开折叠按钮 */
    .conSubjectButton{
        left: 23em;
        position: relative;
    }——
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
        margin: 0 0.5em;
    }
    /* */


    /**
     * 功能区
     */
    /* 编辑题目按钮 */
    .editSubjectButton{
        color:#3a75ff;
        right: 5em;
        position: relative;
        font-size: 1.2em;
    }
    .editSubjectButton:hover{
        cursor: pointer;
    }
    /* 删除题目按钮 */
    .deleteSubjectButton{
        color: #ff3a3a;
        right: 4em;
        position: relative;
        font-size: 1.2em;
    }
    .deleteSubjectButton:hover{
        cursor: pointer;
    }
</style>