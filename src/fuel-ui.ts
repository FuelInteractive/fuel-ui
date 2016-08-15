import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {FuiComponentsModule} from "./components/components";
import {FuiDirectivesModule} from "./directives/directives";
import {FuiPipesModule} from "./pipes/pipes";

export * from "./animations/animations";
export * from "./components/components";
export * from "./directives/directives";
export * from "./pipes/pipes";
export * from './utilities/utilities';
 
const fuiModules = [
    FuiComponentsModule,
    FuiDirectivesModule,
    FuiPipesModule
];

@NgModule({
    imports: [
        CommonModule,
        ...fuiModules
    ],
    exports: fuiModules
})
export class FuelUiModule { }