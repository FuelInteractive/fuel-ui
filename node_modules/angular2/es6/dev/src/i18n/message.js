import { isPresent, escape } from 'angular2/src/facade/lang';
/**
 * A message extracted from a template.
 *
 * The identity of a message is comprised of `content` and `meaning`.
 *
 * `description` is additional information provided to the translator.
 */
export class Message {
    constructor(content, meaning, description) {
        this.content = content;
        this.meaning = meaning;
        this.description = description;
    }
}
/**
 * Computes the id of a message
 */
export function id(m) {
    let meaning = isPresent(m.meaning) ? m.meaning : "";
    let content = isPresent(m.content) ? m.content : "";
    return escape(`$ng|${meaning}|${content}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9pMThuL21lc3NhZ2UudHMiXSwibmFtZXMiOlsiTWVzc2FnZSIsIk1lc3NhZ2UuY29uc3RydWN0b3IiLCJpZCJdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sMEJBQTBCO0FBRTFEOzs7Ozs7R0FNRztBQUNIO0lBQ0VBLFlBQW1CQSxPQUFlQSxFQUFTQSxPQUFlQSxFQUFTQSxXQUFtQkE7UUFBbkVDLFlBQU9BLEdBQVBBLE9BQU9BLENBQVFBO1FBQVNBLFlBQU9BLEdBQVBBLE9BQU9BLENBQVFBO1FBQVNBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFRQTtJQUFHQSxDQUFDQTtBQUM1RkQsQ0FBQ0E7QUFFRDs7R0FFRztBQUNILG1CQUFtQixDQUFVO0lBQzNCRSxJQUFJQSxPQUFPQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQTtJQUNwREEsSUFBSUEsT0FBT0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFDcERBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLE9BQU9BLElBQUlBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBO0FBQzdDQSxDQUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNQcmVzZW50LCBlc2NhcGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbi8qKlxuICogQSBtZXNzYWdlIGV4dHJhY3RlZCBmcm9tIGEgdGVtcGxhdGUuXG4gKlxuICogVGhlIGlkZW50aXR5IG9mIGEgbWVzc2FnZSBpcyBjb21wcmlzZWQgb2YgYGNvbnRlbnRgIGFuZCBgbWVhbmluZ2AuXG4gKlxuICogYGRlc2NyaXB0aW9uYCBpcyBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIHByb3ZpZGVkIHRvIHRoZSB0cmFuc2xhdG9yLlxuICovXG5leHBvcnQgY2xhc3MgTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZW50OiBzdHJpbmcsIHB1YmxpYyBtZWFuaW5nOiBzdHJpbmcsIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nKSB7fVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBpZCBvZiBhIG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlkKG06IE1lc3NhZ2UpOiBzdHJpbmcge1xuICBsZXQgbWVhbmluZyA9IGlzUHJlc2VudChtLm1lYW5pbmcpID8gbS5tZWFuaW5nIDogXCJcIjtcbiAgbGV0IGNvbnRlbnQgPSBpc1ByZXNlbnQobS5jb250ZW50KSA/IG0uY29udGVudCA6IFwiXCI7XG4gIHJldHVybiBlc2NhcGUoYCRuZ3wke21lYW5pbmd9fCR7Y29udGVudH1gKTtcbn0iXX0=