import { ModelType } from '../../constant/constant';
import { Point } from '../../type';
import BaseEdgeModel from './BaseEdgeModel';
export { PolylineEdgeModel };
export default class PolylineEdgeModel extends BaseEdgeModel {
    modelType: ModelType;
    draginngPointList: any;
    dbClickPosition: Point;
    initEdgeData(data: any): void;
    getEdgeStyle(): {
        [x: string]: any;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
    };
    getTextPosition(): {
        x: number;
        y: number;
    };
    getAfterAnchor(direction: any, position: any, anchorList: any): any;
    getCorssPoint(direction: any, start: any, end: any): any;
    removeCrossPoints(startIndex: any, endIndex: any, pointList: any): any;
    getDragingPoints(direction: any, positioType: any, position: any, anchorList: any, draginngPointList: any): any;
    updateCrossPoints(pointList: any): any;
    getData(): import("../../type").EdgeData & {
        pointsList: {
            x: any;
            y: any;
        }[];
    };
    initPoints(): void;
    updatePoints(): void;
    updateStartPoint(anchor: any): void;
    moveStartPoint(deltaX: any, deltaY: any): void;
    updateEndPoint(anchor: any): void;
    moveEndPoint(deltaX: any, deltaY: any): void;
    dragAppendStart(): void;
    dragAppendSimple(appendInfo: any, dragInfo: any): {
        start: any;
        end: any;
        startIndex: any;
        endIndex: any;
        direction: any;
    };
    dragAppend(appendInfo: any, dragInfo: any): {
        start: any;
        end: any;
        startIndex: any;
        endIndex: any;
        direction: any;
    };
    dragAppendEnd(): void;
    updatePointsAfterDrage(pointsList: any): void;
    getAdjustStart(): any;
    getAdjustEnd(): any;
    updateAfterAdjustStartAndEnd({ startPoint, endPoint, sourceNode, targetNode }: {
        startPoint: any;
        endPoint: any;
        sourceNode: any;
        targetNode: any;
    }): void;
}
