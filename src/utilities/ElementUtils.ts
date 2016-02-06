export function outerHeight(el: Element) {
    var height = el.clientHeight;
    var style = getComputedStyle(el);
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    height += parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
    return height;
}

export function outerWidth(el: Element) {
    var width = el.clientWidth;
    var style = getComputedStyle(el);
    width += parseInt(style.marginLeft) + parseInt(style.marginRight);
    width += parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);
    return width;
}