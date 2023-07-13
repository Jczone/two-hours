<template>
    <div>
        <keep-alive include="Register">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
  export default {
      name: 'App',
  }
</script>

<style>
    /* 表格背景色 */
    .el-table .success-row {
        background: #eef8ff ;
    }
    .el-table .warning-row {
        background: #eef8ff;
    }
    /* 表格文字 */
    .el-table{
        font-size: 17px;
        font-weight: 500;
        font-family: 微软雅黑, serif;
    }
    /* 表头文字 */
    .el-table th.el-table__cell>.cell {
        font-size: 16px;
        font-weight: 500;
        font-family: 微软雅黑,serif;
    }
    /* loading图标大小 */
    .el-loading-spinner {
        font-size: 70px;
    }
    .el-loading-text {
        font-size: 20px !important;
    }
</style>