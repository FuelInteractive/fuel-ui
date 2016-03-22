import { UsingObservable } from '../../observable/UsingObservable';
declare module '../../Observable' {
    namespace Observable {
        let using: typeof UsingObservable.create;
    }
}
