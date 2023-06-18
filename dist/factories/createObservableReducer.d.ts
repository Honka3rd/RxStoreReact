import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { BS, Reducer } from "rx-store-types";
export declare const createObservableReducer: <S extends BS>(store: RxNStoreImpl<S> | RxImStoreImpl<S>) => <K extends keyof S, T extends string, P = void>(key: K, reducer: Reducer<T, P, S, K>) => (ReturnType<S[keyof S]> | import("rx-store-types").Dispatch<P, T>)[];
