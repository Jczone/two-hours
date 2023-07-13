import { RectResize } from "@logicflow/extension";

class MyModel extends RectResize.model {
    // 形状属性设置
    initNodeData(data) {
        super.initNodeData(data);
        const properties = this.properties;
        if (properties.statu === 'CPU') {
            this.width = 160;  // 宽度
            this.height = 60;  // 高度
        } else if (properties.statu === 'ACC'||properties.statu === 'ALU'||properties.statu === 'CU') {
            this.width = 120;  // 宽度
            this.height = 40;  // 高度
        } else if (properties.statu === 'MainStore'||properties.statu === 'PlusStore'||properties.statu === 'IR'||properties.statu === 'PC') {
            this.width = 100;  // 宽度
            this.height = 40;  // 高度
        } else if (properties.statu === 'Input'||properties.statu === 'Output') {
            this.width = 80;  // 宽度
            this.height = 40;  // 高度
        } else {
            this.width = 100;  // 宽度
            this.height = 40;  // 高度
            this.radius = 5;   // 圆角
        }
    }
    // 自定义属性
    getNodeStyle() {
        const style = super.getNodeStyle();
        const properties = this.properties;
        if (properties.statu === 'CPU') {
            style.stroke = "#1a6ff7";
        } else if (properties.statu === 'ACC'||properties.statu === 'ALU'||properties.statu === 'CU') {
            style.stroke = "rgb(255,154,61)";
        } else if (properties.statu === 'MainStore'||properties.statu === 'PlusStore'||properties.statu === 'IR'||properties.statu === 'PC') {
            style.stroke = "rgb(135,101,236)";
        } else if (properties.statu === 'Input'||properties.statu === 'Output') {
            style.stroke = "rgb(117,229,93)";
        } else {
            style.stroke = "rgb(0,0,0)";
        }
        return style;
    }
    // 文本
    getTextStyle() {
        const style = super.getTextStyle();
        const properties = this.properties;
        if (properties.statu === 'CPU') {
            style.color = "#1a6ff7";
        } else if (properties.statu === 'ACC'||properties.statu === 'ALU'||properties.statu === 'CU') {
            style.color = "rgb(255,154,61)";
        } else if (properties.statu === 'MainStore'||properties.statu === 'PlusStore'||properties.statu === 'IR'||properties.statu === 'PC') {
            style.color = "rgb(135,101,236)";
        } else if (properties.statu === 'Input'||properties.statu === 'Output') {
            style.color = "rgb(117,229,93)";
        } else {
            style.color = "rgb(0,0,0)";
        }
        return style;
    }
}

class MyView extends RectResize.view {}

export default {
    type: "myRect",
    model: MyModel,
    view: MyView
};
