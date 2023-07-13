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
import { h, PolygonNode, PolygonNodeModel } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';
var ExclusiveGatewayModel = /** @class */ (function (_super) {
    __extends(ExclusiveGatewayModel, _super);
    function ExclusiveGatewayModel(data, graphModel) {
        var _this = this;
        if (!data.id) {
            data.id = "Gateway_" + getBpmnId();
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
        _this.points = [
            [25, 0],
            [50, 25],
            [25, 50],
            [0, 25],
        ];
        return _this;
    }
    ExclusiveGatewayModel.extendKey = 'ExclusiveGatewayModel';
    return ExclusiveGatewayModel;
}(PolygonNodeModel));
var ExclusiveGatewayView = /** @class */ (function (_super) {
    __extends(ExclusiveGatewayView, _super);
    function ExclusiveGatewayView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExclusiveGatewayView.prototype.getShape = function () {
        var model = this.props.model;
        var x = model.x, y = model.y, width = model.width, height = model.height, points = model.points;
        var style = model.getNodeStyle();
        return h('g', {
            transform: "matrix(1 0 0 1 " + (x - width / 2) + " " + (y - height / 2) + ")",
        }, h('polygon', __assign(__assign({}, style), { x: x,
            y: y,
            points: points })), h('path', __assign({ d: 'm 16,15 7.42857142857143,9.714285714285715 -7.42857142857143,9.714285714285715 3.428571428571429,0 5.714285714285715,-7.464228571428572 5.714285714285715,7.464228571428572 3.428571428571429,0 -7.42857142857143,-9.714285714285715 7.42857142857143,-9.714285714285715 -3.428571428571429,0 -5.714285714285715,7.464228571428572 -5.714285714285715,-7.464228571428572 -3.428571428571429,0 z' }, style)));
    };
    ExclusiveGatewayView.extendKey = 'ExclusiveGatewayNode';
    return ExclusiveGatewayView;
}(PolygonNode));
var ExclusiveGateway = {
    type: 'bpmn:exclusiveGateway',
    view: ExclusiveGatewayView,
    model: ExclusiveGatewayModel,
};
export { ExclusiveGatewayView, ExclusiveGatewayModel };
export default ExclusiveGateway;
