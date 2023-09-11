import { BS, IBS } from "rx-store-types";
import { RxNStoreImpl } from "rx-store-core/dist/main/normal";
import { RxImStoreImpl } from "rx-store-core/dist/main/immutable";
import {
  createObservableImmutableState,
  createObservableNormalState,
} from "./factories/createObservableState";
import {
  createObservableImmutableStates,
  createObservableNormalStates,
} from "./factories/createObservableStates";
import {
  createObservableImmutableSelector,
  createObservableNormalSelector,
} from "./factories/createObservableSelector";
import {
  createObservableImmutableReducer,
  createObservableNormalReducer,
} from "./factories/createObservableReducer";
import {
  createObservableAsyncImmutableSelector,
  createObservableAsyncNormalSelector,
} from "./factories/createObservableAsyncSelector";
import {
  createObservableAsyncImmutableReducer,
  createObservableAsyncNormalReducer,
} from "./factories/createObservableAsyncReducer";

const stateObserverManager = <S extends BS>(
  store: RxNStoreImpl<S>
) => ({
  useObservableState: createObservableNormalState(store),
  useObservableStates: createObservableNormalStates(store),
  useObservableSelector: createObservableNormalSelector(store),
  useObservableReducer: createObservableNormalReducer(store),
  useObservableAsyncComputation: createObservableAsyncNormalSelector(store),
  useObservableAsyncReducer: createObservableAsyncNormalReducer(store),
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
