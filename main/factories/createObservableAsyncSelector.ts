import { useMemo, useRef, useSyncExternalStore } from "react";
import {
  AsyncGet,
  AsyncStates,
  BS,
  Comparator,
  ComputationAsync,
  ComputedAsync,
  IBS,
  RxImStore,
  RxNStore,
  RxStore,
} from "rx-store-types";
import { AsyncMetaStates } from "../interfaces";

const cachedGet = <R, S extends BS>(computed: ComputedAsync<R, S>) => {
  let previous: AsyncGet<R>;
  return () => {
    const current = computed.get();
    if (
      current.state === previous?.state &&
      current.value === previous?.value
    ) {
      return previous;
    }
    previous = current;
    return current;
  };
};

export const createObservableAsyncSelector = <S extends BS>(
  store: RxStore<S>
) => {
  const { withAsyncComputation } = store;
  return <R>(
    computation: ComputationAsync<R, S>,
    fallback: R,
    comparator?: Comparator<{ [K in keyof S]: ReturnType<S[K]> }>
  ) => {
    const computationSingleton = useRef(computation);
    const comparatorSingleton = useRef(comparator);

    const computed = useMemo(
      () =>
        withAsyncComputation({
          computation: computationSingleton.current,
          comparator: comparatorSingleton.current,
        }),
      []
    );

    const data = useSyncExternalStore(
      (onchange) => computed.observe(onchange, onchange),
      cachedGet(computed)
    );

    const state = useMemo<AsyncMetaStates<R>>(() => {
      switch (data.state) {
        case AsyncStates.FULFILLED:
          return {
            state: AsyncStates.FULFILLED,
            value: data.value!,
            success: true,
          };
        case AsyncStates.ERROR:
          return {
            state: AsyncStates.ERROR,
            value: fallback,
            success: false,
          };
        default:
          return {
            state: AsyncStates.PENDING,
            value: data.value!,
          };
      }
    }, [fallback, data]);

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
