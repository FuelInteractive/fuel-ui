import { FormControl, FormGroup } from '../model';
import { AbstractFormGroupDirective } from './abstract_form_group_directive';
import { ControlContainer } from './control_container';
import { ControlValueAccessor } from './control_value_accessor';
import { NgControl } from './ng_control';
import { AsyncValidatorFn, ValidatorFn } from './validators';
export declare function controlPath(name: string, parent: ControlContainer): string[];
export declare function setUpControl(control: FormControl, dir: NgControl): void;
export declare function setUpFormGroup(control: FormGroup, dir: AbstractFormGroupDirective): void;
export declare function composeValidators(validators: any[]): ValidatorFn;
export declare function composeAsyncValidators(validators: any[]): AsyncValidatorFn;
export declare function isPropertyUpdated(changes: {
    [key: string]: any;
}, viewModel: any): boolean;
export declare function selectValueAccessor(dir: NgControl, valueAccessors: ControlValueAccessor[]): ControlValueAccessor;
