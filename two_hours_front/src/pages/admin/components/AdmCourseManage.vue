<template>
    <div>
        <!-- 页头 -->
        <el-page-header @back="goBack" title="返回" :content="course.courseName" id="pageHeader"></el-page-header>
        <el-card :body-style="{ padding: '0px' }">
            <div id="ManageCard">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <!--　用户管理　-->
                    <el-tab-pane label="用户管理" name="1">
                        <!-- 功能菜单 -->
                        <el-row style="position: relative; height: 90px">
                            <!--按钮-->
                            <el-col :span="6" id="functionMenu">
                                <TableExport style="margin-left: 1em;" table-id="user-table"></TableExport>
                            </el-col>
                            <!--搜索表单-->
                            <el-col :span="8">
                                <el-form :inline="true" :model="searchForm" class="file-form-select">
                                    <el-form-item label="搜索内容">
                                        <el-input v-model="searchForm.title" placeholder="文件名"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="searchOnSubmit(searchForm.title)">查询</el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="success" @click="searchOnSubmit('')">重置</el-button>
                                    </el-form-item>
                                </el-form>
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
                    </el-tab-pane>
                    <!--　文件管理　-->
                    <el-tab-pane label="文件管理" name="2">
                        <!-- 功能菜单 -->
                        <el-row style="position: relative; height: 90px">
                            <!--搜索表单-->
                            <el-col :span="8">
                                <el-form :inline="true" :model="searchForm" class="file-form-select">
                                    <el-form-item label="搜索内容">
                                        <el-input v-model="searchForm.title" placeholder="文件名"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="searchOnSubmit(searchForm.title)">查询</el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="success" @click="searchOnSubmit('')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <!-- 表格 -->
                        <template>
                            <el-table
                                    v-loading="loading"
                                    :data="tableData"
                                    style="width: 100%"
                                    :row-class-name="tableRowClassName">
                                <el-table-column
                                        label="序号"
                                        type="index"
                                        width="100"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="resourceName"
                                        label="文件名"
                                        width="400"
                                        align="center"
                                        sortable>
                                </el-table-column>
                                <el-table-column
                                        prop="resourceSizeStr"
                                        label="文件大小"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="downloadNum"
                                        label="下载量"
                                        sortable
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="formatDate"
                                        label="创建日期"
                                        sortable
                                        align="center">
                                </el-table-column>

                                <el-table-column
                                        align="center"
                                        label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="danger" @click="deleteRow(scope.row.resourceId)">删除</el-button>
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
                    </el-tab-pane>
                    <!-- 通知管理 -->
                    <el-tab-pane label="通知管理" name="3">
                        <!-- 功能菜单 -->
                        <el-row style="position: relative; height: 90px">
                            <!--搜索表单-->
                            <el-col :span="8">
                                <el-form :inline="true" :model="searchForm" class="file-form-select">
                                    <el-form-item label="搜索内容">
                                        <el-input v-model="searchForm.title" placeholder="文件名"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="searchOnSubmit(searchForm.title)">查询</el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="success" @click="searchOnSubmit('')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <!-- 表格 -->
                        <template>
                            <el-table
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
                                        prop="title"
                                        label="标题"
                                        align="center"
                                        sortable
                                        width="400">
                                </el-table-column>
                                <el-table-column
                                        prop="hits"
                                        label="点击量"
                                        align="center"
                                        sortable>
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
                                        <el-button type="danger" @click="deleteRow(scope.row.noticeId)">删除</el-button>
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
                    </el-tab-pane>
                    <!-- 讨论管理 -->
                    <el-tab-pane label="讨论管理" name="4">
                        <!-- 功能菜单 -->
                        <el-row style="position: relative; height: 90px">
                            <!--搜索表单-->
                            <el-col :span="8">
                                <el-form :inline="true" :model="searchForm" class="file-form-select">
                                    <el-form-item label="搜索内容">
                                        <el-input v-model="searchForm.title" placeholder="文件名"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="searchOnSubmit(searchForm.title)">查询</el-button>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="success" @click="searchOnSubmit('')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                        <!-- 表格 -->
                        <template>
                            <el-table
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
                                        prop="title"
                                        label="标题"
                                        align="center"
                                        sortable>
                                </el-table-column>
                                <el-table-column
                                        prop="username"
                                        label="发布者"
                                        align="center"
                                        sortable>
                                </el-table-column>
                                <el-table-column
                                        prop="hits"
                                        label="点击量"
                                        align="center"
                                        sortable>
                                </el-table-column>
                                <el-table-column
                                        prop="likes"
                                        label="点赞数"
                                        align="center"
                                        sortable>
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
                                        <el-button type="danger" @click="deleteRow(scope.row.discussionId)">删除</el-button>
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
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>
    </div>
