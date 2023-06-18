import { RxNStoreImpl, RxImStoreImpl } from "rx-store-core";
import { AsyncReducer, BS } from "rx-store-types";
export declare const createObservableAsyncReducer: <S extends BS>(store: RxNStoreImpl<S> | RxImStoreImpl<S>) => <K extends keyof S, T extends string, P = void>(key: K, reducer: AsyncReducer<T, P, S, K>) => (ReturnType<S[keyof S]> | import("rx-store-types").AsyncDispatch<P, T, S, K>)[];
