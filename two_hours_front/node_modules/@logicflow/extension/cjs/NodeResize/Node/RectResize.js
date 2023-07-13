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
var RectResizeModel = /** @class */ (function (_super) {
    __extends(RectResizeModel, _super);
    function RectResizeModel(data, graphModel) {
        var _this = _super.call(this, data, graphModel) || this;
        var nodeSize = _this.properties.nodeSize;
        if (nodeSize) {
            _this.width = nodeSize.width;
            _this.height = nodeSize.height;
        }
        return _this;
    }
    RectResizeModel.prototype.initNodeData = function (data) {
        _super.prototype.initNodeData.call(this, data);
        this.minWidth = 30;
        this.minHeight = 30;
        this.maxWidth = 2000;
        this.maxHeight = 2000;
    };
    RectResizeModel.prototype.getOutlineStyle = function () {
        var style = _super.prototype.getOutlineStyle.call(this);
        style.stroke = 'none';
        if (style.hover) {
            style.hover.stroke = 'none';
        }
        return style;
    };
    RectResizeModel.prototype.getResizeOutlineStyle = function () {
        return {
            fill: 'none',
            stroke: 'transparent',
            strokeWidth: 1,
            strokeDasharray: '3,3',
        };
    };
    RectResizeModel.prototype.getControlPointStyle = function () {
        return {
            width: 7,
            height: 7,
            fill: '#FFFFFF',
            stroke: '#000000',
        };
    };
    RectResizeModel.prototype.resize = function (deltaX, deltaY) {
        console.log(deltaX, deltaY);
    };
    return RectResizeModel;
}(core_1.RectNodeModel));
var RectResizeView = /** @class */ (function (_super) {
    __extends(RectResizeView, _super);
    function RectResizeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RectResizeView.prototype.getControlGroup = function () {
        var _a = this.props, model = _a.model, graphModel = _a.graphModel;
        return (core_1.h(ControlGroup_1.default, { model: model, graphModel: graphModel }));
    };
    // getResizeShape绘制图形，功能等同于基础矩形的getShape功能，可以通过复写此方法，进行节点自定义
    RectResizeView.prototype.getResizeShape = function () {
        return _super.prototype.getShape.call(this);
    };
    RectResizeView.prototype.getShape = function () {
        var isSelected = this.props.model.isSelected;
        return (core_1.h("g", null,
            this.getResizeShape(),
            isSelected ? this.getControlGroup() : ''));
    };
    return RectResizeView;
}(core_1.RectNode));
var RectResize = {
    type: 'rect',
    view: RectResizeView,
    model: RectResizeModel,
};
exports.default = RectResize;
