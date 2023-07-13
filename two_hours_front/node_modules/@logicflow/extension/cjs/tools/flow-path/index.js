"use strict";
/**
 * 路径插件，此插件支持获取绘制的图中所有的路径。
 * 需要指定开始节点类型。
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowPath = void 0;
var getBpmnId_1 = require("../../bpmn/getBpmnId");
var FlowPath = /** @class */ (function () {
    function FlowPath(_a) {
        var _this = this;
        var lf = _a.lf;
        this.lf = lf;
        this.pathes = [];
        // 给lf添加方法
        lf.getPathes = function () {
            if (!_this.startNodeType) {
                throw new Error('需要预先指定开始节点类型');
            }
            return _this.getPathes();
        };
        lf.setRawPathes = function (pathes) {
            _this.setPathes(pathes);
        };
        lf.getRawPathes = function () { return _this.pathes; };
        lf.setStartNodeType = function (type) {
            _this.startNodeType = type;
        };
    }
    FlowPath.prototype.setPathes = function (pathes) {
        this.pathes = pathes.map(function (_a) {
            var routeId = _a.routeId, name = _a.name, elements = _a.elements, type = _a.type;
            return ({
                routeId: routeId,
                name: name,
                elements: elements,
                type: type,
                similarElement: null,
                weight: 0,
            });
        });
    };
    FlowPath.prototype.getPathes = function () {
        var _this = this;
        var graphData = this.lf.getGraphRawData();
        var nodesMap = new Map();
        var startNodeIds = [];
        graphData.nodes.forEach(function (node) {
            nodesMap.set(node.id, {
                id: node.id,
                data: node,
                nextNodes: [],
            });
            if (node.type === _this.startNodeType) {
                startNodeIds.push(node.id);
            }
        });
        graphData.edges.forEach(function (edge) {
            var node = nodesMap.get(edge.sourceNodeId);
            node.nextNodes.push(edge.targetNodeId);
        });
        var pathElements = [];
        startNodeIds.forEach(function (id) {
            pathElements = pathElements.concat(_this.findPathElements(nodesMap.get(id), nodesMap, []));
        });
        return this.getNewPathes(pathElements);
    };
    FlowPath.prototype.findPathElements = function (node, nodesMap, elements) {
        if (elements === void 0) { elements = []; }
        var newPathes = __spread(elements);
        newPathes.push(node.id);
        if (node.nextNodes.length === 0) {
            return [newPathes];
        }
        var subPath = [];
        for (var i = 0; i < node.nextNodes.length; i++) {
            var n = nodesMap.get(node.nextNodes[i]);
            var p = void 0;
            // 循环路径
            var idx = newPathes.indexOf(n.id);
            if (idx !== -1) {
                p = [__spread(newPathes.slice(idx), [n.id])];
            }
            else {
                p = this.findPathElements(n, nodesMap, __spread(newPathes));
            }
            subPath = subPath.concat(p);
        }
        return subPath;
    };
    /**
     * 设置路径id
     * 如果存在原始路径Id, 则需要比较新路径是否在原始路径中存在相似路径
     * 如果有，则尽量使用原始路径。
     * 相似路径
     * 1. 如果所有的节点都相同，则必定为同一路径。(包括顺序不同)
     * 2. 如果新路径比原来路径少了或者多了部分节点，则记录为相似路径。基于不同的差异，标记不同的权重。
     * 3. 基于新路径在旧路径占用权限，设置新路径Id.
     * 4. 如果某一条旧路径被多条新路径标记为相同的权重，则这两条新路径都使用新Id.
     */
    FlowPath.prototype.getNewPathes = function (pathElements) {
        var _this = this;
        var pathes = [];
        // 由于循环路径不包括开始，所以存在重复的情况，此处去重。
        var LoopSet = new Set();
        pathElements.forEach(function (elements) {
            var routeId = _this.getNewId('path');
            var name = _this.getNewId('路径');
            var isLoop = _this.isLoopPath(elements);
            var elementStr = elements.join(',');
            if (!LoopSet.has(elementStr)) {
                LoopSet.add(elementStr);
                pathes.push({
                    routeId: routeId,
                    name: name,
                    elements: elements,
                    type: isLoop,
                    weight: 0,
                    similarElement: '',
                });
            }
        });
        var oldPathes = JSON.parse(JSON.stringify(this.pathes));
        // 1) 找到所有路径最相似的路径, 给旧路径标记其最接近的路径
        pathes.forEach(function (newPath) {
            for (var i = 0; i < oldPathes.length; i++) {
                var oldPath = oldPathes[i];
                var weight = _this.similar2Path(__spread(newPath.elements), __spread(oldPath.elements));
                if (weight > newPath.weight && oldPath.weight <= weight) {
                    newPath.weight = weight;
                    newPath.similarElement = oldPath;
                    if (weight === oldPath.weight && oldPath.similarElement) {
                        // 特殊处理，如果两个路径都与同一条旧路径有相似的权重，则这两个路径的相似路径都置空
                        oldPath.similarElement.similarElement = null;
                        oldPath.similarElement.weight = 0;
                        oldPath.similarElement = null;
                        oldPath.weight = 0;
                    }
                    else {
                        oldPath.similarElement = newPath;
                        oldPath.weight = weight;
                    }
                }
            }
        });
        // 2) 再次遍历所有路径，如果该路径的相似路径对应的相似路径是自己，那么就设置该路径id和name为其相似路径。
        pathes.forEach(function (newPath) {
            if (newPath.similarElement && newPath.similarElement.similarElement === newPath) {
                newPath.routeId = newPath.similarElement.routeId;
                newPath.name = newPath.similarElement.name;
            }
            delete newPath.similarElement;
            delete newPath.weight;
        });
        this.setPathes(pathes);
        return pathes;
    };
    FlowPath.prototype.similar2Path = function (x, y) {
        var z = 0;
        var s = x.length + y.length;
        x.sort();
        y.sort();
        var a = x.shift();
        var b = y.shift();
        while (a !== undefined && b !== undefined) {
            if (a === b) {
                z++;
                a = x.shift();
                b = y.shift();
            }
            else if (a < b) {
                a = x.shift();
            }
            else if (a > b) {
                b = y.shift();
            }
        }
        return (z / s) * 200;
    };
    FlowPath.prototype.getNewId = function (prefix) {
        return prefix + "_" + getBpmnId_1.getBpmnId();
    };
    /**
     * 判断是否为循环路径
     * 由于前面进行了特殊处理，将循环部分单独提出来作为路径
     * 所有循环路径必定开始节点等于结束节点。
     */
    FlowPath.prototype.isLoopPath = function (elements) {
        var length = elements.length;
        return elements.indexOf(elements[length - 1]) !== length - 1 ? 1 : 0;
    };
    FlowPath.pluginName = 'flowPath';
    return FlowPath;
}());
exports.FlowPath = FlowPath;
