import { h, Point, Size } from '@logicflow/core';
declare type IProps = {
    className?: string;
    radius?: number;
    stroke?: string;
    strokeDasharray?: string;
} & Point & Size;
declare function Rect(props: IProps): h.JSX.Element;
declare namespace Rect {
    var defaultProps: {
        radius: number;
        stroke: string;
        strokeDasharray: string;
        className: string;
    };
}
export default Rect;
