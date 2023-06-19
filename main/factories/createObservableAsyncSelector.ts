import { useEffect, useMemo, useRef, useState } from "react";
import {
  AsyncStates,
  BS,
  Comparator,
  ComputationAsync,
  IBS,
  RxImStore,
  RxNStore,
  RxStore,
} from "rx-store-types";
import { AsyncMetaStates } from "../interfaces";

export const createObservableAsyncSelector = <S extends BS>(
  store: RxStore<S>
) => {
  const { withAsyncComputation } = store;
  return <R>(
    computation: ComputationAsync<R, S>,
    defaultVal: R,
    comparator?: Comparator<{ [K in keyof S]: ReturnType<S[K]> }>
  ) => {
    const computationRef = useRef(computation);
    const comparatorRef = useRef(comparator);

    computationRef.current = computation;
    comparatorRef.current = comparator;

    const computed = useMemo(
      () =>
        withAsyncComputation({
          computation: computationRef.current,
          comparator: comparatorRef.current,
        }),
      []
    );
    const [state, set] = useState<AsyncMetaStates<R>>({
      state: computed.get().state,
      val: computed.get().value ?? defaultVal,
      err: null,
    });

    useEffect(
      () =>
        computed.observe(
          (r) => {
            if (r.success) {
              set({
                state: AsyncStates.FULFILLED,
                val: r.result,
                err: null,
              });
              return;
            }
            set({
              state: AsyncStates.ERROR,
              val: computed.get().value ?? defaultVal,
              err: r.cause,
            });
          },
          () => {
            set({
              state: AsyncStates.PENDING,
              val: computed.get().value ?? defaultVal,
              err: null,
            });
          }
        ),
      [defaultVal]
    );

    return state;
  };
};

export const createObservableAsyncNormalSelector = <S extends BS>(
  store: RxNStore<S>
) => {
  return createObservableAsyncSelector(store);
};

export const createObservableAsyncImmutableSelector = <S extends IBS>(
  store: RxImStore<S>
) => {
  return createObservableAsyncSelector(store);
};
