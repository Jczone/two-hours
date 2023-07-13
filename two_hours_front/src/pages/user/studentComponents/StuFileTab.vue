<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--按钮-->
            <el-col :span="8">
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-button type="success" plain @click="fileDownloadByIds">批量下载</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <!--搜索表单-->
            <el-col :span="7" :offset="8">
                <search-box @onSubmit="searchFileOnSubmit"></search-box>
            </el-col>
        </el-row>

        <!--表格-->
        <template>
            <el-table
                    ref="fileMultipleTable"
                    :data="fileTableData"
                    style="width: 100%"
                    @row-click="fileRowClick"
                    :row-class-name="tableRowClassName"
                    @selection-change="fileHandleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="序号"
                        type="index"
                        width="100"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="文件名"
                        width="400"
                        align="center"
                        sortable>
                    <template slot-scope="scope">
                        <span>{{scope.row.resourceName.substring(6)}}</span>
                    </template>
                </el-table-column>
               <!-- <el-table-column
                        prop="resourceName"
                        label="文件名"
                        width="400"
                        align="center"
                        sortable>
                </el-table-column>-->
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
                        <el-button type="primary" @click="downloadFile(scope.row)">下载</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </template>

        <!--分页工具条 数据小于10条不展示-->
        <el-pagination
                id="pageBar"
                v-show="fileTotalCount >= 10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="fileCurrentPage"
                :page-sizes="[5, 10, 15, 20, 50, 100]"
                :page-size="filePageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="fileTotalCount">
        </el-pagination>

    </div>
</template>

<script>
    import SearchBox from "@/components/SearchBox";
    export default {
        name: "StuFileTab",
        components:{
            SearchBox,
        },
        /**
         * 文件管理
         */
        data(){
            return{
                // 当前页码
                fileCurrentPage: 1,
                // 分页大小
                filePageSize: 10,
                // 总页码数
                fileTotalCount: 1,
                // 搜索表单数据模型
                searchName:{
                    title:'',
                },
                // 内置查询模型
                searchFileByName:{
                    title:'',
                },
                // 文件上传对话框
                fileUploadDialogVisible:false,
                // 文件数据列表
                fileTableData:[],
                // 复选框选中数据集合
                multipleSelection: [],
            }
        },
        created() {
            // 获取文件列表
            this.getFiles();
        },
        methods:{
            // 获取文件数据
            getFiles(){
                this.searchFileByName["pageSize"]=this.filePageSize;
                this.searchFileByName["currentPage"]=this.fileCurrentPage;
                this.$axios.post("/Resource/getPageByCondition",this.searchFileByName).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.fileTableData = res.data.data.records;
                        /* 保存分页数据 */
                        this.fileTotalCount = res.data.data.total;
                        this.fileCurrentPage = res.data.data.current;
                        this.filePageSize = res.data.data.size;
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
            // 批量下载文件
            fileDownloadByIds(){
                if(this.multipleSelection.length !== 0){
                    // 使用勾选的resourceId数组
                    for(let k in this.multipleSelection){
                        this.downloadFile(this.multipleSelection[k]);
                    }
                    // 刷新列表
                    this.getFiles();
                }else{
                    // 未勾选数据时提醒
                    this.$message.info('请选择要删除的数据');
                }
            },
            // 查找文件
            searchFileOnSubmit(name){
                this.searchFileByName.title = name;
                this.getFiles();
                /* 清空搜索条件 */
                this.searchName.title='';
            },
            // 当某行数据被点击
            fileRowClick(row){
                this.$refs.fileMultipleTable.toggleRowSelection(row);
            },
            // 复选框选中后执行的方法
            fileHandleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 下载单个文件
            downloadFile(row){
                let url = "http://" + window.location.host + "/Files/resourceDownload";
                // window.open(url, '_blank');
                // 基于base64的前端下载方式
                const xhr = new XMLHttpRequest();
                xhr.open('post', url);
                xhr.responseType = 'blob';
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.send(JSON.stringify({fileName:row.resourceName}));
                xhr.onload = function () {
                    if (this.status === 200 || this.status === 304) {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(this.response);
                        fileReader.onload = function () {
                            const a = document.createElement('a');
                            a.style.display = 'none';
                            a.href = this.result;
                            a.download = row.resourceName;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        };
                    }
                };
                // 解决多弹窗重叠问题
                setTimeout(()=>{this.$message.success("下载:"+row.resourceName+" 完成！")},1000);
                // 文件下载量增加
                let resource = {resourceId:row.resourceId,downloadNum:row.downloadNum};
                this.$axios.post("/Resource/downloadNumAdd",resource).then(resp=>{
                    if(resp.data.flag){
                        // 写入成功，刷新数据
                        this.getFiles();
                    }else{
                        this.$message.error('删除失败！');
                    }
                })
            },
            //分页大小变化
            handleSizeChange(val) {
                this.filePageSize = val;
                // 查询所有文件
                this.getFiles();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.fileCurrentPage = val;
                // 查询所有文件
                this.getFiles();
            }
        },

    }
</script>

<style scoped>
    /* 文件上传框 */
    ::v-deep .el-upload-dragger {
        width: 500px;
        height: 300px;
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