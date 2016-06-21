import {trigger, state, style, transition, animate, keyframes} from '@angular/core';

export function Collapse(duration: number = 300) {
    let animation = duration.toString() + "ms";
    return trigger('collapse', [
        state('collapsed, true, void', style({
            height: '0px',
            paddingTop: '0',
            paddingBottom: '0',
            overflow: 'hidden',
            opacity: '0'
        })),
        state('expanded, false', style({
            height: '*',
            overflow: 'hidden',
            opacity: '1'
        })),
        transition('true <=> false, collapsed <=> expanded', [
            animate(animation + " ease", keyframes([
                style({
                    opacity: '1',
                }),
                style({
                    height: '*'
                })
            ])),
            animate(animation + " ease")
        ])
    ])
}

export var COLLAPSE_PROVIDERS = [
    Collapse
];