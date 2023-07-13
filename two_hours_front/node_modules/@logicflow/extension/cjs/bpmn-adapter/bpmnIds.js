"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBpmnId = void 0;
var ids_1 = require("ids");
var ids = new ids_1.default([32, 32, 1]);
function getBpmnId() {
    return ids.next();
}
exports.getBpmnId = getBpmnId;
