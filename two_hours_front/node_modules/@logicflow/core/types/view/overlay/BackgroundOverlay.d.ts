import { h, Component } from 'preact';
/**
 * 背景配置, 支持css属性配置
 * https://developer.mozilla.org/zh-CN/docs/Web/CSS/background
 * @example
 * {
 *  backgroundImage: "url('./img/grid.svg')",
    backgroundRepeat: 'repeat',
 * }
 */
export declare type BackgroundConfig = {
    /**
     * 背景图片地址
     */
    backgroundImage?: string;
    /**
     * 是否重复
     */
    backgroundRepeat?: string;
    [key: string]: any;
};
declare type IProps = {
    background: BackgroundConfig;
};
export default class BackgroundOverlay extends Component<IProps> {
    render(): h.JSX.Element;
}
export {};
