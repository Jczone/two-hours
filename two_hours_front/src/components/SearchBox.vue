<template>
    <div>
        <el-form :inline="true" :model="searchTitle">
            <el-form-item label="搜索内容">
                <el-input v-model="searchTitle.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(searchTitle.title)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="onSubmit('')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    /**
     * 搜索框组件
     * 使用时需绑定方法onSubmit，当搜索提交时，向方法绑定的事件发送搜索参数
     * 并自动清空搜索栏
     */
    export default {
        name: "SearchBox",
        data(){
            return{
                searchTitle:{
                    title:''
                }
            }
        },
        methods:{
            onSubmit(title){
                // 调用父组件方法并传参
                this.$emit('onSubmit',title);
                // 清空搜索条件
                this.searchTitle.title = '';
            },
        }
    }
</script>