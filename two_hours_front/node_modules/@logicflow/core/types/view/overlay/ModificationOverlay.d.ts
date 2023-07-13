import { h, Component } from 'preact';
import GraphModel from '../../model/GraphModel';
declare type IProps = {
    graphModel: GraphModel;
};
export default class ModificationOverlay extends Component<IProps> {
    render(): h.JSX.Element;
}
export {};
