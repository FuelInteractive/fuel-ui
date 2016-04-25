import { OnChanges, ElementRef } from "angular2/core";
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
export declare class Collapse implements OnChanges {
    element: ElementRef;
    duration: number;
    collapse: boolean;
    private _animation;
    constructor(animationBuilder: AnimationBuilder, element: ElementRef);
    private _elementHeight;
    private _baseSequence;
    ngOnChanges(changes: any): void;
    hide(): void;
    show(): void;
}
export declare var COLLAPSE_PROVIDERS: typeof Collapse[];
