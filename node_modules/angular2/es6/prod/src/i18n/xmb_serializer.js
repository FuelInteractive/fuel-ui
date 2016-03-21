import { isPresent } from 'angular2/src/facade/lang';
import { id } from './message';
export function serialize(messages) {
    let ms = messages.map((m) => _serializeMessage(m)).join("");
    return `<message-bundle>${ms}</message-bundle>`;
}
function _serializeMessage(m) {
    let desc = isPresent(m.description) ? ` desc='${m.description}'` : "";
    return `<msg id='${id(m)}'${desc}>${m.content}</msg>`;
}
