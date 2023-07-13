import { h, Component } from 'preact';
import LogicFlow from '../LogicFlow';
import GraphModel from '../model/GraphModel';
declare type IProps = {
    graphModel: GraphModel;
    logicFlow: LogicFlow;
};
export default class MultipleSelect extends Component<IProps> {
    static toolName: string;
    stepDrag: any;
    constructor(props: any);
    handleMouseDown: (ev: MouseEvent) => void;
    onDraging: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    handleContextMenu: (ev: MouseEvent) => void;
    render(): h.JSX.Element;
}
export {};
