import Immutable from "immutable";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BS, IBS, RxImStore, RxNStore, Subscribable } from "rx-store-types";

export const createObservableNormalStates = <S extends BS>(
  store: RxNStore<S> & Subscribable<S>
) => {
  const { observeMultiple, getDefaults } = store;
  return <T extends (keyof S)[]>(keys: T) => {
    const [state, set] = useState(getDefaults(keys));
    useEffect(() => observeMultiple(keys, set), []);
    return state;
  };
};

export const createObservableImmutableStates = <S extends IBS>(
  store: RxImStore<S> & Subscribable<S>
) => {
  const { observeMultiple, getDefaults } = store;

  type Converted<T extends (keyof S)[]> = {
    [K in keyof Pick<S, T[number]>]: ReturnType<S[K]>;
  };

  const recordFactory = <T extends (keyof S)[]>(keys: T) => {
    return Immutable.Record<Converted<T>>(
      getDefaults(keys).toObject() as Converted<T>
    );
  };

  return <T extends (keyof S)[]>(keys: T) => {
    const keysRef = useRef(keys);
    const factory = useCallback(
      recordFactory(keysRef.current),
      []
    );
    const [state, set] = useState(factory());
    useEffect(
      () =>
        observeMultiple<T[number]>(keys, (data) => {
          set(factory(data));
        }),
      []
    );
    return state;
  };
};
