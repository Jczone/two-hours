// UserTaskNode.js
import { RectResize } from "@logicflow/extension";

class UserTaskModel extends RectResize.model {
    // 形状属性设置
    initNodeData(data) {
        super.initNodeData(data);
        this.width = 100;  // 宽度
        this.height = 50;  // 高度
        this.radius = 5;   // 圆角
        this.text.draggable = false; // 不允许文本被拖动
        this.text.editable = false; // 不允许文本被编辑
    }
    // 样式属性设置
    getNodeStyle() {
        // 直接设置样式
        const style = super.getNodeStyle();
        style.stroke = 'blue';  // 边框颜色-被下面的设置覆盖了
        style.strokeDasharray = '3 3';  // 边框虚线

        // 设置不同的自定义属性
        const properties = this.properties;
        if (properties.statu === 'pass') {
            style.stroke = "green";
        } else if (properties.statu === 'reject') {
            style.stroke = "red";
        } else {
            style.stroke = "rgb(51,150,247)";
        }
        return style;
    }
    // 文本
    getTextStyle() {
        const style = super.getTextStyle();
        style.fontSize = 16;
        style.color = 'red';
        style.text = 'chenjiedian';
        return style;
    }
    // 规则
    setAttributes() {
        const size = 80;
        const circleOnlyAsTarget = {
            message: "正方形节点下一个节点只能是圆形节点",
            validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
                return targetNode.type === "circle";
            },
        };

        this.width = size;
        this.height = size;
        this.sourceRules.push(circleOnlyAsTarget);
    }
}

class UserTaskView extends RectResize.view {}

export default {
    type: "UserTask",
    view: UserTaskView,
    model: UserTaskModel
};
