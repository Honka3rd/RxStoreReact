import { AsyncReducer, BS, Action, IBS, RxStore, RxImStore, RxNStore } from "rx-store-types";
import { AsyncMetaStates } from "../interfaces";
export declare const createObservableAsyncReducer: <S extends BS>(store: RxStore<S>) => <K extends keyof S, T extends string, P = void>(key: K, reducer: AsyncReducer<T, P, S, K>) => (AsyncMetaStates<ReturnType<S[K]>> | ((action: Action<P, T>) => void))[];
export declare const createObservableAsyncNormalReducer: <S extends BS>(store: RxNStore<S>) => <K extends keyof S, T extends string, P = void>(key: K, reducer: AsyncReducer<T, P, S, K>) => (AsyncMetaStates<ReturnType<S[K]>> | ((action: Action<P, T>) => void))[];
export declare const createObservableAsyncImmutableReducer: <S extends IBS>(store: RxImStore<S>) => <K extends keyof S, T extends string, P = void>(key: K, reducer: AsyncReducer<T, P, S, K>) => (AsyncMetaStates<ReturnType<S[K]>> | ((action: Action<P, T>) => void))[];
