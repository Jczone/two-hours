import { Component } from 'preact';
import LogicFlow from '../LogicFlow';
export default class Tool {
    tools: Component[];
    components: Component[];
    toolMap: Map<any, any>;
    instance: LogicFlow;
    constructor(instance: LogicFlow);
    private isDisabledTool;
    registerTool(name: any, component: any): void;
    getTools(): any[];
    getInstance(): LogicFlow;
}
