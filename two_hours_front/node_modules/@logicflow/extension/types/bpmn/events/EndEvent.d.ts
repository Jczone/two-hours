import { CircleNode, CircleNodeModel } from '@logicflow/core';
declare class EndEventModel extends CircleNodeModel {
    static extendKey: string;
    constructor(data: any, graphModel: any);
    setAttributes(): void;
    getConnectedSourceRules(): import("@logicflow/core").ConnectRule[];
}
declare class EndEventView extends CircleNode {
    static extendKey: string;
    getAnchorStyle(): {
        visibility: string;
    };
    getShape(): import("preact").VNode<any>;
}
declare const EndEvent: {
    type: string;
    view: typeof EndEventView;
    model: typeof EndEventModel;
};
export { EndEventView, EndEventModel };
export default EndEvent;
