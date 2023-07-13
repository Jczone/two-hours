import EventEmitter from '../event/eventEmitter';
import { PointTuple, ZoomParam } from '../type';
export interface TransfromInterface {
    SCALE_X: number;
    SKEW_Y: number;
    SKEW_X: number;
    SCALE_Y: number;
    TRANSLATE_X: number;
    TRANSLATE_Y: number;
    ZOOM_SIZE: number;
    MINI_SCALE_SIZE: number;
    MAX_SCALE_SIZE: number;
    zoom: (isZoomout: ZoomParam) => string;
    HtmlPointToCanvasPoint: (point: PointTuple) => PointTuple;
    CanvasPointToHtmlPoint: (point: PointTuple) => PointTuple;
    moveCanvasPointByHtml: (point: PointTuple, x: number, y: number) => PointTuple;
    getTransformStyle: () => {
        transform: string;
    };
}
export default class TransfromModel implements TransfromInterface {
    MINI_SCALE_SIZE: number;
    MAX_SCALE_SIZE: number;
    SCALE_X: number;
    SKEW_Y: number;
    SKEW_X: number;
    SCALE_Y: number;
    TRANSLATE_X: number;
    TRANSLATE_Y: number;
    ZOOM_SIZE: number;
    eventCenter: EventEmitter;
    constructor(eventCenter: any);
    setZoomMiniSize(size: number): void;
    setZoomMaxSize(size: number): void;
    /**
     * 将最外层graph上的点基于缩放转换为canvasOverlay层上的点。
     * @param param0 HTML点
     */
    HtmlPointToCanvasPoint([x, y]: PointTuple): PointTuple;
    /**
     * 将最外层canvasOverlay层上的点基于缩放转换为graph上的点。
     * @param param0 HTML点
     */
    CanvasPointToHtmlPoint([x, y]: PointTuple): PointTuple;
    /**
     * 将一个在canvas上的点，向x轴方向移动directionX距离，向y轴方向移动dirctionY距离。
     * 因为canvas可能被缩小或者放大了，所以其在canvas层移动的距离需要计算上缩放的量。
     * @param point 点
     * @param directionX x轴距离
     * @param directionY y轴距离
     */
    moveCanvasPointByHtml([x, y]: PointTuple, directionX: number, directionY: number): PointTuple;
    /**
     * 根据缩放情况，获取缩放后的delta距离
     * @param deltaX x轴距离变化
     * @param deltaY y轴距离变化
     */
    fixDeltaXY(deltaX: number, deltaY: number): PointTuple;
    /**
     * 基于当前的缩放，获取画布渲染样式transform值
     */
    getTransformStyle(): {
        transform: string;
    };
    /**
     * 放大缩小图形
     * @param zoomSize 放大缩小的值，支持传入0-n之间的数字。小于1表示缩小，大于1表示放大。也支持传入true和false按照内置的刻度放大缩小
     * @param point 缩放的原点
     * @returns {string} -放大缩小的比例
     */
    zoom(zoomSize?: ZoomParam, point?: PointTuple): string;
    private emitGraphTransform;
    resetZoom(): void;
    translate(x: number, y: number): void;
    /**
     * 将图形定位到画布中心
     * @param targetX 图形当前x坐标
     * @param targetY 图形当前y坐标
     * @param width 画布宽
     * @param height 画布高
     */
    focusOn(targetX: number, targetY: number, width: number, height: number): void;
}
