import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { useEffect, useState } from "react";
import { BS, IBS } from "rx-store-types";

export const createObservableStates = <S extends BS>(
  store: RxNStoreImpl<S>
) => {
  const { observeMultiple, getDefaults } = store;
  return <T extends (keyof S)[]>(keys: T) => {
    const [state, set] = useState(getDefaults(keys));
    useEffect(() => observeMultiple(keys, set), []);
    return state;
  };
};

export const createObservableImmutableStates = <S extends IBS>(
  store: RxImStoreImpl<S>
) => {
  const { observeMultiple, getDefaults } = store;
  return <T extends (keyof S)[]>(keys: T) => {
    const [state, set] = useState(getDefaults(keys));
    useEffect(
      () =>
        observeMultiple(keys, (data) => {
          // @ts-ignore
          set(data);
        }),
      []
    );
    return state;
  };
};
