import { h } from 'preact';
import BaseText from './BaseText';
export default class LineText extends BaseText {
    constructor(config: any);
    getBackgroud(): h.JSX.Element;
    setHoverON: () => void;
    setHoverOFF: () => void;
    getShape(): h.JSX.Element;
}