</template>

<script>
    import TableExport from "@/components/TableExport";
    export default {
        name: "AdmCourseManage",
        components:{
            TableExport,
        },
        data(){
            return{
                // 课程数据
                course:'',
                // 激活标签项
                activeName: '',
                // 加载动画
                loading:false,
                // 表格数据
                tableData:[],
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
                // 数据获取路径
                url:'',
                // 用户信息获取路径
                getUserInfoUrl:'/CourseUser/getPageByCondition',
                // 文件获取路径
                getResUrl:'/Resource/getPageByCondition',
                // 通知获取路径
                getNtcUrl:'/Notice/getNoticeByTitle',
                // 讨论获取路径
                getDicUrl:'/Discussion/getDiscussionByTitle',
                // 删除文件路径
                delUrl:'',
                // 用户信息删除路径
                delUserInfoUrl:'/CourseUser/deleteById/',
                // 文件获取路径
                delResUrl:'/Resource/deleteById/',
                // 通知获取路径
                delNtcUrl:'/Notice/deleteById/',
                // 讨论获取路径
                delDicUrl:'/Discussion/deleteById/',
            }
        },
        created() {
            this.getCourse();
            // 激活标签
            this.activeName = '1';
            // 初始化url
            this.url = this.getUserInfoUrl;
            this.delUrl = this.delUserInfoUrl;
            // 开启加载动画
            this.loading = true;
            // 查询数据
            this.getData(this.url);
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
            // 返回章节区
            goBack(){
                this.$router.go(-1);
            },
            // 标签点击
            handleClick(tab) {
                this.loading = true;
                // this.tableData.length = 0;
                this.tableData = [];
                switch (tab._props.name) {
                    case '1':
                        this.url = this.getUserInfoUrl;
                        this.delUrl = this.delUserInfoUrl;
                        break;
                    case '2':
                        this.url = this.getResUrl;
                        this.delUrl = this.delResUrl;
                        break;
                    case '3':
                        this.url = this.getNtcUrl;
                        this.delUrl = this.delNtcUrl;
                        break;
                    case '4':
                        this.url = this.getDicUrl;
                        this.delUrl = this.delDicUrl;
                        break;
                }
                this.getData(this.url);
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
                this.getData(this.url);
                /* 清空搜索条件 */
                this.searchForm.title='';
            },
            // 获取文件数据
            getData(url){
                this.searchFormIn["pageSize"]=this.pageSize;
                this.searchFormIn["currentPage"]=this.currentPage;
                this.$axios.post(url,this.searchFormIn).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        setTimeout(()=>{
                            this.loading=false;
                            this.tableData = res.data.data.records;
                            /* 保存分页数据 */
                            this.totalCount = res.data.data.total;
                            this.currentPage = res.data.data.current;
                            this.pageSize = res.data.data.size;
                            },200);
                    }else{
                        // 服务故障
                        this.$message.error("信息获取失败！");
                    }
                });
            },
            // 删除数据
            deleteRow(id){
                // 弹框确认
                this.$confirm('此操作将永久删除该项及其相关数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 执行删除
                    this.$axios.get(this.delUrl + id).then(resp=>{
                        if(resp.data.flag){
                            // 删除成功，刷新数据
                            this.getData(this.url);
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
                this.getData(this.url);
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.currentPage = val;
                // 查询所有数据
                this.getData(this.url);
            }
        }
    }
</script>

<style scoped>
    ::v-deep .el-page-header__left:hover{
        color: #3a75ff;
    }

    /* 返回签字体大小 */
    ::v-deep .el-page-header__title {
        font-size: 17px;
        font-weight: 500;
    }
    /* 返回签模型 */
    #pageHeader{
        width: 300px;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    /*　管理卡片　*/
    #ManageCard{
        min-height: 30em;
        width: 95%;
        margin: 1em 2em;
    }
    /* 功能栏 */
    #functionMenu{
        position: absolute;
        display: block;
        margin-top: 20px;
        margin-left: 20px;
    }
    ::v-deep .el-tabs__item {
        font-size: 16px;
    }
    /* 搜索框 */
    .file-form-select{
        left: 200%;
        margin-top: 20px;
        position: relative;
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