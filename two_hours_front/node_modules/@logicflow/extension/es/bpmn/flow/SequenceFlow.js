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
import { PolylineEdge, PolylineEdgeModel } from '@logicflow/core';
import { getBpmnId } from '../getBpmnId';
var SequenceFlowModel = /** @class */ (function (_super) {
    __extends(SequenceFlowModel, _super);
    function SequenceFlowModel(data, graphModel) {
        var _this = this;
        if (!data.id) {
            data.id = "Flow_" + getBpmnId();
        }
        _this = _super.call(this, data, graphModel) || this;
        return _this;
    }
    SequenceFlowModel.extendKey = 'SequenceFlowModel';
    return SequenceFlowModel;
}(PolylineEdgeModel));
var SequenceFlowView = /** @class */ (function (_super) {
    __extends(SequenceFlowView, _super);
    function SequenceFlowView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SequenceFlowView.extendKey = 'SequenceFlowEdge';
    return SequenceFlowView;
}(PolylineEdge));
var SequenceFlow = {
    type: 'bpmn:sequenceFlow',
    view: SequenceFlowView,
    model: SequenceFlowModel,
};
export { SequenceFlowView, SequenceFlowModel };
export default SequenceFlow;
