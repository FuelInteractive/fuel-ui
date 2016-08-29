import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FuelUiModule} from "../fuel-ui";

import {AnimationDemo} from "./Animation/Animation.Demo";
import {TooltipDemo} from "./Tooltip/Tooltip.Demo";
import {CodeHighlighterDemo} from "./CodeHighlighter/CodeHighlighter.Demo";

export * from "./Animation/Animation.Demo";
export * from "./Tooltip/Tooltip.Demo";
export * from "./CodeHighlighter/CodeHighlighter.Demo";

const directivesDemoDirectives = [
    AnimationDemo,
    TooltipDemo,
    CodeHighlighterDemo
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FuelUiModule
    ],
    declarations: directivesDemoDirectives,
    exports: directivesDemoDirectives
})
export class FuiDirectivesDemoModule { }