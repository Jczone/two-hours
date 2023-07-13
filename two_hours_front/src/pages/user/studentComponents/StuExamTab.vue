<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--搜索表单-->
            <el-col :span="7" :offset="16">
                <search-box @onSubmit="searchExam"></search-box>
            </el-col>
        </el-row>

        <!--　考试信息　-->
        <div>
            <template>
                <el-table
                        :data="examData"
                        style="width: 100%"
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
                            align="center"
                            width="700">
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
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" style="font-size: 16px" @click="showMyScore(scope.row)">查看结果</el-button>
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
                :page-sizes="[5, 10, 15, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
        </el-pagination>
    </div>
</template>

<script>
    import SearchBox from "@/components/SearchBox";
    export default {
        name: "ExamTab",
        components:{
            SearchBox,
        },
        data(){
            return{
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
                // 考试数据
                examData:[],
            }
        },
        created() {
            this.getExam();
        },
        methods:{
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
                if(column.label === '操作')return;
                // 检查考试是否开始
                let currentDate = new Date();
                // Date.parse将字符串转为日期类，否则无法比较
                if(currentDate > Date.parse(row.beginDate) && currentDate < Date.parse(row.endDate)){
                    // 打开考试页面
                    this.$router.push({
                        name:'StuExamDoing',
                        params:{
                            examId:row.examId,
                        }
                    })
                }else{
                    this.$message.error("考试未开放！");
                }
            },
            // 查看考试结果
            showMyScore(row){
                // 检查考试是否结束
                let currentDate = new Date();
                if(currentDate > Date.parse(row.endDate)){
                    // 打开结果查看页面
                    this.$router.push({
                        name:'StuExamScore',
                        params:{
                            examId:row.examId,
                        }
                    })
                }else{
                    this.$message.error("考试结束后才能查看考试结果");
                }
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

</style>