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
import { h } from '@logicflow/core';
import { RectResize } from '../../NodeResize';
var defaultWidth = 500;
var defaultHeight = 300;
var GroupNodeModel = /** @class */ (function (_super) {
    __extends(GroupNodeModel, _super);
    function GroupNodeModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isGroup = true;
        _this.unfoldedWidth = defaultWidth;
        _this.unfoldedHight = defaultHeight;
        return _this;
    }
    GroupNodeModel.prototype.initNodeData = function (data) {
        var _this = this;
        _super.prototype.initNodeData.call(this, data);
        var children = [];
        if (Array.isArray(data.children)) {
            children = data.children;
        }
        // 初始化组的子节点
        this.children = new Set(children);
        this.width = defaultWidth;
        this.height = defaultHeight;
        this.foldedWidth = 80;
        this.foldedHeight = 60;
        // todo: 参考bpmn.js, 分组和未加入分组的节点重合时，未加入分组的节点在分组之下。方便标识。
        this.zIndex = -1;
        this.radius = 0;
        this.text.editable = false;
        this.text.draggable = false;
        this.isRestrict = false;
        this.resizable = false;
        this.autoToFront = false;
        this.foldable = false;
        if (this.properties.isFolded === undefined) {
            this.properties.isFolded = false;
        }
        this.isFolded = this.properties.isFolded;
        // fixme: 虽然默认保存的分组不会收起，但是如果重写保存数据分组了，
        // 此处代码会导致多一个history记录
        setTimeout(function () {
            _this.isFolded && _this.foldGroup(_this.isFolded);
        });
        // this.foldGroup(this.isFolded);
    };
    GroupNodeModel.prototype.getResizeOutlineStyle = function () {
        var style = _super.prototype.getResizeOutlineStyle.call(this);
        style.stroke = 'none';
        return style;
    };
    /**
     * 折叠分组
     * 1. 折叠分组的宽高
     * 2. 处理分组子节点
     * 3. 处理连线
     */
    GroupNodeModel.prototype.foldGroup = function (isFolded) {
        var _this = this;
        this.setProperty('isFolded', isFolded);
        this.isFolded = isFolded;
        // step 1
        if (isFolded) {
            this.x = this.x - this.width / 2 + this.foldedWidth / 2;
            this.y = this.y - this.height / 2 + this.foldedHeight / 2;
            this.unfoldedWidth = this.width;
            this.unfoldedHight = this.height;
            this.width = this.foldedWidth;
            this.height = this.foldedHeight;
        }
        else {
            this.width = this.unfoldedWidth;
            this.height = this.unfoldedHight;
            this.x = this.x + this.width / 2 - this.foldedWidth / 2;
            this.y = this.y + this.height / 2 - this.foldedHeight / 2;
        }
        // step 2
        var allEdges = this.incoming.edges.concat(this.outgoing.edges);
        this.children.forEach(function (elementId) {
            var nodeModel = _this.graphModel.getElement(elementId);
            nodeModel.visible = !isFolded;
            allEdges = allEdges.concat(nodeModel.incoming.edges.concat(nodeModel.outgoing.edges));
        });
        // step 3
        this.foldEdge(isFolded, allEdges);
    };
    GroupNodeModel.prototype.getAnchorStyle = function (anchorInfo) {
        var style = _super.prototype.getAnchorStyle.call(this, anchorInfo);
        style.stroke = 'transparent';
        style.fill = 'transparent';
        style.hover.fill = 'transparent';
        style.hover.stroke = 'transparent';
        return style;
    };
    /**
     * 折叠分组的时候，处理分组自身的连线和分组内部子节点上的连线
     * 边的分类：
     *   - 虚拟边：分组被收起时，表示分组本身与外部节点关系的边。
     *   - 真实边：分组本身或者分组内部节点与外部节点节点（非收起分组）关系的边。
     * 如果一个分组，本身与外部节点有M条连线，且内部N个子节点与外部节点有连线，那么这个分组收起时会生成M+N条连线。
     * 折叠分组时：
     *   - 原有的虚拟边删除；
     *   - 创建一个虚拟边；
     *   - 真实边则隐藏；
     * 展开分组是：
     *   - 原有的虚拟边删除；
     *   - 如果目外部点是收起的分组，则创建虚拟边；
     *   - 如果外部节点是普通节点，则显示真实边；
     */
    GroupNodeModel.prototype.foldEdge = function (isFolded, allEdges) {
        var _this = this;
        allEdges.forEach(function (edgeModel, index) {
            var id = edgeModel.id, sourceNodeId = edgeModel.sourceNodeId, targetNodeId = edgeModel.targetNodeId, startPoint = edgeModel.startPoint, endPoint = edgeModel.endPoint, type = edgeModel.type, properties = edgeModel.properties, text = edgeModel.text;
            var data = {
                id: id + "__" + index,
                sourceNodeId: sourceNodeId,
                targetNodeId: targetNodeId,
                startPoint: startPoint,
                endPoint: endPoint,
                type: type,
                properties: properties,
                text: text === null || text === void 0 ? void 0 : text.value,
            };
            if (edgeModel.virtual) {
                _this.graphModel.deleteEdgeById(edgeModel.id);
            }
            var targetNodeIdGroup = _this.graphModel.group.getNodeGroup(targetNodeId);
            // 考虑目标节点本来就是分组的情况
            if (!targetNodeIdGroup) {
                targetNodeIdGroup = _this.graphModel.getNodeModelById(targetNodeId);
            }
            var sourceNodeIdGroup = _this.graphModel.group.getNodeGroup(sourceNodeId);
            if (!sourceNodeIdGroup) {
                sourceNodeIdGroup = _this.graphModel.getNodeModelById(sourceNodeId);
            }
            // 折叠时，处理未被隐藏的边的逻辑
            if (isFolded && edgeModel.visible !== false) {
                // 需要确认此分组节点是新连线的起点还是终点
                // 创建一个虚拟边，虚拟边相对真实边，起点或者终点从一起分组内部的节点成为了分组，
                // 如果需要被隐藏的边的起点在需要折叠的分组中，那么设置虚拟边的开始节点为此分组
                if (_this.children.has(sourceNodeId) || _this.id === sourceNodeId) {
                    data.startPoint = undefined;
                    data.sourceNodeId = _this.id;
                }
                else {
                    data.endPoint = undefined;
                    data.targetNodeId = _this.id;
                }
                // 如果边的起点和终点都在分组内部，则不创建新的虚拟边
                if (targetNodeIdGroup.id !== _this.id || sourceNodeIdGroup.id !== _this.id) {
                    _this.createVirtualEdge(data);
                }
                edgeModel.visible = false;
            }
            // 展开时，处理被隐藏的边的逻辑
            if (!isFolded && edgeModel.visible === false) {
                // 展开分组时：判断真实边的起点和终点是否有任一节点在已折叠分组中，如果不是，则显示真实边。如果是，这修改这个边的对应目标节点id来创建虚拟边。
                if (targetNodeIdGroup && targetNodeIdGroup.isGroup && targetNodeIdGroup.isFolded) {
                    data.targetNodeId = targetNodeIdGroup.id;
                    data.endPoint = undefined;
                    _this.createVirtualEdge(data);
                }
                else if (sourceNodeIdGroup && sourceNodeIdGroup.isGroup && sourceNodeIdGroup.isFolded) {
                    data.sourceNodeId = sourceNodeIdGroup.id;
                    data.startPoint = undefined;
                    _this.createVirtualEdge(data);
                }
                else {
                    edgeModel.visible = true;
                }
            }
        });
    };
    GroupNodeModel.prototype.createVirtualEdge = function (edgeData) {
        edgeData.pointsList = undefined;
        var model = this.graphModel.addEdge(edgeData);
        model.virtual = true;
        // 强制不保存group连线数据
        model.getData = function () { return null; };
        model.text.editable = false;
        model.isFoldedEdge = true;
    };
    GroupNodeModel.prototype.isInRange = function (_a) {
        var x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2;
        return x1 >= (this.x - this.width / 2)
            && x2 <= (this.x + this.width / 2)
            && y1 >= (this.y - this.height / 2)
            && y2 <= (this.y + this.height / 2);
    };
    GroupNodeModel.prototype.isAllowMoveTo = function (_a) {
        var x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2;
        return {
            x: x1 >= (this.x - this.width / 2) && x2 <= (this.x + this.width / 2),
            y: y1 >= (this.y - this.height / 2) && y2 <= (this.y + this.height / 2),
        };
    };
    GroupNodeModel.prototype.setAllowAppendChild = function (isAllow) {
        this.setProperty('groupAddable', isAllow);
    };
    /**
     * 添加分组子节点
     * @param id 节点id
     */
    GroupNodeModel.prototype.addChild = function (id) {
        this.children.add(id);
    };
    /**
     * 删除分组子节点
     * @param id 节点id
     */
    GroupNodeModel.prototype.removeChild = function (id) {
        this.children.delete(id);
    };
    GroupNodeModel.prototype.getAddableOutlineStyle = function () {
        return {
            stroke: '#FEB663',
            strokeWidth: 2,
            strokeDasharray: '4 4',
            fill: 'transparent',
        };
    };
    GroupNodeModel.prototype.getData = function () {
        var data = _super.prototype.getData.call(this);
        data.children = __spread(this.children);
        var properties = data.properties;
        delete properties.groupAddable;
        delete properties.isFolded;
        return data;
    };
    GroupNodeModel.prototype.getHistoryData = function () {
        var data = _super.prototype.getData.call(this);
        data.children = __spread(this.children);
        var properties = data.properties;
        delete properties.groupAddable;
        if (properties.isFolded) { // 如果分组被折叠
            data.x = data.x + this.unfoldedWidth / 2 - this.foldedWidth / 2;
            data.y = data.y + this.unfoldedHight / 2 - this.foldedHeight / 2;
        }
        return data;
    };
    return GroupNodeModel;
}(RectResize.model));
var GroupNode = /** @class */ (function (_super) {
    __extends(GroupNode, _super);
    function GroupNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupNode.prototype.getControlGroup = function () {
        var _a = this.props.model, resizable = _a.resizable, properties = _a.properties;
        return resizable && !properties.isFolded ? _super.prototype.getControlGroup.call(this) : null;
    };
    GroupNode.prototype.getAddedableShape = function () {
        var _a = this.props.model, width = _a.width, height = _a.height, x = _a.x, y = _a.y, radius = _a.radius, properties = _a.properties;
        if (!properties.groupAddable)
            return null;
        var strokeWidth = this.props.model.getNodeStyle().strokeWidth;
        var style = this.props.model.getAddableOutlineStyle();
        var newWidth = width + strokeWidth + 8;
        var newHeight = height + strokeWidth + 8;
        return h('rect', __assign(__assign({}, style), { width: newWidth, height: newHeight, x: x - newWidth / 2, y: y - newHeight / 2, rx: radius, ry: radius }));
    };
    GroupNode.prototype.getFoldIcon = function () {
        var model = this.props.model;
        var foldX = model.x - model.width / 2 + 5;
        var foldY = model.y - model.height / 2 + 5;
        if (!model.foldable)
            return null;
        var iconIcon = h('path', {
            fill: 'none',
            stroke: '#818281',
            strokeWidth: 2,
            'pointer-events': 'none',
            d: model.properties.isFolded
                ? "M " + (foldX + 3) + "," + (foldY + 6) + " " + (foldX + 11) + "," + (foldY + 6) + " M" + (foldX + 7) + "," + (foldY + 2) + " " + (foldX + 7) + "," + (foldY + 10)
                : "M " + (foldX + 3) + "," + (foldY + 6) + " " + (foldX + 11) + "," + (foldY + 6) + " ",
        });
        return h('g', {}, [
            h('rect', {
                height: 12,
                width: 14,
                rx: 2,
                ry: 2,
                strokeWidth: 1,
                fill: '#F4F5F6',
                stroke: '#CECECE',
                cursor: 'pointer',
                x: model.x - model.width / 2 + 5,
                y: model.y - model.height / 2 + 5,
                onClick: function () {
                    model.foldGroup(!model.properties.isFolded);
                },
            }),
            iconIcon,
        ]);
    };
    GroupNode.prototype.getResizeShape = function () {
        return h('g', {}, [
            this.getAddedableShape(),
            _super.prototype.getResizeShape.call(this),
            this.getFoldIcon(),
        ]);
    };
    return GroupNode;
}(RectResize.view));
export default {
    type: 'group',
    view: GroupNode,
    model: GroupNodeModel,
};
