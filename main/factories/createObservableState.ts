import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { useEffect, useState } from "react";
import { BS } from "rx-store-types";

export const createObservableState = <S extends BS, T extends keyof S>(
  store: RxNStoreImpl<S> | RxImStoreImpl<S>
) => {
  const { observe, getDefault } = store;
  return (key: T) => {
    const [state, set] = useState(getDefault(key));
    useEffect(() => observe(key, set), []);
    return state;
  };
};
