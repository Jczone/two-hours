import { h, RectNode, RectNodeModel } from '@logicflow/core';
declare class RectResizeModel extends RectNodeModel {
    constructor(data: any, graphModel: any);
    initNodeData(data: any): void;
    getOutlineStyle(): import("@logicflow/core/types/constant/DefaultTheme").OutlineTheme;
    getResizeOutlineStyle(): {
        fill: string;
        stroke: string;
        strokeWidth: number;
        strokeDasharray: string;
    };
    getControlPointStyle(): {
        width: number;
        height: number;
        fill: string;
        stroke: string;
    };
    resize(deltaX: any, deltaY: any): void;
}
declare class RectResizeView extends RectNode {
    getControlGroup(): h.JSX.Element;
    getResizeShape(): h.JSX.Element;
    getShape(): h.JSX.Element;
}
declare const RectResize: {
    type: string;
    view: typeof RectResizeView;
    model: typeof RectResizeModel;
};
export default RectResize;
