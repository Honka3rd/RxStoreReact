import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  BS,
  IBS,
  Reducer,
  RxImStore,
  RxNStore,
  RxStore,
  Subscribable,
} from "rx-store-types";

export const createObservableReducer = <S extends BS>(
  store: RxStore<S> & Subscribable<S>
) => {
  const { createDispatch, getState, observe } = store;
  return <K extends keyof S, T extends string>(
    key: K,
    reducer: Reducer<T, S, K>
  ) => {
    const reducerSingleton = useRef(reducer);

    const dispatch = useMemo(() => {
      return createDispatch({
        key,
        reducer: reducerSingleton.current,
      });
    }, [key]);

    const payload = useSyncExternalStore(
      (onchange) => observe(key, onchange),
      () => getState(key)
    );

    return useMemo(() => [payload, dispatch] as const, [payload, dispatch]);
  };
};

export const createObservableNormalReducer = <S extends BS>(
  store: RxNStore<S> & Subscribable<S>
) => {
  return createObservableReducer(store);
};

export const createObservableImmutableReducer = <S extends IBS>(
  store: RxImStore<S> & Subscribable<S>
) => {
  return createObservableReducer(store);
};
