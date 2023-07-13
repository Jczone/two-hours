import { h, Component } from 'preact';
import { BaseEdgeModel } from '../../model/edge';
import GraphModel from '../../model/GraphModel';
import { Point } from '../../type';
interface IProps {
    x: number;
    y: number;
    type: AdjustType;
    id?: string;
    graphModel: GraphModel;
    edgeModel: BaseEdgeModel;
}
interface IState {
    draging: boolean;
    endX: number;
    endY: number;
}
interface OldEdge {
    startPoint: Point;
    endPoint: Point;
    pointsList: Point[];
}
declare enum AdjustType {
    SOURCE = "SOURCE",
    TARGET = "TARGET"
}
export default class AdjustPoint extends Component<IProps, IState> {
    dragHandler: Function;
    oldEdge: OldEdge;
    preTargetNode: any;
    targetRuleResults: Map<any, any>;
    sourceRuleResults: Map<any, any>;
    constructor();
    onDragStart: () => void;
    onDraging: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    onDragEnd: () => void;
    recoveryEdge: () => void;
    getAdjustPointStyle: () => import("../../constant/DefaultTheme").CircleTheme;
    isAllowAdjust(info: any): any;
    render(): h.JSX.Element;
}
export {};
