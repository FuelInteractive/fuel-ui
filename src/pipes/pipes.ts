import {NgModule} from "@angular/core";

import {FuiFormatPipeModule} from "./format/format";
import {FuiMapToIterablePipeModule} from "./mapToIterable/mapToIterable";
import {FuiOrderByPipeModule} from "./orderBy/orderBy";
import {FuiRangePipeModule} from "./range/range";

export * from "./format/format";
export * from "./mapToIterable/mapToIterable";
export * from "./orderBy/orderBy";
export * from "./range/range";

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