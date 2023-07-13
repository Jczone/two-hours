var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { h } from '@logicflow/core';
// TODO: 默认样式引入
export default function Rect(props) {
    var x = props.x, y = props.y, width = props.width, height = props.height, radius = props.radius, className = props.className;
    var leftTopX = x - width / 2;
    var leftTopY = y - height / 2;
    var attrs = __assign(__assign({ 
        // default
        width: 10, height: 10, cx: 0, cy: 0, rx: radius || 0, ry: radius || 0, fill: 'transparent', fillOpacity: 1, strokeWidth: '1px', stroke: '#000', strokeOpacity: 1, className: "lf-basic-shape " + className }, props), { x: leftTopX, y: leftTopY });
    return (h("rect", __assign({}, attrs)));
}
Rect.defaultProps = {
    radius: 0,
    stroke: '',
    strokeDasharray: '',
    className: '',
};
