import { EllipseResize } from "@logicflow/extension";

class MyModel extends EllipseResize.model {
    // 形状属性设置
    initNodeData(data) {
        super.initNodeData(data);
        this.rx = 40;  // 宽度
        this.ry = 40;  // 高度
    }
}

class MyView extends EllipseResize.view {}

export default {
    type: "myEllipse",
    model: MyModel,
    view: MyView
};
