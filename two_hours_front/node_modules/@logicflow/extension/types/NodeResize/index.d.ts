import RectResize from './Node/RectResize';
import EllipseResize from './Node/EllipseResize';
import DiamondResize from './Node/DiamondResize';
import HtmlResize from './Node/HtmlResize';
declare const NodeResize: {
    pluginName: string;
    step: number;
    install(lf: any): void;
};
export default NodeResize;
export { NodeResize, RectResize, EllipseResize, DiamondResize, HtmlResize, };
