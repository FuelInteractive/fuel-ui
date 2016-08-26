import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FuelUiModule} from "../fuel-ui";

import {FormatDemo} from "./Format/Format.Demo";
import {MapToIterableDemo} from "./MapToIterable/MapToIterable.Demo";
import {OrderByDemo} from "./OrderBy/OrderBy.Demo";
import {RangeDemo} from "./Range/Range.Demo";

export * from "./Format/Format.Demo";
export * from "./MapToIterable/MapToIterable.Demo";
export * from "./OrderBy/OrderBy.Demo";
export * from "./Range/Range.Demo";

const demoDirectives = [
    FormatDemo,
    MapToIterableDemo,
    OrderByDemo,
    RangeDemo
]

@NgModule({
    imports: [CommonModule,FormsModule,FuelUiModule],
    declarations: demoDirectives,
    exports: demoDirectives
})
export class FuiPipesDemoModule { }