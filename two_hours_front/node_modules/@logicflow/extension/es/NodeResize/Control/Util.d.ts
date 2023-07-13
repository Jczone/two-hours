export declare enum ModelType {
    NODE = "node",
    CIRCLE_NODE = "circle-node",
    POLYGON_NODE = "polygon-node",
    RECT_NODE = "rect-node",
    HTML_NODE = "html-node",
    TEXT_NODE = "text-node",
    ELLIPSE_NODE = "ellipse-node",
    DIAMOND_NODE = "diamond-node",
    EDGE = "edge",
    LINE_EDGE = "line-edge",
    POLYLINE_EDGE = "polyline-edge",
    BEZIER_EDGE = "bezier-edge",
    GRAPH = "graph"
}
export declare function getRectReizeEdgePoint({ point, beforeNode, afterNode }: {
    point: any;
    beforeNode: any;
    afterNode: any;
}): {
    x: any;
    y: any;
};
export declare function getEllipseReizeEdgePoint({ point, beforeNode, afterNode }: {
    point: any;
    beforeNode: any;
    afterNode: any;
}): any;
export declare function getDiamondReizeEdgePoint({ point, beforeNode, afterNode }: {
    point: any;
    beforeNode: any;
    afterNode: any;
}): any;
