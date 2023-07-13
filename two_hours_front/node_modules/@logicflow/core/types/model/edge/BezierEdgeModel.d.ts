import BaseEdgeModel from './BaseEdgeModel';
import { Point } from '../../type';
import { ModelType } from '../../constant/constant';
export { BezierEdgeModel };
export default class BezierEdgeModel extends BaseEdgeModel {
    modelType: ModelType;
    path: string;
    initEdgeData(data: any): void;
    getEdgeStyle(): {
        [x: string]: any;
        adjustLine?: import("../../constant/DefaultTheme").CommonTheme;
        adjustAnchor?: import("../../constant/DefaultTheme").CircleTheme;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
    };
    getTextPosition(): Point;
    getData(): {
        pointsList: {
            x: any;
            y: any;
        }[];
        id: string;
        type: string;
        sourceNodeId: string;
        startPoint: Point;
        targetNodeId: string;
        endPoint: Point;
        text?: import("../../type").TextConfig;
        properties: Record<string, unknown>;
        zIndex?: number;
    };
    private getControls;
    private getPath;
    initPoints(): void;
    updatePoints(): void;
    updatePath(sNext: any, ePre: any): void;
    updateStartPoint(anchor: any): void;
    updateEndPoint(anchor: any): void;
    moveStartPoint(deltaX: any, deltaY: any): void;
    moveEndPoint(deltaX: any, deltaY: any): void;
    updateAdjustAnchor(anchor: Point, type: string): void;
    getAdjustStart(): any;
    getAdjustEnd(): any;
    updateAfterAdjustStartAndEnd({ startPoint, endPoint, sourceNode, targetNode }: {
        startPoint: any;
        endPoint: any;
        sourceNode: any;
        targetNode: any;
    }): void;
}
