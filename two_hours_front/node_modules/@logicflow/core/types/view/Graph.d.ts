import { Component, h } from 'preact';
import GraphModel from '../model/GraphModel';
import Tool from '../tool';
import * as Options from '../options';
import DnD from './behavior/DnD';
import BaseEdgeModel from '../model/edge/BaseEdgeModel';
import BaseNodeModel from '../model/node/BaseNodeModel';
import SnaplineModel from '../model/SnaplineModel';
declare type IProps = {
    getView: (type: string) => typeof Component;
    tool: Tool;
    options: Options.Definition;
    dnd: DnD;
    snaplineModel: SnaplineModel;
    graphModel: GraphModel;
};
declare class Graph extends Component<IProps> {
    getComponent(model: BaseEdgeModel | BaseNodeModel, graphModel: GraphModel, overlay?: string): h.JSX.Element;
    render(): h.JSX.Element;
}
export default Graph;
