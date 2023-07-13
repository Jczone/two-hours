<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--按钮-->
            <el-col :span="7">
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-button type="primary" plain @click="createExam">发布考试</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <!--搜索表单-->
            <el-col :span="7" :offset="9">
                <search-box @onSubmit="searchExam"></search-box>
            </el-col>
        </el-row>

        <!-- 创建考试表单 -->
        <el-dialog title="编辑考试"
                   v-if="showEditExam"
                   :visible.sync="showEditExam"
                   width="50%">
            <!-- 表单 -->
            <el-form :model="editExamData"
                     ref="createExamForm"
                     :rules="rules"
                     style="margin-right: 2em"
                     label-width="6em">
                <el-form-item label="名称" prop="title">
                    <el-input v-model="editExamData.title"></el-input>
                </el-form-item>
                <el-form-item label="详情">
                    <ckeditor4 v-model="editExamData.detail"></ckeditor4>
                </el-form-item>
                <el-form-item label="打乱题序">
                    <el-switch v-model="editExamData.notOrderBool"></el-switch>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                            v-model="editExamData.dateRange"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitExam(editExamData)">提交</el-button>
                    <el-button type="info" @click="showEditExam = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--　考试信息　-->
        <div>
            <template>
                <el-table
                        :data="examData"
                        style="width: 100%;"
                        @row-click="rowClick"
                        :row-class-name="tableRowClassName">
                    <el-table-column
                            label="序号"
                            type="index"
                            width="100"
                            align="center">
                    </el-table-column>

                    <el-table-column
                            prop="title"
                            label="名称"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            label="发布者"
                            align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="!isMyCreate(scope.row.authorId)" type="success">管理员</el-tag>
                            <el-tag v-else type="success">本人</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="打乱题序"
                            align="center"
                            style="position: relative">
                        <template slot-scope="scope">
                            <el-switch class="tableSwitch" v-model="scope.row.notOrderBool" @change="updateExamState(scope.row)"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="formatBeginDate"
                            label="开始日期"
                            align="center"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="formatEndDate"
                            label="截止日期"
                            align="center"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="formatCreateDate"
                            label="创建日期"
                            align="center"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" style="font-size: 16px" @click="editExam(scope.row)">
                                <i style="margin:0 0.2em" class="el-icon-edit"></i>编辑</el-button>
                            <el-button type="text" style="font-size: 16px" @click="editPaper(scope.row)">
                                <i style="margin:0 0.2em" class="el-icon-bank-card"></i>出题</el-button>
                            <el-button type="text" style="color: #afafaf;font-size: 16px" @click="deleteExam(scope.row)">
                                <i style="margin:0 0.2em" class="el-icon-delete"></i>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>

        <!-- 分页工具条 数据小于10条不展示 -->
        <el-pagination
                id="pageBar"
                v-show="totalCount >= 10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
        </el-pagination>
    </div>
</template>

