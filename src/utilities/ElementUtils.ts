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

export function scrollTo(element: HTMLElement, to: number, duration: number) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

//http://codepen.io/branneman/pen/tCdHa
//
// http://easings.net/#easeInOutQuart
//  t: current time
//  b: beginning value
//  c: change in value
//  d: duration
//
function easeInOutQuart(t: number, b: number, c: number, d: number) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}