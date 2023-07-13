<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="position: relative; height: 90px">
            <!--按钮-->
            <el-col :span="6" id="functionMenu">
                <el-button type="primary" plain @click="createNoticeOnSubmit">新建通知</el-button>
            </el-col>
            <!--搜索表单-->
            <el-col :span="8">
                <el-form :inline="true" :model="searchTitle" id="file-form-select">
                    <el-form-item label="搜索内容">
                        <el-input v-model="searchTitle.title" placeholder="标题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchNoticeOnSubmit(searchTitle.title)">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="searchNoticeOnSubmit('')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <!--添加通知对话框表单-->
        <el-dialog
                v-if="closeDialog"
                title="新建通知"
                :visible.sync="noticeEditDialogVisible"
                @close="noticeDialogHandleClose"
                width="60%">
            <!-- 标题编辑 -->
            <div class="noticeInputTitle">输入标题</div>
            <el-input
                    id="createNoticeTitle"
                    type="textarea"
                    v-model="createNoticeData.title"
                    maxlength="60"
                    show-word-limit>
            </el-input>
            <!-- 内容编辑 -->
            <div class="noticeInputTitle">输入内容</div>
            <Ckeditor4 v-model="createNoticeData.content"></Ckeditor4>
            <el-button type="text"
                       style="font-size: 16px;margin-top: 15px"
                       @click="createNotice(createNoticeData)">
                保存编辑
            </el-button>
        </el-dialog>

        <!--编辑通知对话框表单-->
        <el-dialog
                v-if="closeDialog"
                title="编辑通知"
                :visible.sync="noticeUpdateDialogVisible"
                @close="noticeDialogHandleClose"
                width="60%">
            <!-- 标题编辑 -->
            <div class="noticeInputTitle">输入标题</div>
            <el-input
                    id="updateNoticeTitle"
                    type="textarea"
                    v-model="updateNoticeData.title"
                    maxlength="60"
                    show-word-limit>
            </el-input>
            <!-- 内容编辑 -->
            <div class="noticeInputTitle">输入内容</div>
            <Ckeditor4 v-model="updateNoticeData.content"></Ckeditor4>
            <el-button type="text"
                       style="font-size: 16px;margin-top: 15px"
                       @click="updateNotice(updateNoticeData)">
                保存编辑
            </el-button>
        </el-dialog>

        <!-- 公告详情-抽屉 -->
        <!-- 此处默认不增加点击量 -->
        <adm-notice-drawer v-model="noticeDrawer" :notice="noticeDrawerContent" :addHits="false"></adm-notice-drawer>

        <!--表格-->
        <template>
            <el-table
                    ref="noticeMultipleTable"
                    :data="noticeTableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    @row-click="noticeRowClick">
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
                        width="600">
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
                        <el-button type="text" style="font-size: 16px" @click="editNotice(scope.row)">
                            <i style="margin:0 0.2em" class="el-icon-edit"></i>编辑</el-button>
                        <el-button type="text" style="color: #afafaf;font-size: 16px" @click="deleteNotice(scope.row)">
                            <i style="margin:0 0.2em" class="el-icon-delete"></i>删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </template>

        <!-- 分页工具条 数据小于10条不展示 -->
        <el-pagination
                id="pageBar"
                v-show="noticeTotalCount >= 10"
                @size-change="noticeHandleSizeChange"
                @current-change="noticeHandleCurrentChange"
                :current-page="noticeCurrentPage"
                :page-sizes="[5, 10, 15, 20, 50, 100]"
                :page-size="noticePageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="noticeTotalCount">
        </el-pagination>
    </div>
</template>

