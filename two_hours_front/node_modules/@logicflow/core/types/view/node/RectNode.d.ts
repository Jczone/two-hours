import { h } from 'preact';
import BaseNode from './BaseNode';
export default class RectNode extends BaseNode {
    getShape(): h.JSX.Element;
}
