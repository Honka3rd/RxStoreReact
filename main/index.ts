import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { BS, IBS } from "rx-store-types";
import {
  createObservableImmutableState,
  createObservableState,
} from "./factories/createObservableState";
import {
  createObservableImmutableStates,
  createObservableStates,
} from "./factories/createObservableStates";
import {
  createObservableImmutableSelector,
  createObservableSelector,
} from "./factories/createObservableSelector";
import {
  createObservableImmutableReducer,
  createObservableReducer,
} from "./factories/createObservableReducer";
import {
  createObservableAsyncImmutableSelector,
  createObservableAsyncSelector,
} from "./factories/createObservableAsyncSelector";
import {
  createObservableAsyncImmutableReducer,
  createObservableAsyncReducer,
} from "./factories/createObservableAsyncReducer";

const stateObserverManager = <S extends BS>(store: RxNStoreImpl<S>) => ({
  useObservableState: createObservableState(store),
  useObservableStates: createObservableStates(store),
  useObservableSelector: createObservableSelector(store),
  useObservableReducer: createObservableReducer(store),
  useObservableAsyncComputation: createObservableAsyncSelector(store),
  useObservableAsyncReducer: createObservableAsyncReducer(store),
});

const immutableStateObserverManager = <S extends IBS>(
  store: RxImStoreImpl<S>
) => ({
  useImmutableObservableState: createObservableImmutableState(store),
  useImmutableObservableStates: createObservableImmutableStates(store),
  useImmutableObservableSelector: createObservableImmutableSelector(store),
  useImmutableObservableReducer: createObservableImmutableReducer(store),
  useImmutableObservableAsyncComputation:
    createObservableAsyncImmutableSelector(store),
  useImmutableObservableAsyncReducer:
    createObservableAsyncImmutableReducer(store),
});

export { stateObserverManager, immutableStateObserverManager };
