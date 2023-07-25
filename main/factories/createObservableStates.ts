import Immutable from "immutable";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
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
  const { observeMultiple, getDefaults } = store;

  type Converted<T extends (keyof S)[]> = {
    [K in keyof Pick<S, T[number]>]: ReturnType<S[K]>;
  };

  const recordDefaultFactory = <T extends (keyof S)[]>(keys: T) => {
    return Immutable.Record<Converted<T>>(
      getDefaults(keys).toObject() as Converted<T>
    );
  };

  const recordFactory = <T extends (keyof S)[]>(states: Converted<T>) => {
    return Immutable.Record<Converted<T>>(states);
  };

  return <T extends (keyof S)[]>(keys: T) => {
    const factoryDefault = useCallback(() => recordDefaultFactory(keys), []);
    const [state, set] = useState(factoryDefault());
    useEffect(
      () =>
        observeMultiple<T[number]>(keys, (data) => {
          set(recordFactory(data));
        }),
      []
    );
    return state;
  };
};
