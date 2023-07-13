import { h, Component } from 'preact';
import { BaseNodeModel, GraphModel } from '@logicflow/core';
interface IProps {
    model: BaseNodeModel;
    graphModel: GraphModel;
}
declare class ControlGroup extends Component<IProps> {
    constructor();
    getResizeControl(): h.JSX.Element[];
    getGroupSolid(): h.JSX.Element;
    render(): h.JSX.Element;
}
export default ControlGroup;
