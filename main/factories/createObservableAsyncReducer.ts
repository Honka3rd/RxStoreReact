import { useCallback, useMemo, useRef, useState } from "react";
import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { AsyncReducer, BS, Action, AsyncStates, IBS } from "rx-store-types";
import { AsyncMetaStates } from "../interfaces";

export const createObservableAsyncReducer = <S extends BS>(
  store: RxNStoreImpl<S>
) => {
  const { createAsyncDispatch } = store;
  return <K extends keyof S, T extends string, P = void>(
    key: K,
    reducer: AsyncReducer<T, P, S, K>
  ) => {
    const reducerSingleton = useRef(reducer);
    reducerSingleton.current = reducer;

    const dispatchAsync = useMemo(() => {
      return createAsyncDispatch({
        key,
        reducer: reducerSingleton.current,
      });
    }, [key]);

    const [state, set] = useState<AsyncMetaStates<ReturnType<S[K]>>>({
      val: store.getDefault(key),
      state: AsyncStates.PENDING,
      err: null,
    });

    const dispatch = useCallback(
      (action: Action<P, T>) => {
        dispatchAsync(action, {
          start: () => {
            set((prev) => ({ ...prev, state: AsyncStates.PENDING, err: null }));
          },
          fail: (err) => {
            set((prev) => ({ ...prev, state: AsyncStates.ERROR, err }));
          },
          success: (r) => {
            set(() => ({
              state: AsyncStates.FULFILLED,
              err: null,
              val: r,
            }));
          },
        });
      },
      [dispatchAsync]
    );

    return useMemo(() => [state, dispatch], [state, dispatch]);
  };
};

export const createObservableAsyncImmutableReducer = <S extends IBS>(
  store: RxImStoreImpl<S>
) => {
  const { createAsyncDispatch } = store;
  return <K extends keyof S, T extends string, P = void>(
    key: K,
    reducer: AsyncReducer<T, P, S, K>
  ) => {
    const reducerSingleton = useRef(reducer);
    reducerSingleton.current = reducer;

    const dispatchAsync = useMemo(() => {
      return createAsyncDispatch({
        key,
        reducer: reducerSingleton.current,
      });
    }, [key]);

    const [state, set] = useState<AsyncMetaStates<ReturnType<S[K]>>>({
      val: store.getDefault(key),
      state: AsyncStates.PENDING,
      err: null,
    });

    const dispatch = useCallback(
      (action: Action<P, T>) => {
        dispatchAsync(action, {
          start: () => {
            set((prev) => ({ ...prev, state: AsyncStates.PENDING, err: null }));
          },
          fail: (err) => {
            set((prev) => ({ ...prev, state: AsyncStates.ERROR, err }));
          },
          success: (r) => {
            set(() => ({
              state: AsyncStates.FULFILLED,
              err: null,
              val: r,
            }));
          },
        });
      },
      [dispatchAsync]
    );

    return useMemo(() => [state, dispatch], [state, dispatch]);
  };
};
