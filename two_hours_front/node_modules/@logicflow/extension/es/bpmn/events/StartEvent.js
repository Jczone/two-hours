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
import { CircleNode, CircleNodeModel } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';
var StartEventModel = /** @class */ (function (_super) {
    __extends(StartEventModel, _super);
    function StartEventModel(data, graphModel) {
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
        // fix: 不能直接全部加，会导致下载后再次上传，位置错误。
        // data.text.y += 40;
        _this = _super.call(this, data, graphModel) || this;
        return _this;
    }
    StartEventModel.prototype.setAttributes = function () {
        this.r = 18;
    };
    StartEventModel.prototype.getConnectedTargetRules = function () {
        var rules = _super.prototype.getConnectedTargetRules.call(this);
        var notAsTarget = {
            message: '起始节点不能作为边的终点',
            validate: function () { return false; },
        };
        rules.push(notAsTarget);
        return rules;
    };
    StartEventModel.extendKey = 'StartEventModel';
    return StartEventModel;
}(CircleNodeModel));
var StartEventView = /** @class */ (function (_super) {
    __extends(StartEventView, _super);
    function StartEventView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartEventView.extendKey = 'StartEventNode';
    return StartEventView;
}(CircleNode));
var StartEvent = {
    type: 'bpmn:startEvent',
    view: StartEventView,
    model: StartEventModel,
};
export { StartEventModel, StartEventView };
export default StartEvent;
