import { h, Component } from 'preact';
import { StepDrag } from '../util/drag';
import BaseNodeModel, { ConnectRuleResult } from '../model/node/BaseNodeModel';
import GraphModel from '../model/GraphModel';
import { AnchorConfig } from '../type';
import { BaseNode } from './node';
declare type TargetNodeId = string;
interface IProps {
    anchorData: AnchorConfig;
    node: BaseNode;
    style?: Record<string, any>;
    hoverStyle?: Record<string, any>;
    edgeStyle?: Record<string, any>;
    anchorIndex: number;
    graphModel: GraphModel;
    nodeModel: BaseNodeModel;
    setHoverOFF: Function;
}
interface IState {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    draging: boolean;
}
declare class Anchor extends Component<IProps, IState> {
    preTargetNode: BaseNodeModel;
    sourceRuleResults: Map<TargetNodeId, ConnectRuleResult>;
    targetRuleResults: Map<TargetNodeId, ConnectRuleResult>;
    dragHandler: StepDrag;
    t: any;
    constructor();
    getAnchorShape(): h.JSX.Element;
    onDragStart: ({ event }: {
        event: any;
    }) => void;
    onDraging: ({ event }: {
        event: any;
    }) => void;
    onDragEnd: (event: any) => void;
    checkEnd: (event: any) => void;
    moveAnchorEnd(endX: number, endY: number): void;
    isShowLine(): boolean;
    render(): h.JSX.Element;
}
export default Anchor;
