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
var DefalutNodeMenuKey = 'lf:defaultNodeMenu';
var DefalutEdgeMenuKey = 'lf:defaultEdgeMenu';
var DefalutGraphMenuKey = 'lf:defaultGraphMenu';
var DefalutSelectionMenuKey = 'lf:defaultSelectionMenu';
var Menu = /** @class */ (function () {
    function Menu(_a) {
        var _this = this;
        var lf = _a.lf;
        this.__menuDOM = document.createElement('ul');
        this.lf = lf;
        this.menuTypeMap = new Map();
        this.init();
        this.lf.setMenuConfig = function (config) {
            _this.setMenuConfig(config);
        };
        this.lf.addMenuConfig = function (config) {
            _this.addMenuConfig(config);
        };
        this.lf.setMenuByType = function (config) {
            _this.setMenuByType(config);
        };
    }
    /**
     * 初始化设置默认内置菜单栏
     */
    Menu.prototype.init = function () {
        var _this = this;
        var defalutNodeMenu = [
            {
                text: '删除',
                callback: function (node) {
                    _this.lf.deleteNode(node.id);
                },
            },
            {
                text: '编辑文本',
                callback: function (node) {
                    _this.lf.graphModel.editText(node.id);
                },
            },
            {
                text: '复制',
                callback: function (node) {
                    _this.lf.cloneNode(node.id);
                },
            },
        ];
        this.menuTypeMap.set(DefalutNodeMenuKey, defalutNodeMenu);
        var defaultEdgeMenu = [
            {
                text: '删除',
                callback: function (edge) {
                    _this.lf.deleteEdge(edge.id);
                },
            },
            {
                text: '编辑文本',
                callback: function (edge) {
                    _this.lf.graphModel.editText(edge.id);
                },
            },
        ];
        this.menuTypeMap.set(DefalutEdgeMenuKey, defaultEdgeMenu);
        this.menuTypeMap.set(DefalutGraphMenuKey, []);
        var DefalutSelectionMenu = [
            {
                text: '删除',
                callback: function (elements) {
                    _this.lf.clearSelectElements();
                    elements.edges.forEach(function (edge) { return _this.lf.deleteEdge(edge.id); });
                    elements.nodes.forEach(function (node) { return _this.lf.deleteNode(node.id); });
                },
            },
        ];
        this.menuTypeMap.set(DefalutSelectionMenuKey, DefalutSelectionMenu);
    };
    Menu.prototype.render = function (lf, container) {
        var _this = this;
        this.__container = container;
        this.__currentData = null; // 当前展示的菜单所属元素的model数据
        this.__menuDOM.className = 'lf-menu';
        container.appendChild(this.__menuDOM);
        // 将选项的click事件委托至menu容器
        // 在捕获阶段拦截并执行
        this.__menuDOM.addEventListener('click', function (event) {
            event.stopPropagation();
            var target = event.target;
            // 菜单有多层dom，需要精确获取菜单项所对应的dom
            // 除菜单项dom外，应考虑两种情况
            // 1. 菜单项的子元素 2. 菜单外层容器
            while (Array.from(target.classList).indexOf('lf-menu-item') === -1 && Array.from(target.classList).indexOf('lf-menu') === -1) {
                target = target.parentElement;
            }
            if (Array.from(target.classList).indexOf('lf-menu-item') > -1) {
                // 如果点击区域在菜单项内
                target.onclickCallback(_this.__currentData);
                // 点击后隐藏menu
                _this.__menuDOM.style.display = 'none';
                _this.__currentData = null;
            }
            else {
                // 如果点击区域不在菜单项内
                console.warn('点击区域不在菜单项内，请检查代码！');
            }
        }, true);
        // 通过事件控制菜单的显示和隐藏
        this.lf.on('node:contextmenu', function (_a) {
            var data = _a.data, position = _a.position;
            var _b = position.domOverlayPosition, x = _b.x, y = _b.y;
            var id = data.id;
            var model = _this.lf.graphModel.getNodeModelById(id);
            var menuList = [];
            var typeMenus = _this.menuTypeMap.get(model.type);
            // 如果单个节点自定义了节点，以单个节点自定义为准
            if (model && model.menu && Array.isArray(model.menu)) {
                menuList = model.menu;
            }
            else if (typeMenus) { // 如果定义当前节点类型的元素
                menuList = typeMenus;
            }
            else { // 最后取全局默认
                menuList = _this.menuTypeMap.get(DefalutNodeMenuKey);
            }
            _this.__currentData = data;
            _this.showMenu(x, y, menuList);
        });
        this.lf.on('edge:contextmenu', function (_a) {
            var data = _a.data, position = _a.position;
            var _b = position.domOverlayPosition, x = _b.x, y = _b.y;
            var id = data.id;
            var model = _this.lf.graphModel.getEdgeModelById(id);
            var menuList = [];
            var typeMenus = _this.menuTypeMap.get(model.type);
            // 如果单个节点自定义了边
            if (model && model.menu && Array.isArray(model.menu)) {
                menuList = model.menu;
            }
            else if (typeMenus) { // 如果定义当前边类型的元素
                menuList = typeMenus;
            }
            else { // 最后取全局默认
                menuList = _this.menuTypeMap.get(DefalutEdgeMenuKey);
            }
            _this.__currentData = data;
            _this.showMenu(x, y, menuList);
        });
        this.lf.on('blank:contextmenu', function (_a) {
            var position = _a.position;
            var menuList = _this.menuTypeMap.get(DefalutGraphMenuKey);
            var _b = position.domOverlayPosition, x = _b.x, y = _b.y;
            _this.showMenu(x, y, menuList);
        });
        this.lf.on('selection:contextmenu', function (_a) {
            var data = _a.data, position = _a.position;
            var menuList = _this.menuTypeMap.get(DefalutSelectionMenuKey);
            var _b = position.domOverlayPosition, x = _b.x, y = _b.y;
            _this.__currentData = data;
            _this.showMenu(x, y, menuList);
        });
        this.lf.on('node:mousedown', function () {
            _this.__menuDOM.style.display = 'none';
        });
        this.lf.on('edge:click', function () {
            _this.__menuDOM.style.display = 'none';
        });
        this.lf.on('blank:click', function () {
            _this.__menuDOM.style.display = 'none';
        });
    };
    Menu.prototype.destroy = function () {
        var _a;
        (_a = this === null || this === void 0 ? void 0 : this.__container) === null || _a === void 0 ? void 0 : _a.removeChild(this.__menuDOM);
        this.__menuDOM = null;
    };
    Menu.prototype.showMenu = function (x, y, menuList) {
        if (!menuList || !menuList.length)
            return;
        var menu = this.__menuDOM;
        // 菜单容器不变，需要先清空内部的菜单项
        menu.innerHTML = '';
        menu.append.apply(menu, __spread(this.__getMenuDom(menuList)));
        // 菜单中没有项，不显示
        if (!menu.children.length)
            return;
        menu.style.display = 'block';
        menu.style.top = y + "px";
        menu.style.left = x + "px";
    };
    /**
     * 设置指定类型元素的菜单
     */
    Menu.prototype.setMenuByType = function (config) {
        if (!config.type || !config.menu) {
            return;
        }
        this.menuTypeMap.set(config.type, config.menu);
    };
    /**
     * 获取 Menu DOM
     * @param list 菜单项
     * @return 菜单项 DOM
     */
    Menu.prototype.__getMenuDom = function (list) {
        var menuList = [];
        list && list.length > 0 && list.forEach(function (item) {
            var element = document.createElement('li');
            if (item.className) {
                element.className = "lf-menu-item " + item.className;
            }
            else {
                element.className = 'lf-menu-item';
            }
            if (item.icon === true) {
                var icon = document.createElement('span');
                icon.className = 'lf-menu-item-icon';
                element.appendChild(icon);
            }
            var text = document.createElement('span');
            text.className = 'lf-menu-item-text';
            if (item.text) {
                text.innerText = item.text;
            }
            element.appendChild(text);
            element.onclickCallback = item.callback;
            menuList.push(element);
        });
        return menuList;
    };
    // 复写菜单
    Menu.prototype.setMenuConfig = function (config) {
        if (!config) {
            return;
        }
        // node
        config.nodeMenu !== undefined
            && this.menuTypeMap.set(DefalutNodeMenuKey, config.nodeMenu ? config.nodeMenu : []);
        // edge
        config.edgeMenu !== undefined
            && this.menuTypeMap.set(DefalutEdgeMenuKey, config.edgeMenu ? config.edgeMenu : []);
        // graph
        config.graphMenu !== undefined
            && this.menuTypeMap.set(DefalutGraphMenuKey, config.graphMenu ? config.graphMenu : []);
    };
    // 在默认菜单后面追加菜单项
    Menu.prototype.addMenuConfig = function (config) {
        if (!config) {
            return;
        }
        // 追加项时，只支持数组类型，对false不做操作
        if (Array.isArray(config.nodeMenu)) {
            var menuList = this.menuTypeMap.get(DefalutNodeMenuKey);
            this.menuTypeMap.set(DefalutNodeMenuKey, menuList.concat(config.nodeMenu));
        }
        if (Array.isArray(config.edgeMenu)) {
            var menuList = this.menuTypeMap.get(DefalutEdgeMenuKey);
            this.menuTypeMap.set(DefalutEdgeMenuKey, menuList.concat(config.edgeMenu));
        }
        if (Array.isArray(config.graphMenu)) {
            var menuList = this.menuTypeMap.get(DefalutGraphMenuKey);
            this.menuTypeMap.set(DefalutGraphMenuKey, menuList.concat(config.graphMenu));
        }
    };
    /**
     * @deprecated
     * 复写添加
     */
    Menu.prototype.changeMenuItem = function (type, config) {
        if (type === 'add')
            this.addMenuConfig(config);
        else if (type === 'reset')
            this.setMenuConfig(config);
        else {
            throw new Error('The first parameter of changeMenuConfig should be \'add\' or \'reset\'');
        }
    };
    Menu.pluginName = 'menu';
    return Menu;
}());
export default Menu;
export { Menu, };
