import EventEmitter from '../event/eventEmitter';
declare class History {
    undos: any[];
    redos: any[];
    callbacks: any[];
    stopWatch: any;
    curData: any;
    maxSize: number;
    waitTime: number;
    eventCenter: EventEmitter;
    constructor(eventCenter: any);
    add(data: any): void;
    undoAble(): boolean;
    undo(): any;
    redoAble(): boolean;
    redo(): any;
    watch(model: any): void;
}
export { History };
export default History;
