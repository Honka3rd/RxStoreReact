import { useCallback, useMemo, useRef, useState } from "react";
import {
  AsyncReducer,
  BS,
  Action,
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

    const dispatchAsync = useMemo(() => {
      return createAsyncDispatch({
        key,
        reducer: reducerSingleton.current,
      });
    }, [key]);

    const [state, set] = useState<AsyncMetaStates<ReturnType<S[K]>>>({
      value: store.getState(key),
      state: AsyncStates.FULFILLED,
      error: null,
    });

    const dispatch = useCallback(
      (action: Action<ReturnType<S[K]>, T>) => {
        dispatchAsync(action, {
          start: () => {
            set((prev) => ({ ...prev, state: AsyncStates.PENDING, err: null }));
          },
          fail: (error) => {
            set({
              state: AsyncStates.ERROR,
              success: false,
              error,
              value: fallback === undefined ? store.getDefault(key) : fallback,
            });
          },
          success: (r) => {
            set({
              state: AsyncStates.FULFILLED,
              success: true,
              error: null,
              value: r,
            });
          },
        });
      },
      [dispatchAsync]
    );

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
