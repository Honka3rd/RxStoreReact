import {
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  BS,
  IBS,
  RxStore,
  RxNStore,
  RxImStore,
  Subscribable,
} from "rx-store-types";

export const createObservableState = <S extends BS>(
  store: RxStore<S> & Subscribable<S>
) => {
  const { observe, getState } = store;
  return <T extends keyof S>(key: T) => {
    const data = useSyncExternalStore(
      (onchange) => observe(key, onchange),
      () => getState(key)
    );

    const mutator = useCallback(
      (val: ReturnType<S[T]>) => {
        store.setState({ [key]: val } as {});
      },
      [key]
    );
    return useMemo(() => [data, mutator] as const, [data, mutator]);
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
