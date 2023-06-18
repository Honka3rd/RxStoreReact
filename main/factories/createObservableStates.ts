import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { useEffect, useState } from "react";
import { BS } from "rx-store-types";

export const createObservableStates = <S extends BS, T extends (keyof S)[]>(
  store: RxNStoreImpl<S> | RxImStoreImpl<S>
) => {
  const { observeMultiple, getDefaults } = store;
  return (keys: T) => {
    const [state, set] = useState(getDefaults(keys));
    useEffect(() => observeMultiple(keys, set), []);
    return state;
  };
};
