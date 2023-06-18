import { AsyncStates, BS } from "rx-store-types";
import { Observable } from "rxjs";
export type AsyncSelectorStates<R> = {
    state: AsyncStates;
    val: R;
    err: any;
};
export type ComputationAsyncObservable<R, S extends BS> = (states: {
    [K in keyof S]: ReturnType<S[K]>;
}) => Observable<R>;
