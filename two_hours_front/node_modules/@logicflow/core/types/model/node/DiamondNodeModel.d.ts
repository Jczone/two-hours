import { Point, PointTuple } from '../../type';
import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
declare class DiamondNodeModel extends BaseNodeModel {
    modelType: ModelType;
    rx: number;
    ry: number;
    getNodeStyle(): {
        [x: string]: any;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
    };
    get points(): PointTuple[];
    get pointsPosition(): Point[];
    get width(): number;
    get height(): number;
    getDefaultAnchor(): {
        x: number;
        y: number;
        id: string;
    }[];
}
export { DiamondNodeModel };
export default DiamondNodeModel;
