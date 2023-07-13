import { GraphConfigData } from '..';
export declare const createUuid: () => string;
/**
 * 重新刷新流程图的所有id
 */
export declare const refreshGraphId: (graphData: GraphConfigData, prefix?: string) => GraphConfigData;
