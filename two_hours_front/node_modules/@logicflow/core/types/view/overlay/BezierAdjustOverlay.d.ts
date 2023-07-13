import { Component, h } from 'preact';
import BezierEdgeModel from '../../model/edge/BezierEdgeModel';
import GraphModel from '../../model/GraphModel';
declare type IProps = {
    graphModel: GraphModel;
};
export default class BezierAdjustOverlay extends Component<IProps> {
    getBezierAdjust(bezier: BezierEdgeModel, graphModel: GraphModel): any[];
    selectedBezierEdge(): any[];
    render(): h.JSX.Element;
}
export {};
