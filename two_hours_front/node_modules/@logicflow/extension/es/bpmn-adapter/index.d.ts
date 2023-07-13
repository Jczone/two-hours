declare const BpmnAdapter: {
    pluginName: string;
    install(lf: any): void;
    shapeConfigMap: Map<any, any>;
    setCustomShape(key: any, val: any): void;
    adapterOut(data: any): {
        'bpmn:definitions': {
            '-id': string;
            '-xmlns:xsi': string;
            '-xmlns:bpmn': string;
            '-xmlns:bpmndi': string;
            '-xmlns:dc': string;
            '-xmlns:di': string;
            '-targetNamespace': string;
            '-exporter': string;
            '-exporterVersion': string;
            'bpmn:process': {
                '-id': string;
                '-isExecutable': string;
            };
            'bpmndi:BPMNDiagram': {
                '-id': string;
                'bpmndi:BPMNPlane': {
                    '-id': string;
                    '-bpmnElement': string;
                };
            };
        };
    };
    adapterIn(bpmnData: any): {
        nodes: any[];
        edges: any[];
    };
};
declare const BpmnXmlAdapter: {
    pluginName: string;
    install(lf: any): void;
    adapterXmlIn(bpmnData: any): {
        nodes: any[];
        edges: any[];
    };
    adapterXmlOut(data: any): string;
};
export { BpmnAdapter, BpmnXmlAdapter, };
export default BpmnAdapter;
