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
exports.UserTaskModel = exports.UserTaskView = void 0;
var core_1 = require("@logicflow/core");
var getBpmnId_1 = require("../getBpmnId");
var UserTaskModel = /** @class */ (function (_super) {
    __extends(UserTaskModel, _super);
    function UserTaskModel(data, graphModel) {
        var _this = this;
        if (!data.id) {
            data.id = "Activity_" + getBpmnId_1.getBpmnId();
        }
        _this = _super.call(this, data, graphModel) || this;
        return _this;
    }
    UserTaskModel.extendKey = 'UserTaskModel';
    return UserTaskModel;
}(core_1.RectNodeModel));
exports.UserTaskModel = UserTaskModel;
var UserTaskView = /** @class */ (function (_super) {
    __extends(UserTaskView, _super);
    function UserTaskView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserTaskView.prototype.getLabelShape = function () {
        var model = this.props.model;
        var x = model.x, y = model.y, width = model.width, height = model.height;
        var style = model.getNodeStyle();
        return core_1.h('svg', {
            x: x - width / 2 + 5,
            y: y - height / 2 + 5,
            width: 25,
            height: 25,
            viewBox: '0 0 1274 1024',
        }, core_1.h('path', {
            fill: style.stroke,
            d: 'M655.807326 287.35973m-223.989415 0a218.879 218.879 0 1 0 447.978829 0 218.879 218.879 0 1 0-447.978829 0ZM1039.955839 895.482975c-0.490184-212.177424-172.287821-384.030443-384.148513-384.030443-211.862739 0-383.660376 171.85302-384.15056 384.030443L1039.955839 895.482975z',
        }));
    };
    UserTaskView.prototype.getShape = function () {
        var model = this.props.model;
        var x = model.x, y = model.y, width = model.width, height = model.height, radius = model.radius;
        var style = model.getNodeStyle();
        // todo: 将basic-shape对外暴露，在这里可以直接用。现在纯手写有点麻烦。
        return core_1.h('g', {}, [
            core_1.h('rect', __assign(__assign({}, style), { x: x - width / 2, y: y - height / 2, rx: radius, ry: radius, width: width,
                height: height })),
            this.getLabelShape(),
        ]);
    };
    UserTaskView.extendKey = 'UserTaskNode';
    return UserTaskView;
}(core_1.RectNode));
exports.UserTaskView = UserTaskView;
var UserTask = {
    type: 'bpmn:userTask',
    view: UserTaskView,
    model: UserTaskModel,
};
exports.default = UserTask;
