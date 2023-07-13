<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--按钮-->
            <el-col :span="7">
                <el-row>
                    <el-col :span="22" :offset="1">
                        <el-button type="primary" plain @click="createExperiment">新建实验</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <!--搜索表单-->
            <el-col :span="7" :offset="9">
                <search-box @onSubmit="searchExperiment"></search-box>
            </el-col>
        </el-row>

        <!--添加资料对话框表单-->
        <el-dialog
                title="编辑实验"
                :visible.sync="dialogVisible"
                width="40%">
            <!-- 输入标题-->
            <div class="createChapterInfo">输入标题</div>
            <el-input
                    id="updateCourseInfoEditorTags"
                    type="textarea"
                    v-model="experimentEditDate.title"
                    maxlength="60"
                    show-word-limit>
            </el-input>
            <div class="createChapterInfo">上传任务书</div>
            <!-- 资料上传 -->
            <div style="width: 100%">
                <!-- 上传组件 -->
                <el-upload
                        drag
                        multiple
                        v-if="uploadShow"
                        width="80%"
                        :show-file-list="false"
                        action="/Files/resourceUpload"
                        :on-success="handleFileSuccess"
                        :before-upload="beforeFileUpload">
                    <i class="el-icon-upload" style="margin-top: 15%"></i>
                    <div class="el-upload__text" style="text-align: center">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">文件大小不超过10MB</div>
                </el-upload>
                <!-- 文件名回显 -->
                <div  v-if="!uploadShow" id="uploadSuccessShowName">
                    <span>文件名：{{uploadFilename}}</span>
                    <i class="el-icon-circle-check" id="uploadSuccessShowIcon"></i>
                </div>
            </div>
            <!-- 上传按钮 -->
            <el-button type="text"
                       style="font-size: 16px;margin-top: 15px"
                       @click="saveEditExperiment">
                保存编辑
            </el-button>
        </el-dialog>

        <!--表格-->
        <template>
            <el-table
                    ref="noticeMultipleTable"
                    :data="experimentData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    @row-click="rowClick">
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
                        label="任务书"
                        align="center"
                        width="400">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.fileName !==''" type="text" @click="downloadFile(scope.row)">
                            <i class="el-icon-download"></i>{{scope.row.fileName.substring(6)}}
                        </el-button>
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
                        <el-button type="primary" @click="editRow(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
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
    import SearchBox from "@/components/SearchBox";
    export default {
        name: 'ExperimentTab',
        components:{
            SearchBox,
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
                experimentEditDate:{
                    experimentId:undefined,
                    title:'',
                    fileName:'',
                },
                // 实验编辑对话框
                dialogVisible:false,
                // 上传文件显示
                uploadShow:true,
                // 编辑状态激活
                isEditExperiment:false,
                // 文件上传成功后显示文件名并隐藏上传组件
                uploadFilename:'',
                // 考试数据
                experimentData:[],
                // 旧文件名
                filenameOld:'',
                // 课程id
                courseId:'',
            }
        },
        created() {
            this.getExperiment();
        },
        methods:{
            // 查询实验数据
            getExperiment(){
                this.searchTitle["pageSize"]=this.pageSize;
                this.searchTitle["currentPage"]=this.currentPage;
                this.$axios.post("/Experiment/getPageByCondition",this.searchTitle).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.experimentData = res.data.data.records;
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
            // 提交搜索
            searchExperiment(title){
                this.searchTitle.title = title;
                this.getExperiment();
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
            // 当某行数据被点击
            rowClick(row,column){
                if(column.label === '操作' || column.label === '任务书')return;
                // 打开实验详情页面
                this.$router.push({
                    name:'ExperimentView',
                    params:{
                        experimentId:row.experimentId,
                    }
                })
            },
            // 创建实验
            createExperiment(){
                // 显示上传框
                this.uploadShow = true;
                // 重置数据
                this.uploadFilename = '';
                this.experimentEditDate.fileName = '';
                this.experimentEditDate.title = '';
                this.experimentEditDate.experimentId = undefined;
                this.dialogVisible = true;
            },
            // 编辑实验
            editRow(row){
                // 显示上传框
                this.uploadShow = true;
                this.isEditExperiment = true;   // 激活编辑状态
                // 重置数据
                this.uploadFilename = '';
                this.filenameOld = row.fileName;
                this.courseId = row.courseId;
                this.experimentEditDate.fileName = row.fileName;
                this.experimentEditDate.title = row.title;
                this.experimentEditDate.experimentId = row.experimentId;
                this.dialogVisible = true;
            },
            // 发布实验
            saveEditExperiment(){
                if(this.experimentEditDate.title === ""){
                    this.$message.error("标题不能为空！");
                    return 0;
                }
                if(this.isEditExperiment){
                    this.$axios.post("/Experiment/updateExperiment",this.experimentEditDate).then((res)=>{
                        if(res.data.flag){
                            this.$message.success(res.data.msg);
                            this.getExperiment();
                            this.isEditExperiment = false;  // 关闭编辑状态
                            this.dialogVisible = false;     // 关闭编辑窗口
                            if(this.filenameOld !== this.experimentEditDate.fileName){
                                // 文件更新-清理旧文件
                                let resource = {
                                    resourceName:this.filenameOld,
                                    courseId:this.courseId,
                                };
                                this.$axios.post("/Files/resourceDelete",resource);
                            }
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                }else{
                    this.$axios.post("/Experiment/createExperiment",this.experimentEditDate).then((res)=>{
                        if(res.data.flag){
                            this.$message.success(res.data.msg);
                            this.getExperiment();
                            this.dialogVisible = false;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    })
                }
            },
            // 删除实验
            deleteRow(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row)
                    this.$axios.post("/Experiment/deleteOneById",row).then((res)=>{
                        if(res.data.flag){
                            // 根据路径删除本地文件
                            let resource = {
                                resourceName:row.fileName,
                                courseId:row.courseId,
                            };
                            this.$axios.post("/Files/resourceDelete",resource).then(resp=>{
                                if(resp.data === true){
                                    this.$message.success('删除成功！');
                                }else{
                                    this.$message.error('删除失败！');
                                }
                            });
                            this.getExperiment();
                        }else{
                            // 服务故障
                            this.$message.error("信息获取失败！");
                        }
                    });
                });
            },
            // 下载文件
            downloadFile(row){
                let url = "http://" + window.location.host + "/Files/resourceDownload";
                const xhr = new XMLHttpRequest();
                xhr.open('post', url);
                xhr.responseType = 'blob';
                //3.5 请求头（POST请求时设置）
                xhr.setRequestHeader('Content-Type','application/json')
                // xhr.setRequestHeader("Content-type","application/json;charset=UTF-8");
                xhr.send(JSON.stringify({fileName:row.fileName}));
                xhr.onload = function () {
                    if (this.status === 200 || this.status === 304) {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(this.response);
                        fileReader.onload = function () {
                            const a = document.createElement('a');
                            a.style.display = 'none';
                            a.href = this.result;
                            a.download = row.fileName;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        };
                    }
                };
                // 解决多弹窗重叠问题
                setTimeout(()=>{this.$message.success("下载:"+row.fileName+" 完成！")},1000);
            },
            // 文件上传成功的钩子-回显并写入数据
            handleFileSuccess(res, file) {
                if(res !== ''){
                    // 组织实验信息
                    this.experimentEditDate.fileName = res;
                    // 关闭上传组件
                    this.uploadShow = false;
                    // 回显文件名
                    this.uploadFilename = file.name;
                }else{
                    this.$message.error("上传失败！");
                }
            },
            // 文件类型和大小检查
            beforeFileUpload(file) {
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                    this.$message.error('任务书大小不能超过 10MB!');
                }
                return isLt10M;
            },
            // 分页大小变化
            handleSizeChange(val) {
                this.pageSize = val;
                // 查询所有实验
                this.getExperiment();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.currentPage = val;
                // 查询所有实验
                this.getExperiment();
            },
        }
    }
</script>

<style scoped>
    /* 上传框文本 */
    .createChapterInfo{
        font-size: 16px;
        margin-bottom: 10px;
    }
    /* 文件上传框 */
    ::v-deep .el-upload{
        width: 100% !important;
    }
    ::v-deep .el-upload-dragger{
        width: 100% !important;
        height: 300px !important;
    }
    /* 文件上传成功后回显文件名 */
    #uploadSuccessShowName{
        margin-top:1em;
        font-size: 16px;
    }
    #uploadSuccessShowIcon{
        color: #77ee77;
        margin-left: 0.5em;
    }
    /* 编辑提示 */
    ::v-deep #updateCourseInfoEditorTags{
        font-size: 18px;
        color: #000000;
        height: 50px;
        margin-bottom: 30px;
    }
    /* 表格字体 */
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
