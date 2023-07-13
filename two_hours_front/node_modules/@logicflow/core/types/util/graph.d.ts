export declare const getById: (id: any, data: any) => any;
/**
 * 判断一个点是否在指定区域
 * @param point 当前点
 * @param leftTopPoint 区域左上角点
 * @param rightBottomPoint 区域的右下角点
 */
export declare const isPointInArea: ([x, y]: [any, any], [leftTopX, leftTopY]: [any, any], [rightBottomX, rightBottomY]: [any, any]) => boolean;
/**
 * 判断鼠标点击选中元素的时候，是否为多选
 */
export declare const isMultipleSelect: (e: MouseEvent, editConfigModel: any) => boolean;
