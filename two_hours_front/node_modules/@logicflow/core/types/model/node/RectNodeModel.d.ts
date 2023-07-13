import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
declare class RectNodeModel extends BaseNodeModel {
    modelType: ModelType;
    radius: number;
    getDefaultAnchor(): {
        x: number;
        y: number;
        id: string;
    }[];
    getNodeStyle(): {
        [x: string]: any;
        width?: number;
        height?: number;
        radius?: number;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
    };
}
export { RectNodeModel };
export default RectNodeModel;
