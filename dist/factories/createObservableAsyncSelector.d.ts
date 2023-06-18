import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { BS, Comparator, ComputationAsync } from "rx-store-types";
import { AsyncMetaStates } from "../interfaces";
export declare const createObservableAsyncSelector: <S extends BS, R>(store: RxNStoreImpl<S> | RxImStoreImpl<S>) => (computation: ComputationAsync<R, S>, defaultVal: R, comparator?: Comparator<{ [K in keyof S]: ReturnType<S[K]>; }> | undefined) => AsyncMetaStates<R>;
