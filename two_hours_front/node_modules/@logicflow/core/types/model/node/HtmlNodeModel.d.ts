import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
declare class HtmlNodeModel extends BaseNodeModel {
    modelType: ModelType;
    getDefaultAnchor(): {
        x: number;
        y: number;
        id: string;
    }[];
}
export { HtmlNodeModel };
export default HtmlNodeModel;
