import { h, Component } from 'preact';
import { BaseNodeModel, GraphModel, LogicFlowUtil } from '@logicflow/core';
interface IProps {
    index: number;
    x: number;
    y: number;
    model: BaseNodeModel;
    graphModel: GraphModel;
    style?: CSSStyleDeclaration;
}
declare class Control extends Component<IProps> {
    index: number;
    nodeModel: BaseNodeModel;
    graphModel: GraphModel;
    dragHandler: LogicFlowUtil.StepDrag;
    constructor(props: any);
    getNodeEdges(nodeId: any): {
        sourceEdges: any[];
        targetEdges: any[];
    };
    updatePosition: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    getResize: ({ index, deltaX, deltaY, width, height, pct }: {
        index: any;
        deltaX: any;
        deltaY: any;
        width: any;
        height: any;
        pct?: number;
    }) => {
        width: any;
        height: any;
    };
    updateRect: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    updateEllipse: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    updateDiamond: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    eventEmit: ({ beforeNode, afterNode }: {
        beforeNode: any;
        afterNode: any;
    }) => void;
    onDraging: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    render(): h.JSX.Element;
}
export default Control;
