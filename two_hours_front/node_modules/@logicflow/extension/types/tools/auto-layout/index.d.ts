/**
 * 自动布局插件
 * 依赖flowpath插件
 * 未完善
 */
import LogicFlow from '@logicflow/core';
declare class AutoLayout {
    lf: LogicFlow;
    levelHeight: any[];
    newNodeMap: Map<string, any>;
    trunk: any[];
    static pluginName: string;
    constructor({ lf }: {
        lf: any;
    });
    layout(data: any, path: any): void;
    private setNodePosition;
    /**
     * 1. 处理边上的文本
     * 2. 主干节点之间直接的边
     * 3. 一个节点被多个连接作为目标节点，合理分配锚点位置。
     */
    private getEdgeDataPoints;
    /**
     * 获取边的连接节点相对位置。
     * source一定在target左边。
     * 1. 如果source和target在同一x, y坐标内容。
     * 2. 如果source在target左上方。
     * 3. 如果souce在target左下方。
     */
    private getRelativePosition;
    /**
     * 获取边节点图形的宽高。
     */
    private getShape;
    private formatData;
    addLevelHeight(level: any, height?: number, isNegative?: boolean): void;
    getLevelHeight(level: any, isNegative?: boolean): any;
}
export { AutoLayout };
