import { Point, PolylineEdgeModel, BaseNodeModel } from '@logicflow/core';
export declare const isInSegment: (point: any, start: any, end: any) => boolean;
export declare const corssPointInSegement: (node: BaseNodeModel, start: Point, end: Point) => {
    startCrossPoint: {
        x: number;
        y: number;
    };
    endCrossPoint: {
        x: number;
        y: number;
    };
};
interface SegementCross {
    crossIndex: number;
    crossPoints: {
        startCrossPoint: Point;
        endCrossPoint: Point;
    };
}
export declare const isNodeInSegement: (node: BaseNodeModel, polyline: PolylineEdgeModel) => SegementCross;
export {};
