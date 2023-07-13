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
import GroupNode from './GroupNode';
var Group = /** @class */ (function () {
    function Group(_a) {
        var _this = this;
        var lf = _a.lf;
        this.nodeGroupMap = new Map();
        this.graphRendered = function (data) {
            // 如果节点
            if (data && data.nodes) {
                data.nodes.forEach(function (node) {
                    if (node.children) {
                        node.children.forEach(function (nodeId) {
                            _this.nodeGroupMap.set(nodeId, node.id);
                        });
                    }
                });
            }
        };
        this.appendNodeToGrop = function (_a) {
            var data = _a.data;
            // 如果这个节点之前已经在group中了，则将其从之前的group中移除
            var preGroupId = _this.nodeGroupMap.get(data.id);
            if (preGroupId) {
                var preGroup = _this.lf.getNodeModelById(preGroupId);
                preGroup.removeChild(data.id);
                _this.nodeGroupMap.delete(data.id);
                preGroup.setAllowAppendChild(false);
            }
            // 然后再判断这个节点是否在某个group中，如果在，则将其添加到对应的group中
            var bounds = _this.lf.getNodeModelById(data.id).getBounds();
            var group = _this.getGroup(bounds);
            if (!group)
                return;
            if (data.id !== group.id) {
                group.addChild(data.id);
                _this.nodeGroupMap.set(data.id, group.id);
                group.setAllowAppendChild(false);
            }
            else if (data.children && data.children.length > 0) {
                // 表示当前添加的节点是一个新增的group
                data.children.forEach(function (nodeId) {
                    _this.nodeGroupMap.set(nodeId, data.id);
                });
            }
        };
        this.deleteGroupChild = function (_a) {
            var data = _a.data;
            var groupId = _this.nodeGroupMap.get(data.id);
            if (groupId) {
                var group = _this.lf.getNodeModelById(groupId);
                group.removeChild(data.id);
                _this.nodeGroupMap.delete(data.id);
            }
        };
        this.setActiveGroup = function (_a) {
            var data = _a.data;
            var nodeModel = _this.lf.getNodeModelById(data.id);
            if (nodeModel.isGroup)
                return;
            var bounds = nodeModel.getBounds();
            var newGroup = _this.getGroup(bounds);
            if (newGroup || newGroup !== _this.activeGroup) {
                if (_this.activeGroup) {
                    _this.activeGroup.setAllowAppendChild(false);
                }
                if (newGroup) {
                    _this.activeGroup = newGroup;
                    _this.activeGroup.setAllowAppendChild(true);
                }
            }
        };
        lf.register(GroupNode);
        this.lf = lf;
        lf.graphModel.addNodeMoveRules(function (model, deltaX, deltaY) {
            if (model.isGroup) { // 如果移动的是分组，那么分组的子节点也跟着移动。
                lf.graphModel.moveNodes(__spread(model.children), deltaX, deltaY, true);
                return true;
            }
            var groupModel = lf.getNodeModelById(_this.nodeGroupMap.get(model.id));
            if (groupModel && groupModel.isRestrict) { // 如果移动的节点存在分组中，且这个分组禁止子节点移出去。
                var _a = model.getBounds(), x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2;
                var r = groupModel.isAllowMoveTo({
                    x1: x1 + deltaX,
                    y1: y1 + deltaY,
                    x2: x2 + deltaX,
                    y2: y2 + deltaY,
                });
                return r;
            }
            return true;
        });
        lf.graphModel.group = this;
        lf.on('node:add', this.appendNodeToGrop);
        lf.on('node:delete', this.deleteGroupChild);
        lf.on('node:drop', this.appendNodeToGrop);
        lf.on('node:dnd-drag', this.setActiveGroup);
        lf.on('node:drag', this.setActiveGroup);
        lf.on('graph:rendered', this.graphRendered);
    }
    /**
     * 获取自定位置其所属分组
     */
    Group.prototype.getGroup = function (bounds) {
        var nodes = this.lf.graphModel.nodes;
        for (var i = 0; i < nodes.length; i++) {
            var model = nodes[i];
            if (model.isGroup && model.isInRange(bounds)) {
                return model;
            }
        }
    };
    /**
     * 获取某个节点所属的groupModel
     */
    Group.prototype.getNodeGroup = function (nodeId) {
        var groupId = this.nodeGroupMap.get(nodeId);
        if (groupId) {
            return this.lf.getNodeModelById(groupId);
        }
    };
    Group.pluginName = 'group';
    return Group;
}());
export { Group, GroupNode, };
