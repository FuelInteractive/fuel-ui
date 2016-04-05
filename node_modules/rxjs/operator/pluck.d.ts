import { Observable } from '../Observable';
/**
 * Retrieves the value of a specified nested property from all elements in
 * the Observable sequence. If a property can't be resolved, it will return
 * `undefined` for that value.
 *
 * @param {...args} properties the nested properties to pluck
 * @return {Observable} Returns a new Observable sequence of property values
 * @method pluck
 * @owner Observable
 */
export declare function pluck<R>(...properties: string[]): Observable<R>;
export interface PluckSignature<T> {
    <R>(...properties: string[]): Observable<R>;
}
