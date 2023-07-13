import LogicFlow from '@logicflow/core';
declare type ShapeItem = {
    type?: string;
    text?: string;
    icon?: string;
    label?: string;
    className?: string;
    properties?: Record<string, any>;
    callback?: (lf: LogicFlow, container: HTMLElement) => void;
};
declare class DndPanel {
    lf: LogicFlow;
    shapeList: ShapeItem[];
    panelEl: HTMLDivElement;
    static pluginName: string;
    domContainer: HTMLElement;
    constructor({ lf }: {
        lf: any;
    });
    render(lf: any, domContainer: any): void;
    destroy(): void;
    setPatternItems(shapeList: any): void;
    private createDndItem;
}
export { DndPanel, };
