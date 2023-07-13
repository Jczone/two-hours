// 这个里面的函数有些在core中已经存在，为了解耦关系，没有引用
var SegmentDirection;
(function (SegmentDirection) {
    SegmentDirection["HORIZONTAL"] = "horizontal";
    SegmentDirection["VERTICAL"] = "vertical";
})(SegmentDirection || (SegmentDirection = {}));
/* 判断一个点是否在线段中
入参点：point, 线段起终点，start,end,
返回值： 在线段中true，否则false
*/
export var isInSegment = function (point, start, end) {
    var x = point.x, y = point.y;
    return (x - start.x) * (x - end.x) <= 0
        && (y - start.y) * (y - end.y) <= 0;
};
/* 获取节点bbox */
var getNodeBBox = function (node) {
    var x = node.x, y = node.y, width = node.width, height = node.height;
    var bBox = {
        minX: x - width / 2,
        minY: y - height / 2,
        maxX: x + width / 2,
        maxY: y + height / 2,
        x: x,
        y: y,
        width: width,
        height: height,
        centerX: x,
        centerY: y,
    };
    return bBox;
};
/* 判断线段的方向 */
var segmentDirection = function (start, end) {
    var direction;
    if (start.x === end.x) {
        direction = SegmentDirection.VERTICAL;
    }
    else if (start.y === end.y) {
        direction = SegmentDirection.HORIZONTAL;
    }
    return direction;
};
// 节点是够在线段内，求出节点与线段的交点
export var corssPointInSegement = function (node, start, end) {
    var bBox = getNodeBBox(node);
    var direction = segmentDirection(start, end);
    var maxX = Math.max(start.x, end.x);
    var minX = Math.min(start.x, end.x);
    var maxY = Math.max(start.y, end.y);
    var minY = Math.min(start.y, end.y);
    var x = node.x, y = node.y, width = node.width, height = node.height;
    if (direction === SegmentDirection.HORIZONTAL) {
        // 同一水平线
        if (start.y === y && maxX >= bBox.maxX && minX <= bBox.minX) {
            return {
                startCrossPoint: {
                    x: start.x > end.x ? x + (width / 2) : x - (width / 2),
                    y: y,
                },
                endCrossPoint: {
                    x: start.x > end.x ? x - (width / 2) : x + (width / 2),
                    y: y,
                },
            };
        }
    }
    else if (direction === SegmentDirection.VERTICAL) {
        // 同一垂直线
        if (start.x === node.x && maxY >= bBox.maxY && minY <= bBox.minY) {
            return {
                startCrossPoint: {
                    x: x,
                    y: start.y > end.y ? y + (height / 2) : y - (height / 2),
                },
                endCrossPoint: {
                    x: x,
                    y: start.y > end.y ? y - (height / 2) : y + (height / 2),
                },
            };
        }
    }
};
// 节点是否在线段内
// eslint-disable-next-line max-len
export var isNodeInSegement = function (node, polyline) {
    var x = node.x, y = node.y;
    var pointsList = polyline.pointsList;
    for (var i = 0; i < pointsList.length - 1; i++) {
        if (isInSegment({ x: x, y: y }, pointsList[i], pointsList[i + 1])) {
            var bBoxCross = corssPointInSegement(node, pointsList[i], pointsList[i + 1]);
            if (bBoxCross) {
                return {
                    crossIndex: i + 1,
                    crossPoints: bBoxCross,
                };
            }
        }
    }
    return {
        crossIndex: -1,
        crossPoints: {
            startCrossPoint: { x: 0, y: 0 },
            endCrossPoint: { x: 0, y: 0 },
        },
    };
};
