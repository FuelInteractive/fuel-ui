'use strict';var lang_1 = require('angular2/src/facade/lang');
/**
 * A message extracted from a template.
 *
 * The identity of a message is comprised of `content` and `meaning`.
 *
 * `description` is additional information provided to the translator.
 */
var Message = (function () {
    function Message(content, meaning, description) {
        this.content = content;
        this.meaning = meaning;
        this.description = description;
    }
    return Message;
})();
exports.Message = Message;
/**
 * Computes the id of a message
 */
function id(m) {
    var meaning = lang_1.isPresent(m.meaning) ? m.meaning : "";
    var content = lang_1.isPresent(m.content) ? m.content : "";
    return lang_1.escape("$ng|" + meaning + "|" + content);
}
exports.id = id;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy9pMThuL21lc3NhZ2UudHMiXSwibmFtZXMiOlsiTWVzc2FnZSIsIk1lc3NhZ2UuY29uc3RydWN0b3IiLCJpZCJdLCJtYXBwaW5ncyI6IkFBQUEscUJBQWdDLDBCQUEwQixDQUFDLENBQUE7QUFFM0Q7Ozs7OztHQU1HO0FBQ0g7SUFDRUEsaUJBQW1CQSxPQUFlQSxFQUFTQSxPQUFlQSxFQUFTQSxXQUFtQkE7UUFBbkVDLFlBQU9BLEdBQVBBLE9BQU9BLENBQVFBO1FBQVNBLFlBQU9BLEdBQVBBLE9BQU9BLENBQVFBO1FBQVNBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFRQTtJQUFHQSxDQUFDQTtJQUM1RkQsY0FBQ0E7QUFBREEsQ0FBQ0EsQUFGRCxJQUVDO0FBRlksZUFBTyxVQUVuQixDQUFBO0FBRUQ7O0dBRUc7QUFDSCxZQUFtQixDQUFVO0lBQzNCRSxJQUFJQSxPQUFPQSxHQUFHQSxnQkFBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFDcERBLElBQUlBLE9BQU9BLEdBQUdBLGdCQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxPQUFPQSxHQUFHQSxFQUFFQSxDQUFDQTtJQUNwREEsTUFBTUEsQ0FBQ0EsYUFBTUEsQ0FBQ0EsU0FBT0EsT0FBT0EsU0FBSUEsT0FBU0EsQ0FBQ0EsQ0FBQ0E7QUFDN0NBLENBQUNBO0FBSmUsVUFBRSxLQUlqQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGVzY2FwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBBIG1lc3NhZ2UgZXh0cmFjdGVkIGZyb20gYSB0ZW1wbGF0ZS5cbiAqXG4gKiBUaGUgaWRlbnRpdHkgb2YgYSBtZXNzYWdlIGlzIGNvbXByaXNlZCBvZiBgY29udGVudGAgYW5kIGBtZWFuaW5nYC5cbiAqXG4gKiBgZGVzY3JpcHRpb25gIGlzIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gcHJvdmlkZWQgdG8gdGhlIHRyYW5zbGF0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbnRlbnQ6IHN0cmluZywgcHVibGljIG1lYW5pbmc6IHN0cmluZywgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcpIHt9XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGlkIG9mIGEgbWVzc2FnZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaWQobTogTWVzc2FnZSk6IHN0cmluZyB7XG4gIGxldCBtZWFuaW5nID0gaXNQcmVzZW50KG0ubWVhbmluZykgPyBtLm1lYW5pbmcgOiBcIlwiO1xuICBsZXQgY29udGVudCA9IGlzUHJlc2VudChtLmNvbnRlbnQpID8gbS5jb250ZW50IDogXCJcIjtcbiAgcmV0dXJuIGVzY2FwZShgJG5nfCR7bWVhbmluZ318JHtjb250ZW50fWApO1xufSJdfQ==