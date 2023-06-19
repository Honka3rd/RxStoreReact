import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BS, IBS } from "rx-store-types";

export const createObservableState = <S extends BS>(
  store: RxNStoreImpl<S>
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

export const createObservableImmutableState = <S extends IBS>(
  store: RxImStoreImpl<S>
) => {
  const { observe, getDefault } = store;
  return <T extends keyof S>(key: T) => {
    const [state, set] = useState<ReturnType<S[T]>>(getDefault(key));
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
