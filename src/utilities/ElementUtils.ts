export class ElementUtils {
    static outerHeight(el: Element): number {
        var height = el.clientHeight;
        var style = getComputedStyle(el);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        height += parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
        return height;
    }
    
    static outerWidth(el: Element): number {
        var width = el.clientWidth;
        var style = getComputedStyle(el);
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        width += parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);
        return width;
    }
}