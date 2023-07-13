import { h } from '@logicflow/core';
import { RectResize } from '../../NodeResize';
declare class GroupNodeModel extends RectResize.model {
    readonly isGroup = true;
    /**
     * 此分组的子节点Id
     */
    children: Set<string>;
    /**
     * 其子节点是否被禁止通过拖拽移出分组。 默认false，允许拖拽移除分组。
     */
    isRestrict: boolean;
    /**
     * 分组节点是否允许调整大小。
     */
    resizable: boolean;
    /**
     * 分组节点是否允许折叠
     */
    foldable: boolean;
    /**
     * 折叠后的宽度
     */
    foldedWidth: number;
    /**
     * 折叠后的高度
     */
    foldedHeight: number;
    /**
     * 分组折叠状态
     */
    isFolded: boolean;
    unfoldedWidth: number;
    unfoldedHight: number;
    initNodeData(data: any): void;
    getResizeOutlineStyle(): {
        fill: string;
        stroke: string;
        strokeWidth: number;
        strokeDasharray: string;
    };
    /**
     * 折叠分组
     * 1. 折叠分组的宽高
     * 2. 处理分组子节点
     * 3. 处理连线
     */
    foldGroup(isFolded: any): void;
    getAnchorStyle(anchorInfo: any): Record<string, any>;
    /**
     * 折叠分组的时候，处理分组自身的连线和分组内部子节点上的连线
     * 边的分类：
     *   - 虚拟边：分组被收起时，表示分组本身与外部节点关系的边。
     *   - 真实边：分组本身或者分组内部节点与外部节点节点（非收起分组）关系的边。
     * 如果一个分组，本身与外部节点有M条连线，且内部N个子节点与外部节点有连线，那么这个分组收起时会生成M+N条连线。
     * 折叠分组时：
     *   - 原有的虚拟边删除；
     *   - 创建一个虚拟边；
     *   - 真实边则隐藏；
     * 展开分组是：
     *   - 原有的虚拟边删除；
     *   - 如果目外部点是收起的分组，则创建虚拟边；
     *   - 如果外部节点是普通节点，则显示真实边；
     */
    private foldEdge;
    createVirtualEdge(edgeData: any): void;
    isInRange({ x1, y1, x2, y2 }: {
        x1: any;
        y1: any;
        x2: any;
        y2: any;
    }): boolean;
    isAllowMoveTo({ x1, y1, x2, y2 }: {
        x1: any;
        y1: any;
        x2: any;
        y2: any;
    }): {
        x: boolean;
        y: boolean;
    };
    setAllowAppendChild(isAllow: any): void;
    /**
     * 添加分组子节点
     * @param id 节点id
     */
    addChild(id: any): void;
    /**
     * 删除分组子节点
     * @param id 节点id
     */
    removeChild(id: any): void;
    getAddableOutlineStyle(): {
        stroke: string;
        strokeWidth: number;
        strokeDasharray: string;
        fill: string;
    };
    getData(): import("@logicflow/core").NodeData;
    getHistoryData(): import("@logicflow/core").NodeData;
}
declare class GroupNode extends RectResize.view {
    getControlGroup(): h.JSX.Element;
    getAddedableShape(): import("preact").VNode<any>;
    getFoldIcon(): import("preact").VNode<any>;
    getResizeShape(): import("preact").VNode<any>;
}
declare const _default: {
    type: string;
    view: typeof GroupNode;
    model: typeof GroupNodeModel;
};
export default _default;
