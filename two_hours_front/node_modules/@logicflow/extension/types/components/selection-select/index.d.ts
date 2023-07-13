import LogicFlow from '@logicflow/core';
declare class SelectionSelect {
    __domContainer: HTMLElement;
    wrapper: HTMLElement;
    lf: LogicFlow;
    startPoint: {
        x: number;
        y: number;
    };
    endPoint: {
        x: number;
        y: number;
    };
    __disabled: boolean;
    isDefalutStopMoveGraph: boolean;
    isWholeNode: boolean;
    isWholeEdge: boolean;
    static pluginName: string;
    constructor({ lf }: {
        lf: any;
    });
    render(lf: any, domContainer: any): void;
    /**
     * 设置选中的灵敏度
     * @param isWholeEdge 是否要边的起点终点都在选区范围才算选中。默认true
     * @param isWholeNode 是否要节点的全部点都在选区范围才算选中。默认true
     */
    setSelectionSense(isWholeEdge?: boolean, isWholeNode?: boolean): void;
    /**
     * 开启选区
     */
    openSelectionSelect(): void;
    /**
     * 关闭选区
     */
    closeSelectionSelect(): void;
    __draw: (ev: any) => void;
    __drawOff: () => void;
    open(): void;
    close(): void;
}
export { SelectionSelect };
