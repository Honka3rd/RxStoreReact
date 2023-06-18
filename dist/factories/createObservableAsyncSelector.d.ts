import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { BS, Comparator } from "rx-store-types";
import { AsyncSelectorStates, ComputationAsyncObservable } from "../interfaces";
export declare const createObservableAsyncSelector: <S extends BS, R>(store: RxNStoreImpl<S> | RxImStoreImpl<S>) => (computation: ComputationAsyncObservable<R, S>, defaultVal: R, comparator?: Comparator<{ [K in keyof S]: ReturnType<S[K]>; }> | undefined) => AsyncSelectorStates<R>;
