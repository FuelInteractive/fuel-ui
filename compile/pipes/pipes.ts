import {NgModule} from "@angular/core";

import {FuiFormatPipeModule} from "./Format/Format";
import {FuiMapToIterablePipeModule} from "./MapToIterable/MapToIterable";
import {FuiOrderByPipeModule} from "./OrderBy/OrderBy";
import {FuiRangePipeModule} from "./Range/Range";

export * from "./Format/Format";
export * from "./MapToIterable/MapToIterable";
export * from "./OrderBy/OrderBy";
export * from "./Range/Range";

const pipeModules = [
    FuiFormatPipeModule, 
    FuiMapToIterablePipeModule,
    FuiOrderByPipeModule,
    FuiRangePipeModule
]

@NgModule({
    imports: pipeModules,
    exports: pipeModules
})
export class FuiPipesModule { }