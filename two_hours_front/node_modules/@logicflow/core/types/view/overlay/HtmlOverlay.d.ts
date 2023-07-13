/**
 * HtmlOverlay和CanvasOverlay放大，缩小，平移保持一致。
 * 但是这里是放的是HTML标签而不是SVG。
 * 目前这里可以放文本。
 * 之后可以考虑放图片，范围框等。
 */
import { h, Component } from 'preact';
import GraphModel from '../../model/GraphModel';
declare type IProps = {
    graphModel: GraphModel;
};
declare class HtmlOverlay extends Component<IProps> {
    render(): h.JSX.Element;
}
export default HtmlOverlay;
