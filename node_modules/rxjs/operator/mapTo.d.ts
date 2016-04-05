import { Observable } from '../Observable';
/**
 * Maps every value to the same value every time.
 *
 * <img src="./img/mapTo.png" width="100%">
 *
 * @param {any} value the value to map each incoming value to
 * @return {Observable} an observable of the passed value that emits every time the source does
 * @method mapTo
 * @owner Observable
 */
export declare function mapTo<T, R>(value: R): Observable<R>;
export interface MapToSignature<T> {
    <R>(value: R): Observable<R>;
}
