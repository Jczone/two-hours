import { h } from 'preact';
import BaseNode from './BaseNode';
export default class PolygonNode extends BaseNode {
    getShape(): h.JSX.Element;
}
