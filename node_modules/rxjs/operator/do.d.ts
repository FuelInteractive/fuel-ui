import { Observable } from '../Observable';
import { PartialObserver } from '../Observer';
/**
 * Returns a mirrored Observable of the source Observable, but modified so that the provided Observer is called
 * for every item emitted by the source.
 * This operator is useful for debugging your observables for the correct values or performing other side effects.
 * @param {Observer|function} [nextOrObserver] a normal observer callback or callback for onNext.
 * @param {function} [error] callback for errors in the source.
 * @param {function} [complete] callback for the completion of the source.
 * @reurns {Observable} a mirrored Observable with the specified Observer or callback attached for each item.
 * @method do
 * @owner Observable
 */
export declare function _do<T>(nextOrObserver?: PartialObserver<T> | ((x: T) => void), error?: (e: any) => void, complete?: () => void): Observable<T>;
export interface DoSignature<T> {
    (next: (x: T) => void, error?: (e: any) => void, complete?: () => void): Observable<T>;
    (observer: PartialObserver<T>): Observable<T>;
}
