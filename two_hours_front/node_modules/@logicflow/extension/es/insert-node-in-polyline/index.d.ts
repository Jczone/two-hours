import LogicFlow from '@logicflow/core';
declare class InsertNodeInPolyline {
    static pluginName: string;
    _lf: LogicFlow;
    dndAdd: boolean;
    dropAdd: boolean;
    constructor({ lf }: {
        lf: any;
    });
    eventHandler(): void;
    insetNode(nodeData: any): void;
}
export { InsertNodeInPolyline };
export default InsertNodeInPolyline;
