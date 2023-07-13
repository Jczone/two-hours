<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--按钮-->
            <el-col :span="8">
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-button type="primary" plain @click="fileUploadDialogVisible = true">添加资料</el-button>
                        <el-button type="success" plain @click="fileDownloadByIds">批量下载</el-button>
                        <el-button type="danger" plain @click="fileDeleteByIds">批量删除</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <!--搜索表单-->
            <el-col :span="7" :offset="8">
                <search-box @onSubmit="searchFileOnSubmit"></search-box>
            </el-col>
        </el-row>

        <!--添加资料对话框表单-->
        <el-dialog
                title="上传文件"
                :visible.sync="fileUploadDialogVisible"
                width="30%">
            <!-- 资料上传 -->
            <el-upload
                    drag
                    multiple
                    :show-file-list="false"
                    action="/Files/resourceUpload"
                    :on-success="handleFileSuccess"
                    :before-upload="beforeFileUpload">
                <i class="el-icon-upload" style="margin-top: 100px"></i>
                <div class="el-upload__text" style="text-align: center">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">文件大小不超过40MB</div>
            </el-upload>
        </el-dialog>

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
               <!-- <el-table-column
                        prop="resourceName"
                        label="文件名"
                        width="400"
                        align="center"
                        sortable>
                </el-table-column>-->
                <el-table-column
                        label="文件名"
                        width="400"
                        align="center"
                        sortable>
                    <template slot-scope="scope">
                        <span>{{scope.row.resourceName.substring(6)}}</span>
                    </template>
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
                        <el-button type="primary" @click="downloadFile(scope.row)">下载</el-button>
                        <el-button type="danger" @click="deleteFile(scope.row)">删除</el-button>
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
        name: "FileTab",
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
            // 批量删除文件
            fileDeleteByIds(){
                // 获取勾选的resourceId数组
                let selectIds = [];
                for(let k in this.multipleSelection){
                    selectIds.push( this.multipleSelection[k].resourceId)
                }
                // 确认勾选
                if(selectIds.length !== 0){
                    // 弹框确认
                    this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // 执行删除
                        this.$axios.post("/Resource/deleteFileByIds",selectIds).then(resp=>{
                            if(resp.data.flag){
                                // 删除成功，刷新数据
                                this.getFiles();
                                // 根据路径删除本地文件
                                for(let k in this.multipleSelection){
                                    this.$axios.post("/Files/resourceDelete",this.multipleSelection[k]).then(resp=>{
                                        if(resp.data === true){
                                            this.$message.success('删除成功！');
                                        }else{
                                            this.$message.error('删除失败！');
                                        }
                                    });
                                }
                            }else{
                                this.$message.error('删除失败！');
                            }
                        })
                    }).catch(() => {
                        // 取消删除
                        this.$message.info('取消删除');
                    });
                }else {
                    // 未勾选数据时提醒
                    this.$message.info('请选择要删除的数据');
                }
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
            // 文件上传成功的钩子-回显并写入数据库
            handleFileSuccess(res, file) { // res 即文件读取路径
                if(res !== ''){
                    // 组织文件信息
                    let thisFile = {
                        resourceName:res,
                        resourceSize:file.size/1024, // kb
                        downloadNum:0,
                    };
                    // 存入课程对应数据库
                    this.$axios.post("/Resource/uploadOneFile",thisFile).then((res)=>{
                        if(res.data.flag){
                            // 更新文件数据
                            this.getFiles();
                            // 成功
                            this.$message.success("上传成功！");
                            // 关闭对话框
                            this.fileUploadDialogVisible =false;
                        }else{
                            // 服务故障
                            this.$message.error(res.data.msg);
                        }
                    });
                }else{
                    this.$message.error("上传失败！");
                }
            },
            // 文件大小检查
            beforeFileUpload(file) {
                const isLt40M = file.size / 1024 / 1024 < 40;
                const isNull = file.size === 0;
                if (!isLt40M) {
                    this.$message.error('文件大小不能超过 40MB!');
                }
                if(isNull){
                    this.$message.error("文件不能为空！")
                }
                return isLt40M && !isNull;
            },
            // 当某行数据被点击
            fileRowClick(row,column){
                if(column.label === '操作')return;
                this.$refs.fileMultipleTable.toggleRowSelection(row);
            },
            // 复选框选中后执行的方法
            fileHandleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 删除单个文件
            deleteFile(row){
                // 弹框确认
                this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let resource = {resourceId:row.resourceId};
                    // 执行删除
                    this.$axios.post("/Resource/deleteFileById",resource).then(resp=>{
                        if(resp.data.flag){
                            // 删除成功，刷新数据
                            this.getFiles();
                            // 根据路径删除本地文件
                            resource = {
                                resourceName:row.resourceName,
                                courseId:row.courseId,
                            };
                            this.$axios.post("/Files/resourceDelete",resource).then(resp=>{
                                if(resp.data === true){
                                    this.$message.success('删除成功！');
                                }else{
                                    this.$message.error('删除失败！');
                                }
                            });
                        }else{
                            this.$message.error('删除失败！');
                        }
                    })
                }).catch(() => {
                    // 取消删除
                    this.$message.info('取消删除');
                });
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

            },
            // 分页大小变化
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