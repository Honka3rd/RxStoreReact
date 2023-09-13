import { Record } from "immutable";
import { BS, IBS, RxImStore, RxNStore, Subscribable, ConstraintKeys } from "rx-store-types";
export declare const createObservableNormalStates: <S extends BS>(store: RxNStore<S> & Subscribable<S>) => <T extends keyof S>(keys: readonly T[]) => { [k in T]: ReturnType<S[k]>; };
export declare const createObservableImmutableStates: <S extends IBS>(store: RxImStore<S> & Subscribable<S>) => <T extends keyof S>(keys: readonly T[]) => Record<{ [K in T]: ReturnType<S[K]>; }> & Readonly<{ [K in T]: ReturnType<S[K]>; }>;
