import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { useEffect, useMemo, useRef, useState } from "react";
import { BS, Computation } from "rx-store-types";

export const createObservableSelector = <S extends BS, R>(
  store: RxNStoreImpl<S> | RxImStoreImpl<S>
) => {
  const { withComputation } = store;

  return (computation: Computation<R, S>) => {
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
