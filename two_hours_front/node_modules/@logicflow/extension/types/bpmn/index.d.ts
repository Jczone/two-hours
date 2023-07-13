import { StartEventModel, StartEventView } from './events/StartEvent';
import { EndEventView, EndEventModel } from './events/EndEvent';
import { ExclusiveGatewayView, ExclusiveGatewayModel } from './gateways/ExclusiveGateway';
import { UserTaskView, UserTaskModel } from './tasks/UserTask';
import { ServiceTaskView, ServiceTaskModel } from './tasks/ServiceTask';
import { SequenceFlowView, SequenceFlowModel } from './flow/SequenceFlow';
declare class BpmnElement {
    static pluginName: string;
    constructor({ lf }: {
        lf: any;
    });
}
export { BpmnElement, StartEventModel, StartEventView, EndEventView, EndEventModel, ExclusiveGatewayView, ExclusiveGatewayModel, UserTaskView, UserTaskModel, ServiceTaskView, ServiceTaskModel, SequenceFlowView, SequenceFlowModel, };
