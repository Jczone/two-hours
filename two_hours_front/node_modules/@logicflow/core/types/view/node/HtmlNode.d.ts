import { h } from 'preact';
import BaseNode from './BaseNode';
export default class HtmlNode extends BaseNode {
    ref: HTMLElement;
    currrentProperties: string;
    preProperties: string;
    setRef: (dom: any) => void;
    get rootEl(): HTMLElement;
    /**
     * @overridable 支持重写
     * 自定义HTML节点内容
     * @param {HTMLElement} rootEl 自定义HTML节点内容可以挂载的dom节点
     * @example
     * class CustomHtmlNode extends HtmlNode {
     *   setHtml(rootEl) {
     *     const input = document.createElement('input');
     *     rootEl.appendChild(input)
     *   }
     * }
     */
    setHtml(rootEl: HTMLElement): void;
    /**
     * @overridable 支持重写
     * 和react的shouldComponentUpdate类似，都是为了避免出发不必要的render.
     * 但是这里不一样的地方在于，setHtml方法，我们只在properties发生变化了后再触发。
     * 而x,y等这些坐标相关的方法发生了变化，不会再重新触发setHtml.
     */
    shouldUpdate(): boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    getShape(): h.JSX.Element;
}
