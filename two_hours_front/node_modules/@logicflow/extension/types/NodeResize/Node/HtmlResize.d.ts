import { h, HtmlNode, HtmlNodeModel } from '@logicflow/core';
declare class HtmlResizeModel extends HtmlNodeModel {
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
declare class HtmlResizeView extends HtmlNode {
    getControlGroup(): h.JSX.Element;
    getResizeShape(): h.JSX.Element;
    getShape(): h.JSX.Element;
}
declare const HtmlResize: {
    type: string;
    view: typeof HtmlResizeView;
    model: typeof HtmlResizeModel;
};
export default HtmlResize;
