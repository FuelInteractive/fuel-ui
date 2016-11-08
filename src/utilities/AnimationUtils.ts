export class AnimationUtils {
    //http://codepen.io/branneman/pen/tCdHa
    //
    // http://easings.net/#easeInOutQuart
    //  time: current time
    //  beginning: beginning value
    //  change: change in value
    //  duration: duration
    //
    static easeInOutQuart(time: number, beginning: number, change: number, duration: number): number {
        if ((time /= duration / 2) < 1) 
            return change / 2 * time * time * time * time + beginning;
        return -change / 2 * ((time -= 2) * time * time * time - 2) + beginning;
    }

    private static _supportedTransform: string;

    static getSupportedTransform(): string {
        if(AnimationUtils._supportedTransform !== undefined)
            return AnimationUtils._supportedTransform;

        var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
        var div = document.createElement('div');
        for(var i = 0; i < prefixes.length; i++) {
            if(div && div.style[prefixes[i]] !== undefined) {
                return AnimationUtils._supportedTransform = prefixes[i];
            }
        }

        return AnimationUtils._supportedTransform = "";
    }
}