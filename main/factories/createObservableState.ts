import { useCallback, useEffect, useMemo, useState } from "react";
import { BS, IBS, RxStore, RxNStore, RxImStore, Subscribable } from "rx-store-types";

export const createObservableState = <S extends BS>(
  store: RxStore<S> & Subscribable<S>
) => {
  const { observe, getDefault } = store;
  return <T extends keyof S>(key: T) => {
    const [state, set] = useState(getDefault(key));
    useEffect(() => observe(key, set), []);

    const mutator = useCallback(
      (val: ReturnType<S[T]>) => {
        store.setState({ [key]: val } as {});
      },
      [key]
    );
    return useMemo(() => [state, mutator] as const, [state, mutator]);
  };
};

export const createObservableNormalState = <S extends BS>(
  store: RxNStore<S> & Subscribable<S>
) => {
  return createObservableState(store);
};

export const createObservableImmutableState = <S extends IBS>(
  store: RxImStore<S> & Subscribable<S>
) => {
  return createObservableState(store);
};
