import { BS, IBS, RxImStore, RxNStore, Subscribable } from "rx-store-types";
export declare const createObservableNormalStates: <S extends BS>(store: RxNStore<S> & Subscribable<S>) => <T extends (keyof S)[]>(keys: T) => { [K in keyof S]: ReturnType<S[K]>; };
export declare const createObservableImmutableStates: <S extends IBS>(store: RxImStore<S> & Subscribable<S>) => <T extends (keyof S)[]>(keys: T) => import("immutable").Map<keyof S, ReturnType<S[keyof S]>>;
