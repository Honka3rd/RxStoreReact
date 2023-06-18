import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { BS } from "rx-store-types";
export declare const createObservableState: <S extends BS, T extends keyof S>(store: RxNStoreImpl<S> | RxImStoreImpl<S>) => (key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
