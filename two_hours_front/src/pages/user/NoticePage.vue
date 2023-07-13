<template>
    <div>
        <!-- 页头 -->
        <el-page-header @back="goBack" title="返回" id="pageHeader"></el-page-header>
        <!-- 顶栏 -->
        <el-row style="position: relative; height: 90px">
            <!-- 标题 -->
            <el-col :span="3" id="page-title">
                <span>课程通知</span>
            </el-col>
            <!--搜索表单-->
            <el-col :span="8">
                <el-form :inline="true" :model="searchNotice" id="form-select">

                    <el-form-item label="搜索内容">
                        <el-input v-model="searchNotice.title" placeholder="标题"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(searchNotice.title)">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="onSubmit('')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 公告详情-抽屉1 -->
        <notice-drawer v-model="noticeDrawer" :notice="noticeDrawerContent"></notice-drawer>
        <!-- 表格 -->
        <div style="min-height: 63vh;">
            <!--表格-->
            <template>
                <el-table
                        :data="noticeData"
                        style="width: 98%;position: relative;left: 1%;"
                        :row-class-name="tableRowClassName"
                        @row-click="openNotice">
                    <el-table-column
                            type="index"
                            align="center"
                            width="50">
                    </el-table-column>
                    <!-- 内容 -->
                    <el-table-column
                            id="myTableIndex"
                            prop="title"
                            label="标题"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            label="发布人"
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="hits"
                            label="点击量"
                            sortable
                            align="center">
                    </el-table-column>
                    <el-table-column
                            prop="formatDate"
                            label="创建时间"
                            sortable
                            align="center">
                    </el-table-column>
                </el-table>
            </template>

            <!--分页工具条-->
            <el-pagination
                    style="margin-top: 20px;margin-left: 20px"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount">
            </el-pagination>
        </div>
        <!-- 底栏 -->
        <page-footer></page-footer>
    </div>
</template>

<script>
    import NoticeDrawer from "@/components/NoticeDrawer";
    import PageFooter from "@/components/PageFooter";
    export default {
        name: "CourseNotice",
        components:{
            PageFooter,
            NoticeDrawer
        },
        // 数据模型
        data(){
            return {
                // 当前页码
                currentPage: 1,
                // 分页大小
                pageSize: 15,
                // 总页码数
                totalCount: 80,
                // 表格数据
                noticeData: [],
                // 搜索表单模型数据
                searchNotice:{
                    title:'',
                },
                // 内置搜索模型
                searchNoticeInline:{
                    title:'',
                },
                // 公告抽屉
                noticeDrawer:false,
                noticeDrawerContent:'',     // 内容
            }
        },
        created(){
            this.getNoticeByTitle();
        },
        // 方法模型
        methods: {
            // 获取公告
            getNoticeByTitle(){
                this.searchNoticeInline["currentPage"]=this.currentPage;
                this.searchNoticeInline["pageSize"]=this.pageSize;
                this.$axios.post("/Notice/getPageByCondition",this.searchNoticeInline).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.noticeData = res.data.data.records;
                        /* 保存分页数据 */
                        this.currentPage = res.data.data.current;
                        this.pageSize = res.data.data.size;
                        this.totalCount = res.data.data.total;
                        /* 清空搜索条件 */
                        this.searchNotice.title = '';
                    }else{
                        // 服务故障
                        this.$message.error("信息获取失败！");
                    }
                });
            },
            // 返回我的课程
            goBack(){
                this.$router.replace({
                    name:'UserMainPage'
                })
                return '';
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
            // 查询方法
            onSubmit(searchTitle) {
                this.searchNoticeInline.title = searchTitle;
                this.getNoticeByTitle();
            },
            // 分页大小变化
            handleSizeChange(val) {
                this.pageSize = val;
                this.getNoticeByTitle();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getNoticeByTitle();
            },
            // 打开通知
            openNotice(row){
                this.noticeDrawer = true;
                this.noticeDrawerContent = row;
                // 发送一次请求
                setTimeout(()=>{this.noticeDrawer = false; },500);
            }
        }
    }
</script>

<style scoped>
    /* 返回签字体大小 */
    ::v-deep .el-page-header__title {
        font-size: 17px;
        font-weight: 500;
    }
    /* 返回签框模型 */
    #pageHeader{
        width: 100px;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    #pageHeader:hover{
        color: #3a75ff;
    }
    /* 标题 */
    #page-title{
        display: block;
        font-size: 30px;
        font-family: "微软雅黑";
        position: relative;
        left: 8%;
        margin-top: 20px;
    }
    /* 搜索框 */
    #form-select{
        left: 162%;
        margin-top: 20px;
        position: relative;
    }
    /*
     * 公告抽屉
     */
    ::v-deep .el-drawer {
        background: #f4f4f7;
    }
    ::v-deep .el-drawer__body {
        /* 滚动条 */
        overflow: hidden;
        margin-bottom: 25px;
    }
    /* 上边框 */
    ::v-deep .el-drawer__header {
        margin-bottom: 5px;
    }
    .dMedium{
        font-family: "微软雅黑";
        color: #252525;
    }
    #dBody{
        overflow-y: scroll;
        height: 100%;
        margin-left: 36px;
        padding-right: 12px;
    }
    /* 公告标题 */
    #dNoticeTitle{
        /* 居中 */
        text-align: center;
        font-size: 35px;
        width: 90%;
        position: relative;
        left: 5%;
    }
    /* 公告详情 */
    #dNoticeDetails{
        /* 上边距 */
        margin-top: 20px;
        /* 大小和间距 */
        font-size: 18px;
        letter-spacing: 1px;
        /* 暗色调 */
        color: #5c5c5c;
        position: relative;
    }
    #dNoticeDetailsCreator{
        position: relative;
        left: 15%;
    }
    #dNoticeDetailsHits{
        position: relative;
        left: 25%;
    }
    #dNoticeDetailsDate{
        position: relative;
        left: 35%;
    }
    /* 抽屉公告内容 */
    #noticeDrawerContent{
        margin-top: 28px;
        /* 段落 */
        font-size: 20px;
        letter-spacing: 1px;
        line-height: 1.5;   /* 行高 */
    }
    .el-table{
        font-size: 17px;
    }
</style>