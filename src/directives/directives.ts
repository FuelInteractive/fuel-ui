import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {FuiAnimationModule} from './Animation/Animation';
import {FuiTooltipModule} from "./Tooltip/Tooltip";
import {FuiCodeHighlighterModule} from "./CodeHighlighter/CodeHighlighter";

export * from './Animation/Animation';
export * from "./Tooltip/Tooltip";
export * from "./CodeHighlighter/CodeHighlighter";

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