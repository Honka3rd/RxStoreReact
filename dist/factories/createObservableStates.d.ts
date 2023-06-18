import { RxImStoreImpl, RxNStoreImpl } from "rx-store-core";
import { BS } from "rx-store-types";
export declare const createObservableStates: <S extends BS, T extends (keyof S)[]>(store: RxNStoreImpl<S> | RxImStoreImpl<S>) => (keys: T) => import("immutable").Map<keyof S, ReturnType<S[keyof S]>> | { [k in keyof S]: ReturnType<S[k]>; };
