import Ids from 'ids';
var ids = new Ids([32, 32, 1]);
export function getBpmnId() {
    return ids.next();
}
