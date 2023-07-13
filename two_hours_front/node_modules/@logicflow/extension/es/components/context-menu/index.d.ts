declare class ContextMenu {
    static pluginName: string;
    private __menuDOM;
    private lf;
    private _activeData;
    private menuTypeMap;
    container: any;
    isShow: boolean;
    constructor({ lf }: {
        lf: any;
    });
    render(lf: any, container: any): void;
    setContextMenuByType(type: any, menus: any): void;
    /**
     * 隐藏菜单
     */
    hideContextMenu(): void;
    /**
     * 显示指定元素菜单
     * @param data 节点id、节点类型、菜单位置
     */
    showContextMenu(data: any): void;
    setContextMenuItems(menus: any): void;
    /**
     * 获取新菜单位置
     */
    private getContextMenuPosition;
    private createContextMenu;
    private addNode;
    private showMenu;
    listenDelete: () => void;
}
export default ContextMenu;
export { ContextMenu, };
