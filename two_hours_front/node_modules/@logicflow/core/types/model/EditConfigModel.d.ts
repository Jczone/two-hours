export interface EditConfigInterface {
    /**
     * 是否为静默模式
     */
    isSilentMode?: boolean;
    /**
     * 禁止缩放画布
     */
    stopZoomGraph?: boolean;
    /**
     * 禁止鼠标滚动移动画布
     */
    stopScrollGraph?: boolean;
    /**
     * 禁止拖动画布
     */
    stopMoveGraph?: boolean;
    /**
     * 允许调整边
     */
    adjustEdge?: boolean;
    /**
     * 允许调整边起点和终点
     */
    adjustEdgeStartAndEnd?: boolean;
    /**
     * 允许拖动节点
     */
    adjustNodePosition?: boolean;
    /**
     * 隐藏节点所有锚点
     */
    hideAnchors?: boolean;
    /**
     * 显示节点悬浮时的外框
     */
    hoverOutline?: boolean;
    /**
     * 节点被选中时是否显示outline
     */
    nodeSelectedOutline?: boolean;
    /**
     * 边被选中时是否显示outline
     */
    edgeSelectedOutline?: boolean;
    /**
     * 允许节点文本可以编辑
     */
    nodeTextEdit?: boolean;
    /**
     * 允许边文本可以编辑
     */
    edgeTextEdit?: boolean;
    /**
     * 允许文本编辑
     */
    textEdit?: boolean;
    /**
     * 允许节点文本可以拖拽
     */
    nodeTextDraggable?: boolean;
    /**
     * 允许边文本可以拖拽
     */
    edgeTextDraggable?: boolean;
    /**
     * 多选按键, 支持meta(cmd)、shift、alt
     * 不支持ctrl，ctrl会触发contextmenu
     */
    multipleSelectKey?: string;
}
/**
 * 页面编辑配置
 */
export default class EditConfigModel {
    isSilentMode: boolean;
    stopZoomGraph: boolean;
    stopScrollGraph: boolean;
    stopMoveGraph: boolean;
    adjustEdge: boolean;
    adjustEdgeMiddle: boolean;
    adjustEdgeStartAndEnd: boolean;
    adjustNodePosition: boolean;
    hideAnchors: boolean;
    hoverOutline: boolean;
    nodeSelectedOutline: boolean;
    edgeSelectedOutline: boolean;
    nodeTextEdit: boolean;
    edgeTextEdit: boolean;
    nodeTextDraggable: boolean;
    edgeTextDraggable: boolean;
    multipleSelectKey: string;
    defaultConfig: {};
    constructor(config: EditConfigInterface);
    updateEditConfig(config: any): void;
    getConfigDetail(config: any): Pick<any, string>;
    getConfig(): Partial<this>;
}
export { EditConfigModel };
