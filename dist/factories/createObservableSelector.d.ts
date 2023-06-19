import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { BS, Computation, IBS } from "rx-store-types";
export declare const createObservableSelector: <S extends BS>(store: RxNStoreImpl<S>) => <R>(computation: Computation<R, S>) => R;
export declare const createObservableImmutableSelector: <S extends IBS>(store: RxImStoreImpl<S>) => <R>(computation: Computation<R, S>) => R;
