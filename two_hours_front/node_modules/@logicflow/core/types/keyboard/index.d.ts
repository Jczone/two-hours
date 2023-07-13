import { MousetrapInstance } from 'mousetrap';
import LogicFlow from '../LogicFlow';
export declare type Action = 'keypress' | 'keydown' | 'keyup';
export declare type Handler = (e: KeyboardEvent) => void;
export interface KeyboardDef {
    enabled: boolean;
    shortcuts?: Array<{
        keys: string | string[];
        callback: Handler;
        action?: Action;
    }>;
}
export interface Options {
    lf: LogicFlow;
    keyboard?: KeyboardDef;
}
declare class Keyboard {
    readonly mousetrap: MousetrapInstance;
    options: Options;
    private target;
    constructor(options: Options);
    initShortcuts(): void;
    on(keys: string | string[], callback: Handler, action?: Action): void;
    get disabled(): boolean;
    off(keys: string | string[], action?: Action): void;
    enable(force: boolean): void;
    disable(): void;
    private getKeys;
    protected formatkey(key: string): string;
}
export { Keyboard };
export default Keyboard;
