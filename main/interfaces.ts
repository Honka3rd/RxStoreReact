import { AsyncStates } from "rx-store-types";
export type AsyncMetaStates<R> = {
  state: AsyncStates;
  value: R;
  error?: any;
  success?: boolean;
};