<script>
    import SearchBox from "@/components/SearchBox";
    import Ckeditor4 from "@/components/Ckeditor4";
    export default {
        name: "ExamTab",
        components:{
            SearchBox,
            Ckeditor4
        },
        data(){
            return{
                user:'',
                // 当前页码
                currentPage: 1,
                // 分页大小
                pageSize: 10,
                // 总页码数
                totalCount: 1,
                // 内置查询模型
                searchTitle:{
                    title:'',
                },
                // 创建考试数据模型
                editExamData:{
                    examId:undefined,
                    type:3,
                    title:'',
                    detail:'',
                    notOrderBool:false,
                    notOrder:0,
                    beginDate:null,
                    endDate:null,
                    dateRange:[],
                },
                // 表单校验规则
                rules: {
                    title: [
                        { required: true, message: '请输入考试名称', trigger: 'blur' }
                    ],
                },
                // 考试数据
                examData:[],
                // 考试创建区展示
                showEditExam:false,
                // 考试编辑状态
                isEditStatue:false,
            }
        },
        created() {
            this.getUser();
            this.getExam();
        },
        methods:{
            // 获取用户数据
            getUser(){
                this.$axios.get("/Users/isUserLogin").then((res)=>{
                    if(res.data.flag){
                        // 保存用户数据
                        this.user = res.data.data;
                    }else{
                        // 服务故障-跳转登陆界面
                        this.$router.push({name:'Login'});
                    }
                });
            },
            // 查询考试数据
            getExam(){
                this.searchTitle["pageSize"]=this.pageSize;
                this.searchTitle["currentPage"]=this.currentPage;
                this.$axios.post("/Exam/getExam",this.searchTitle).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.examData = res.data.data.records;
                        /* 保存分页数据 */
                        this.totalCount = res.data.data.total;
                        this.currentPage = res.data.data.current;
                        this.pageSize = res.data.data.size;
                    }else{
                        // 服务故障
                        this.$message.error("信息获取失败！");
                    }
                });
            },
            // 创建考试
            createExam(){
                // 数据清理
                if(this.isEditStatue){
                    // 残存的编辑状态
                    // 在用户未提交编辑内容时，会停留在编辑状态，故要状态重置
                    this.resetFormData();
                    this.isEditStatue = false;
                }
                this.showEditExam = true;
            },
            // 发布考试
            submitExam(exam){
                // 规则校验
                this.$refs['createExamForm'].validate((valid) => {
                    if (valid && this.editExamData.dateRange !== null) {
                        if(exam.dateRange.length === 0){
                            this.$message.error("必须指定起止日期");
                            return;
                        }
                        // 校验完成 - 组织数据
                        exam.notOrder= exam.notOrderBool ? 1:0;
                        exam.type = 3;  // 考试类型
                        // 时间分配
                        exam.beginDate = exam.dateRange[0];
                        exam.endDate = exam.dateRange[1];
                        if(this.isEditStatue){
                            // 编辑表单状态，通过examId更新数据
                            this.$axios.post("/Exam/updateExam",exam).then((res)=>{
                                if(res.data.flag){
                                    this.$message.success(res.data.msg);
                                    // 关闭窗口
                                    this.showEditExam = false;
                                    // 关闭编辑状态
                                    this.isEditStatue = false;
                                    // 重置表单
                                    this.resetFormData();
                                    // 刷新数据
                                    this.getExam();
                                }else{
                                    this.$message.error(res.data.msg);
                                }
                            })
                        }else{
                            // 清空无用的id
                            exam.examId = undefined;
                            // 创建表单状态，创建一条新数据
                            this.$axios.post("/Exam/createExam",exam).then((res)=>{
                                if(res.data.flag){
                                    this.$message.success(res.data.msg);
                                    // 关闭窗口
                                    this.showEditExam = false;
                                    // 重置表单
                                    this.resetFormData();
                                    // 刷新数据
                                    this.getExam();
                                }else{
                                    this.$message.error(res.data.msg);
                                }
                            })
                        }
                    }else{
                        // 校验失败
                        this.$message.warning("请将考试名称填写完整");
                    }
                });
            },
            // 重置表单
            resetFormData(){
                this.editExamData.examId = undefined;
                this.editExamData.title = '';
                this.editExamData.detail = '';
                this.editExamData.notOrderBool = false
                this.editExamData.beginDate = null;
                this.editExamData.dateRange = [];
                this.editExamData.endDate = null;
                this.editExamData.type = 3;
                this.editExamData.notOrder = 0;
            },
            // 提交搜索
            searchExam(title){
                this.searchTitle.title = title;
                this.getExam();
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
            // 当某行数据被点击
            rowClick(row,column){
                if(column.label === '操作' || column.label === '打乱题序')return;
                // 打开考试信息统计页-展示考试完成情况和数据统计
                this.$router.push({
                    name:'ExamInfoView',
                    params:{
                        examId:row.examId,
                    }
                })
            },
            // 是否为教师发布
            isMyCreate(id){
                if(this.user.userId === id){
                    return true;
                }else{
                    return false;
                }
            },
            // 更新考试状态
            updateExamState(exam){
                exam.notOrder = exam.notOrderBool ? 1:0;
                let newExam = {
                    examId:exam.examId,
                    notOrder:exam.notOrder,
                }
                this.$axios.post("/Exam/updateInfo",newExam).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                        this.$message.success(res.data.msg);
                    }else{
                        // 服务故障
                        this.$message.error(res.data.msg);
                    }
                });
            },
            // 编辑考试信息
            editExam(row){
                // 检查考试是否开启
                let currentDate = new Date();
                if(currentDate > Date.parse(row.beginDate)){
                    // 弹框确认
                    this.$confirm('该考试已经开启, 继续编辑可能造成数据错误，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                       this.initEditExam(row);
                    }).catch(() => {
                        // 取消删除
                        this.$message.info('取消编辑');
                    });
                }else{
                   this.initEditExam(row);
                }
            },
            // 初始化编辑信息
            initEditExam(row){
                // 初始化数据
                this.editExamData.examId = row.examId;
                this.editExamData.title = row.title;
                this.editExamData.detail = row.detail;
                this.editExamData.notOrderBool = row.notOrderBool;
                this.editExamData.dateRange = [row.beginDate,row.endDate];
                this.editExamData.beginDate = row.beginDate;
                this.editExamData.endDate = row.endDate;
                this.editExamData.type = 3;
                this.editExamData.notOrder = row.notOrder;
                // 启动编辑表单
                this.showEditExam = true;
                // 启动编辑状态
                this.isEditStatue = true;
            },
            // 考试出题
            editPaper(row){
                // 打开考试信息统计页-展示考试完成情况和数据统计
                this.$router.push({
                    name:'ExamPaperManage',
                    params:{
                        examId:row.examId,
                    }
                })
            },
            // 删除考试
            deleteExam(row){
                // 弹框确认
                this.$confirm('此操作将删除该考试及相关数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let exam = {examId:row.examId};
                    // 执行删除
                    this.$axios.post("/Exam/deleteExamById",exam).then(resp=>{
                        if(resp.data.flag){
                            // 删除成功，刷新数据
                            this.getExam();
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
            // 分页大小变化
            handleSizeChange(val) {
                this.pageSize = val;
                // 查询所有考试
                this.getExam();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.currentPage = val;
                // 查询所有考试
                this.getExam();
            },
        }
    }
</script>

<style scoped>
    /* 表格字体 */
    .el-table{
        font-size: 17px;
    }
    /* 选择开关 */
    .tableSwitch{
        position: relative;
        bottom: 0.1em;
    }

</style>