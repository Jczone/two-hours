<template>
    <span>
        <el-button type="primary" plain @click="exportSubmit">导出表格</el-button>
    </span>
</template>

<script>
    // 引入导出Excel表格依赖
    import XLSX from "xlsx";
    import FileSaver from "file-saver";
    export default {
        name: "TableExport",
        props:[
            'tableId',
        ],
        data(){
            return{
                filename:'',
                lastName:'.xlsx',
            }
        },
        methods:{
            exportSubmit(){
                // 设置默认文件名
                this.filename = 'table';
                // 获取文件名
                this.$prompt('请输入文件名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[\u4e00-\u9fa5A-Za-z0-9\s.]+/,    // 正则-至少一个字符
                    inputErrorMessage: '文件名格式不正确！'
                }).then(({ value }) => {
                    // 添加后缀
                    this.filename = value + this.lastName;
                    // 导出文件
                    this.exportExcel();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            },
            // 导出表格
            exportExcel() {
                /* 从表生成工作簿对象 */
                let wb = XLSX.utils.table_to_book(document.getElementById(this.tableId),{raw:true});
                /* 获取二进制字符串作为输出 */
                let wbOut = XLSX.write(wb, {
                    bookType: "xlsx",
                    bookSST: true,
                    type: "array"
                });
                try {
                    //Blob 对象表示一个不可变、原始数据的类文件对象。
                    //Blob 表示的不一定是JavaScript原生格式的数据。
                    //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
                    //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
                    FileSaver.saveAs(new Blob([wbOut], { type: "application/octet-stream" }), this.filename);
                } catch (e) {
                    if (typeof console !== "undefined") console.log(e, wbOut);
                }
                return wbOut;
            }
        }
    }
</script>

<style scoped>

</style>