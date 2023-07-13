import BaseEdgeModel from './BaseEdgeModel';
import { Point } from '../../type';
import { ModelType } from '../../constant/constant';
export { LineEdgeModel };
export default class LineEdgeModel extends BaseEdgeModel {
    modelType: ModelType;
    getEdgeStyle(): {
        [x: string]: any;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
    };
    getTextPosition(): Point;
}
