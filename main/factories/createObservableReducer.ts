import { useMemo, useRef } from "react";
import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { BS, Reducer } from "rx-store-types";
import { createObservableState } from "./createObservableState";

export const createObservableReducer = <S extends BS>(
  store: RxNStoreImpl<S> | RxImStoreImpl<S>
) => {
  const { createDispatch } = store;
  const useObservableState = createObservableState(store);
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

    const [payload] = useObservableState(key);

    return useMemo(() => [payload, dispatch], [payload, dispatch]);
  };
};
