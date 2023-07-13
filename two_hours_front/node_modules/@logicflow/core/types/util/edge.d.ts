import BaseNode from '../model/node/BaseNodeModel';
import { Point, Direction, EdgeConfig } from '../type/index';
export declare const setupEdgeModel: (edge: any, graphModel: any) => any;
declare type PolyPoint = {
    x: number;
    y: number;
    id?: string;
};
declare type PolyPointMap = {
    [key: string]: PolyPoint;
};
declare type PolyPointLink = Record<PolyPoint['id'], PolyPoint['id']>;
declare type PBBox = Partial<{
    x: number;
    y: number;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    height: number;
    width: number;
    centerX: number;
    centerY: number;
}>;
export declare const isBboxOverLapping: (b1: PBBox, b2: PBBox) => boolean;
export declare const filterRepeatPoints: (points: PolyPoint[]) => PolyPoint[];
export declare const getSimplePolyline: (sPoint: PolyPoint, tPoint: PolyPoint) => PolyPoint[];
export declare const getExpandedBBox: (bbox: PBBox, offset: number) => PBBox;
export declare const pointDirection: (point: PolyPoint, bbox: PBBox) => Direction;
export declare const getExpandedBBoxPoint: (bbox: PBBox, point: PolyPoint) => PolyPoint;
export declare const mergeBBox: (b1: PBBox, b2: PBBox) => PBBox;
export declare const getBBoxOfPoints: (points?: PolyPoint[], offset?: number) => PBBox;
export declare const getPointsFromBBox: (bbox: PBBox) => PolyPoint[];
export declare const isPointOutsideBBox: (point: PolyPoint, bbox: PBBox) => boolean;
export declare const getBBoxXCrossPoints: (bbox: PBBox, x: number) => PolyPoint[];
export declare const getBBoxYCrossPoints: (bbox: PBBox, y: number) => PolyPoint[];
export declare const getBBoxCrossPointsByPoint: (bbox: PBBox, point: PolyPoint) => PolyPoint[];
export declare const estimateDistance: (p1: PolyPoint, p2: PolyPoint) => number;
export declare const costByPoints: (p: PolyPoint, points: PolyPoint[]) => number;
export declare const heuristicCostEstimate: (p: PolyPoint, ps: PolyPoint, pt: PolyPoint, source?: PolyPoint, target?: PolyPoint) => number;
export declare const rebuildPath: (pathPoints: PolyPoint[], pointById: PolyPointMap, cameFrom: PolyPointLink, currentId: string, iterator?: number) => void;
export declare const removeClosePointFromOpenList: (arr: PolyPoint[], item: PolyPoint) => void;
export declare const isSegmentsIntersected: (p0: PolyPoint, p1: PolyPoint, p2: PolyPoint, p3: PolyPoint) => boolean;
export declare const isSegmentCrossingBBox: (p1: PolyPoint, p2: PolyPoint, bbox: PBBox) => boolean;
export declare const getNextNeighborPoints: (points: PolyPoint[], point: PolyPoint, bbox1: PBBox, bbox2: PBBox) => PolyPoint[];
export declare const pathFinder: (points: PolyPoint[], start: PolyPoint, goal: PolyPoint, sBBox: PBBox, tBBox: PBBox, os: PolyPoint, ot: PolyPoint) => PolyPoint[];
export declare const getBoxByOriginNode: (node: BaseNode) => PBBox;
export declare const pointFilter: (points: PolyPoint[]) => PolyPoint[];
export declare const getPolylinePoints: (start: PolyPoint, end: PolyPoint, sNode: BaseNode, tNode: BaseNode, offset: number) => PolyPoint[];
/**
 * 获取折线中最长的一个线
 * @param pointsList 多个点组成的数组
 */
export declare const getLongestEdge: (pointsList: PolyPoint[]) => [PolyPoint, PolyPoint];
export declare const isSegmentsInNode: (start: Point, end: Point, node: BaseNode) => boolean;
export declare const isSegmentsCrossNode: (start: Point, end: Point, node: BaseNode) => boolean;
export declare const getCrossPointInRect: (start: Point, end: Point, node: BaseNode) => Point;
export declare const segmentDirection: (start: Point, end: Point) => Direction;
export declare const points2PointsList: (points: string) => PolyPoint[];
export declare const getSimplePoints: (start: any, end: any, sPoint: any, tPoint: any) => Point[];
export declare const getBytesLength: (word: string) => number;
export declare const getTextWidth: (text: any, font: any) => any;
declare type AppendAttributesType = {
    d: string;
    fill: string;
    stroke: string;
    strokeWidth: number;
    strokeDasharray: string;
};
export declare const getAppendAttributes: (appendInfo: any) => AppendAttributesType;
export declare type IBezierControls = {
    sNext: Point;
    ePre: Point;
};
export declare const getBezierControlPoints: ({ start, end, sourceNode, targetNode, offset, }: {
    start: any;
    end: any;
    sourceNode: any;
    targetNode: any;
    offset: any;
}) => IBezierControls;
export declare type IBezierPoints = {
    start: Point;
    sNext: Point;
    ePre: Point;
    end: Point;
};
export declare const getBezierPoints: (path: string) => Point[];
export declare const getEndTangent: (path: string) => Point[];
/**
 * 获取移动边后，文本位置距离边上的最近的一点
 * @param point 边上文本的位置
 * @param points 边的各个拐点
 */
export declare const getClosestPointOfPolyline: (point: Point, points: string) => Point;
export declare const pickEdgeConfig: (data: any) => EdgeConfig;
declare type Position = {
    x: number;
    y: number;
};
export declare const twoPointDistance: (source: Position, target: Position) => number;
export {};
