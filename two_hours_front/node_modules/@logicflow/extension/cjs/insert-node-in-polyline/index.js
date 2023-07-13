"use strict";
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
exports.InsertNodeInPolyline = void 0;
var edge_1 = require("./edge");
var InsertNodeInPolyline = /** @class */ (function () {
    function InsertNodeInPolyline(_a) {
        var lf = _a.lf;
        this._lf = lf;
        this.dndAdd = true;
        this.dropAdd = true;
        this.eventHandler();
    }
    InsertNodeInPolyline.prototype.eventHandler = function () {
        var _this = this;
        // 监听事件
        if (this.dndAdd) {
            this._lf.on('node:dnd-add', function (_a) {
                var data = _a.data;
                _this.insetNode(data);
            });
        }
        if (this.dropAdd) {
            this._lf.on('node:drop', function (_a) {
                var data = _a.data;
                var edges = _this._lf.graphModel.edges;
                var id = data.id;
                var pureNode = true;
                for (var i = 0; i < edges.length; i++) {
                    if (edges[i].sourceNodeId === id || edges[i].targetNodeId === id) {
                        pureNode = false;
                        break;
                    }
                }
                if (pureNode) {
                    _this.insetNode(data);
                }
            });
        }
    };
    InsertNodeInPolyline.prototype.insetNode = function (nodeData) {
        var edges = this._lf.graphModel.edges;
        var nodeModel = this._lf.getNodeModelById(nodeData.id);
        for (var i = 0; i < edges.length; i++) {
            // eslint-disable-next-line max-len
            var _a = edge_1.isNodeInSegement(nodeModel, edges[i]), crossIndex = _a.crossIndex, crossPoints = _a.crossPoints;
            if (crossIndex >= 0) {
                var _b = edges[i], sourceNodeId = _b.sourceNodeId, targetNodeId = _b.targetNodeId, id = _b.id, type = _b.type, pointsList = _b.pointsList;
                this._lf.addEdge({
                    type: type,
                    sourceNodeId: sourceNodeId,
                    targetNodeId: nodeData.id,
                    pointsList: __spread(pointsList.slice(0, crossIndex), [crossPoints.startCrossPoint]),
                });
                this._lf.addEdge({
                    type: type,
                    sourceNodeId: nodeData.id,
                    targetNodeId: targetNodeId,
                    pointsList: __spread([crossPoints.endCrossPoint], pointsList.slice(crossIndex)),
                });
                this._lf.deleteEdge(id);
                break;
            }
        }
    };
    InsertNodeInPolyline.pluginName = 'insertNodeInPolyline';
    return InsertNodeInPolyline;
}());
exports.InsertNodeInPolyline = InsertNodeInPolyline;
exports.default = InsertNodeInPolyline;
