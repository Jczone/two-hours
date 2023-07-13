"use strict";
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
exports.ContextMenu = void 0;
var COMMON_TYPE_KEY = 'menu-common';
var NEXT_X_DISTANCE = 200;
var NEXT_Y_DISTANCE = 100;
var ContextMenu = /** @class */ (function () {
    function ContextMenu(_a) {
        var _this = this;
        var lf = _a.lf;
        this.menuTypeMap = new Map();
        this.listenDelete = function () {
            _this.hideContextMenu();
        };
        this.lf = lf;
        this.__menuDOM = document.createElement('div');
        this.__menuDOM.className = 'lf-inner-context';
        this.menuTypeMap.set(COMMON_TYPE_KEY, []);
        this.lf.setContextMenuByType = function (type, menus) {
            _this.setContextMenuByType(type, menus);
        };
        this.lf.setContextMenuItems = function (menus) {
            _this.setContextMenuItems(menus);
        };
        this.lf.showContextMenu = function (data) {
            _this.showContextMenu(data);
        };
        this.lf.hideContextMenu = function () {
            _this.hideContextMenu();
        };
    }
    ContextMenu.prototype.render = function (lf, container) {
        var _this = this;
        this.container = container;
        lf.on('node:click', function (_a) {
            var data = _a.data;
            _this._activeData = data;
            _this.createContextMenu();
        });
        lf.on('edge:click', function (_a) {
            var data = _a.data;
            // 获取右上角坐标
            _this._activeData = data;
            _this.createContextMenu();
        });
        lf.on('blank:click', function () {
            _this.hideContextMenu();
        });
    };
    ContextMenu.prototype.setContextMenuByType = function (type, menus) {
        this.menuTypeMap.set(type, menus);
    };
    /**
     * 隐藏菜单
     */
    ContextMenu.prototype.hideContextMenu = function () {
        this.__menuDOM.innerHTML = '';
        this.__menuDOM.style.display = 'none';
        if (this.isShow) {
            this.container.removeChild(this.__menuDOM);
        }
        this.lf.off('node:delete,edge:delete,node:drag,graph:transform', this.listenDelete);
        this.isShow = false;
    };
    /**
     * 显示指定元素菜单
     * @param data 节点id、节点类型、菜单位置
     */
    ContextMenu.prototype.showContextMenu = function (data) {
        if (!data || !data.id) {
            console.warn('请检查传入的参数');
            return;
        }
        this._activeData = data;
        this.createContextMenu();
    };
    ContextMenu.prototype.setContextMenuItems = function (menus) {
        this.menuTypeMap.set(COMMON_TYPE_KEY, menus);
    };
    /**
     * 获取新菜单位置
     */
    ContextMenu.prototype.getContextMenuPosition = function () {
        var data = this._activeData;
        var Model = this.lf.graphModel.getElement(data.id);
        if (!Model) {
            console.warn("\u627E\u4E0D\u5230\u5143\u7D20" + data.id);
            return;
        }
        var x;
        var y;
        if (Model.BaseType === 'edge') {
            x = Number.MIN_SAFE_INTEGER;
            y = Number.MAX_SAFE_INTEGER;
            var edgeData = Model.getData();
            x = Math.max(edgeData.startPoint.x, x);
            y = Math.min(edgeData.startPoint.y, y);
            x = Math.max(edgeData.endPoint.x, x);
            y = Math.min(edgeData.endPoint.y, y);
            if (edgeData.pointsList) {
                edgeData.pointsList.forEach(function (point) {
                    x = Math.max(point.x, x);
                    y = Math.min(point.y, y);
                });
            }
        }
        if (Model.BaseType === 'node') {
            x = data.x + Model.width / 2;
            y = data.y - Model.height / 2;
        }
        return this.lf.graphModel.transformModel.CanvasPointToHtmlPoint([x, y]);
    };
    ContextMenu.prototype.createContextMenu = function () {
        var _this = this;
        var isSilentMode = this.lf.options.isSilentMode;
        // 静默模式不显示菜单
        if (isSilentMode) {
            return;
        }
        var items = this.menuTypeMap.get(this._activeData.type) || [];
        items = items.concat(this.menuTypeMap.get(COMMON_TYPE_KEY));
        var menus = document.createDocumentFragment();
        items.forEach(function (item) {
            var menuItem = document.createElement('div');
            menuItem.className = 'lf-context-item';
            var img = document.createElement('img');
            img.src = item.icon;
            img.className = 'lf-context-img';
            if (item.className) {
                menuItem.className = menuItem.className + " " + item.className;
            }
            img.addEventListener('click', function () {
                _this.hideContextMenu();
                if (item.callback) {
                    item.callback(_this._activeData);
                }
                else {
                    _this.addNode({
                        sourceId: _this._activeData.id,
                        x: _this._activeData.x,
                        y: _this._activeData.y,
                        properties: item.properties,
                        type: item.type,
                    });
                }
            });
            menuItem.appendChild(img);
            menus.appendChild(menuItem);
        });
        this.__menuDOM.innerHTML = '';
        this.__menuDOM.appendChild(menus);
        this.showMenu();
    };
    ContextMenu.prototype.addNode = function (node, y) {
        var isDeep = y !== undefined;
        if (y === undefined) {
            y = node.y;
        }
        var nodeModel = this.lf.getNodeModelById(node.sourceId);
        var leftTopX = node.x - nodeModel.width + NEXT_X_DISTANCE;
        var leftTopY = y - node.y / 2 - 20;
        var rightBottomX = node.x + nodeModel.width + NEXT_X_DISTANCE;
        var rightBottomY = y + node.y / 2 + 20;
        var exsitElements = this.lf.getAreaElement([leftTopX, leftTopY], [rightBottomX, rightBottomY]);
        if (exsitElements.length) {
            y = y + NEXT_Y_DISTANCE;
            this.addNode(node, y);
            return;
        }
        var newNode = this.lf.addNode({
            type: node.type,
            x: node.x + 200,
            y: y,
            properties: node.properties,
        });
        var startPoint;
        var endPoint;
        if (isDeep) {
            startPoint = {
                x: node.x,
                y: node.y + nodeModel.height / 2,
            };
            endPoint = {
                x: newNode.x - newNode.width / 2,
                y: newNode.y,
            };
        }
        this.lf.addEdge({
            sourceNodeId: node.sourceId,
            targetNodeId: newNode.id,
            startPoint: startPoint,
            endPoint: endPoint,
        });
    };
    ContextMenu.prototype.showMenu = function () {
        var _a = __read(this.getContextMenuPosition(), 2), x = _a[0], y = _a[1];
        this.__menuDOM.style.display = 'flex';
        this.__menuDOM.style.top = y + "px";
        this.__menuDOM.style.left = x + 10 + "px";
        this.container.appendChild(this.__menuDOM);
        // 菜单显示的时候，监听删除，同时隐藏
        !this.isShow && this.lf.on('node:delete,edge:delete,node:drag,graph:transform', this.listenDelete);
        this.isShow = true;
    };
    ContextMenu.pluginName = 'contextMenu';
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;
exports.default = ContextMenu;
