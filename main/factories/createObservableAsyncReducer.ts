import { useEffect, useMemo, useRef, useState } from "react";
import {
  AsyncReducer,
  BS,
  AsyncStates,
  IBS,
  RxStore,
  RxImStore,
  RxNStore,
} from "rx-store-types";
import { AsyncMetaStates } from "../interfaces";

export const createObservableAsyncReducer = <S extends BS>(
  store: RxStore<S>
) => {
  const { createAsyncDispatch } = store;
  return <K extends keyof S, T extends string>(
    key: K,
    reducer: AsyncReducer<T, S, K>,
    fallback?: ReturnType<S[K]>
  ) => {
    const reducerSingleton = useRef(reducer);

    const [state, set] = useState<AsyncMetaStates<ReturnType<S[K]>>>({
      value: store.getState(key),
      state: AsyncStates.FULFILLED,
      error: null,
    });

    const [dispatch, reduce] = useMemo(() => {
      return createAsyncDispatch({
        key,
        reducer: reducerSingleton.current,
        config: {
          start: () => {
            set((prev) => ({ ...prev, state: AsyncStates.PENDING, err: null }));
          },
          fail: (error, value) => {
            set({
              state: AsyncStates.ERROR,
              success: false,
              error,
              value,
            });
          },
          success: (value) => {
            set({
              state: AsyncStates.FULFILLED,
              success: true,
              error: null,
              value,
            });
          },
          fallback,
        },
      });
    }, [key]);

    useEffect(reduce, []);

    return useMemo(() => [state, dispatch] as const, [state, dispatch]);
  };
};

export const createObservableAsyncNormalReducer = <S extends BS>(
  store: RxNStore<S>
) => {
  return createObservableAsyncReducer(store);
};

export const createObservableAsyncImmutableReducer = <S extends IBS>(
  store: RxImStore<S>
) => {
  return createObservableAsyncReducer(store);
};
