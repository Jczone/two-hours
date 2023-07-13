// 直线
import {PolylineEdge, PolylineEdgeModel } from "@logicflow/core";

class UserLineModel extends PolylineEdgeModel {
    setAttributes() {
        this.offset = 20;
    }
    getEdgeStyle() {
        const style = super.getEdgeStyle();
        const { properties } = this;
        if (properties.isActived) {
            style.strokeDasharray = "4 4";
        }
        style.stroke = "#037dff";
        return style;
    }
    getTextStyle() {
        const style = super.getTextStyle();
        style.color = "#3451F1";
        style.fontSize = 20;
        style.background.fill = "rgba(255,255,255,0)";
        return style;
    }
    getOutlineStyle() {
        const style = super.getOutlineStyle();
        style.stroke = "red";
        style.hover.stroke = "red";
        return style;
    }
    // 给边开启动画
    setAttributes() {
        this.isAnimation = true;
    }
    getEdgeAnimationStyle() {
        const style = super.getEdgeAnimationStyle();
        style.strokeDasharray = "1 1";
        style.animationDuration = "5s";
        return style;
    }
}

export default {
    type: "UserLine",
    view: PolylineEdge,
    model: UserLineModel
};