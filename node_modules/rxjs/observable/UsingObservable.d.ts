import { Observable } from '../Observable';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
export declare class UsingObservable<T> extends Observable<T> {
    private resourceFactory;
    private observableFactory;
    static create<T>(resourceFactory: () => Subscription, observableFactory: (resource: Subscription) => Observable<T>): Observable<T>;
    constructor(resourceFactory: () => Subscription, observableFactory: (resource: Subscription) => Observable<T>);
    protected _subscribe(subscriber: Subscriber<T>): Subscription | Function | void;
}
