<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--按钮-->
            <el-col :span="7">
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-button type="primary" plain @click="createDiscussionOnSubmit">新建讨论</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <!--搜索表单-->
            <el-col :span="7" :offset="9">
                <search-box @onSubmit="searchDiscussionOnSubmit"></search-box>
            </el-col>
        </el-row>

        <!--添加讨论对话框表单-->
        <el-dialog
                v-if="closeDialog"
                title="新建讨论"
                :visible.sync="discussionEditDialogVisible"
                @close="discussionDialogHandleClose"
                width="60%">
            <!-- 标题编辑 -->
            <div class="discussionInput">输入标题</div>
            <el-input
                    id="createDiscussionTitle"
                    type="textarea"
                    v-model="createDiscussionData.title"
                    maxlength="60"
                    show-word-limit>
            </el-input>
            <!-- 内容编辑 -->
            <div class="discussionInput">输入内容</div>
            <Ckeditor4 v-model="createDiscussionData.content"></Ckeditor4>
            <el-button type="text"
                       style="font-size: 16px;margin-top: 15px"
                       @click="createDiscussion(createDiscussionData)">
                保存编辑
            </el-button>
        </el-dialog>

        <!--编辑讨论对话框表单-->
        <el-dialog
                v-if="closeDialog"
                title="编辑讨论"
                :visible.sync="discussionUpdateDialogVisible"
                @close="discussionDialogHandleClose"
                width="60%">
            <!-- 标题编辑 -->
            <div class="discussionInput">输入标题</div>
            <el-input
                    id="updateDiscussionTitle"
                    type="textarea"
                    v-model="updateDiscussionData.title"
                    maxlength="60"
                    show-word-limit>
            </el-input>
            <!-- 内容编辑 -->
            <div class="discussionInput">输入内容</div>
            <Ckeditor4 v-model="updateDiscussionData.content"></Ckeditor4>
            <el-button type="text"
                       style="font-size: 16px;margin-top: 15px"
                       @click="updateDiscussion(updateDiscussionData)">
                保存编辑
            </el-button>
        </el-dialog>

        <!--表格-->
        <template>
            <el-table
                    ref="discussionMultipleTable"
                    :data="discussionTableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    @row-click="discussionRowClick">
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
                        <el-button type="primary" @click="editDiscussion(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="deleteDiscussion(scope.row)">删除</el-button>
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
        name: 'DiscussionTab',
        components:{
            Ckeditor4,
            SearchBox
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
                // 创建讨论数据模型
                createDiscussionData:{
                    title:'',
                    content:'',
                },
                // 编辑讨论数据模型
                updateDiscussionData:{
                    discussionId:-1,
                    title:'',
                    content:'',
                },
                // 讨论发布对话框
                discussionEditDialogVisible:false,
                // 编辑讨论对话框
                discussionUpdateDialogVisible:false,
                // 讨论数据列表
                discussionTableData:[],
                // 对话框销毁器
                closeDialog:false,
            }
        },
        created() {
            this.getDiscussionByTitle();
        },
        methods:{
            // 查找讨论
            // 系统内置一个title，默认为空，即全查询。每次条件查询都会把条件赋给该title。
            // 因此这样点击分页栏时可以正常显示查询结果。
            getDiscussionByTitle(){
                this.searchTitle["pageSize"]=this.pageSize;
                this.searchTitle["currentPage"]=this.currentPage;
                this.$axios.post("/Discussion/getDiscussionByTitle",this.searchTitle).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.discussionTableData = res.data.data.records;
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
            // 新建讨论
            createDiscussionOnSubmit(){
                this.discussionEditDialogVisible=true;
                this.closeDialog=true;
            },
            // 查询讨论
            searchDiscussionOnSubmit(title){
                // 刷新查询条件
                this.searchTitle.title = title;
                // 执行查询
                this.getDiscussionByTitle();
            },
            // 创建讨论
            createDiscussion(discussion){
                if(discussion.title === '' || discussion.content === ''){
                    this.$message.warning("请填写完整再提交！");
                    return;
                }
                // 保存到数据库
                this.$axios.post("/Discussion/createDiscussion",discussion).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                        this.$message.success(res.data.msg);
                        // 刷新讨论数据
                        this.getDiscussionByTitle();
                        // 关闭编辑窗口
                        this.discussionEditDialogVisible=false;
                        // 重置模型
                        this.createDiscussionData.title = '';
                        this.createDiscussionData.content = '';
                    }else{
                        // 服务故障
                        this.$message.error(res.data.msg);
                    }
                });
            },
            // 编辑讨论激活
            editDiscussion(row){
                // 预先绑定数据
                this.updateDiscussionData.title = row.title;
                this.updateDiscussionData.content = row.content;
                this.updateDiscussionData.discussionId = row.discussionId;
                this.closeDialog = true;
                this.discussionUpdateDialogVisible = true;
            },
            // 编辑讨论
            updateDiscussion(discussion){
                if(discussion.title === '' || discussion.content === ''){
                    this.$message.warning("请填写完整再提交！");
                    return;
                }
                // 保存到数据库
                this.$axios.post("/Discussion/updateDiscussion",discussion).then((res)=>{
                    if(res.data.flag){
                        // 修改成功
                        this.$message.success(res.data.msg);
                        // 刷新课程数据
                        this.getDiscussionByTitle();
                        // 关闭编辑窗口
                        this.discussionUpdateDialogVisible=false;
                        // 重置模型
                        this.updateDiscussionData.title = '';
                        this.updateDiscussionData.discussionId = -1;
                        this.updateDiscussionData.content = '';
                    }else{
                        // 服务故障
                        this.$message.error(res.data.msg);
                    }
                });
            },
            // 编辑讨论dialog销毁
            discussionDialogHandleClose(){
                // 手动销毁
                this.closeDialog = false;
            },
            // 当某行数据被点击
            discussionRowClick(row,column){
                // 排除操作列
                if(column.label === '操作')return;
                this.$router.push({
                    name:'DiscussionView',
                    params:{
                        discussionId:row.discussionId,
                    }
                })
            },
            // 删除讨论
            deleteDiscussion(row){
                // 弹框确认
                this.$confirm('此操作将删除该讨论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let discussion = {discussionId:row.discussionId};
                    // 执行删除
                    this.$axios.post("/Discussion/deleteDiscussionById",discussion).then(resp=>{
                        if(resp.data.flag){
                            // 删除成功，刷新数据
                            this.getDiscussionByTitle();
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
                // 查询所有讨论
                this.getDiscussionByTitle();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.currentPage = val;
                // 查询所有讨论
                this.getDiscussionByTitle();
            },
        }
    }
</script>

<style scoped>
    /* 输入框标题 */
    .discussionInput{
        margin: 20px;
        font-size: 16px;
    }
    /* 编辑通知标题 */
    #createDiscussionTitle,#updateDiscussionTitle{
        font-size: 18px;
        color: #000000;
        height: 70px;
    }
    /* 表格文字大小 */
    .el-table{
        font-size: 17px;
    }
    /* 表格行高控制 */
    ::v-deep .el-table .el-table__cell{
        padding: 9px 0;
    }
    #pageBar{
        margin-top: 20px;
    }
</style>
