import { EventEmitter } from 'angular2/core';
export declare class AnimationListener {
    animationStart: EventEmitter<any>;
    animationEnd: EventEmitter<any>;
    constructor();
    animationStarted($event: Event): void;
    animationEnded($event: Event): void;
}
export declare var ANIMATION_LISTENER_PROVIDERS: typeof AnimationListener[];
