import { BS, IBS, RxImStore, RxNStore, Subscribable } from "rx-store-types";
declare const stateObserverManager: <S extends BS>(store: RxNStore<S> & Subscribable<S>) => {
    useObservableState: <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
    useObservableStates: <T_1 extends (keyof S)[]>(keys: T_1) => { [k in keyof S]: ReturnType<S[k]>; };
    useObservableSelector: <R>(computation: import("rx-store-types").Computation<R, S>) => NonNullable<R>;
    useObservableReducer: <K extends keyof S, T_2 extends string>(key: K, reducer: import("rx-store-types").Reducer<T_2, S, K>) => readonly [ReturnType<S[K]>, import("rx-store-types").Dispatch<ReturnType<S[K]>, T_2>];
    useObservableAsyncComputation: <R_1>(computation: import("rx-store-types").ComputationAsync<R_1, S>, fallback: R_1, comparator?: import("rx-store-types").Comparator<{ [K_1 in keyof S]: ReturnType<S[K_1]>; }> | undefined) => import("./interfaces").AsyncMetaStates<R_1>;
    useObservableAsyncReducer: <K_2 extends keyof S, T_3 extends string>(key: K_2, reducer: import("rx-store-types").AsyncReducer<T_3, S, K_2>, fallback?: ReturnType<S[K_2]> | undefined) => readonly [import("./interfaces").AsyncMetaStates<ReturnType<S[K_2]>>, import("rx-store-types").AsyncDispatch<T_3, S, K_2>];
};
declare const immutableStateObserverManager: <S extends IBS>(store: RxImStore<S> & Subscribable<S>) => {
    useImmutableObservableState: <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
    useImmutableObservableStates: <T_1 extends (keyof S)[]>(keys: T_1) => import("immutable").Record<Pick<S, T_1[number]> extends infer T_2 ? { [K in keyof T_2]: ReturnType<S[K]>; } : never> & Readonly<Pick<S, T_1[number]> extends infer T_2 ? { [K in keyof T_2]: ReturnType<S[K]>; } : never>;
    useImmutableObservableSelector: <R>(computation: import("rx-store-types").Computation<R, S>) => NonNullable<R>;
    useImmutableObservableReducer: <K_1 extends keyof S, T_3 extends string>(key: K_1, reducer: import("rx-store-types").Reducer<T_3, S, K_1>) => readonly [ReturnType<S[K_1]>, import("rx-store-types").Dispatch<ReturnType<S[K_1]>, T_3>];
    useImmutableObservableAsyncComputation: <R_1>(computation: import("rx-store-types").ComputationAsync<R_1, S>, fallback: R_1, comparator?: import("rx-store-types").Comparator<{ [K_2 in keyof S]: ReturnType<S[K_2]>; }> | undefined) => import("./interfaces").AsyncMetaStates<R_1>;
    useImmutableObservableAsyncReducer: <K_3 extends keyof S, T_4 extends string>(key: K_3, reducer: import("rx-store-types").AsyncReducer<T_4, S, K_3>, fallback?: ReturnType<S[K_3]> | undefined) => readonly [import("./interfaces").AsyncMetaStates<ReturnType<S[K_3]>>, import("rx-store-types").AsyncDispatch<T_4, S, K_3>];
};
export { stateObserverManager, immutableStateObserverManager };
