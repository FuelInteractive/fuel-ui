import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {FuiComponentsDemoModule} from "../components/components.demo";
import {FuiDirectivesDemoModule} from "../directives/directives.demo";
import {FuiAnimationsDemoModule} from "../animations/animations.demo";
import {FuiPipesDemoModule} from "../pipes/pipes.demo";

export * from "../components/components.demo";
export * from "../directives/directives.demo";
export * from "../pipes/pipes.demo";
export * from "../animations/animations.demo";

const demoModules = [
    FuiAnimationsDemoModule,
    FuiComponentsDemoModule,
    FuiDirectivesDemoModule,
    FuiPipesDemoModule
]

@NgModule({
    imports: [
        CommonModule,
        ...demoModules
    ],
    exports: demoModules
})
export class FuiDemoModule { }