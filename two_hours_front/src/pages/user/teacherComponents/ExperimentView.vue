<template>
    <div>
        <!--表格-->
        <template>
            <el-table
                    ref="noticeMultipleTable"
                    :data="reports"
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
                        label="姓名"
                        align="center"
                        sortable
                        width="400">
                </el-table-column>

                <el-table-column
                        label="学生报告"
                        align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="downloadReport(scope.row)">
                            <i class="el-icon-download"></i>
                            <span v-if="scope.row.fileName !== null">{{scope.row.fileName.substring(6)}}</span>
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
                searchTitle:{},
                // 报告数据
                reports:[],
            }
        },
        created() {
            this.getReports();
        },
        methods:{
            // 查询实验报告数据
            getReports(){
                this.searchTitle["id"]=this.$route.params.experimentId;
                this.searchTitle["pageSize"]=this.pageSize;
                this.searchTitle["currentPage"]=this.currentPage;
                this.$axios.post("/Experiment/getReportsByCondition",this.searchTitle).then((res)=>{
                    if(res.data.flag){
                        /* 保存公告数据 */
                        this.reports = res.data.data.records;
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
            // 下载报告
            downloadReport(row){
                if(row.fileName === null) {
                    this.$message.warning("文件不存在！")
                    return;
                }
                let url = "http://" + window.location.host + "/Files/reportDownloadTec";
                const xhr = new XMLHttpRequest();
                xhr.open('post', url);
                xhr.responseType = 'blob';
                //3.5 请求头（POST请求时设置）
                xhr.setRequestHeader('Content-Type','application/json')
                // xhr.setRequestHeader("Content-type","application/json;charset=UTF-8");
                xhr.send(JSON.stringify({fileName:row.fileName,userId:row.userId}));
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
            // 分页大小变化
            handleSizeChange(val) {
                this.pageSize = val;
                // 查询所有实验
                this.getReports();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.currentPage = val;
                // 查询所有实验
                this.getReports();
            },
        }
    }
</script>

<style scoped>
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