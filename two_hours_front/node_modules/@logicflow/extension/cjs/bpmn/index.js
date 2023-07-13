"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceFlowModel = exports.SequenceFlowView = exports.ServiceTaskModel = exports.ServiceTaskView = exports.UserTaskModel = exports.UserTaskView = exports.ExclusiveGatewayModel = exports.ExclusiveGatewayView = exports.EndEventModel = exports.EndEventView = exports.StartEventView = exports.StartEventModel = exports.BpmnElement = void 0;
// import LogicFlow from '@logicflow/core';
var StartEvent_1 = require("./events/StartEvent");
Object.defineProperty(exports, "StartEventModel", { enumerable: true, get: function () { return StartEvent_1.StartEventModel; } });
Object.defineProperty(exports, "StartEventView", { enumerable: true, get: function () { return StartEvent_1.StartEventView; } });
var EndEvent_1 = require("./events/EndEvent");
Object.defineProperty(exports, "EndEventView", { enumerable: true, get: function () { return EndEvent_1.EndEventView; } });
Object.defineProperty(exports, "EndEventModel", { enumerable: true, get: function () { return EndEvent_1.EndEventModel; } });
var ExclusiveGateway_1 = require("./gateways/ExclusiveGateway");
Object.defineProperty(exports, "ExclusiveGatewayView", { enumerable: true, get: function () { return ExclusiveGateway_1.ExclusiveGatewayView; } });
Object.defineProperty(exports, "ExclusiveGatewayModel", { enumerable: true, get: function () { return ExclusiveGateway_1.ExclusiveGatewayModel; } });
var UserTask_1 = require("./tasks/UserTask");
Object.defineProperty(exports, "UserTaskView", { enumerable: true, get: function () { return UserTask_1.UserTaskView; } });
Object.defineProperty(exports, "UserTaskModel", { enumerable: true, get: function () { return UserTask_1.UserTaskModel; } });
var ServiceTask_1 = require("./tasks/ServiceTask");
Object.defineProperty(exports, "ServiceTaskView", { enumerable: true, get: function () { return ServiceTask_1.ServiceTaskView; } });
Object.defineProperty(exports, "ServiceTaskModel", { enumerable: true, get: function () { return ServiceTask_1.ServiceTaskModel; } });
var SequenceFlow_1 = require("./flow/SequenceFlow");
Object.defineProperty(exports, "SequenceFlowView", { enumerable: true, get: function () { return SequenceFlow_1.SequenceFlowView; } });
Object.defineProperty(exports, "SequenceFlowModel", { enumerable: true, get: function () { return SequenceFlow_1.SequenceFlowModel; } });
var constant_1 = require("./constant");
// todo: name
var BpmnElement = /** @class */ (function () {
    function BpmnElement(_a) {
        var lf = _a.lf;
        lf.setTheme(constant_1.theme);
        lf.register(StartEvent_1.default);
        lf.register(EndEvent_1.default);
        lf.register(ExclusiveGateway_1.default);
        lf.register(UserTask_1.default);
        lf.register(ServiceTask_1.default);
        // 支持自定义bpmn元素的边
        if (!lf.options.customBpmnEdge) {
            lf.register(SequenceFlow_1.default);
            lf.setDefaultEdgeType('bpmn:sequenceFlow');
        }
    }
    BpmnElement.pluginName = 'bpmnElement';
    return BpmnElement;
}());
exports.BpmnElement = BpmnElement;
