import { h } from 'preact';
import BaseEdge from './BaseEdge';
import { AppendInfo, ArrowInfo } from '../../type/index';
declare type AppendAttributesType = {
    d: string;
    fill: string;
    stroke: string;
    strokeWidth: number;
    strokeDasharray: string;
};
export default class PolylineEdge extends BaseEdge {
    drag: any;
    isDraging: boolean;
    appendInfo: AppendInfo;
    dragHandler: (ev: MouseEvent) => void;
    constructor();
    onDragStart: () => void;
    onDraging: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    onDragEnd: () => void;
    beforeDragStart: (e: any, appendInfo: any) => void;
    getIsDraging: () => boolean;
    getEdge(): h.JSX.Element;
    getShape(): h.JSX.Element;
    getAnimation(): h.JSX.Element;
    getArrowInfo(): ArrowInfo;
    getAppendAttributes(appendInfo: AppendInfo): AppendAttributesType;
    getAppendShape(appendInfo: AppendInfo): h.JSX.Element;
    getAppendWidth(): h.JSX.Element;
}
export {};
