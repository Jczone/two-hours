"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@logicflow/core");
function Polygon(_a) {
    var _b = _a.fillOpacity, fillOpacity = _b === void 0 ? 1 : _b, _c = _a.strokeWidth, strokeWidth = _c === void 0 ? 1 : _c, _d = _a.strokeOpacity, strokeOpacity = _d === void 0 ? 1 : _d, _e = _a.fill, fill = _e === void 0 ? 'transparent' : _e, _f = _a.stroke, stroke = _f === void 0 ? '#000' : _f, points = _a.points, _g = _a.className, className = _g === void 0 ? 'lf-basic-shape' : _g;
    var attrs = {
        fill: fill,
        fillOpacity: fillOpacity,
        strokeWidth: strokeWidth,
        stroke: stroke,
        strokeOpacity: strokeOpacity,
        points: '',
        className: className,
    };
    attrs.points = points.map(function (point) { return point.join(','); }).join(' ');
    return (core_1.h("polygon", __assign({}, attrs)));
}
exports.default = Polygon;
