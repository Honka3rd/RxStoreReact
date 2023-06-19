import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { useEffect, useMemo, useRef, useState } from "react";
import { BS, Computation, IBS } from "rx-store-types";

export const createObservableSelector = <S extends BS>(
  store: RxNStoreImpl<S>
) => {
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

export const createObservableImmutableSelector = <S extends IBS>(
  store: RxImStoreImpl<S>
) => {
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
