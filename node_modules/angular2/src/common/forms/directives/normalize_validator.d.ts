import { Validator } from './validators';
import { Control } from "../model";
export declare type ctrlFunc = ((c: Control) => {
    [key: string]: any;
});
export declare function normalizeValidator(validator: (ctrlFunc | Validator)): ctrlFunc;
