import Immutable from "immutable";
import { BS, IBS, RxImStore, RxNStore, Subscribable } from "rx-store-types";
export declare const createObservableNormalStates: <S extends BS>(store: RxNStore<S> & Subscribable<S>) => <T extends (keyof S)[]>(keys: T) => { [K in keyof S]: ReturnType<S[K]>; };
export declare const createObservableImmutableStates: <S extends IBS>(store: RxImStore<S> & Subscribable<S>) => <T extends (keyof S)[]>(keys: T) => Immutable.Record<Pick<S, T[number]> extends infer T_1 ? { [K in keyof T_1]: ReturnType<S[K]>; } : never> & Readonly<Pick<S, T[number]> extends infer T_1 ? { [K in keyof T_1]: ReturnType<S[K]>; } : never>;
