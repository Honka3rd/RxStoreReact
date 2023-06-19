import { useEffect, useMemo, useRef, useState } from "react";
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
  const { createDispatch, getDefault, observe } = store;
  return <K extends keyof S, T extends string, P = void>(
    key: K,
    reducer: Reducer<T, P, S, K>
  ) => {
    const reducerSingleton = useRef(reducer);
    reducerSingleton.current = reducer;

    const dispatch = useMemo(() => {
      return createDispatch({
        key,
        reducer: reducerSingleton.current,
      });
    }, [key]);

    const [payload, set] = useState(getDefault(key));
    useEffect(() => observe(key, set), []);

    return useMemo(() => [payload, dispatch], [payload, dispatch]);
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
