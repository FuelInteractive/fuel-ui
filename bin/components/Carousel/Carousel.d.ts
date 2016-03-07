import { QueryList, AfterContentInit } from 'angular2/core';
export declare class CarouselItem {
    isActive: boolean;
    left: boolean;
    right: boolean;
    next: boolean;
    prev: boolean;
    exiting: boolean;
    constructor();
    resetStatus(): void;
    resetAnimation(): void;
    animationStart(): void;
    animationEnd(): void;
    moveLeft(): void;
    moveRight(): void;
    checkIfAnimating(): boolean;
}
export declare class Carousel implements AfterContentInit {
    images: CarouselItem[];
    imageQuery: QueryList<CarouselItem>;
    constructor();
    ngAfterContentInit(): void;
    registerImages(): void;
    setAllInactive(): void;
    switchTo(image: CarouselItem): void;
    nextImage(): void;
    prevImage(): void;
    checkIfAnimating(): boolean;
    getActiveIndex(): number;
    getActiveImage(): CarouselItem;
}
export declare var CAROUSEL_PROVIDERS: (typeof Carousel | typeof CarouselItem)[];
