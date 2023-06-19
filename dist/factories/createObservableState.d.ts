import { BS, IBS, RxStore, RxNStore, RxImStore, Subscribable } from "rx-store-types";
export declare const createObservableState: <S extends BS>(store: RxStore<S> & Subscribable<S>) => <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
export declare const createObservableNormalState: <S extends BS>(store: RxNStore<S> & Subscribable<S>) => <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
export declare const createObservableImmutableState: <S extends IBS>(store: RxImStore<S> & Subscribable<S>) => <T extends keyof S>(key: T) => readonly [ReturnType<S[T]>, (val: ReturnType<S[T]>) => void];
