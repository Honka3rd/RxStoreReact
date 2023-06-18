import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BS } from "rx-store-types";

export const createObservableState = <S extends BS, T extends keyof S>(
  store: RxNStoreImpl<S> | RxImStoreImpl<S>
) => {
  const { observe, getDefault } = store;
  return (key: T) => {
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
