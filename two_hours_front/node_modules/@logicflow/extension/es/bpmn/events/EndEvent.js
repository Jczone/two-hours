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
import { CircleNode, CircleNodeModel, h } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';
var EndEventModel = /** @class */ (function (_super) {
    __extends(EndEventModel, _super);
    function EndEventModel(data, graphModel) {
        var _this = this;
        if (!data.id) {
            data.id = "Event_" + getBpmnId();
        }
        if (!data.text) {
            data.text = '';
        }
        if (data.text && typeof data.text === 'string') {
            data.text = {
                value: data.text,
                x: data.x,
                y: data.y + 40,
            };
        }
        _this = _super.call(this, data, graphModel) || this;
        return _this;
    }
    EndEventModel.prototype.setAttributes = function () {
        this.r = 18;
    };
    EndEventModel.prototype.getConnectedSourceRules = function () {
        var rules = _super.prototype.getConnectedSourceRules.call(this);
        var notAsSource = {
            message: '结束节点不能作为边的起点',
            validate: function () { return false; },
        };
        rules.push(notAsSource);
        return rules;
    };
    EndEventModel.extendKey = 'EndEventModel';
    return EndEventModel;
}(CircleNodeModel));
var EndEventView = /** @class */ (function (_super) {
    __extends(EndEventView, _super);
    function EndEventView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndEventView.prototype.getAnchorStyle = function () {
        return {
            visibility: 'hidden',
        };
    };
    EndEventView.prototype.getShape = function () {
        var model = this.props.model;
        var style = model.getNodeStyle();
        var x = model.x, y = model.y, r = model.r;
        var outCircle = _super.prototype.getShape.call(this);
        return h('g', {}, outCircle, h('circle', __assign(__assign({}, style), { cx: x, cy: y, r: r - 5 })));
    };
    EndEventView.extendKey = 'EndEventView';
    return EndEventView;
}(CircleNode));
var EndEvent = {
    type: 'bpmn:endEvent',
    view: EndEventView,
    model: EndEventModel,
};
export { EndEventView, EndEventModel };
export default EndEvent;
