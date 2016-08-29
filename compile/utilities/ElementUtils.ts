import {AnimationUtils} from "./AnimationUtils";

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
}