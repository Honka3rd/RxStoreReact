import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { BS, Computation } from "rx-store-types";
export declare const createObservableSelector: <S extends BS, R>(store: RxNStoreImpl<S> | RxImStoreImpl<S>) => (computation: Computation<R, S>) => R;
