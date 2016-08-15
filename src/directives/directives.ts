import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {FuiAnimationModule} from './animation/animation';
import {FuiTooltipModule} from "./tooltip/tooltip";
import {FuiCodeHighlighterModule} from "./codeHighlighter/codeHighlighter";

export * from './animation/animation';
export * from "./tooltip/tooltip";
export * from "./codeHighlighter/codeHighlighter";

const directiveModules = [
    FuiAnimationModule,
    FuiTooltipModule,
    FuiCodeHighlighterModule
];

@NgModule({
    imports: [
        CommonModule,
        ...directiveModules
    ],
    exports: directiveModules
})
export class FuiDirectivesModule { }