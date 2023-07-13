import { PolygonNode, PolygonNodeModel } from '@logicflow/core';
declare class ExclusiveGatewayModel extends PolygonNodeModel {
    static extendKey: string;
    constructor(data: any, graphModel: any);
}
declare class ExclusiveGatewayView extends PolygonNode {
    static extendKey: string;
    getShape(): import("preact").VNode<any>;
}
declare const ExclusiveGateway: {
    type: string;
    view: typeof ExclusiveGatewayView;
    model: typeof ExclusiveGatewayModel;
};
export { ExclusiveGatewayView, ExclusiveGatewayModel };
export default ExclusiveGateway;
