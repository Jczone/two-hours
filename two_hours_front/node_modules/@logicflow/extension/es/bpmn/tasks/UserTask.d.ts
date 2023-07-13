import { RectNode, RectNodeModel } from '@logicflow/core';
declare class UserTaskModel extends RectNodeModel {
    static extendKey: string;
    constructor(data: any, graphModel: any);
}
declare class UserTaskView extends RectNode {
    static extendKey: string;
    getLabelShape(): import("preact").VNode<any>;
    getShape(): import("preact").VNode<any>;
}
declare const UserTask: {
    type: string;
    view: typeof UserTaskView;
    model: typeof UserTaskModel;
};
export { UserTaskView, UserTaskModel };
export default UserTask;
