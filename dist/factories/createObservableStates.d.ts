import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { BS, IBS } from "rx-store-types";
export declare const createObservableStates: <S extends BS>(store: RxNStoreImpl<S>) => <T extends (keyof S)[]>(keys: T) => { [k in keyof S]: ReturnType<S[k]>; };
export declare const createObservableImmutableStates: <S extends IBS>(store: RxImStoreImpl<S>) => <T extends (keyof S)[]>(keys: T) => import("immutable").Map<keyof S, ReturnType<S[keyof S]>>;
