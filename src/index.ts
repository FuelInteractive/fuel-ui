import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {FuiAnimationsModule} from "./animations";
import {FuiComponentsModule} from "./components";
import {FuiDirectivesModule} from "./directives";
import {FuiPipesModule} from "./pipes";

export * from "./animations";
export * from "./components";
export * from "./directives";
export * from "./pipes";
export * from './utilities';
 
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