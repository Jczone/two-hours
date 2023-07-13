<template>
    <div>
        <!-- 功能菜单 -->
        <el-row style="margin-top: 20px">
            <!--搜索表单-->
            <el-col :span="7" :offset="16">
                <search-box @onSubmit="searchExperiment"></search-box>
            </el-col>
        </el-row>

        <!--表格-->
        <template>
            <el-table
                    ref="noticeMultipleTable"
                    :data="experimentPlusData"
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
                        label="任务书"
                        align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.fileName !== null" type="text" @click="downloadFile(scope.row)">
                            <i class="el-icon-download"></i>{{scope.row.fileName.substring(6)}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        label="我的报告"
                        align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.reportFile !== null" type="text" @click="downloadReport(scope.row)">
                            <i class="el-icon-download"></i>
                            <span v-if="scope.row.reportFile !== null">{{scope.row.reportFile.substring(6)}}</span>
                            <span v-else>无</span>
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
                        <!-- 上传组件 -->
                        <el-upload
                                :show-file-list="false"
                                action="/Files/resourceUpload"
                                :on-success="handleFileSuccess"
                                :before-upload="beforeFileUpload">
                            <el-button type="primary" @click="prepareUpload(scope.row)">提交报告</el-button>
                        </el-upload>
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
        name: 'StuExperimentTab',
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
                // 考试数据
                experimentPlusData:[],
                // 报告数据
                report:{
                    reportId:'',
                    fileName:'',
                },
                // 旧报告
                filenameOld:'',
            }
        },
        created() {
            this.getExperimentPlus();
        },
        methods:{
            // 查询实验数据
            getExperimentPlus(){
                this.searchTitle["pageSize"]=this.pageSize;
                this.searchTitle["currentPage"]=this.currentPage;
                this.$axios.post("/Experiment/getPlusPageByCondition",this.searchTitle).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.experimentPlusData = res.data.data.records;
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
                this.getExperimentPlus();
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
            // 下载报告
            downloadReport(row){
                if(row.reportFile === null) {
                    this.$message.warning("文件不存在！")
                    return;
                };
                let url = "http://" + window.location.host + "/Files/reportDownload";
                const xhr = new XMLHttpRequest();
                xhr.open('post', url);
                xhr.responseType = 'blob';
                //3.5 请求头（POST请求时设置）
                xhr.setRequestHeader('Content-Type','application/json')
                // xhr.setRequestHeader("Content-type","application/json;charset=UTF-8");
                xhr.send(JSON.stringify({fileName:row.reportFile}));
                xhr.onload = function () {
                    if (this.status === 200 || this.status === 304) {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(this.response);
                        fileReader.onload = function () {
                            const a = document.createElement('a');
                            a.style.display = 'none';
                            a.href = this.result;
                            a.download = row.reportFile;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        };
                    }
                };
                // 解决多弹窗重叠问题
                setTimeout(()=>{this.$message.success("下载:"+row.reportFile+" 完成！")},1000);
            },
            // 文件上传处理
            prepareUpload(row){
                this.report.reportId = row.reportId;
                this.filenameOld = row.reportFile;
            },
            // 文件上传成功的钩子-回显并写入数据
            handleFileSuccess(res, file) {
                if(res !== ''){
                    // 组织实验信息
                    this.report.fileName = res;
                    this.$axios.post("/Experiment/uploadReport",this.report).then((res)=>{
                        if(res.data.flag){
                            this.getExperimentPlus();
                            if(this.filenameOld !== this.report.fileName){
                                // 文件更新-清理旧文件
                                let resource = {
                                    resourceName:this.filenameOld,
                                };
                                this.$axios.post("/Files/reportDelete",resource);
                            }
                        }else{
                            // 服务故障
                            this.$message.error("文件提交失败！");
                        }
                    });
                }else{
                    this.$message.error("上传失败！");
                }
            },
            // 文件类型和大小检查
            beforeFileUpload(file) {
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (!isLt10M) {
                    this.$message.error('文件大小不能超过 10MB!');
                }
                return isLt10M;
            },
            // 分页大小变化
            handleSizeChange(val) {
                this.pageSize = val;
                // 查询所有实验
                this.getExperimentPlus();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.currentPage = val;
                // 查询所有实验
                this.getExperimentPlus();
            },
        }
    }
</script>

<style scoped>
    /* 文件上传框 */
    ::v-deep .el-upload{
        width: 100% !important;
    }
    ::v-deep .el-upload-dragger{
        width: 100% !important;
        height: 300px !important;
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
