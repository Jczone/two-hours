import { h, DiamondNode, DiamondNodeModel } from '@logicflow/core';
declare class DiamondResizeModel extends DiamondNodeModel {
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
declare class DiamondResizeView extends DiamondNode {
    getControlGroup(): h.JSX.Element;
    getResizeShape(): h.JSX.Element;
    getShape(): h.JSX.Element;
}
declare const EllipseResize: {
    type: string;
    view: typeof DiamondResizeView;
    model: typeof DiamondResizeModel;
};
export default EllipseResize;
