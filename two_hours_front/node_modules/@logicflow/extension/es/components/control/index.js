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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var Control = /** @class */ (function () {
    function Control(_a) {
        var _this = this;
        var lf = _a.lf;
        this.controlItems = [
            {
                key: 'zoom-out',
                iconClass: 'lf-control-zoomOut',
                title: '缩小流程图',
                text: '缩小',
                onClick: function () {
                    _this.lf.zoom(false);
                },
            },
            {
                key: 'zoom-in',
                iconClass: 'lf-control-zoomIn',
                title: '放大流程图',
                text: '放大',
                onClick: function () {
                    _this.lf.zoom(true);
                },
            },
            {
                key: 'reset',
                iconClass: 'lf-control-fit',
                title: '恢复流程原有尺寸',
                text: '适应',
                onClick: function () {
                    _this.lf.resetZoom();
                },
            },
            {
                key: 'undo',
                iconClass: 'lf-control-undo',
                title: '回到上一步',
                text: '上一步',
                onClick: function () {
                    _this.lf.undo();
                },
            },
            {
                key: 'redo',
                iconClass: 'lf-control-redo',
                title: '移到下一步',
                text: '下一步',
                onClick: function () {
                    _this.lf.redo();
                },
            },
        ];
        this.lf = lf;
    }
    Control.prototype.render = function (lf, domContainer) {
        this.destroy();
        var toolEl = this.getControlTool();
        this.toolEl = toolEl;
        domContainer.appendChild(toolEl);
        this.domContainer = domContainer;
    };
    Control.prototype.destroy = function () {
        if (this.domContainer && this.toolEl && this.domContainer.contains(this.toolEl)) {
            this.domContainer.removeChild(this.toolEl);
        }
    };
    Control.prototype.addItem = function (item) {
        this.controlItems.push(item);
    };
    Control.prototype.removeItem = function (key) {
        var index = this.controlItems.findIndex(function (item) { return item.key === key; });
        return this.controlItems.splice(index, 1)[0];
    };
    Control.prototype.getControlTool = function () {
        var _this = this;
        var NORMAL = 'lf-control-item';
        var DISABLED = 'lf-control-item disabled';
        var controlTool = document.createElement('div');
        var controlElements = [];
        controlTool.className = 'lf-control';
        this.controlItems.forEach(function (item) {
            var itemContainer = document.createElement('div');
            var icon = document.createElement('i');
            var text = document.createElement('span');
            itemContainer.className = DISABLED;
            item.onClick && (itemContainer.onclick = item.onClick.bind(null, _this.lf));
            item.onMouseEnter && (itemContainer.onmouseenter = item.onMouseEnter.bind(null, _this.lf));
            item.onMouseLeave && (itemContainer.onmouseleave = item.onMouseLeave.bind(null, _this.lf));
            icon.className = item.iconClass;
            text.className = 'lf-control-text';
            text.title = item.title;
            text.innerText = item.text;
            itemContainer.append(icon, text);
            switch (item.text) {
                case '上一步':
                    _this.lf.on('history:change', function (_a) {
                        var undoAble = _a.data.undoAble;
                        itemContainer.className = undoAble ? NORMAL : DISABLED;
                    });
                    break;
                case '下一步':
                    _this.lf.on('history:change', function (_a) {
                        var redoAble = _a.data.redoAble;
                        itemContainer.className = redoAble ? NORMAL : DISABLED;
                    });
                    break;
                default:
                    itemContainer.className = NORMAL;
                    break;
            }
            controlElements.push(itemContainer);
        });
        controlTool.append.apply(controlTool, __spread(controlElements));
        return controlTool;
    };
    Control.pluginName = 'control';
    return Control;
}());
export default Control;
export { Control };
