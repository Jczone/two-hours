<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--按钮-->
            <el-col :span="7">
                <el-row>
                    <el-col :span="22" :offset="1">
                        <TableExport style="margin-left: 1em;" table-id="user-table"></TableExport>
                    </el-col>
                </el-row>
            </el-col>
            <!--搜索表单-->
            <el-col :span="7" :offset="9">
                <search-box @onSubmit="searchOnSubmit"></search-box>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <template>
            <el-table
                    id="user-table"
                    v-loading="loading"
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                        label="序号"
                        type="index"
                        align="center"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="resDlNum"
                        label="课件下载次数"
                        align="center"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="discussionCreateNum"
                        label="创建讨论数"
                        align="center"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="chapterViewTime"
                        label="章节观看时长"
                        align="center"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="chapterViewNum"
                        label="章节观看次数"
                        align="center"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="replyNum"
                        label="发表回复数"
                        align="center"
                        sortable>
                </el-table-column>
                <el-table-column
                        prop="formatDateShort"
                        label="加入时间"
                        align="center"
                        sortable>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="deleteRow(scope.row.id)">移出课堂</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--分页工具条 数据小于10条不展示-->
        <el-pagination
                class="pageBar"
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
    import TableExport from "@/components/TableExport";
    export default {
        name: "UserManage",
        components:{
            TableExport,
            SearchBox,
        },
        data(){
            return{
                // 课程数据
                course:'',
                // 加载动画
                loading:false,
                // 当前页码
                currentPage: 1,
                // 分页大小
                pageSize: 10,
                // 总页码数
                totalCount: 1,
                // 查询表单
                searchForm:{
                    title:'',
                },
                // 内置查询表单
                searchFormIn:{
                    title:'',
                },
                // 表格数据
                tableData:[],
            }
        },
        created() {
            this.getCourse();
            // 开启加载动画
            this.loading = true;
            // 查询数据
            this.getData();
        },
        methods:{
            // 获取课程信息
            getCourse(){
                let course = {courseId: this.$route.params.courseId};
                this.$axios.post("/CourseView/getCourseInfoById", course).then((res)=>{
                    if(res.data.flag){
                        // 保存用户数据
                        this.course = res.data.data;
                    }else{
                        // 服务故障
                        this.$message.error("数据拉取失败！");
                    }
                });
            },
            // 获取文件数据
            getData(){
                this.searchFormIn["pageSize"]=this.pageSize;
                this.searchFormIn["currentPage"]=this.currentPage;
                this.$axios.post('/CourseUser/getPageByCondition',this.searchFormIn).then((res)=>{
                    if(res.data.flag){
                        /* 保存查询数据 */
                        this.tableData = res.data.data.records;
                        /* 保存分页数据 */
                        this.totalCount = res.data.data.total;
                        this.currentPage = res.data.data.current;
                        this.pageSize = res.data.data.size;
                        /* 关闭加载动画 */
                        setTimeout(()=>{this.loading=false;},200);
                    }else{
                        // 服务故障
                        this.$message.error("信息获取失败！");
                    }
                });
            },
            // 表格颜色控制
            tableRowClassName({rowIndex}) {
                if (rowIndex%4 === 1) {
                    return 'warning-row';
                } else if (rowIndex%4 === 3) {
                    return 'success-row';
                }
                return '';
            },
            // 搜索表单
            searchOnSubmit(title){
                this.searchFormIn.title = title;
                this.getData();
                /* 清空搜索条件 */
                this.searchForm.title='';
            },
            // 删除数据
            deleteRow(id){
                // 弹框确认
                this.$confirm('此操作将永久删除该用户及其相关数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 执行删除
                    this.$axios.get('/CourseUser/deleteById/' + id).then(resp=>{
                        if(resp.data.flag){
                            // 删除成功，刷新数据
                            this.getData();
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
            //分页大小变化
            handleSizeChange(val) {
                this.pageSize = val;
                // 查询所有数据
                this.getData();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.currentPage = val;
                // 查询所有数据
                this.getData();
            }
        }
    }
</script>

<style scoped>
    ::v-deep .el-tabs__item {
        font-size: 16px;
    }
    /* 表格文字大小 */
    .el-table{
        font-size: 17px;
    }
    /* 分页工具条上框 */
    .pageBar{
        margin-top: 20px;
    }
</style>