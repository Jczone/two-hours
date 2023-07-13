"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiamondReizeEdgePoint = exports.getEllipseReizeEdgePoint = exports.getRectReizeEdgePoint = exports.ModelType = void 0;
var ModelType;
(function (ModelType) {
    ModelType["NODE"] = "node";
    ModelType["CIRCLE_NODE"] = "circle-node";
    ModelType["POLYGON_NODE"] = "polygon-node";
    ModelType["RECT_NODE"] = "rect-node";
    ModelType["HTML_NODE"] = "html-node";
    ModelType["TEXT_NODE"] = "text-node";
    ModelType["ELLIPSE_NODE"] = "ellipse-node";
    ModelType["DIAMOND_NODE"] = "diamond-node";
    ModelType["EDGE"] = "edge";
    ModelType["LINE_EDGE"] = "line-edge";
    ModelType["POLYLINE_EDGE"] = "polyline-edge";
    ModelType["BEZIER_EDGE"] = "bezier-edge";
    ModelType["GRAPH"] = "graph";
})(ModelType = exports.ModelType || (exports.ModelType = {}));
// 计算节点的box四角数据
function getNodeBox(node) {
    var x = node.x, y = node.y, width = node.width, height = node.height;
    return {
        minX: x - width / 2,
        minY: y - height / 2,
        maxX: x + width / 2,
        maxY: y + height / 2,
    };
}
// 计算矩形radius设置后，四个圆角的圆心
function getRidusCenter(node) {
    var nodeBox = getNodeBox(node);
    var radius = node.radius;
    var minX = nodeBox.minX, minY = nodeBox.minY, maxX = nodeBox.maxX, maxY = nodeBox.maxY;
    return [
        {
            x: minX + radius,
            y: minY + radius,
        },
        {
            x: maxX - radius,
            y: minY + radius,
        },
        {
            x: maxX - radius,
            y: maxY - radius,
        },
        {
            x: minX + radius,
            y: maxY - radius,
        },
    ];
}
// 获取矩形resize之后，与矩形连接边的新端点
function getRectReizeEdgePoint(_a) {
    var point = _a.point, beforeNode = _a.beforeNode, afterNode = _a.afterNode;
    var x = point.x, y = point.y;
    var afterPoint = {
        x: x, y: y,
    };
    var radius = beforeNode.radius;
    var beforeNodeBox = getNodeBox(beforeNode);
    var afterNodeBox = getNodeBox(afterNode);
    if (x === beforeNodeBox.minX) {
        // 左边
        afterPoint.x = afterNodeBox.minX;
        var pct = (y - beforeNode.y) / (beforeNode.height / 2 - radius);
        if (pct) {
            afterPoint.y = afterNode.y + (afterNode.height / 2 - radius) * pct;
        }
        else {
            afterPoint.y = afterNode.y;
        }
    }
    else if (x === beforeNodeBox.maxX) {
        // 右边
        afterPoint.x = afterNodeBox.maxX;
        var pct = (y - beforeNode.y) / (beforeNode.height / 2 - radius);
        if (pct) {
            afterPoint.y = afterNode.y + (afterNode.height / 2 - radius) * pct;
        }
        else {
            afterPoint.y = afterNode.y;
        }
    }
    else if (y === beforeNodeBox.minY) {
        // 上边
        afterPoint.y = afterNodeBox.minY;
        var pct = (x - beforeNode.x) / (beforeNode.width / 2 - radius);
        if (pct) {
            afterPoint.x = afterNode.x + (afterNode.width / 2 - radius) * pct;
        }
        else {
            afterPoint.x = afterNode.x;
        }
    }
    else if (y === beforeNodeBox.maxY) {
        // 下边
        afterPoint.y = afterNodeBox.maxY;
        var pct = (x - beforeNode.x) / (beforeNode.width / 2 - radius);
        if (pct) {
            afterPoint.x = afterNode.x + (afterNode.width / 2 - radius) * pct;
        }
        else {
            afterPoint.x = afterNode.x;
        }
    }
    else {
        // 在圆角部分
        var beeforCoc = getRidusCenter(beforeNode);
        var afterCoc = getRidusCenter(afterNode);
        var nodeBox = getNodeBox(beforeNode);
        var minX = nodeBox.minX, minY = nodeBox.minY, maxX = nodeBox.maxX, maxY = nodeBox.maxY;
        var index = -1;
        if (x - minX < radius && y - minY < radius) {
            // 左上角
            index = 0;
        }
        else if (maxX - x < radius && y - minY < radius) {
            // 右上角
            index = 1;
        }
        else if (maxX - x < radius && maxY - y < radius) {
            // 右下角
            index = 2;
        }
        else if (x - minX < radius && minY - y < radius) {
            // 左下角
            index = 3;
        }
        if (index > -1) {
            // 根据夹角角度计算位置
            var angle = Math.atan2((y - beeforCoc[index].y), (x - beeforCoc[index].x));
            afterPoint.x = afterCoc[index].x + radius * Math.cos(angle);
            afterPoint.y = afterCoc[index].y + radius * Math.sin(angle);
        }
    }
    return afterPoint;
}
exports.getRectReizeEdgePoint = getRectReizeEdgePoint;
// 获取椭圆resize之后，与椭圆连接边的新端点
function getEllipseReizeEdgePoint(_a) {
    var point = _a.point, beforeNode = _a.beforeNode, afterNode = _a.afterNode;
    var rx = afterNode.rx, ry = afterNode.ry;
    var afterPoint = point;
    // 将椭圆中心当做中心点(0,0)，放大缩小前点与X周夹角
    var tan = (point.y - beforeNode.y) / (point.x - beforeNode.x);
    // 方便与公式对照，将rx命名为a,ry命名为b
    var a = rx;
    var b = ry;
    var x;
    var y;
    // 将椭圆中心当做中心点(0,0),计算放大缩小后，同一夹角下，点相对位置
    if (tan >= Infinity) {
        //  θ = PI / 2
        x = 0;
        y = b;
    }
    else if (tan <= -Infinity) {
        //  θ = 3 * PI / 2
        x = 0;
        y = -b;
    }
    else if (point.x - beforeNode.x > 0) {
        //  0 < θ = PI / 2   或者  3 * PI / 2 < θ = 2 * PI
        //  一四象限
        x = (a * b) / (Math.sqrt((b * b) + a * a * tan * tan));
        y = (a * b * tan) / (Math.sqrt((b * b) + a * a * tan * tan));
    }
    else {
        //  PI / 2 < θ  3 * PI / 2
        //  二三象限
        x = -(a * b) / (Math.sqrt((b * b) + a * a * tan * tan));
        y = -(a * b * tan) / (Math.sqrt((b * b) + a * a * tan * tan));
    }
    afterPoint = { x: x + afterNode.x, y: y + afterNode.y };
    return afterPoint;
}
exports.getEllipseReizeEdgePoint = getEllipseReizeEdgePoint;
// 获取菱形resize之后，与菱形连接边的新端点
function getDiamondReizeEdgePoint(_a) {
    var point = _a.point, beforeNode = _a.beforeNode, afterNode = _a.afterNode;
    var afterPoint = point;
    var x;
    var y;
    var px = point.x - beforeNode.x;
    var py = point.y - beforeNode.y;
    var rxBefore = beforeNode.rx;
    var ryBefore = beforeNode.ry;
    // eslint-disable-next-line max-len
    var pct = Math.sqrt((rxBefore - Math.abs(px)) * (rxBefore - Math.abs(px)) + py * py) / Math.sqrt(rxBefore * rxBefore + ryBefore * ryBefore);
    var rxAfter = afterNode.rx;
    var ryAfter = afterNode.ry;
    // eslint-disable-next-line max-len
    var a = Math.sqrt((rxAfter * rxAfter + ryAfter * ryAfter) * pct * pct * ((rxAfter * rxAfter) / (rxAfter * rxAfter + ryAfter * ryAfter)));
    var b = a * (ryAfter / rxAfter);
    if (px >= 0) {
        // eslint-disable-next-line max-len
        x = rxAfter - a;
    }
    else {
        x = a - rxAfter;
    }
    if (py > 0) {
        y = b;
    }
    else {
        y = -b;
    }
    afterPoint = {
        x: x + afterNode.x,
        y: y + afterNode.y,
    };
    return afterPoint;
}
exports.getDiamondReizeEdgePoint = getDiamondReizeEdgePoint;
