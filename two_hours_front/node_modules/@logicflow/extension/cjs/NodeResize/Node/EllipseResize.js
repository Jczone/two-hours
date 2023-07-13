"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@logicflow/core");
var ControlGroup_1 = require("../Control/ControlGroup");
var EllipseResizeModel = /** @class */ (function (_super) {
    __extends(EllipseResizeModel, _super);
    function EllipseResizeModel(data, graphModel) {
        var _this = _super.call(this, data, graphModel) || this;
        var nodeSize = _this.properties.nodeSize;
        if (nodeSize) {
            _this.rx = nodeSize.rx;
            _this.ry = nodeSize.ry;
        }
        return _this;
    }
    EllipseResizeModel.prototype.initNodeData = function (data) {
        _super.prototype.initNodeData.call(this, data);
        this.minWidth = 30;
        this.minHeight = 30;
        this.maxWidth = 2000;
        this.maxHeight = 2000;
    };
    EllipseResizeModel.prototype.getOutlineStyle = function () {
        var style = _super.prototype.getOutlineStyle.call(this);
        style.stroke = 'none';
        if (style.hover) {
            style.hover.stroke = 'none';
        }
        return style;
    };
    EllipseResizeModel.prototype.getResizeOutlineStyle = function () {
        return {
            stroke: '#000000',
            strokeWidth: 1,
            strokeDasharray: '3,3',
        };
    };
    EllipseResizeModel.prototype.getControlPointStyle = function () {
        return {
            width: 7,
            height: 7,
            fill: '#FFFFFF',
            stroke: '#000000',
        };
    };
    return EllipseResizeModel;
}(core_1.EllipseNodeModel));
var EllipseResizeView = /** @class */ (function (_super) {
    __extends(EllipseResizeView, _super);
    function EllipseResizeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EllipseResizeView.prototype.getControlGroup = function () {
        var _a = this.props, model = _a.model, graphModel = _a.graphModel;
        return (core_1.h(ControlGroup_1.default, { model: model, graphModel: graphModel }));
    };
    // getResizeShape绘制图形，功能等同于基础椭圆的getShape功能，可以通过复写此方法，进行节点自定义
    EllipseResizeView.prototype.getResizeShape = function () {
        return _super.prototype.getShape.call(this);
    };
    EllipseResizeView.prototype.getShape = function () {
        var model = this.props.model;
        return (core_1.h("g", null,
            this.getResizeShape(),
            model.isSelected ? this.getControlGroup() : ''));
    };
    return EllipseResizeView;
}(core_1.EllipseNode));
var EllipseResize = {
    type: 'ellipse',
    view: EllipseResizeView,
    model: EllipseResizeModel,
};
exports.default = EllipseResize;
