import { BS, IBS } from "rx-store-types";
import { RxNStoreImpl } from "rx-store-core/dist/main/normal";
import { RxImStoreImpl } from "rx-store-core/dist/main/immutable";
declare const stateObserverManager: <S extends BS>(store: RxNStoreImpl<S>) => {
    useObservableState: <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
    useObservableStates: <T_1 extends keyof S>(keys: readonly T_1[]) => { [k in T_1]: ReturnType<S[k]>; };
    useObservableSelector: <R>(computation: import("rx-store-types").Computation<R, S>) => NonNullable<R>;
    useObservableReducer: <K extends keyof S, T_2 extends string>(key: K, reducer: import("rx-store-types").Reducer<T_2, S, K>) => readonly [ReturnType<S[K]>, import("rx-store-types").Dispatch<ReturnType<S[K]>, T_2>];
    useObservableAsyncComputation: <R_1>(computation: import("rx-store-types").ComputationAsync<R_1, S>, fallback: R_1, comparator?: import("rx-store-types").Comparator<{ [K_1 in keyof S]: ReturnType<S[K_1]>; }> | undefined) => import("./interfaces").AsyncMetaStates<R_1>;
    useObservableAsyncReducer: <K_2 extends keyof S, T_3 extends string>(key: K_2, reducer: import("rx-store-types").AsyncReducer<T_3, S, K_2>, fallback?: ReturnType<S[K_2]> | undefined) => readonly [import("./interfaces").AsyncMetaStates<ReturnType<S[K_2]>>, import("rx-store-types").AsyncDispatch<T_3, S, K_2>];
};
declare const immutableStateObserverManager: <S extends IBS>(store: RxImStoreImpl<S>) => {
    useImmutableObservableState: <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
    useImmutableObservableStates: <T_1 extends keyof S>(keys: readonly T_1[]) => import("immutable").Record<{ [K in T_1]: ReturnType<S[K]>; }> & Readonly<{ [K in T_1]: ReturnType<S[K]>; }>;
    useImmutableObservableSelector: <R>(computation: import("rx-store-types").Computation<R, S>) => NonNullable<R>;
    useImmutableObservableReducer: <K_1 extends keyof S, T_2 extends string>(key: K_1, reducer: import("rx-store-types").Reducer<T_2, S, K_1>) => readonly [ReturnType<S[K_1]>, import("rx-store-types").Dispatch<ReturnType<S[K_1]>, T_2>];
    useImmutableObservableAsyncComputation: <R_1>(computation: import("rx-store-types").ComputationAsync<R_1, S>, fallback: R_1, comparator?: import("rx-store-types").Comparator<{ [K_2 in keyof S]: ReturnType<S[K_2]>; }> | undefined) => import("./interfaces").AsyncMetaStates<R_1>;
    useImmutableObservableAsyncReducer: <K_3 extends keyof S, T_3 extends string>(key: K_3, reducer: import("rx-store-types").AsyncReducer<T_3, S, K_3>, fallback?: ReturnType<S[K_3]> | undefined) => readonly [import("./interfaces").AsyncMetaStates<ReturnType<S[K_3]>>, import("rx-store-types").AsyncDispatch<T_3, S, K_3>];
};
export { stateObserverManager, immutableStateObserverManager };
