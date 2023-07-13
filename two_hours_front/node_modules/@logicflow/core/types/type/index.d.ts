import { h } from 'preact';
import LogicFlow from '../LogicFlow';
import BaseEdge from '../view/edge/BaseEdge';
import BaseEdgeModel from '../model/edge/BaseEdgeModel';
import BaseNode from '../view/node/BaseNode';
import BaseNodeModel from '../model/node/BaseNodeModel';
import RectNodeModel from '../model/node/RectNodeModel';
import RectNode from '../view/node/RectNode';
import CircleNode from '../view/node/CircleNode';
import CircleNodeModel from '../model/node/CircleNodeModel';
import DiamondNode from '../view/node/DiamondNode';
import DiamondNodeModel from '../model/node/DiamondNodeModel';
import PolygonNode from '../view/node/PolygonNode';
import PolygonNodeModel from '../model/node/PolygonNodeModel';
import TextNodeModel from '../model/node/TextNodeModel';
import TextNode from '../view/node/TextNode';
import LineEdge from '../view/edge/LineEdge';
import LineEdgeModel from '../model/edge/LineEdgeModel';
import PolylineEdge from '../view/edge/PolylineEdge';
import PolylineEdgeModel from '../model/edge/PolylineEdgeModel';
import EllipseNode from '../view/node/EllipseNode';
import EllipseNodeModel from '../model/node/EllipseNodeModel';
import HtmlNode from '../view/node/HtmlNode';
import HtmlNodeModel from '../model/node/HtmlNodeModel';
import * as Options from '../options';
import { CommonTheme, EdgeTextTheme } from '../constant/DefaultTheme';
export declare type PointTuple = [number, number];
export declare type Point = {
    id?: string;
    x: number;
    y: number;
    [key: string]: unknown;
};
/**
 * 锚点坐标
 * 为了方便计算
 * 锚点的位置都是相对于节点中心点的偏移量。
 */
