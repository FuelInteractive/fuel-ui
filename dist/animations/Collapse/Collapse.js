"use strict";
var core_1 = require('@angular/core');
function Collapse(duration) {
    if (duration === void 0) { duration = 300; }
    return core_1.trigger('collapse', [
        core_1.state('collapsed, true, void', core_1.style({
            height: '0',
            opacity: '0',
            overflow: 'hidden'
        })),
        core_1.state('expanded, false', core_1.style({
            height: '*',
            opacity: '1',
            overflow: 'hidden'
        })),
        core_1.transition('true => false, collapsed => expanded', [
            core_1.animate(duration + 'ms ease', core_1.keyframes([
                core_1.style({ opacity: '1' }),
                core_1.style({ height: '*' })
            ]))
        ]),
        core_1.transition('false => true, expanded => collapsed', [
            core_1.animate(duration + 'ms ease', core_1.style({ height: '0' }))
        ])
    ]);
}
exports.Collapse = Collapse;
exports.COLLAPSE_PROVIDERS = [
    Collapse
];

//# sourceMappingURL=Collapse.js.map
