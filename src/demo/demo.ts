import {NgModule, ModuleWithProviders, NgModuleFactoryLoader} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FuelUiModule} from "../index";
import {FuiAnimationsDemoModule} from "../animations/animations.demo";
import {FuiComponentsDemoModule} from "../components/components.demo";
import {FuiDirectivesDemoModule} from "../directives/directives.demo";
import {FuiPipesDemoModule} from "../pipes/pipes.demo";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        RouterModule,
        FuelUiModule,
        FuiAnimationsDemoModule,
        FuiComponentsDemoModule,
        FuiDirectivesDemoModule,
        FuiPipesDemoModule
    ],
    bootstrap: []
})
export class FuelUiDemoModule { }