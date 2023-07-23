import { useMemo, useRef, useSyncExternalStore } from "react";
import {
  BS,
  Computation,
  IBS,
  RxImStore,
  RxNStore,
  RxStore,
} from "rx-store-types";

export const createObservableSelector = <S extends BS>(store: RxStore<S>) => {
  const { withComputation } = store;

  return <R>(computation: Computation<R, S>) => {
    const computationRef = useRef(computation);
    const computed = useMemo(
      () => withComputation({ computation: computationRef.current }),
      []
    );
    const data = useSyncExternalStore(
      (onchange) => computed.observe(onchange),
      () => computed.get()!
    );
    return data;
  };
};

export const createObservableNormalSelector = <S extends BS>(
  store: RxNStore<S>
) => {
  return createObservableSelector(store);
};

export const createObservableImmutableSelector = <S extends IBS>(
  store: RxImStore<S>
) => {
  return createObservableSelector(store);
};
