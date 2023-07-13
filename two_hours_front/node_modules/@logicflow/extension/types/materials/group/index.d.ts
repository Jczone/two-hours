import LogicFlow, { BaseNodeModel } from '@logicflow/core';
import GroupNode from './GroupNode';
declare type BaseNodeId = string;
declare type GroupId = string;
declare type Bounds = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
declare class Group {
    static pluginName: string;
    lf: LogicFlow;
    activeGroup: any;
    nodeGroupMap: Map<BaseNodeId, GroupId>;
    constructor({ lf }: {
        lf: any;
    });
    graphRendered: (data: any) => void;
    appendNodeToGrop: ({ data }: {
        data: any;
    }) => void;
    deleteGroupChild: ({ data }: {
        data: any;
    }) => void;
    setActiveGroup: ({ data }: {
        data: any;
    }) => void;
    /**
     * 获取自定位置其所属分组
     */
    getGroup(bounds: Bounds): BaseNodeModel | undefined;
    /**
     * 获取某个节点所属的groupModel
     */
    getNodeGroup(nodeId: any): BaseNodeModel;
}
export { Group, GroupNode, };
