export class StringHelper {
    static entityMap:any = {
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&apos;',
        "/": '&#x2F;'
    };
    
    static escapeHtml(html:string): string {
        var that = this;
        return String(html).replace(/[<>"'\/]/g, function (s) {
            return that.entityMap[s];
        });
    }
}