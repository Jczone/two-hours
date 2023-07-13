declare class MiniMap {
    static pluginName: string;
    __lf: any;
    __container: any;
    __miniMapWrap: any;
    __miniMapContainer: any;
    __lfMap: any;
    __viewport: any;
    __width: number;
    __height: number;
    __miniMapWidth: number;
    __miniMapHeight: number;
    __viewPortTop: number;
    __viewPortLeft: number;
    __startPosition: any;
    __viewPortScale: number;
    __viewPortWidth: number;
    __viewPortHeight: number;
    __resetDataX: number;
    __resetDataY: number;
    __LogicFlow: any;
    __isShow: boolean;
    __disabledPlugins: string[];
    constructor({ lf, LogicFlow }: {
        lf: any;
        LogicFlow: any;
    });
    render(lf: any, container: any): void;
    init(option: any): void;
    /**
     * 显示mini map
     */
    show: (leftPosition?: number, topPosition?: number) => void;
    /**
     * 隐藏mini map
     */
    hide: () => void;
    __init(): void;
    __createMiniMap(left: any, top: any): void;
    __removeMiniMap(): void;
    /**
     * 计算所有图形一起，占领的区域范围。
     * @param data
     */
    __getBounds(data: any): {
        left: number;
        top: number;
        bottom: number;
        right: number;
    };
    /**
     * 将负值的平移转换为正值。
     * 保证渲染的时候，minimap能完全展示。
     * 获取将画布所有元素平移到0，0开始时，所有节点数据
     */
    __resetData(data: any): any;
    /**
     * 显示导航
     * 显示视口范围
     * 1. 基于画布的范围比例，设置视口范围比例。宽度默认为导航宽度。
     */
    __setView(): void;
    __setViewPort(scale: any, { left, right, top, bottom }: {
        left: any;
        right: any;
        top: any;
        bottom: any;
    }): void;
    __createViewPort(): void;
    __startDrag: (e: any) => void;
    __drag: (e: any) => void;
    __drop: () => void;
}
export default MiniMap;
export { MiniMap };
