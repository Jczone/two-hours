<template>
    <div>
        <div class="container" ref="container"></div>
    </div>
</template>

<script>
    // 引入logicFlow依赖
    import LogicFlow from "@logicflow/core";
    import "@logicflow/core/dist/style/index.css";
    // 引入LogicFlow插件
    import { DndPanel, Control, SelectionSelect, InsertNodeInPolyline, Snapshot , Menu} from '@logicflow/extension';
    import '@logicflow/extension/lib/style/index.css'
    // 自定义节点
    import myRect from "@/components/myLogicFlow/myNode/myRect";
    import myEllipse from "@/components/myLogicFlow/myNode/myEllipse";
    /* 组件 */
    export default {
        name: "MyLogicFlow",
        mounted() {
            this.lf = new LogicFlow({
                container: this.$refs.container,
                grid: true,
                keyboard: {enabled: true},
                stopScrollGraph:true,
                nodeTextDraggable:true,
                plugins: [DndPanel, Control, SelectionSelect, Menu, Snapshot, InsertNodeInPolyline]
            });
            // 关闭全局css设置-避免出现漏洞
            this.lf.extension.snapshot.useGlobalRules = false;
            // 注册自定义组件
            this.lf.register(myRect);
            this.lf.register(myEllipse);
            // 挂载事件
            this.lf.on('connection:not-allowed', (msg) => {
                this.$message.error(msg)
            });
            // 主题设置
            this.lf.setTheme({
                line: {
                    stroke: '#000000',
                    strokeWidth: 2,
                },polyline: {
                    stroke: '#000000',
                    strokeWidth: 2,
                }
            })
            // 控制面板
            this.lf.extension.dndPanel.setPatternItems([
                {
                    label: '选区',
                    icon:'http://localhost:8080/imgs/icon/select.png',
                    callback: () => {
                        this.lf.extension.selectionSelect.openSelectionSelect();
                        this.lf.once('selection:selected', () => {
                            this.lf.extension.selectionSelect.closeSelectionSelect();
                        });
                    }
                },{
                    type: 'myRect',
                    label: 'CPU',
                    text: 'CPU',
                    icon:'http://localhost:8080/imgs/icon/cpu.png',
                    properties: {statu:'CPU'}
                },{
                    type: 'myRect',
                    label: 'ACC',
                    text: 'ACC',
                    icon:'http://localhost:8080/imgs/icon/acc.png',
                    properties: {statu:'ACC'}
                },{
                    type: 'myRect',
                    label: 'ALU',
                    text: 'ALU',
                    icon:'http://localhost:8080/imgs/icon/alu.png',
                    properties: {statu:'ALU'}
                },{
                    type: 'myRect',
                    label: 'CU',
                    text: 'CU',
                    icon:'http://localhost:8080/imgs/icon/cu.png',
                    properties: {statu:'CU'}
                },{
                    type: 'myRect',
                    label: '主存',
                    text: '主存',
                    icon:'http://localhost:8080/imgs/icon/mainStore.png',
                    properties: {statu:'MainStore'}
                },{
                    type: 'myRect',
                    label: '辅存',
                    text: '辅存',
                    icon:'http://localhost:8080/imgs/icon/plusStore.png',
                    properties: {statu:'PlusStore'}
                },{
                    type: 'myRect',
                    label: 'IR',
                    text: 'IR',
                    icon:'http://localhost:8080/imgs/icon/ir.png',
                    properties: {statu:'IR'}
                },{
                    type: 'myRect',
                    label: 'PC',
                    text: 'PC',
                    icon:'http://localhost:8080/imgs/icon/pc.png',
                    properties: {statu:'PC'}
                },{
                    type: 'myRect',
                    label: '输入设备',
                    text: '输入设备',
                    icon:'http://localhost:8080/imgs/icon/input.png',
                    properties: {statu:'Input'}
                },{
                    type: 'myRect',
                    label: '输出设备',
                    text: '输出设备',
                    icon:'http://localhost:8080/imgs/icon/output.png',
                    properties: {statu:'Output'}
                },{
                    type: 'myRect',
                    label: '矩形',
                    icon:'http://localhost:8080/imgs/icon/rect.png',
                },{
                    type: 'myEllipse',
                    label: '椭圆',
                    icon: 'http://localhost:8080/imgs/icon/circle.png',
                }, {
                    label: '下载',
                    icon:'http://localhost:8080/imgs/icon/download.png',
                    callback: () => {
                        this.lf.getSnapshot()
                    }
                }]);
            // 渲染
            this.lf.render();
        },
    }
</script>

<style scoped>
    .container {
        width: 98vw;
        height: 98vh;
    }
</style>