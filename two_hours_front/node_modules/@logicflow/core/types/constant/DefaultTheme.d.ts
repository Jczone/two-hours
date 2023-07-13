/**
 * 颜色
 * CSS属性用颜色
 * 如#000000，reg(0,0,0,0)
 * 如果是透明，可以传'none'
 */
export declare type Color = string;
/**
 * svg虚线
 * 格式为逗号分割字符串，如
 * @see https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray
 */
export declare type DashArray = string;
export declare type CommonTheme = {
    /**
     * 填充颜色
     */
    fill?: Color;
    /**
     * 边框颜色
     */
    stroke?: Color;
    /**
     * 边框宽度
     */
    strokeWidth?: number;
    /**
     * 其他属性
     * 我们会把你定义的所有属性最终传递到DOM上
     * 详情请参考svg属性规范
     * https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute
     */
    [key: string]: any;
};
/**
 * rect主题样式
 * svg基础图形-矩形
 * https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/rect
 */
export declare type RectTheme = {
    /**
     * 矩形的默认宽度
     */
    width?: number;
    /**
     * 矩形的默认高度
     */
    height?: number;
    /**
     * 圆角
     * 注意，矩形圆角请使用radius
     * 不要使用rx和ry
     */
    radius?: number;
} & CommonTheme;
/**
 * circle主题样式
 * svg基础图形-圆形
 * https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/circle
 */
export declare type CircleTheme = {
    /**
     * 默认半径
     */
    r?: number;
} & CommonTheme;
/**
 * polygon主题样式
 * svg基础图形-多边形
 * https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/polygon
 */
export declare type PolygonTheme = CommonTheme;
/**
 * ellipse主题样式
 * svg基础图形-椭圆
 * https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/ellipse
 */
export declare type EllipseTheme = CommonTheme;
/**
 * 锚点样式
 * svg基础图形-圆
 */
export declare type AnchorTheme = {
    r?: number;
    hover?: {
        r: number;
    } & CommonTheme;
} & CommonTheme;
/**
 * 文本样式
 * svg文本
 * https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/text
 */
export declare type TextTheme = {
    /**
     * 文本颜色
     */
    color?: Color;
    /**
     * 文本大小
     */
    fontSize?: number;
} & CommonTheme;
/**
 * 文本节点样式
 */
export declare type TextNodeTheme = {
    background?: RectTheme;
} & TextTheme;
/**
 * 节点上文本样式
 */
export declare type NodeTextTheme = {
    /**
     * 文本超出指定宽度处理方式
     * default: 不特殊处理，允许超出
     * autoWrap: 超出自动换行
     * ellipsis: 超出省略
     */
    overflowMode?: string;
    background?: RectTheme;
} & TextTheme;
/**
 * 边上文本样式
 */
export declare type EdgeTextTheme = {
    /**
     * 文本超出指定宽度处理方式
     * default: 不特殊处理，允许超出
     * autoWrap: 超出自动换行
     * ellipsis: 超出省略
     */
    overflowMode?: string;
    /**
     * 文本一行最大宽度
     */
    textWidth?: number;
    /**
     * 文本背景样式
     */
    background?: {
        /**
         * 背景区域padding
         * wrapPadding: '5px,10px'
         */
        wrapPadding?: string;
    } & RectTheme;
    /**
     * hover状态下文本样式
     */
    hover?: EdgeTextTheme;
} & TextTheme;
export declare type EdgeTheme = CommonTheme;
export declare type EdgePolylineTheme = EdgeTheme;
export declare type EdgeBezierTheme = {
    /**
     * 贝塞尔调整线主题
     */
    adjustLine?: EdgeTheme;
    /**
     * 贝塞尔调整锚点主题
     */
    adjustAnchor?: CircleTheme;
} & EdgeTheme;
/**
 * 箭头主题
 */
export declare type ArrowTheme = {
    /**
     * 箭头长度.
     * 以符号"->"为例, offset表示箭头大于号的宽度。
     */
    offset?: number;
    /**
     * 箭头垂直于边的距离
     * 以符号"->"为例, verticalLength表示箭头大于号的高度
     */
    verticalLength?: number;
} & CommonTheme;
export declare type OutlineTheme = {
    /**
     * hover状态下样式
     */
    hover?: CommonTheme;
} & CommonTheme;
/**
 * 边动画主题
 */
export declare type EdgeAnimation = {
    stroke?: string;
    strokeDasharray?: string;
    strokeDashoffset?: string;
    animationName?: string;
    animationDuration?: string;
    animationIterationCount?: string;
    animationTimingFunction?: string;
    animationDirection?: string;
};
export declare type Theme = {
    /**
     * 所有节点的通用主题设置
     */
    baseNode?: CommonTheme;
    /**
     * 基础图形-矩形样式
     */
    rect?: RectTheme;
    /**
     * 基础图形-圆形样式
     */
    circle?: CircleTheme;
    /**
     * 基础图形-菱形样式
     */
    diamond?: PolygonTheme;
    /**
     * 基础图形-椭圆样式
     */
    ellipse?: EllipseTheme;
    /**
     * 基础图形-多边形样式
     */
    polygon?: PolygonTheme;
    /**
     * 所有边的通用主题设置
     */
    baseEdge?: EdgeTheme;
    /**
     * 基础图形-直线样式
     */
    line?: EdgeTheme;
    /**
    * 基础图形-折现样式
    */
    polyline?: EdgePolylineTheme;
    /**
    * 基础图形-贝塞尔曲线样式
    */
    bezier?: EdgeBezierTheme;
    /**
     * 锚点样式
     */
    anchor?: AnchorTheme;
    /**
     * 文本节点样式
     */
    text?: TextTheme;
    /**
     * 节点文本样式
     */
    nodeText?: NodeTextTheme;
    /**
     * 边文本样式
     */
    edgeText?: EdgeTextTheme;
    /**
     * 边上箭头的样式
     */
    arrow?: ArrowTheme;
    /**
     * 从锚点拉出的边的样式
     */
    anchorLine?: EdgeTheme;
    /**
     * 对齐线样式
     */
    snapline?: EdgeTheme;
    /**
     * 当开启了跳转边的起点和终点(adjustEdgeStartAndEnd:true)后
     * 边的两端会出现调整按钮
     * 边连段的调整点样式
     */
    edgeAdjust?: CircleTheme;
    /**
     * 节点选择状态下外侧的选框样式
     */
    outline?: OutlineTheme;
    /**
     * 边动画样式
     */
    edgeAnimation?: EdgeAnimation;
};
export declare const defaultTheme: Theme;
