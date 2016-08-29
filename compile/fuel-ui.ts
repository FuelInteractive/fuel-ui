import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {FuiAnimationsModule} from "./animations/animations";
import {FuiComponentsModule} from "./components/components";
import {FuiDirectivesModule} from "./directives/directives";
import {FuiPipesModule} from "./pipes/pipes";

export * from "./animations/animations";
export * from "./components/components";
export * from "./directives/directives";
export * from "./pipes/pipes";
export * from './utilities/utilities';
 
const fuiDirectives = [
    
];

const fuiModules = [
    FuiAnimationsModule,
    FuiComponentsModule,
    FuiDirectivesModule,
    FuiPipesModule
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ...fuiModules
    ],
    declarations: fuiDirectives,
    exports: [
        ...fuiDirectives,
        ...fuiModules
    ]
})
export class FuelUiModule { }