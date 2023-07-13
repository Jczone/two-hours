import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
declare class TextNodeModel extends BaseNodeModel {
    modelType: ModelType;
    getTextStyle(): {
        [x: string]: any;
        color?: string;
        fontSize?: number;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        overflowMode?: string;
        background?: import("../../constant/DefaultTheme").RectTheme;
    };
    get width(): number;
    get height(): number;
}
export { TextNodeModel };
export default TextNodeModel;
