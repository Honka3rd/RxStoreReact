import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { BS, IBS, Reducer } from "rx-store-types";
export declare const createObservableReducer: <S extends BS>(store: RxNStoreImpl<S>) => <K extends keyof S, T extends string, P = void>(key: K, reducer: Reducer<T, P, S, K>) => (ReturnType<S[K]> | import("rx-store-types").Dispatch<P, T>)[];
export declare const createObservableImmutableReducer: <S extends IBS>(store: RxImStoreImpl<S>) => <K extends keyof S, T extends string, P = void>(key: K, reducer: Reducer<T, P, S, K>) => (ReturnType<S[K]> | import("rx-store-types").Dispatch<P, T>)[];
