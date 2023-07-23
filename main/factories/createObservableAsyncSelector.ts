import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

    const [state, set] = useState<AsyncMetaStates<R>>({
      state: AsyncStates.FULFILLED,
      value: fallback,
      error: null,
    });

    useEffect(
      () =>
        computed.observe(
          (r) => {
            if (r.success) {
              set({
                state: AsyncStates.FULFILLED,
                value: r.result,
                error: null,
              });
              return;
            }
            set({
              state: AsyncStates.ERROR,
              value: fallback,
              error: r.cause,
            });
          },
          () => {
            const value = computed.get().value;
            set({
              state: AsyncStates.PENDING,
              value: value === undefined ? fallback : value,
              error: null,
            });
          }
        ),
      [fallback]
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