export declare type PointAnchor = {
    /**
     * 锚点x轴相对于中心点的偏移量
     */
    x: number;
    /**
     * 锚点y轴相对于中心点的偏移量
     */
    y: number;
    /**
     * 锚点Id
     */
    id?: string;
    [key: string]: unknown;
};
export declare type AnchorsOffsetItem = PointTuple | PointAnchor;
export declare type Size = {
    width: number;
    height: number;
};
export declare type TextConfig = {
    value: string;
} & Point;
export declare type GraphConfigData = {
    nodes: NodeConfig[];
    edges: EdgeConfig[];
};
export declare type NodeConfig = {
    id?: string;
    type: string;
    x: number;
    y: number;
    text?: TextConfig | string;
    zIndex?: number;
    properties?: Record<string, unknown>;
};
export declare type NodeData = {
    id: string;
    type: string;
    x: number;
    y: number;
    text?: TextConfig;
    properties: Record<string, unknown>;
    zIndex?: number;
    [key: string]: any;
};
export declare type NodeAttribute = {
    id: string;
    type?: string;
    x?: number;
    y?: number;
    text?: TextConfig;
    properties?: Record<string, unknown>;
};
export declare type MenuConfig = {
    text?: string;
    className?: string;
    icon?: boolean;
    callback: (id: any) => void;
};
export declare type AdditionData = Record<string, unknown>;
export declare type EdgeData = {
    id: string;
    type: string;
    sourceNodeId: string;
    startPoint: Point;
    targetNodeId: string;
    endPoint: Point;
    text?: TextConfig;
    properties: Record<string, unknown>;
    zIndex?: number;
    pointsList?: Point[];
};
export declare type EdgeAttribute = {
    id: string;
    type?: string;
    sourceNodeId?: string;
    startPoint?: Point;
    targetNodeId?: string;
    endPoint?: Point;
    text?: TextConfig;
    properties?: Record<string, unknown>;
};
export declare type EdgeFilter = {
    id?: string;
    sourceNodeId?: string;
    targetNodeId?: string;
};
export declare type EdgeConfig = {
    id?: string;
    /**
     * 边的类型，不传默认为lf.setDefaultEdgeType(type)传入的类型。
     * LogicFlow内部默认为polyline
     */
    type?: string;
    sourceNodeId: string;
    sourceAnchorId?: string;
    targetNodeId: string;
    targetAnchorId?: string;
    startPoint?: {
        x: number;
        y: number;
    };
    endPoint?: {
        x: number;
        y: number;
    };
    text?: {
        x: number;
        y: number;
        value: string;
    } | string;
    pointsList?: Point[];
    zIndex?: number;
    properties?: Record<string, unknown>;
};
declare type LeftTopX = number;
declare type LeftTopY = number;
declare type RightBottomX = number;
declare type RightBottomY = number;
export declare type Bounds = {
    x1: LeftTopX;
    y1: LeftTopY;
    x2: RightBottomX;
    y2: RightBottomY;
};
export declare type CommonStyle = {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    fillOpacity?: number;
    strokeOpacity?: number;
    opacity?: number;
    outlineColor?: string;
    outlineStrokeDashArray?: string;
};
export declare type RectStyle = CommonStyle & {
    width?: number;
    height?: number;
    radius?: number;
};
export declare type CircleStyle = CommonStyle & {
    r?: number;
};
export declare type EllipseStyle = CommonStyle & {
    rx?: number;
    ry?: number;
};
export declare type DiamondStyle = CommonStyle;
export declare type PolygonStyle = CommonStyle;
export declare type AnchorStyle = CommonStyle & {
    stroke?: string;
    strokeWidth?: number;
    r?: number;
};
export declare type AnchorLineStyle = {
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
};
export declare type AnchorHoverStyle = {
    fill?: string;
    fillOpacity?: number;
    stroke?: string;
    strokeWidth?: number;
    r?: number;
};
export declare type EdgeStyle = {
    stroke?: string;
    strokeWidth?: number;
    strokeDashArray?: string;
    hoverStroke?: string;
    selectedStroke?: string;
    outlineColor?: string;
    outlineStrokeDashArray?: string;
};
export declare type LineStyle = EdgeStyle;
export declare type PolylineStyle = EdgeStyle & {
    offset?: number;
};
export declare type BezierStyle = EdgeStyle & {
    offset?: number;
    adjustLineColor?: string;
    adjustAnchorStroke?: string;
    adjustAnchorFill?: string;
    adjustAnchorFillOpacity?: number;
};
export declare type TextStyle = {
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
};
export declare type NodeTextStyle = TextStyle & {
    lineHeight?: number;
    wrapPadding?: string;
};
export declare type EdgeTextStyle = TextStyle & EdgeTextTheme;
export declare type ArrowStyle = {
    offset?: number;
    verticalLength?: number;
};
export declare type EdgeAdjustStyle = {
    r: number;
    fill?: string;
    stroke?: string;
};
export declare type GraphTransform = {
    transform: string;
    transformOrigin: string;
};
export declare type EventArgs = Record<string, number | object | string>;
export declare type FocusOnArgs = {
    id?: string;
    coordinate?: {
        x: number;
        y: number;
    };
};
export declare type ComponentRender = (lf: LogicFlow, container: HTMLElement) => void;
export interface Extension {
    pluginName: string;
    install?: (lf: LogicFlow, LogicFlow: LogicFlowContractor) => void;
    render?: ComponentRender;
    destroy?: () => void;
    [props: string]: any;
}
export declare type Direction = 'vertical' | 'horizontal';
export declare type AppendInfo = {
    start: Point;
    end: Point;
    startIndex?: number;
    endIndex?: number;
    direction?: string;
    dragAble?: boolean;
};
export declare type ArrowInfo = {
    start: Point;
    end: Point;
    hover: Boolean;
    isSelected: Boolean;
};
export declare type IEdgeState = {
    hover: boolean;
};
export interface ModelContractor {
    new (data: any, graphModel: any): unknown;
}
export interface LogicFlowContractor {
    new (option: Options.Definition): LogicFlow;
}
export interface ExtensionContractor {
    pluginName: string;
    new ({ lf: LogicFlow, LogicFlow: LogicFlowContractor, }: {
        lf: any;
        LogicFlow: any;
    }): any;
    render?: Function;
}
export declare type RegisterBack = {
    view: Function;
    model: Function;
};
export interface RegisterParam {
    h: typeof h;
    BaseEdge: typeof BaseEdge;
    BaseEdgeModel: typeof BaseEdgeModel;
    BaseNode: typeof BaseNode;
    BaseNodeModel: typeof BaseNodeModel;
    RectNode: typeof RectNode;
    RectNodeModel: typeof RectNodeModel;
    CircleNode: typeof CircleNode;
    CircleNodeModel: typeof CircleNodeModel;
    DiamondNode: typeof DiamondNode;
    DiamondNodeModel: typeof DiamondNodeModel;
    PolygonNode: typeof PolygonNode;
    PolygonNodeModel: typeof PolygonNodeModel;
    TextNode: typeof TextNode;
    TextNodeModel: typeof TextNodeModel;
    LineEdge: typeof LineEdge;
    LineEdgeModel: typeof LineEdgeModel;
    PolylineEdge: typeof PolylineEdge;
    PolylineEdgeModel: typeof PolylineEdgeModel;
    EllipseNode: typeof EllipseNode;
    EllipseNodeModel: typeof EllipseNodeModel;
    HtmlNode: typeof HtmlNode;
    HtmlNodeModel: typeof HtmlNodeModel;
    [key: string]: unknown;
}
export declare type RegisterElementFn = (params: RegisterParam) => RegisterBack;
export declare type RegisterConfig = {
    type: string;
    view: any;
    model: any;
    isObserverView?: boolean;
};
export declare type AnchorConfig = {
    id?: string;
    x: number;
    y: number;
    [key: string]: any;
};
/**
 * 移动规则结果，可以支持允许水平移动，不允许垂直移动。
 * 在分组移动到边缘时有用到。
 */
export declare type IsAllowMove = {
    x: boolean;
    y: boolean;
};
/**
 * 限制节点移动规则
 * model: 移动节点的model
 * deltaX: 移动的x轴距离
 * deltaY: 移动的y轴距离
 */
export declare type NodeMoveRule = (model: BaseNodeModel, deltaX: number, deltaY: number) => Boolean | IsAllowMove;
export declare type ZoomParam = boolean | number;
export declare type NodeAttributes = {
    id: string;
    properties: Record<string, any>;
    type: string;
    x: number;
    y: number;
    isSelected: boolean;
    isHovered: boolean;
    width: number;
    height: number;
    text: {
        x: number;
        y: number;
        value: string;
        [key: string]: any;
    };
    [key: string]: any;
};
export declare type DiamondAttributes = {
    points: PointTuple[];
} & NodeAttributes;
export declare type ShapeStyleAttribute = CommonTheme;
export declare type VirtualRectSize = {
    virtualRectWidth: number;
    virtualRectHeight: number;
    virtualRectCenterPositionX: number;
    virtualRectCenterPositionY: number;
};
export {};
