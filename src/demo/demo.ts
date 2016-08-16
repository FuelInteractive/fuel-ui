import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {FuiComponentsDemoModule} from "../components/components.demo";
import {FuiDirectivesDemoModule} from "../directives/directives.demo";
import {FuiAnimationsDemoModule} from "../animations/animations.demo";
import {FuiPipesDemoModule} from "../pipes/pipes.demo";
import {DemoHome, InstallationComponent} from "./demo.only";

import {FuelUiModule} from "../fuel-ui";

export * from "../components/components.demo";
export * from "../directives/directives.demo";
export * from "../pipes/pipes.demo";
export * from "../animations/animations.demo";
export * from "./demo.only";

const demoModules = [
    FuiAnimationsDemoModule,
    FuiComponentsDemoModule,
    FuiDirectivesDemoModule,
    FuiPipesDemoModule
]

const demoComponents = [
    DemoHome,
    InstallationComponent
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FuelUiModule,
        ...demoModules
    ],
    declarations: demoComponents,
    exports: [
        ...demoModules,
        ...demoComponents
    ]
})
export class FuiDemoModule { }