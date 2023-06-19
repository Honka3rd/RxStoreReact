import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { AsyncReducer, BS, Action, IBS } from "rx-store-types";
import { AsyncMetaStates } from "../interfaces";
export declare const createObservableAsyncReducer: <S extends BS>(store: RxNStoreImpl<S>) => <K extends keyof S, T extends string, P = void>(key: K, reducer: AsyncReducer<T, P, S, K>) => (AsyncMetaStates<ReturnType<S[K]>> | ((action: Action<P, T>) => void))[];
export declare const createObservableAsyncImmutableReducer: <S extends IBS>(store: RxImStoreImpl<S>) => <K extends keyof S, T extends string, P = void>(key: K, reducer: AsyncReducer<T, P, S, K>) => (AsyncMetaStates<ReturnType<S[K]>> | ((action: Action<P, T>) => void))[];
