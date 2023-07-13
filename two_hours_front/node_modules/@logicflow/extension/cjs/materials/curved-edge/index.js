"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurvedEdge = void 0;
var core_1 = require("@logicflow/core");
var CurvedEdgeView = /** @class */ (function (_super) {
    __extends(CurvedEdgeView, _super);
    function CurvedEdgeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CurvedEdgeView.prototype.getEdge = function () {
        var _a = this.props.model.getEdgeStyle(), strokeWidth = _a.strokeWidth, stroke = _a.stroke, strokeDashArray = _a.strokeDashArray;
        var points = this.props.model.points;
        var points2 = points.split(' ').map(function (p) { return p.split(',').map(function (a) { return Number(a); }); });
        var _b = __read(points2[0], 2), startX = _b[0], startY = _b[1];
        var d = "M" + startX + " " + startY;
        // 1) 如果一个点不为开始和结束，则在这个点的前后增加弧度开始和结束点。
        // 2) 判断这个点与前一个点的坐标
        //    如果x相同则前一个点的x也不变，
        //    y为（这个点的y 大于前一个点的y, 则 为 这个点的y - 5；小于前一个点的y, 则为这个点的y+5）
        //    同理，判断这个点与后一个点的x,y是否相同，如果x相同，则y进行加减，如果y相同，则x进行加减
        // todo: 好丑，看看怎么优化下
        var space = 5;
        for (var i = 1; i < points2.length - 1; i++) {
            var _c = __read(points2[i - 1], 2), preX = _c[0], preY = _c[1];
            var _d = __read(points2[i], 2), currentX = _d[0], currentY = _d[1];
            var _e = __read(points2[i + 1], 2), nextX = _e[0], nextY = _e[1];
            if (currentX === preX && currentY !== preY) {
                var y = currentY > preY ? currentY - space : currentY + space;
                d = d + " L " + currentX + " " + y;
            }
            if (currentY === preY && currentX !== preX) {
                var x = currentX > preX ? currentX - space : currentX + space;
                d = d + " L " + x + " " + currentY;
            }
            d = d + " Q " + currentX + " " + currentY;
            if (currentX === nextX && currentY !== nextY) {
                var y = currentY > nextY ? currentY - space : currentY + space;
                d = d + " " + currentX + " " + y;
            }
            if (currentY === nextY && currentX !== nextX) {
                var x = currentX > nextX ? currentX - space : currentX + space;
                d = d + " " + x + " " + currentY;
            }
        }
        var _f = __read(points2[points2.length - 1], 2), endX = _f[0], endY = _f[1];
        d = d + " L " + endX + " " + endY;
        return core_1.h('path', {
            d: d,
            strokeWidth: strokeWidth,
            stroke: stroke,
            fill: 'none',
            strokeDashArray: strokeDashArray,
        });
    };
    CurvedEdgeView.extendKey = 'curvedEdge';
    return CurvedEdgeView;
}(core_1.PolylineEdge));
var CurvedEdgeModel = /** @class */ (function (_super) {
    __extends(CurvedEdgeModel, _super);
    function CurvedEdgeModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CurvedEdgeModel;
}(core_1.PolylineEdgeModel));
var CurvedEdge = {
    pluginName: 'curved-edge',
    curvedSpace: 5,
    init: function (_a) {
        var curvedSpace = _a.curvedSpace;
        CurvedEdge.curvedSpace = curvedSpace;
    },
    install: function (lf) {
        lf.register({
            type: 'curved-edge',
            view: CurvedEdgeView,
            model: CurvedEdgeModel,
        });
    },
};
exports.CurvedEdge = CurvedEdge;
exports.default = CurvedEdge;
