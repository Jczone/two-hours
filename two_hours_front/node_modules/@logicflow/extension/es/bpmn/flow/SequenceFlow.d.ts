import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core';
declare class SequenceFlowModel extends PolylineEdgeModel {
    static extendKey: string;
    constructor(data: any, graphModel: any);
}
declare class SequenceFlowView extends PolylineEdge {
    static extendKey: string;
}
declare const SequenceFlow: {
    type: string;
    view: typeof SequenceFlowView;
    model: typeof SequenceFlowModel;
};
export { SequenceFlowView, SequenceFlowModel };
export default SequenceFlow;
