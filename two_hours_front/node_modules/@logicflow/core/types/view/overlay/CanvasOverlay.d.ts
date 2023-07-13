import { h, Component } from 'preact';
import GraphModel from '../../model/GraphModel';
import { StepDrag } from '../../util/drag';
import Dnd from '../behavior/DnD';
declare type IProps = {
    graphModel: GraphModel;
    dnd: Dnd;
};
declare type Istate = {
    isDraging: boolean;
};
declare class CanvasOverlay extends Component<IProps, Istate> {
    stepDrag: StepDrag;
    stepScrollX: number;
    stepScrollY: number;
    constructor(props: IProps);
    onDraging: ({ deltaX, deltaY }: {
        deltaX: any;
        deltaY: any;
    }) => void;
    onDragEnd: () => void;
    zoomHandler: (ev: WheelEvent) => void;
    clickHandler: (ev: MouseEvent) => void;
    handleContextMenu: (ev: MouseEvent) => void;
    mouseDownHandler: (ev: MouseEvent) => void;
    render(): h.JSX.Element;
}
export default CanvasOverlay;
