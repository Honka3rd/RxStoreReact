import { useMemo, useRef } from "react";
import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { AsyncReducer, BS } from "rx-store-types";
import { createObservableState } from "./createObservableState";

export const createObservableAsyncReducer = <S extends BS>(
  store: RxNStoreImpl<S> | RxImStoreImpl<S>
) => {
  const { createAsyncDispatch } = store;
  const useObservableState = createObservableState(store);
  return <K extends keyof S, T extends string, P = void>(
    key: K,
    reducer: AsyncReducer<T, P, S, K>
  ) => {
    const reducerSingleton = useRef(reducer);
    reducerSingleton.current = reducer;

    const dispatch = useMemo(() => {
      return createAsyncDispatch({
        key,
        reducer: reducerSingleton.current,
      });
    }, [key]);

    const payload = useObservableState(key);

    return useMemo(() => [payload, dispatch], [payload, dispatch]);
  };
};
