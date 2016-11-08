import {trigger, state, style, transition, animate, keyframes, AnimationEntryMetadata} from '@angular/core';

export function Collapse(duration: number = 250): AnimationEntryMetadata {
    return trigger('collapse', [
            state('collapsed, true, void', style({
                height: '0',
                opacity: '0',
                overflow: 'hidden'
            })),
            state('expanded, false', style({
                height: '*',
                opacity: '1',
                overflow: 'hidden'
            })),
            transition('true => false, collapsed => expanded', [
                animate(duration+'ms ease', keyframes([
                    style({opacity: '1'}),
                    style({height: '*'})
                ]))
            ]),
            transition('false => true, expanded => collapsed', [
                animate(duration+'ms ease', style({height: '0'}))
            ])
        ])
}

