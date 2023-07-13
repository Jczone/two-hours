import { h, EllipseNode, EllipseNodeModel } from '@logicflow/core';
declare class EllipseResizeModel extends EllipseNodeModel {
    constructor(data: any, graphModel: any);
    initNodeData(data: any): void;
    getOutlineStyle(): import("@logicflow/core/types/constant/DefaultTheme").OutlineTheme;
    getResizeOutlineStyle(): {
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
}
declare class EllipseResizeView extends EllipseNode {
    getControlGroup(): h.JSX.Element;
    getResizeShape(): h.JSX.Element;
    getShape(): h.JSX.Element;
}
declare const EllipseResize: {
    type: string;
    view: typeof EllipseResizeView;
    model: typeof EllipseResizeModel;
};
export default EllipseResize;
