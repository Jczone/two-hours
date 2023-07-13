const { defineConfig } = require('@vue/cli-service')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
module.exports = defineConfig({
    // 跨域
    transpileDependencies: true,
    // 关闭语法检测
    lintOnSave:false,
    // 开启代理服务器
    devServer: {
        port: 80,  // 项目运行端口号
        // 目标端口
        proxy: 'http://localhost:8080'
    },
})