import { BS, Computation, IBS, RxImStore, RxNStore, RxStore } from "rx-store-types";
export declare const createObservableSelector: <S extends BS>(store: RxStore<S>) => <R>(computation: Computation<R, S>) => NonNullable<R>;
export declare const createObservableNormalSelector: <S extends BS>(store: RxNStore<S>) => <R>(computation: Computation<R, S>) => NonNullable<R>;
export declare const createObservableImmutableSelector: <S extends IBS>(store: RxImStore<S>) => <R>(computation: Computation<R, S>) => NonNullable<R>;
