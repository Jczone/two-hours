import EventEmitter from '../event/eventEmitter';
import BaseEdgeModel from '../model/edge/BaseEdgeModel';
import BaseNodeModel from '../model/node/BaseNodeModel';
declare function createDrag({ onDragStart, onDraging, onDragEnd, step, isStopPropagation, }: {
    onDragStart?: (...args: any[]) => void;
    onDraging?: (...args: any[]) => void;
    onDragEnd?: (...args: any[]) => void;
    step?: number;
    isStopPropagation?: boolean;
}): (e: MouseEvent) => void;
declare class StepDrag {
    onDragStart: Function;
    onDraging: Function;
    onDragEnd: Function;
    step: number;
    isStopPropagation: boolean;
    isDraging: boolean;
    isStartDraging: boolean;
    startX: number;
    startY: number;
    sumDeltaX: number;
    sumDeltaY: number;
    eventType: string;
    eventCenter: EventEmitter | null;
    model?: BaseNodeModel | BaseEdgeModel;
    startTime?: number;
    isGrag: boolean;
    constructor({ onDragStart, onDraging, onDragEnd, eventType, eventCenter, step, isStopPropagation, model, }: {
        onDragStart?: (...args: any[]) => void;
        onDraging?: (...args: any[]) => void;
        onDragEnd?: (...args: any[]) => void;
        eventType?: string;
        eventCenter?: any;
        step?: number;
        isStopPropagation?: boolean;
        model?: any;
    });
    setStep(step: number): void;
    handleMouseDown: (e: MouseEvent) => void;
    handleMouseMove: (e: MouseEvent) => void;
    handleMouseUp: (e: MouseEvent) => void;
    cancelDrag: () => void;
}
export { createDrag, StepDrag, };
