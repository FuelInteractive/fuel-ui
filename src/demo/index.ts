import {NgModule, ModuleWithProviders, NgModuleFactoryLoader} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FuelUiModule} from "../index";
import {demoRouting} from "./demo.routing";

import {FuiAnimationsDemoModule} from "../animations/animations.demo";
import {FuiComponentsDemoModule} from "../components/components.demo";
import {FuiDirectivesDemoModule} from "../directives/directives.demo";
import {FuiPipesDemoModule} from "../pipes/pipes.demo";


import {DemoComponent} from "./demo.component";
import {HomeComponent} from "./home.component";
import {InstallationComponent} from "./installation.component";

export * from "../animations/animations.demo";
export * from "../components/components.demo";
export * from "../directives/directives.demo";
export * from "../pipes/pipes.demo";
export * from "./demo.component";
export * from "./home.component";
export * from "./installation.component";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        demoRouting,
        FuelUiModule,
        FuiAnimationsDemoModule,
        FuiComponentsDemoModule,
        FuiDirectivesDemoModule,
        FuiPipesDemoModule
    ],
    declarations: [
        InstallationComponent,
        HomeComponent,
        DemoComponent
    ],
    bootstrap: [DemoComponent]
})
export class FuelUiDemoModule {

}
