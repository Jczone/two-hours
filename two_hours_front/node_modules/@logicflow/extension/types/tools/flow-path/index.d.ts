/**
 * 路径插件，此插件支持获取绘制的图中所有的路径。
 * 需要指定开始节点类型。
 */
import LogicFlow from '@logicflow/core';
declare type Path = {
    routeId: string;
    name: string;
    elements: string[];
    type: number;
};
declare type RawPath = Path & {
    similarElement: RawPath;
    weight: number;
};
declare class FlowPath {
    lf: LogicFlow;
    pathes: RawPath[];
    startNodeType: string;
    static pluginName: string;
    constructor({ lf }: {
        lf: any;
    });
    setPathes(pathes: any): void;
    getPathes(): any[];
    private findPathElements;
    /**
     * 设置路径id
     * 如果存在原始路径Id, 则需要比较新路径是否在原始路径中存在相似路径
     * 如果有，则尽量使用原始路径。
     * 相似路径
     * 1. 如果所有的节点都相同，则必定为同一路径。(包括顺序不同)
     * 2. 如果新路径比原来路径少了或者多了部分节点，则记录为相似路径。基于不同的差异，标记不同的权重。
     * 3. 基于新路径在旧路径占用权限，设置新路径Id.
     * 4. 如果某一条旧路径被多条新路径标记为相同的权重，则这两条新路径都使用新Id.
     */
    private getNewPathes;
    private similar2Path;
    private getNewId;
    /**
     * 判断是否为循环路径
     * 由于前面进行了特殊处理，将循环部分单独提出来作为路径
     * 所有循环路径必定开始节点等于结束节点。
     */
    private isLoopPath;
}
export { FlowPath, };
