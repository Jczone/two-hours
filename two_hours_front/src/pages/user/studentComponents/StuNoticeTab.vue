<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--搜索表单-->
            <el-col :span="7" :offset="16">
                <search-box @onSubmit="searchNoticeOnSubmit"></search-box>
            </el-col>
        </el-row>

        <!-- 公告详情-抽屉1 -->
        <notice-drawer v-model="noticeDrawer" :notice="noticeDrawerContent"></notice-drawer>

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
    import SearchBox from "@/components/SearchBox";
    import NoticeDrawer from "@/components/NoticeDrawer";
    import Ckeditor4 from "@/components/Ckeditor4";
    export default {
        name: 'StuNoticeTab',
        components:{
            Ckeditor4,
            SearchBox,
            NoticeDrawer
        },
        data(){
            return{
                // 当前页码
                noticeCurrentPage: 1,
                // 分页大小
                noticePageSize: 10,
                // 总页码数
                noticeTotalCount: 1,
                // 搜索表单数据模型
                searchTitle:{
                    title:'',
                },
                // 内置查询模型
                searchNoticeByTitle:{
                    title:'',
                },
                // 通知数据列表
                noticeTableData:[],
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
                this.$axios.post("/Notice/getNoticeByTitle",this.searchNoticeByTitle).then((res)=>{
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
            // 查询通知
            searchNoticeOnSubmit(title){
                // 刷新查询条件
                this.searchNoticeByTitle.title = title;
                // 执行查询
                this.getNoticeByTitle();
                /* 清空查询条件 */
                this.searchTitle.title='';
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
    /* 表格文字大小 */
    .el-table{
        font-size: 17px;
    }
    /* 表格行高控制 */
    ::v-deep .el-table .el-table__cell{
        padding: 12px 0;
    }
    /* 分页工具条上框 */
    #pageBar{
        margin-top: 20px;
    }
</style>