<script>
    import AdmNoticeDrawer from "@/components/AdmNoticeDrawer";
    import Ckeditor4 from "@/components/Ckeditor4";
    export default {
        name: 'AdmNoticeTab',
        components:{
            Ckeditor4,
            AdmNoticeDrawer,
        },
        data(){
            return{
                // 当前页码
                noticeCurrentPage: 1,
                // 分页大小
                noticePageSize: 10,
                // 总页码数
                noticeTotalCount: 99,
                // 搜索表单数据模型
                searchTitle:{
                    title:'',
                },
                // 内置查询模型
                searchNoticeByTitle:{
                    title:'',
                },
                // 创建通知数据模型
                createNoticeData:{
                    title:'',
                    content:'',
                },
                // 编辑通知数据模型
                updateNoticeData:{
                    noticeId:-1,
                    title:'',
                    content:'',
                },
                // 通知发布对话框
                noticeEditDialogVisible:false,
                // 编辑通知对话框
                noticeUpdateDialogVisible:false,
                // 通知数据列表
                noticeTableData:[],
                // 对话框销毁器
                closeDialog:false,
                // 公告抽屉
                noticeDrawer:false,
                noticeDrawerContent:'',     // 内容
            }
        },
        created() {
            this.getNoticeByTitle();
        },
        methods:{
            // 查找通知
            // 系统内置一个title，默认为空，即全查询。每次条件查询都会把条件赋给该title。
            // 因此这样点击分页栏时可以正常显示查询结果。
            getNoticeByTitle(){
                this.searchNoticeByTitle["pageSize"]=this.noticePageSize;
                this.searchNoticeByTitle["currentPage"]=this.noticeCurrentPage;
                this.$axios.post("/NoticeAdm/getPageByCondition",this.searchNoticeByTitle).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.noticeTableData = res.data.data.records;
                        /* 保存分页数据 */
                        this.noticeTotalCount = res.data.data.total;
                        this.noticeCurrentPage = res.data.data.current;
                        this.noticePageSize = res.data.data.size;
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
            // 新建通知
            createNoticeOnSubmit(){
                this.noticeEditDialogVisible=true;
                this.closeDialog=true;
            },
            // 查询通知
            searchNoticeOnSubmit(title){
                // 刷新查询条件
                this.searchNoticeByTitle.title = title;
                // 执行查询
                this.getNoticeByTitle();
                /* 清空查询条件 */
                this.searchTitle.title='';
            },
            // 创建通知
            createNotice(notice){
                if(notice.title === '' || notice.content === ''){
                    this.$message.warning("请填写完整再提交！");
                    return;
                }
                // 保存到数据库
                this.$axios.post("/NoticeAdm/createNotice",notice).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                        this.$message.success(res.data.msg);
                        // 刷新通知数据
                        this.getNoticeByTitle();
                        // 关闭编辑窗口
                        this.noticeEditDialogVisible=false;
                        // 重置模型
                        this.createNoticeData.title = '';
                        this.createNoticeData.content = '';
                    }else{
                        // 服务故障
                        this.$message.error(res.data.msg);
                    }
                });
            },
            // 编辑通知激活
            editNotice(row){
                // 预先绑定数据
                this.updateNoticeData.title = row.title;
                this.updateNoticeData.content = row.content;
                this.updateNoticeData.noticeId = row.noticeId;
                this.closeDialog = true;
                this.noticeUpdateDialogVisible = true;
            },
            // 编辑通知
            updateNotice(notice){
                if(notice.title === '' || notice.content === ''){
                    this.$message.warning("请填写完整再提交！");
                    return;
                }
                // 保存到数据库
                this.$axios.post("/NoticeAdm/updateNotice",notice).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                        this.$message.success(res.data.msg);
                        // 刷新课程数据
                        this.getNoticeByTitle();
                        // 关闭编辑窗口
                        this.noticeUpdateDialogVisible=false;
                        // 重置模型
                        this.updateNoticeData.title = '';
                        this.updateNoticeData.noticeId = -1;
                        this.updateNoticeData.content = '';
                    }else{
                        // 服务故障
                        this.$message.error(res.data.msg);
                    }
                });
            },
            // 编辑通知dialog销毁
            noticeDialogHandleClose(){
                // 手动销毁
                this.closeDialog = false;
            },
            // 当某行数据被点击
            noticeRowClick(row,column){
                // 排除操作列
                if(column.label === '操作')return;
                this.noticeDrawer = true;
                this.noticeDrawerContent = row;
                // 发送一次请求
                setTimeout(()=>{this.noticeDrawer = false; },500);
            },
            // 删除通知
            deleteNotice(row){
                // 弹框确认
                this.$confirm('此操作将删除该通知, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let notice = {noticeId:row.noticeId};
                    // 执行删除
                    this.$axios.post("/NoticeAdm/deleteNoticeById",notice).then(resp=>{
                        if(resp.data.flag){
                            // 删除成功，刷新数据
                            this.getNoticeByTitle();
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
            noticeHandleSizeChange(val) {
                this.noticePageSize = val;
                // 查询所有通知
                this.getNoticeByTitle();
            },
            // 当前页变化
            noticeHandleCurrentChange(val) {
                this.noticeCurrentPage = val;
                // 查询所有通知
                this.getNoticeByTitle();
            },
        }
    }
</script>

<style scoped>

    /* 功能栏 */
    #functionMenu{
        display: block;
        margin-top: 20px;
        margin-left: 20px;
    }
    /* 输入框标题 */
    .noticeInputTitle{
        margin: 20px;
        font-size: 16px;
    }
    /* 编辑通知标题 */
    #createNoticeTitle,#updateNoticeTitle{
        font-size: 18px;
        color: #000000;
        height: 70px;
    }
    /* 搜索框 */
    #file-form-select{
        left: 120%;
        margin-top: 20px;
        position: relative;
    }
    /* 表格文字大小 */
    .el-table{
        font-size: 17px;
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
