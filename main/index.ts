import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { BS, IBS } from "rx-store-types";
import { createObservableState } from "./factories/createObservableState";
import { createObservableStates } from "./factories/createObservableStates";
import { createObservableSelector } from "./factories/createObservableSelector";
import { createObservableReducer } from "./factories/createObservableReducer";
import { createObservableAsyncSelector } from "./factories/createObservableAsyncSelector";
import { createObservableAsyncReducer } from "./factories/createObservableAsyncReducer";

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
  useObservableState: createObservableState(store),
  useObservableStates: createObservableStates(store),
  useObservableSelector: createObservableSelector(store),
  useObservableReducer: createObservableReducer(store),
  useObservableAsyncComputation: createObservableAsyncSelector(store),
  useObservableAsyncReducer: createObservableAsyncReducer(store),
});

export { stateObserverManager, immutableStateObserverManager };
