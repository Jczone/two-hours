export declare function toTurboData(data: any): {
    flowElementList: any[];
};
export declare function toLogicflowData(data: any): {
    nodes: any[];
    edges: any[];
};
declare class TurboAdapter {
    static pluginName: string;
    constructor({ lf }: {
        lf: any;
    });
    adapterOut(logicflowData: any): {
        flowElementList: any[];
    };
    adapterIn(turboData: any): {
        nodes: any[];
        edges: any[];
    };
}
export default TurboAdapter;
