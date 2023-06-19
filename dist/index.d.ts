import { BS, IBS, RxImStore, RxNStore, Subscribable } from "rx-store-types";
declare const stateObserverManager: <S extends BS>(store: RxNStore<S> & Subscribable<S>) => {
    useObservableState: <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
    useObservableStates: <T_1 extends (keyof S)[]>(keys: T_1) => { [k in keyof S]: ReturnType<S[k]>; };
    useObservableSelector: <R>(computation: import("rx-store-types").Computation<R, S>) => R | undefined;
    useObservableReducer: <K extends keyof S, T_2 extends string, P = void>(key: K, reducer: import("rx-store-types").Reducer<T_2, P, S, K>) => (ReturnType<S[K]> | import("rx-store-types").Dispatch<P, T_2>)[];
    useObservableAsyncComputation: <R_1>(computation: import("rx-store-types").ComputationAsync<R_1, S>, defaultVal: R_1, comparator?: import("rx-store-types").Comparator<{ [K_1 in keyof S]: ReturnType<S[K_1]>; }> | undefined) => import("./interfaces").AsyncMetaStates<R_1>;
    useObservableAsyncReducer: <K_2 extends keyof S, T_3 extends string, P_1 = void>(key: K_2, reducer: import("rx-store-types").AsyncReducer<T_3, P_1, S, K_2>) => (import("./interfaces").AsyncMetaStates<ReturnType<S[K_2]>> | ((action: import("rx-store-types").Action<P_1, T_3>) => void))[];
};
declare const immutableStateObserverManager: <S extends IBS>(store: RxImStore<S> & Subscribable<S>) => {
    useImmutableObservableState: <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
    useImmutableObservableStates: <T_1 extends (keyof S)[]>(keys: T_1) => import("immutable").Map<keyof S, ReturnType<S[keyof S]>>;
    useImmutableObservableSelector: <R>(computation: import("rx-store-types").Computation<R, S>) => R | undefined;
    useImmutableObservableReducer: <K extends keyof S, T_2 extends string, P = void>(key: K, reducer: import("rx-store-types").Reducer<T_2, P, S, K>) => (ReturnType<S[K]> | import("rx-store-types").Dispatch<P, T_2>)[];
    useImmutableObservableAsyncComputation: <R_1>(computation: import("rx-store-types").ComputationAsync<R_1, S>, defaultVal: R_1, comparator?: import("rx-store-types").Comparator<{ [K_1 in keyof S]: ReturnType<S[K_1]>; }> | undefined) => import("./interfaces").AsyncMetaStates<R_1>;
    useImmutableObservableAsyncReducer: <K_2 extends keyof S, T_3 extends string, P_1 = void>(key: K_2, reducer: import("rx-store-types").AsyncReducer<T_3, P_1, S, K_2>) => (import("./interfaces").AsyncMetaStates<ReturnType<S[K_2]>> | ((action: import("rx-store-types").Action<P_1, T_3>) => void))[];
};
export { stateObserverManager, immutableStateObserverManager };
