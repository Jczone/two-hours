import { h, Component } from 'preact';
import { ArrowStyle } from './Arrow';
import BaseEdgeModel from '../../model/edge/BaseEdgeModel';
import GraphModel from '../../model/GraphModel';
import { ArrowInfo } from '../../type/index';
declare type IProps = {
    model: BaseEdgeModel;
    graphModel: GraphModel;
};
export default class BaseEdge extends Component<IProps> {
    startTime: number;
    contextMenuTime: number;
    clickTimer: number;
    getShape(): void;
    getTextStyle(): void;
    getText(): "" | h.JSX.Element;
    getArrowInfo(): ArrowInfo;
    getArrowStyle(): ArrowStyle;
    getArrow(): h.JSX.Element;
    getAdjustPoints(): h.JSX.Element;
    getAnimation(): void;
    getAppendWidth(): h.JSX.Element;
    getAppend(): h.JSX.Element;
    handleHover: (hovered: any, ev: any) => void;
    setHoverON: (ev: any) => void;
    setHoverOFF: (ev: any) => void;
    handleContextMenu: (ev: MouseEvent) => void;
    handleMouseDown: (e: any) => void;
    handleMouseUp: (e: MouseEvent) => void;
    getIsDraging: () => boolean;
    toFront(): void;
    render(): h.JSX.Element;
}
export {};
