import { h, Component } from 'preact';
import GraphModel from '../../model/GraphModel';
declare type IProps = {
    graphModel: GraphModel;
    tool: any;
};
export default class ToolOverlay extends Component<IProps> {
    setToolOverlayRef: (element: any) => void;
    /**
     * 外部传入的一般是HTMLElement
     */
    getTools(): any;
    render(): h.JSX.Element;
}
export {};
