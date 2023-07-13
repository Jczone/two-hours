<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="position: relative; height: 90px">
            <!--搜索表单-->
            <el-col :span="8">
                <el-form :inline="true" :model="searchTitle" id="file-form-select">
                    <el-form-item label="搜索内容">
                        <el-input v-model="searchTitle.courseName" placeholder="名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchOnSubmit(searchTitle.courseName)">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="searchOnSubmit('')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <!--表格-->
        <template>
            <el-table
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
                        prop="courseName"
                        label="名称"
                        align="center"
                        sortable
                        width="400">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="创建者"
                        align="center"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="状态"
                        align="center" style="position: relative">
                    <template slot-scope="scope">
                        <span style="margin-right: 0.5em">{{scope.row.isStartStr}}</span>
                        <el-switch class="tableSwitch" v-model="scope.row.isStartBool" @change="updateCourseState(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="formatDate"
                        label="创建日期"
                        align="center"
                        sortable>
                </el-table-column>

                <el-table-column
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" style="font-size: 16px" @click="courseManage(scope.row)">
                            <i style="margin:0 0.2em" class="el-icon-menu"></i>管理</el-button>
                        <el-button type="text" style="color: #afafaf;font-size: 16px" @click="deleteCourse(scope.row)">
                            <i style="margin:0 0.2em" class="el-icon-delete"></i>删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </template>

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
    import Ckeditor4 from "@/components/Ckeditor4";
    export default {
        name: 'AdmCourseTab',
        components:{
            Ckeditor4,
        },
        data(){
            return{
                // 当前页码
                currentPage: 1,
                // 分页大小
                pageSize: 10,
                // 总页码数
                totalCount: 99,
                // 搜索表单数据模型
                searchTitle:{
                    courseName:'',
                },
                // 内置查询模型
                searchByCourseName:{
                    courseName:'',
                },
                // 数据列表
                tableData:[],
            }
        },
        created() {
            this.getCourseByTitle();
        },
        methods:{
            // 查找课程
            // 系统内置一个title，默认为空，即全查询。每次条件查询都会把条件赋给该title。
            // 因此这样点击分页栏时可以正常显示查询结果。
            getCourseByTitle(){
                this.searchByCourseName["pageSize"]=this.pageSize;
                this.searchByCourseName["currentPage"]=this.currentPage;
                this.$axios.post("/CourseView/getPageByCondition",this.searchByCourseName).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.tableData = res.data.data.records;
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
            // 表格颜色控制
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%4 === 1) {
                    return 'warning-row';
                } else if (rowIndex%4 === 3) {
                    return 'success-row';
                }
                return '';
            },
            // 查询课程
            searchOnSubmit(courseName){
                // 刷新查询条件
                this.searchByCourseName.courseName = courseName;
                // 执行查询
                this.getCourseByTitle();
                /* 清空查询条件 */
                this.searchTitle.courseName='';
            },
            // 课程管理
            courseManage(course){
                // 添加课程id到session
                this.$axios.post("/CourseView/addCourseIdToSession", course).then((res)=>{
                    if(res.data.flag){
                        this.$router.push({
                            name:'AdmCourseManage',
                            params:{
                                courseId:course.courseId
                            }
                        });
                    }else{
                        // 服务故障
                        this.$message.error("服务处理失败，请重新尝试T_T");
                    }
                });
            },
            // 更新课程状态
            updateCourseState(course){
                // 更新状态
                course.isStart = course.isStartBool ? 1:0;
                let newCourse = {
                    courseId:course.courseId,
                    isStart:course.isStart,
                }
                this.$axios.post("/Course/updateInfo",newCourse).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                        this.$message.success(res.data.msg);
                    }else{
                        // 服务故障
                        this.$message.error(res.data.msg);
                    }
                });
            },
            // 删除课程
            deleteCourse(row){
                // 弹框确认
                this.$confirm('此操作将永久删除该课程及其所有数据，其所含学生将自动退出该课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let course = {courseId:row.courseId};
                    // 执行删除
                    this.$axios.post("/Course/deleteCourseById",course).then(resp=>{
                        if(resp.data.flag){
                            // 删除成功，刷新数据
                            this.getCourseByTitle();
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
                // 查询所有课程
                this.getCourseByTitle();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.currentPage = val;
                // 查询所有课程
                this.getCourseByTitle();
            },
        }
    }
</script>

<style scoped>
    /* 搜索框 */
    #file-form-select{
        left: 200%;
        margin-top: 20px;
        position: relative;
    }
    /* 表格文字大小 */
    .el-table{
        font-size: 17px;
    }
    /* 选择开关 */
    .tableSwitch{
        position: relative;
        bottom: 0.1em;
    }
    /* 表格行高控制 */
    ::v-deep .el-table .el-table__cell{
        padding: 9px 0;
    }
    /* 分页工具条上框 */
    #pageBar{
        margin-top: 20px;
    }
</style>
