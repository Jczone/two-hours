import { Point, PointTuple } from '../../type';
import BaseNodeModel from './BaseNodeModel';
import { ModelType } from '../../constant/constant';
declare class PolygonNodeModel extends BaseNodeModel {
    modelType: ModelType;
    points: PointTuple[];
    getNodeStyle(): {
        [x: string]: any;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
    };
    /**
     * 由于大多数情况下，我们初始化拿到的多边形坐标都是基于原点的（例如绘图工具到处的svg）。
     * 在logicflow中对多边形进行移动，我们不需要去更新points，
     * 而是去更新多边形中心点即可。
     */
    get pointsPosition(): Point[];
    get width(): number;
    get height(): number;
    getDefaultAnchor(): {
        x: number;
        y: number;
        id: string;
    }[];
}
export { PolygonNodeModel };
export default PolygonNodeModel;
