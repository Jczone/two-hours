declare type ControlItem = {
    key: string;
    iconClass: string;
    title: string;
    text: string;
    onClick?: Function;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
};
declare class Control {
    private lf;
    static pluginName: string;
    private controlItems;
    private domContainer;
    private toolEl;
    constructor({ lf }: {
        lf: any;
    });
    render(lf: any, domContainer: any): void;
    destroy(): void;
    addItem(item: any): void;
    removeItem(key: any): ControlItem;
    private getControlTool;
}
export default Control;
export { Control };
