import { RectNodeModel, RectNode } from '@logicflow/core';
declare class ServiceTaskModel extends RectNodeModel {
    static extendKey: string;
    constructor(data: any, graphModel: any);
}
declare class ServiceTaskView extends RectNode {
    static extendKey: string;
    getLabelShape(): import("preact").VNode<any>;
    getShape(): import("preact").VNode<any>;
}
declare const ServiceTask: {
    type: string;
    view: typeof ServiceTaskView;
    model: typeof ServiceTaskModel;
};
export { ServiceTaskView, ServiceTaskModel };
export default ServiceTask;
