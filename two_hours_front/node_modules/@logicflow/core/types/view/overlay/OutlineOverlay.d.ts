import { Component, h } from 'preact';
import { LineEdgeModel } from '../../model';
import BezierEdgeModel from '../../model/edge/BezierEdgeModel';
import PolylineEdgeModel from '../../model/edge/PolylineEdgeModel';
import GraphModel from '../../model/GraphModel';
declare type IProps = {
    graphModel: GraphModel;
};
export default class OutlineOverlay extends Component<IProps> {
    getNodesOutline(): any[];
    getEdgeOutline(): any[];
    getLineOutline(line: LineEdgeModel): h.JSX.Element;
    getPolylineOutline(polyline: PolylineEdgeModel): h.JSX.Element;
    getBezierOutline(bezier: BezierEdgeModel): h.JSX.Element;
    render(): h.JSX.Element;
}
export {};
