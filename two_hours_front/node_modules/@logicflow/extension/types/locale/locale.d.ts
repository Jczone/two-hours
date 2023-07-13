export declare class Locale {
    constructor(LogicFlow?: any, map?: Object);
    replaceTranslator(LogicFlow: any, map: Object): void;
    setDefault(LogicFlow: any): void;
    static defaultTranslator: (text: string) => string;
}
