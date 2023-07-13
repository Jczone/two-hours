import LogicFlow from '../../LogicFlow';
import { BaseNodeModel } from '../../model';
import { TextConfig } from '../../type';
export declare type NewNodeConfig = {
    type: string;
    text?: TextConfig | string;
    properties?: Record<string, unknown>;
    [key: string]: any;
};
export default class Dnd {
    nodeConfig: NewNodeConfig;
    lf: LogicFlow;
    fakerNode: BaseNodeModel;
    constructor(params: any);
    clientToLocalPoint({ x, y }: {
        x: any;
        y: any;
    }): {
        x: number;
        y: number;
    };
    startDrag(nodeConfig: NewNodeConfig): void;
    stopDrag: () => void;
    dragEnter: (e: any) => void;
    onDragOver: (e: any) => boolean;
    onDragLeave: () => void;
    onDrop: (e: any) => void;
    eventMap(): {
        onMouseEnter: (e: any) => void;
        onMouseOver: (e: any) => void;
        onMouseMove: (e: any) => boolean;
        onMouseLeave: () => void;
        onMouseUp: (e: any) => void;
    };
}
