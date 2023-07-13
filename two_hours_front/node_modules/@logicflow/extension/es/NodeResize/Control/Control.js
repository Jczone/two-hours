var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { h, Component } from 'preact';
import { LogicFlowUtil } from '@logicflow/core';
import Rect from '../BasicShape/Rect';
import { getDiamondReizeEdgePoint, getEllipseReizeEdgePoint, getRectReizeEdgePoint, ModelType } from './Util';
var StepDrag = LogicFlowUtil.StepDrag;
var Control = /** @class */ (function (_super) {
    __extends(Control, _super);
    function Control(props) {
        var _this = _super.call(this) || this;
        // 更新中心点位置，更新文案位置
        _this.updatePosition = function (_a) {
            var deltaX = _a.deltaX, deltaY = _a.deltaY;
            var _b = _this.nodeModel, x = _b.x, y = _b.y;
            _this.nodeModel.x = x + deltaX / 2;
            _this.nodeModel.y = y + deltaY / 2;
            _this.nodeModel.moveText(deltaX / 2, deltaY / 2);
        };
        // 计算control拖动后，节点的宽高
        _this.getResize = function (_a) {
            var index = _a.index, deltaX = _a.deltaX, deltaY = _a.deltaY, width = _a.width, height = _a.height, _b = _a.pct, pct = _b === void 0 ? 1 : _b;
            var resize = { width: width, height: height };
            switch (index) {
                case 0:
                    resize.width = width - deltaX * pct;
                    resize.height = height - deltaY * pct;
                    break;
                case 1:
                    resize.width = width + deltaX * pct;
                    resize.height = height - deltaY * pct;
                    break;
                case 2:
                    resize.width = width + deltaX;
                    resize.height = height + deltaY * pct;
                    break;
                case 3:
                    resize.width = width - deltaX * pct;
                    resize.height = height + deltaY * pct;
                    break;
                default:
                    break;
            }
            return resize;
        };
        // 矩形更新
        _this.updateRect = function (_a) {
            var deltaX = _a.deltaX, deltaY = _a.deltaY;
            var _b = _this.nodeModel, id = _b.id, x = _b.x, y = _b.y, width = _b.width, height = _b.height, radius = _b.radius;
            // 更新中心点位置，更新文案位置
            var index = _this.index;
            var size = _this.getResize({
                index: index,
                deltaX: deltaX,
                deltaY: deltaY,
                width: width,
                height: height,
                pct: 1,
            });
            // 限制放大缩小的最大最小范围
            var _c = _this.nodeModel, minWidth = _c.minWidth, minHeight = _c.minHeight, maxWidth = _c.maxWidth, maxHeight = _c.maxHeight;
            if (size.width < minWidth
                || size.width > maxWidth
                || size.height < minHeight
                || size.height > maxHeight) {
                // 为了避免放到和缩小位置和鼠标不一致的问题
                _this.dragHandler.cancelDrag();
                return;
            }
            _this.updatePosition({ deltaX: deltaX, deltaY: deltaY });
            // 更新宽高
            _this.nodeModel.width = size.width;
            _this.nodeModel.height = size.height;
            _this.nodeModel.setProperties({
                nodeSize: {
                    width: size.width,
                    height: size.height,
                },
            });
            var edges = _this.getNodeEdges(id);
            var beforeNode = {
                x: x,
                y: y,
                width: width,
                height: height,
                radius: radius,
            };
            var afterNode = {
                x: _this.nodeModel.x,
                y: _this.nodeModel.y,
                width: _this.nodeModel.width,
                height: _this.nodeModel.height,
                radius: radius,
            };
            var params = {
                point: '',
                beforeNode: beforeNode,
                afterNode: afterNode,
            };
            // 更新边
            var afterPoint;
            edges.sourceEdges.forEach(function (item) {
                params.point = item.startPoint;
                afterPoint = getRectReizeEdgePoint(params);
                item.updateStartPoint(afterPoint);
            });
            edges.targetEdges.forEach(function (item) {
                params.point = item.endPoint;
                afterPoint = getRectReizeEdgePoint(params);
                item.updateEndPoint(afterPoint);
            });
            _this.eventEmit({ beforeNode: beforeNode, afterNode: afterNode });
        };
        // 椭圆更新
        _this.updateEllipse = function (_a) {
            var deltaX = _a.deltaX, deltaY = _a.deltaY;
            var _b = _this.nodeModel, id = _b.id, rx = _b.rx, ry = _b.ry, x = _b.x, y = _b.y;
            var index = _this.index;
            var width = rx;
            var height = ry;
            var size = _this.getResize({
                index: index,
                deltaX: deltaX,
                deltaY: deltaY,
                width: width,
                height: height,
                pct: 1 / 2,
            });
            // 限制放大缩小的最大最小范围
            var _c = _this.nodeModel, minWidth = _c.minWidth, minHeight = _c.minHeight, maxWidth = _c.maxWidth, maxHeight = _c.maxHeight;
            if (size.width < (minWidth / 2)
                || size.width > (maxWidth / 2)
                || size.height < (minHeight / 2)
                || size.height > (maxHeight / 2)) {
                _this.dragHandler.cancelDrag();
                return;
            }
            // 更新中心点位置，更新文案位置
            _this.updatePosition({ deltaX: deltaX, deltaY: deltaY });
            // 更新rx ry,宽高为计算属性自动更新
            // @ts-ignore
            _this.nodeModel.rx = _this.nodeModel.rx + deltaX / 2;
            // @ts-ignore
            _this.nodeModel.ry = _this.nodeModel.ry + deltaY / 2;
            _this.nodeModel.setProperties({
                nodeSize: {
                    rx: size.width,
                    ry: size.height,
                },
            });
            var edges = _this.getNodeEdges(id);
            var beforeNode = { x: x, y: y };
            var afterNode = {
                rx: size.width,
                ry: size.height,
                x: _this.nodeModel.x,
                y: _this.nodeModel.y,
            };
            var params = {
                point: {},
                beforeNode: beforeNode,
                afterNode: afterNode,
            };
            // 更新边
            var afterPoint;
            edges.sourceEdges.forEach(function (item) {
                params.point = item.startPoint;
                afterPoint = getEllipseReizeEdgePoint(params);
                item.updateStartPoint(afterPoint);
            });
            edges.targetEdges.forEach(function (item) {
                params.point = item.endPoint;
                afterPoint = getEllipseReizeEdgePoint(params);
                item.updateEndPoint(afterPoint);
            });
            _this.eventEmit({ beforeNode: __assign(__assign({}, beforeNode), { rx: rx, ry: ry }), afterNode: afterNode });
        };
        // 菱形更新
        _this.updateDiamond = function (_a) {
            var deltaX = _a.deltaX, deltaY = _a.deltaY;
            var _b = _this.nodeModel, id = _b.id, rx = _b.rx, ry = _b.ry, x = _b.x, y = _b.y;
            var index = _this.index;
            var width = rx;
            var height = ry;
            var size = _this.getResize({
                index: index,
                deltaX: deltaX,
                deltaY: deltaY,
                width: width,
                height: height,
                pct: 1 / 2,
            });
            // 限制放大缩小的最大最小范围
            var _c = _this.nodeModel, minWidth = _c.minWidth, minHeight = _c.minHeight, maxWidth = _c.maxWidth, maxHeight = _c.maxHeight;
            if (size.width < (minWidth / 2)
                || size.width > (maxWidth / 2)
                || size.height < (minHeight / 2)
                || size.height > (maxHeight / 2)) {
                _this.dragHandler.cancelDrag();
                return;
            }
            // 更新中心点位置，更新文案位置
            _this.updatePosition({ deltaX: deltaX, deltaY: deltaY });
            // 更新rx ry,宽高为计算属性自动更新
            // @ts-ignore
            _this.nodeModel.rx = _this.nodeModel.rx + deltaX / 2;
            // @ts-ignore
            _this.nodeModel.ry = _this.nodeModel.ry + deltaY / 2;
            _this.nodeModel.setProperties({
                nodeSize: {
                    rx: size.width,
                    ry: size.height,
                },
            });
            var beforeNode = { x: x, y: y, rx: rx, ry: ry };
            var afterNode = {
                rx: size.width,
                ry: size.height,
                x: _this.nodeModel.x,
                y: _this.nodeModel.y,
            };
            var params = {
                point: {},
                beforeNode: beforeNode,
                afterNode: afterNode,
            };
            // 更新边
            var afterPoint;
            var edges = _this.getNodeEdges(id);
            edges.sourceEdges.forEach(function (item) {
                params.point = item.startPoint;
                afterPoint = getDiamondReizeEdgePoint(params);
                item.updateStartPoint(afterPoint);
            });
            edges.targetEdges.forEach(function (item) {
                params.point = item.endPoint;
                afterPoint = getDiamondReizeEdgePoint(params);
                item.updateEndPoint(afterPoint);
            });
            _this.eventEmit({ beforeNode: beforeNode, afterNode: afterNode });
        };
        _this.eventEmit = function (_a) {
            var beforeNode = _a.beforeNode, afterNode = _a.afterNode;
            var _b = _this.nodeModel, id = _b.id, modelType = _b.modelType, type = _b.type;
            var oldNodeSize = __assign({ id: id, modelType: modelType, type: type }, beforeNode);
            var newNodeSize = __assign({ id: id, modelType: modelType, type: type }, afterNode);
            _this.graphModel.eventCenter.emit('node:resize', { oldNodeSize: oldNodeSize, newNodeSize: newNodeSize });
        };
        _this.onDraging = function (_a) {
            var deltaX = _a.deltaX, deltaY = _a.deltaY;
            var modelType = _this.nodeModel.modelType;
            // html和矩形的计算方式是一样的，共用一个方法
            if (modelType === ModelType.RECT_NODE || modelType === ModelType.HTML_NODE) {
                _this.updateRect({ deltaX: deltaX, deltaY: deltaY });
                // this.nodeModel.resize(deltaX, deltaY);
            }
            else if (modelType === ModelType.ELLIPSE_NODE) {
                _this.updateEllipse({ deltaX: deltaX, deltaY: deltaY });
            }
            else if (modelType === ModelType.DIAMOND_NODE) {
                _this.updateDiamond({ deltaX: deltaX, deltaY: deltaY });
            }
        };
        _this.index = props.index;
        _this.nodeModel = props.model;
        _this.graphModel = props.graphModel;
        var gridSize = _this.graphModel.gridSize;
        // 为保证对齐线功能正常使用，step默认是网格grid的两倍，
        // 没有网格设置，默认为2，保证坐标是整数
        var step = 2;
        if (gridSize > 1) {
            step = 2 * gridSize;
        }
        if (_this.nodeModel.gridSize) {
            step = 2 * _this.nodeModel.gridSize;
        }
        _this.state = {};
        _this.dragHandler = new StepDrag({
            onDraging: _this.onDraging,
            step: step,
        });
        return _this;
    }
    Control.prototype.getNodeEdges = function (nodeId) {
        var graphModel = this.graphModel;
        var edges = graphModel.edges;
        var sourceEdges = [];
        var targetEdges = [];
        for (var i = 0; i < edges.length; i++) {
            var edgeModel = edges[i];
            if (edgeModel.sourceNodeId === nodeId) {
                sourceEdges.push(edgeModel);
            }
            else if (edges[i].targetNodeId === nodeId) {
                targetEdges.push(edgeModel);
            }
        }
        return { sourceEdges: sourceEdges, targetEdges: targetEdges };
    };
    Control.prototype.render = function () {
        var _a = this.props, x = _a.x, y = _a.y, index = _a.index, model = _a.model;
        var style = model.getControlPointStyle();
        return (h("g", { className: "lf-resize-control-" + index },
            h(Rect, __assign({ className: "lf-node-control" }, { x: x, y: y }, style, { onMouseDown: this.dragHandler.handleMouseDown }))));
    };
    return Control;
}(Component));
export default Control;
