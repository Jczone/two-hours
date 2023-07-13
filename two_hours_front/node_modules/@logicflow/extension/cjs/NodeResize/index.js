"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlResize = exports.DiamondResize = exports.EllipseResize = exports.RectResize = exports.NodeResize = void 0;
var RectResize_1 = require("./Node/RectResize");
exports.RectResize = RectResize_1.default;
var EllipseResize_1 = require("./Node/EllipseResize");
exports.EllipseResize = EllipseResize_1.default;
var DiamondResize_1 = require("./Node/DiamondResize");
exports.DiamondResize = DiamondResize_1.default;
var HtmlResize_1 = require("./Node/HtmlResize");
exports.HtmlResize = HtmlResize_1.default;
var NodeResize = {
    pluginName: 'nodeResize',
    // 拖动step
    step: 0,
    install: function (lf) {
        lf.register({
            type: RectResize_1.default.type,
            view: RectResize_1.default.view,
            model: RectResize_1.default.model,
        });
        lf.register({
            type: EllipseResize_1.default.type,
            view: EllipseResize_1.default.view,
            model: EllipseResize_1.default.model,
        });
        lf.register({
            type: DiamondResize_1.default.type,
            view: DiamondResize_1.default.view,
            model: DiamondResize_1.default.model,
        });
        lf.register({
            type: HtmlResize_1.default.type,
            view: HtmlResize_1.default.view,
            model: HtmlResize_1.default.model,
        });
    },
};
exports.NodeResize = NodeResize;
exports.default = NodeResize;
