import { h, Component } from 'preact';
import GraphModel from '../../model/GraphModel';
export declare type GridOptions = {
    /**
     * 网格格子间距
     */
    size?: number;
    /**
     * 网格是否可见
     */
    visible?: boolean;
    graphModel?: GraphModel;
    /**
     * 网格类型
     * 'dot' || 'mesh'
     */
    type?: string;
    config?: {
        color: string;
        thickness?: number;
    };
};
declare type IProps = GridOptions;
export default class Grid extends Component<IProps> {
    readonly id: string;
    renderDot(): h.JSX.Element;
    renderMesh(): h.JSX.Element;
    render(): h.JSX.Element;
}
export {};
