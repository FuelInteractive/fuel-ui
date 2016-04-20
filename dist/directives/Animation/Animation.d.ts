import { EventEmitter, ElementRef, OnInit, OnChanges } from 'angular2/core';
export declare class Animation implements OnInit, OnChanges {
    onAnimationStart: EventEmitter<any>;
    onAnimationEnd: EventEmitter<any>;
    animationClasses: string;
    play: boolean;
    id: string;
    group: string;
    _animationQueue: string[];
    _callbacks: (() => void)[];
    element: Element;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    ngOnInit(): void;
    addAnimation(animationClasses: string): Animation;
    setup(): Animation;
    startAnimation(callback?: () => void): Animation;
    cleanAnimation(): Animation;
    animationStarted(event: Event): void;
    animationEnded(event: Event): void;
}
