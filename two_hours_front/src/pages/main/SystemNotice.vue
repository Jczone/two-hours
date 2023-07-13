<template>
    <div>
        <!-- 页头 -->
        <el-page-header @back="goBack" title="返回" id="pageHeader">
        </el-page-header>

        <!-- 顶栏 -->
        <el-row style="position: relative; height: 90px">
            <!-- 标题 -->
            <el-col :span="3" id="page-title">
                <span>系统公告</span>
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
        <el-drawer
                size="50%"
                :visible.sync="noticeDrawer">
            <div id="dBody">
                <!-- 通知标题-->
                <div class="dMedium" id="dNoticeTitle">{{ noticeDrawerContent.title}}</div>
                <!-- 通知详情 -->
                <div class="dMedium" id="dNoticeDetails">
                    <span id="dNoticeDetailsHits">点击量：{{ noticeDrawerContent.hits }}</span>
                    <span id="dNoticeDetailsDate">{{ noticeDrawerContent.formatDate }}</span>
                </div>
                <!-- 通知内容 -->
                <div class="dMedium" id="noticeDrawerContent" v-html="noticeDrawerContent.content">
                    <div v-html="noticeDrawerContent.content">{{ noticeDrawerContent.content }}</div>
                </div>
            </div>
        </el-drawer>

        <div style="min-height: 63vh">
            <!-- 表格 -->
            <template>
                <el-table
                        :data="noticeData"
                        style="width: 98%;position: relative;left: 1%"
                        :row-class-name="tableRowClassName"
                        @row-click="openNotice">
                    <el-table-column
                            label="序号"
                            type="index"
                            align="center"
                            width="100">
                    </el-table-column>
                    <!-- 内容 -->
                    <el-table-column
                            prop="title"
                            label="标题"
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
            <!-- 页签 -->
            <el-pagination
                    style="margin-top: 20px;margin-left: 20px"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20, 50, 100]"
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
    import PageFooter from "@/components/PageFooter";
    export default {
        name: "SystemNotice",
        components:{
            PageFooter
        },
        // 数据模型
        data(){
            return{
                // 当前页码
                currentPage: 1,
                // 分页大小
                pageSize: 15,
                // 总页码数
                totalCount: 1,
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
                // 抽屉内容
                noticeDrawerContent:'',
            }
        },
        created(){
            this.getNoticeAdmByTitle();
        },
        // 方法模型
        methods: {
            // 查询方法
            getNoticeAdmByTitle() {
                this.searchNoticeInline["currentPage"]=this.currentPage;
                this.searchNoticeInline["pageSize"]=this.pageSize;
                this.$axios.post("/NoticeAdm/getPageByCondition",this.searchNoticeInline).then((res)=>{
                    if(res.data.flag){
                        this.noticeData = res.data.data.records;
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
            // 返回主页
            goBack(){
                this.$router.replace({
                    name:'MainPage',
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
            // 搜索按钮
            onSubmit(searchTitle){
                this.searchNoticeInline.title = searchTitle;
                this.getNoticeAdmByTitle();
            },
            //分页大小变化
            handleSizeChange(val) {
                this.pageSize = val;
                this.getNoticeAdmByTitle();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getNoticeAdmByTitle();
            },
            // 打开通知
            openNotice(row){
                this.noticeDrawer = true;
                this.noticeDrawerContent = row;
            }
        }
    }
</script>

<!-- 局部组件样式 -->
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
    /* 通知栏文本控制器 */
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
    /* 表格字号控制 */
    .el-table{
        font-size: 17px
    }
</style>