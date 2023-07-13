import { h } from 'preact';
import BaseNode from './BaseNode';
export default class TextNode extends BaseNode {
    getBackgroud(): h.JSX.Element;
    getShape(): h.JSX.Element;
}
