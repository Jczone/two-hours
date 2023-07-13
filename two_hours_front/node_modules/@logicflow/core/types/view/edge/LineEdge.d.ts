import { h } from 'preact';
import BaseEdge from './BaseEdge';
export default class LineEdge extends BaseEdge {
    getEdge(): h.JSX.Element;
    getShape(): h.JSX.Element;
    getAnimation(): h.JSX.Element;
    getAppendWidth(): h.JSX.Element;
}
