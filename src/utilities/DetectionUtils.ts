export class MobileDetection {
	static isAndroid(): boolean {
        return navigator.userAgent.match(/Android/i) != null;
    }
	
    static isBlackBerry(): boolean {
        return navigator.userAgent.match(/BlackBerry/i) != null;
    }
    
    static isIOS(): boolean {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) != null;
    }
    
    static isOpera(): boolean {
        return navigator.userAgent.match(/Opera Mini/i) != null;
    }
    
    static isWindows(): boolean {
        return navigator.userAgent.match(/IEMobile|WPDesktop/i) != null;
    }
    
	static isAny(): boolean {
        return (this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOpera() || this.isWindows());
	}
}