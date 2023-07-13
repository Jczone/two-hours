import { h, Component } from 'preact';
import LogicFlow from '../LogicFlow';
import GraphModel from '../model/GraphModel';
declare type Style = {
    left: number;
    top: number;
};
declare type IProps = {
    graphModel: GraphModel;
    logicFlow: LogicFlow;
};
declare type IState = {
    style: Style;
};
export default class TextEdit extends Component<IProps, IState> {
    static toolName: string;
    ref: import("preact").RefObject<any>;
    __prevText: {
        type: string;
        text: string;
        id: string;
    };
    constructor();
    componentDidMount(): void;
    static getDerivedStateFromProps(props: any): {
        style: any;
    };
    componentDidUpdate(): void;
    keyupHandler: (ev: any) => void;
    inputHandler: (ev: any) => void;
    keydownHandler: (ev: any) => void;
    placeCaretAtEnd(el: any): void;
    render(): h.JSX.Element;
}
export {};
