import { AsyncStates } from "rx-store-types";
export type AsyncMetaStates<R> = {
  state: AsyncStates;
  val: R;
  err: any;
};