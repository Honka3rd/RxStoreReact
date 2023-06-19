import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { BS, IBS } from "rx-store-types";
export declare const createObservableState: <S extends BS>(store: RxNStoreImpl<S>) => <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
export declare const createObservableImmutableState: <S extends IBS>(store: RxImStoreImpl<S>) => <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
