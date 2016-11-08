import {AnimationUtils} from "./AnimationUtils";

export class ElementUtils {
    static getCoords(el: Element): { top: number, left: number } {
        var box = el.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    }

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
    
    static scrollTo(element: HTMLElement, to: number, duration: number): Promise<any> {
        if (duration <= 0) return;
        
        var startTime = new Date().getTime();
        var from = element.scrollTop;
        
        return new Promise<any>((resolve, reject) => {
            var timer = setInterval(() => {
                var time = new Date().getTime() - startTime;
                var scrollTo = AnimationUtils.easeInOutQuart(time, from, to-from, duration);
                element.scrollTop = scrollTo;
                if(time >= duration) {
                    element.scrollTop = to;
                    clearInterval(timer);
                    resolve();
                } 
            }, 1000 / 60);
        });
    }

    static scrollDocumentTo(to: number, duration: number): Promise<any> {
        return ElementUtils.scrollTo(document.querySelector('body'), to, duration);
    }

    static scrollDocumentToElement(element: HTMLElement, duration: number): Promise<any> {
        var target = ElementUtils.getCoords(element);
        return ElementUtils.scrollDocumentTo(target.top, duration);
    }
}