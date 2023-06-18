import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { BS, IBS } from "rx-store-types";
declare const stateObserverManager: <S extends BS>(store: RxNStoreImpl<S>) => {
    useObservableState: (key: keyof S) => readonly [ReturnType<S[keyof S]>, (val: ReturnType<S[keyof S]>) => void];
    useObservableStates: (keys: (keyof S)[]) => { [k in keyof S]: ReturnType<S[k]>; } | import("immutable").Map<keyof S, ReturnType<S[keyof S]>>;
    useObservableSelector: (computation: import("rx-store-types").Computation<unknown, S>) => unknown;
    useObservableReducer: <K extends keyof S, T extends string, P = void>(key: K, reducer: import("rx-store-types").Reducer<T, P, S, K>) => (ReturnType<S[keyof S]> | import("rx-store-types").Dispatch<P, T>)[];
    useObservableAsyncComputation: (computation: import("rx-store-types").ComputationAsync<unknown, S>, defaultVal: unknown, comparator?: import("rx-store-types").Comparator<{ [K_1 in keyof S]: ReturnType<S[K_1]>; }> | undefined) => import("./interfaces").AsyncMetaStates<unknown>;
    useObservableAsyncReducer: <K_2 extends keyof S, T_1 extends string, P_1 = void>(key: K_2, reducer: import("rx-store-types").AsyncReducer<T_1, P_1, S, K_2>) => (import("./interfaces").AsyncMetaStates<ReturnType<S[K_2]>> | ((action: import("rx-store-types").Action<P_1, T_1>) => void))[];
};
declare const immutableStateObserverManager: <S extends IBS>(store: RxImStoreImpl<S>) => {
    useObservableState: (key: keyof S) => readonly [ReturnType<S[keyof S]>, (val: ReturnType<S[keyof S]>) => void];
    useObservableStates: (keys: (keyof S)[]) => import("immutable").Map<keyof S, ReturnType<S[keyof S]>> | { [k in keyof S]: ReturnType<S[k]>; };
    useObservableSelector: (computation: import("rx-store-types").Computation<unknown, S>) => unknown;
    useObservableReducer: <K extends keyof S, T extends string, P = void>(key: K, reducer: import("rx-store-types").Reducer<T, P, S, K>) => (ReturnType<S[keyof S]> | import("rx-store-types").Dispatch<P, T>)[];
    useObservableAsyncComputation: (computation: import("rx-store-types").ComputationAsync<unknown, S>, defaultVal: unknown, comparator?: import("rx-store-types").Comparator<{ [K_1 in keyof S]: ReturnType<S[K_1]>; }> | undefined) => import("./interfaces").AsyncMetaStates<unknown>;
    useObservableAsyncReducer: <K_2 extends keyof S, T_1 extends string, P_1 = void>(key: K_2, reducer: import("rx-store-types").AsyncReducer<T_1, P_1, S, K_2>) => (import("./interfaces").AsyncMetaStates<ReturnType<S[K_2]>> | ((action: import("rx-store-types").Action<P_1, T_1>) => void))[];
};
export { stateObserverManager, immutableStateObserverManager };
