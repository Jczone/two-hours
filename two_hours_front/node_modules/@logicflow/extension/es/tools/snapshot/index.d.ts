/**
 * 快照插件，生成视图
 */
declare class Snapshot {
    static pluginName: string;
    lf: any;
    offsetX: number;
    offsetY: number;
    fileName: string;
    customCssRules: string;
    useGlobalRules: boolean;
    constructor({ lf }: {
        lf: any;
    });
    getSvgRootElement(lf: any): any;
    triggerDownload(imgURI: string): void;
    removeAnchor(element: any): void;
    getSnapshot(fileName: string, backgroundColor: string): void;
    getSnapshotBase64(backgroundColor: string): Promise<unknown>;
    getSnapshotBlob(backgroundColor: string): Promise<unknown>;
    getClassRules(): string;
    getCanvasData(svg: SVGGraphicsElement, backgroundColor: string): Promise<unknown>;
}
export default Snapshot;
export { Snapshot, };
