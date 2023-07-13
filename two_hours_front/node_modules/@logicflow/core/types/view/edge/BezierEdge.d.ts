import { h } from 'preact';
import BaseEdge from './BaseEdge';
import { ArrowInfo } from '../../type/index';
export default class BezierEdge extends BaseEdge {
    getEdge(): h.JSX.Element;
    getShape(): h.JSX.Element;
    getAnimation(): h.JSX.Element;
    getAppendWidth(): h.JSX.Element;
    getArrowInfo(): ArrowInfo;
}
