import LogicFlow from '@logicflow/core';
declare type SetType = 'add' | 'reset';
export declare type MenuItem = {
    text?: string;
    className?: string;
    icon?: boolean;
    callback: (element: any) => void;
};
export declare type MenuConfig = {
    nodeMenu?: MenuItem[] | false;
    edgeMenu?: MenuItem[] | false;
    graphMenu?: MenuItem[] | false;
};
declare class Menu {
    lf: LogicFlow;
    private __container;
    private __menuDOM;
    private menuTypeMap;
    private __currentData;
    static pluginName: string;
    constructor({ lf }: {
        lf: any;
    });
    /**
     * 初始化设置默认内置菜单栏
     */
    private init;
    render(lf: any, container: any): void;
    destroy(): void;
    private showMenu;
    /**
     * 设置指定类型元素的菜单
     */
    private setMenuByType;
    /**
     * 获取 Menu DOM
     * @param list 菜单项
     * @return 菜单项 DOM
     */
    private __getMenuDom;
    setMenuConfig(config: MenuConfig): void;
    addMenuConfig(config: MenuConfig): void;
    /**
     * @deprecated
     * 复写添加
     */
    changeMenuItem(type: SetType, config: MenuConfig): void;
}
export default Menu;
export { Menu, };
