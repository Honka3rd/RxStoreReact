import { Record } from "immutable";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BS,
  IBS,
  RxImStore,
  RxNStore,
  Subscribable,
  ConstraintKeys,
} from "rx-store-types";

export const createObservableNormalStates = <S extends BS>(
  store: RxNStore<S> & Subscribable<S>
) => {
  const { observeMultiple, getDefaults } = store;
  return <T extends keyof S>(keys: ConstraintKeys<T>) => {
    const keysRef = useRef(keys);
    const [state, set] = useState(getDefaults(keysRef.current));
    useEffect(() => observeMultiple(keysRef.current, set), []);
    return state;
  };
};

export const createObservableImmutableStates = <S extends IBS>(
  store: RxImStore<S> & Subscribable<S>
) => {
  const { observeMultiple, getDefaults } = store;

  const recordFactory = <T extends keyof S>(keys: ConstraintKeys<T>) => {
    return Record(
      getDefaults(keys).toObject()
    );
  };

  return <T extends keyof S>(keys: ConstraintKeys<T>) => {
    const keysRef = useRef(keys);
    const factory = useCallback(recordFactory(keysRef.current), []);
    const [state, set] = useState(factory());
    useEffect(
      () =>
        observeMultiple(keysRef.current, (data) => {
          set(factory(data));
        }),
      []
    );
    return state;
  };
};
