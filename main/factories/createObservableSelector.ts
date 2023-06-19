import { useEffect, useMemo, useRef, useState } from "react";
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
    computationRef.current = computation;
    const computed = useMemo(
      () => withComputation({ computation: computationRef.current }),
      []
    );
    const [state, set] = useState(computed.get());
    useEffect(() => computed.observe(set), []);
    return state;
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
