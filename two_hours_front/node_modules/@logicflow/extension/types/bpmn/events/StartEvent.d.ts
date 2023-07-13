import { CircleNode, CircleNodeModel } from '@logicflow/core';
declare class StartEventModel extends CircleNodeModel {
    static extendKey: string;
    constructor(data: any, graphModel: any);
    setAttributes(): void;
    getConnectedTargetRules(): import("@logicflow/core").ConnectRule[];
}
declare class StartEventView extends CircleNode {
    static extendKey: string;
}
declare const StartEvent: {
    type: string;
    view: typeof StartEventView;
    model: typeof StartEventModel;
};
export { StartEventModel, StartEventView };
export default StartEvent;
