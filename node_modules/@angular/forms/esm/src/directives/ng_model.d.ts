import { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { EventEmitter } from '../facade/async';
import { FormControl } from '../model';
import { ControlContainer } from './control_container';
import { ControlValueAccessor } from './control_value_accessor';
import { NgControl } from './ng_control';
import { AsyncValidatorFn, ValidatorFn } from './validators';
export declare const formControlBinding: any;
/**
 * Binds a domain model to a form control.
 *
 * ### Usage
 *
 * `ngModel` binds an existing domain model to a form control. For a
 * two-way binding, use `[(ngModel)]` to ensure the model updates in
 * both directions.
 *
 *  ```typescript
 * @Component({
 *      selector: "search-comp",
 *      directives: [],
 *      template: `<input type='text' [(ngModel)]="searchQuery">`
 *      })
 * class SearchComp {
 *  searchQuery: string;
 * }
 *  ```
 *
 *  @experimental
 */
export declare class NgModel extends NgControl implements OnChanges, OnDestroy {
    private _parent;
    private _validators;
    private _asyncValidators;
    viewModel: any;
    model: any;
    name: string;
    options: {
        name?: string;
    };
    update: EventEmitter<{}>;
    constructor(_parent: ControlContainer, _validators: any[], _asyncValidators: any[], valueAccessors: ControlValueAccessor[]);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    readonly control: FormControl;
    readonly path: string[];
    readonly formDirective: any;
    readonly validator: ValidatorFn;
    readonly asyncValidator: AsyncValidatorFn;
    viewToModelUpdate(newValue: any): void;
    private _addControl();
    private _addStandaloneControl();
    private _checkName();
}
