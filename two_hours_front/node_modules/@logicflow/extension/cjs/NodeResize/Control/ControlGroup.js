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
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var Control_1 = require("./Control");
var Rect_1 = require("../BasicShape/Rect");
var ControlGroup = /** @class */ (function (_super) {
    __extends(ControlGroup, _super);
    function ControlGroup() {
        var _this = _super.call(this) || this;
        _this.state = {};
        return _this;
    }
    ControlGroup.prototype.getResizeControl = function () {
        var _a = this.props, model = _a.model, graphModel = _a.graphModel;
        var x = model.x, y = model.y, width = model.width, height = model.height;
        var box = {
            minX: x - width / 2,
            minY: y - height / 2,
            maxX: x + width / 2,
            maxY: y + height / 2,
        };
        var minX = box.minX, minY = box.minY, maxX = box.maxX, maxY = box.maxY;
        var controlList = [
            // 左上角
            {
                x: minX,
                y: minY,
            },
            // 右上角
            {
                x: maxX,
                y: minY,
            },
            // 右下角
            {
                x: maxX,
                y: maxY,
            },
            // 左下角
            {
                x: minX,
                y: maxY,
            },
        ];
        return controlList.map(function (control, index) { return (preact_1.h(Control_1.default, __assign({ index: index }, control, { model: model, graphModel: graphModel }))); });
    };
    // 一般节点被选中了会有outline, 先不用这个
    ControlGroup.prototype.getGroupSolid = function () {
        var model = this.props.model;
        var x = model.x, y = model.y, width = model.width, height = model.height;
        var style = model.getResizeOutlineStyle();
        return (preact_1.h(Rect_1.default, __assign({ fill: "none" }, style, { x: x, y: y, width: width, height: height })));
    };
    ControlGroup.prototype.render = function () {
        return (preact_1.h("g", { className: "lf-resize-control" },
            this.getGroupSolid(),
            this.getResizeControl()));
    };
    return ControlGroup;
}(preact_1.Component));
exports.default = ControlGroup;
