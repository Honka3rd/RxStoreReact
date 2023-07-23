import { useSyncExternalStore } from "react";
import { BS, IBS, RxImStore, RxNStore, Subscribable } from "rx-store-types";

export const createObservableNormalStates = <S extends BS>(
  store: RxNStore<S> & Subscribable<S>
) => {
  const { observeMultiple, getStates } = store;
  return <T extends (keyof S)[]>(keys: T) => {
    const data = useSyncExternalStore(
      (onchange) => observeMultiple(keys, onchange),
      () => getStates(keys)
    );
    return data;
  };
};

export const createObservableImmutableStates = <S extends IBS>(
  store: RxImStore<S> & Subscribable<S>
) => {
  const { observeMultiple, getStates } = store;
  return <T extends (keyof S)[]>(keys: T) => {
    const data = useSyncExternalStore(
      (onchange) => observeMultiple(keys, onchange),
      () => getStates(keys)
    );
    return data;
  };
};
