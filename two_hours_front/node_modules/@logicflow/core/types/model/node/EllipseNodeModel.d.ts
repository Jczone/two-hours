import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
declare class EllipseNodeModel extends BaseNodeModel {
    modelType: ModelType;
    rx: number;
    ry: number;
    getNodeStyle(): {
        [x: string]: any;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
    };
    get width(): number;
    get height(): number;
    getDefaultAnchor(): {
        x: number;
        y: number;
        id: string;
    }[];
}
export { EllipseNodeModel };
export default EllipseNodeModel;
