/**
 * 自动布局插件
 * 依赖flowpath插件
 * 未完善
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var POSITION_TYPE = {
    LEFT_TOP: -1,
    LEFT: 0,
    LEFT_BOTTOM: 1,
};
var AutoLayout = /** @class */ (function () {
    function AutoLayout(_a) {
        var _this = this;
        var lf = _a.lf;
        this.lf = lf;
        /**
         * 用于记录上一次调用layout时计算出的trunk
         * 当旧trunk和新trunk长度一致时，用于选择旧trunk,
         * a->b->c->d
         *    |->e
         * e后面新增f节点时候，旧逻辑会返回新trunk[a,b,e,f]
         * 界面布局变成
         * a->b->e->f
         *    |->c->d
         * 其实只想要这样 尽量少变化
         * a->b->c->d
         *    |->e->f
         * */
        this.trunk = [];
        // 给lf添加方法
        lf.layout = function (startNodeType) {
            var data = _this.lf.getGraphRawData();
            _this.lf.setStartNodeType(startNodeType);
            var path = _this.lf.getPathes();
            _this.levelHeight = [];
            _this.newNodeMap = new Map();
            return _this.layout(data, path);
        };
    }
    // 1) 将所有节点和边的坐标删除。节点上的文本改成偏移量。
    // 2) 找到长度最长的路径，作为基准路径。
    // 3) 依次计算
    // 拿到最长的路径。
    // nodes: [], edges: [],
    AutoLayout.prototype.layout = function (data, path) {
        var _this = this;
        var trunk = [];
        path.forEach(function (p) {
            var elements = p.elements;
            if (elements.length > trunk.length) {
                trunk = elements;
            }
            else if (elements.length === trunk.length) {
                // 考虑是否替换为旧的trunk
                if (JSON.stringify(elements) === JSON.stringify(_this.trunk)) {
                    trunk = _this.trunk;
                }
            }
        });
        // 记录上一次trunk
        this.trunk = trunk;
        var nodeMap = this.formatData(data);
        var newGraphData = {
            nodes: [],
            edges: [],
        };
        // 从后向前布局
        for (var i = trunk.length - 1; i >= 0; i--) {
            this.setNodePosition(trunk[i], nodeMap, newGraphData, i, 1);
        }
        this.lf.graphModel.graphDataToModel(newGraphData);
    };
    // 1) 需要知道下一层级已占高度。
    // 2) 基于自己的高度，判断下一个层级的高度
    AutoLayout.prototype.setNodePosition = function (nodeId, nodeMap, newGraphData, xLevel, yLevel) {
        var _this = this;
        var n = nodeMap[nodeId];
        var text = n.text, type = n.type, next = n.next, properties = n.properties;
        var x = xLevel * 160 + 40;
        var y = yLevel * 120;
        var nodeData = {
            id: nodeId,
            x: x,
            text: text,
            y: y,
            type: type,
            properties: properties,
        };
        if (text && typeof text === 'object') {
            nodeData.text = __assign(__assign({}, text), { x: x + text.x, y: y + text.y });
        }
        this.newNodeMap.set(nodeData.id, {
            x: nodeData.x,
            y: nodeData.y,
            type: type,
        });
        newGraphData.nodes.push(nodeData);
        n.isFixed = true;
        this.addLevelHeight(xLevel, 1);
        if (next && next.length > 0) {
            next.forEach(function (nextInfo) {
                // 如果下一个节点还没有被定位，那么设置其定位
                var n1 = nodeMap[nextInfo.nodeId];
                if (!n1.isFixed) {
                    var nextYLevel = _this.getLevelHeight(xLevel + 1);
                    _this.addLevelHeight(xLevel, 1);
                    _this.setNodePosition(nextInfo.nodeId, nodeMap, newGraphData, xLevel + 1, nextYLevel + 1);
                }
                else {
                    // todo: 如果下一个节点是已经定位的，则需要考虑边的规避
                }
                // 设置连接到下一个节点的边
                // 1) 起始位置为source节点的下方，结束位置为target节点左边。
                // 2) 计算折线
                newGraphData.edges.push(__assign({ id: nextInfo.edgeId, type: nextInfo.edgeType, sourceNodeId: nodeId, targetNodeId: nextInfo.nodeId, properties: nextInfo.properties, text: nextInfo.text }, _this.getEdgeDataPoints(nodeId, nextInfo.nodeId)));
            });
        }
        return nodeData;
    };
    /**
     * 1. 处理边上的文本
     * 2. 主干节点之间直接的边
     * 3. 一个节点被多个连接作为目标节点，合理分配锚点位置。
     */
    AutoLayout.prototype.getEdgeDataPoints = function (sourceNodeId, targetNodeId) {
        var source = this.newNodeMap.get(sourceNodeId);
        var target = this.newNodeMap.get(targetNodeId);
        var _a = this.getShape(sourceNodeId), width = _a.width, height = _a.height;
        var _b = this.getShape(targetNodeId), targetWidth = _b.width, targetHeight = _b.height;
        var postionType = this.getRelativePosition(source, target);
        var startPoint = {
            x: source.x,
            y: source.y,
        };
        var endPoint = {
            x: target.x,
            y: target.y,
        };
        switch (postionType) {
            case POSITION_TYPE.LEFT:
                startPoint.x = source.x + width / 2;
                endPoint.x = target.x - targetWidth / 2;
                break;
            case POSITION_TYPE.LEFT_TOP:
                startPoint.y = source.y + height / 2;
                endPoint.x = target.x - targetWidth / 2;
                break;
            case POSITION_TYPE.LEFT_BOTTOM:
                startPoint.x = source.x + width / 2;
                endPoint.y = target.y + targetHeight / 2;
                break;
            default:
                break;
        }
        return {
            startPoint: startPoint,
            endPoint: endPoint,
        };
    };
    /**
     * 获取边的连接节点相对位置。
     * source一定在target左边。
     * 1. 如果source和target在同一x, y坐标内容。
     * 2. 如果source在target左上方。
     * 3. 如果souce在target左下方。
     */
    AutoLayout.prototype.getRelativePosition = function (source, target) {
        var y = source.y;
        var y1 = target.y;
        var postionType;
        if (y < y1) {
            postionType = -1;
        }
        else if (y === y1) {
            postionType = 0;
        }
        else {
            postionType = 1;
        }
        return postionType;
    };
    /**
     * 获取边节点图形的宽高。
     */
    AutoLayout.prototype.getShape = function (nodeId) {
        var nodeModel = this.lf.getNodeModelById(nodeId);
        return {
            height: nodeModel.height,
            width: nodeModel.width,
        };
    };
    AutoLayout.prototype.formatData = function (data) {
        var nodeMap = data.nodes.reduce(function (nMap, node) {
            var type = node.type, properties = node.properties, text = node.text, x = node.x, y = node.y;
            if (text && typeof text === 'object') {
                // 坐标转换为偏移量
                text.x = text.x - x;
                text.y = text.y - y;
            }
            nMap[node.id] = {
                type: type,
                properties: properties,
                text: text,
                prev: [],
                next: [],
            };
            return nMap;
        }, {});
        data.edges.forEach(function (edge) {
            var sourceNodeId = edge.sourceNodeId, targetNodeId = edge.targetNodeId, id = edge.id, properties = edge.properties, text = edge.text;
            var newText = text;
            if (typeof text === 'object') {
                newText = text.value;
            }
            nodeMap[sourceNodeId].next.push({
                edgeId: id,
                nodeId: targetNodeId,
                edgeType: edge.type,
                properties: properties,
                text: newText,
            });
            nodeMap[targetNodeId].prev.push({
                edgeId: id,
                nodeId: sourceNodeId,
                properties: properties,
                text: newText,
            });
        });
        return nodeMap;
    };
    AutoLayout.prototype.addLevelHeight = function (level, height, isNegative) {
        if (height === void 0) { height = 1; }
        if (isNegative === void 0) { isNegative = false; }
        var l = this.levelHeight[level];
        if (!l) {
            l = {
                positiveHeight: 0,
                negativeHeight: 0,
            };
            this.levelHeight[level] = l;
        }
        isNegative ? (l.negativeHeight -= height) : (l.positiveHeight += height);
    };
    AutoLayout.prototype.getLevelHeight = function (level, isNegative) {
        if (isNegative === void 0) { isNegative = false; }
        var val = this.levelHeight[level];
        if (!val) {
            return 0;
        }
        return isNegative ? val.negativeHeight : val.positiveHeight;
    };
    AutoLayout.pluginName = 'AutoLayout';
    return AutoLayout;
}());
export { AutoLayout };
