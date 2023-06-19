import { BS, IBS, RxImStore, RxNStore, Subscribable } from "rx-store-types";
export declare const createObservableStates: <S extends BS>(store: RxNStore<S> & Subscribable<S>) => <T extends (keyof S)[]>(keys: T) => { [k in keyof S]: ReturnType<S[k]>; };
export declare const createObservableImmutableStates: <S extends IBS>(store: RxImStore<S> & Subscribable<S>) => <T extends (keyof S)[]>(keys: T) => import("immutable").Map<keyof S, ReturnType<S[keyof S]>>;
