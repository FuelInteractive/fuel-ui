import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

import {routing} from "./demo/demo.routing";

import {FuelUiModule} from "./fuel-ui";
import {
    DemoComponent,
    DemoHome,
    InstallationComponent,
    FuiAnimationsDemoModule, 
    FuiComponentsDemoModule, 
    FuiDirectivesDemoModule,
    FuiPipesDemoModule
} from "./demo/demo";

const demoModules = [
    FuiAnimationsDemoModule,
    FuiComponentsDemoModule,
    FuiDirectivesDemoModule,
    FuiPipesDemoModule
];

const demoComponents = [
    DemoHome,
    InstallationComponent,
    DemoComponent
];


@NgModule({
    declarations: [
        ...demoComponents
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        FuelUiModule,
        ...demoModules
    ],
    exports: [
        FuelUiModule,
        ...demoComponents,
        DemoComponent
    ],
    bootstrap: [DemoComponent]
}) 
export class DemoAppModule {

}


platformBrowserDynamic().bootstrapModule(DemoAppModule);