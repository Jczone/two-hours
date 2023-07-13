import { h } from 'preact';
import * as type from '../../type';
declare type IProps = {
    className?: string;
    radius?: number;
} & type.Point & type.Size;
declare function Rect(props: IProps): h.JSX.Element;
declare namespace Rect {
    var defaultProps: {
        className: string;
        radius: string;
    };
}
export default Rect;
