import { BS, Comparator, ComputationAsync, IBS, RxImStore, RxNStore, RxStore } from "rx-store-types";
import { AsyncMetaStates } from "../interfaces";
export declare const createObservableAsyncSelector: <S extends BS>(store: RxStore<S>) => <R>(computation: ComputationAsync<R, S>, fallback: R, comparator?: Comparator<{ [K in keyof S]: ReturnType<S[K]>; }> | undefined) => AsyncMetaStates<R>;
export declare const createObservableAsyncNormalSelector: <S extends BS>(store: RxNStore<S>) => <R>(computation: ComputationAsync<R, S>, fallback: R, comparator?: Comparator<{ [K in keyof S]: ReturnType<S[K]>; }> | undefined) => AsyncMetaStates<R>;
export declare const createObservableAsyncImmutableSelector: <S extends IBS>(store: RxImStore<S>) => <R>(computation: ComputationAsync<R, S>, fallback: R, comparator?: Comparator<{ [K in keyof S]: ReturnType<S[K]>; }> | undefined) => AsyncMetaStates<R>;
