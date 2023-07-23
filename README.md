# RxStoreReact

A state management library based on [rx-store-core](https://www.npmjs.com/package/rx-store-core), for React developer

## Install

npm install rx-store-react

## Use a normal state manager

**Import**

```javascript
import { NRS } from "rx-store-core";
import { stateObserverManager } from "rx-store-react";
```

**Overview**

```javascript
const store = NRS({
  count: (): number => 0, // [state key]: state constructor
  checked: (): boolean => false,
}); // define a normal store

// standalone handy functions for state mutation and retrieval:
const {
  setState,
  getState,
  getStates,
  getDefault,
  getStateAll,
  getDefaults,
  getDefaultAll,
  getClonedState,
  getImmutableState,
  reset,
  resetMultiple,
  resetAll
} = store;
```
As for how to use these functions, please refer to [this doc](https://www.npmjs.com/package/rx-store-core)

React state observer hooks definitions:
```javascript
const {
  useObservableState, // observe React global state by defining NRS key of object
  useObservableStates, // observe React global states by defining NRS keys of object
  useObservableSelector, // observe React global state computed by all NRS inner state
  useObservableReducer, // same effect as useObservableState, require a reducer as a parameter
  useObservableAsyncComputation, // same effect as useObservableSelector, but the state updated in a async way
  useObservableAsyncReducer, // same effect as useObservableReducer, but the state updated in a async way
} = stateObserverManager(store); // inject the normal store to generate utility hooks
```

### useObservableState

Desc: observe one state in NRS by key

Params: key that is defined in NRS, ie: count and checked
Return: [return type of related state constructor, state mutator]

```javascript
const [count, setCount] = useObservableState("count");
// count is value, setCount is related mutator
// count: number
// setCount: (count: number) => void
```

[example](https://codesandbox.io/p/sandbox/rx-store-react-useobservablestate-fylvws?file=%2Fsrc%2FApp.tsx%3A13%2C3-13%2C57)

### useObservableStates

Desc: Observe multiple state in NRS by keys

Params: Array of keys defined in NRS, duplication not allowed
Return: an object contains defined keys and related values

```javascript
const { count, checked } = useObservableStates(["count", "checked"]);
```

[example](https://codesandbox.io/p/sandbox/rx-store-react-useobservablestates-sd5zm7?file=%2Fsrc%2FApp.tsx%3A31%2C54)

### useObservableSelector

Desc: get a computed state, based on all inner state defined inside NRS, when defined state change, the computation will automatically invoked

Params: computation function which takes all defined states as an argument and return a computed value
Return: a computed value identical with the input computation function

```javascript
const computed: `${number} is ${boolean}` = useObservableSelector(({ count, checked }) => {
    return `${count} is ${checked}`
})
```
[example](https://codesandbox.io/p/sandbox/funny-lena-knd8kz?file=%2Fsrc%2FApp.tsx%3A35%2C15)

### useObservableReducer
Desc: a global state control similar to React useReducer, for complex state handling

Params: key of NRS definition, a reducer(*) function
*reducer: Reducer<T, P, S, K> is a function takes previous value as argument and return T, T is dispatch type extends string, P is a optional payload, S is all state keys, K is the observed key

Return: a constant array, [value, dispatch], value is the returned payload by reducer, dispatch(*) is a function to trigger reducer invocation, and change the state defined inside NRS
*dispatch: a function take
```javascript
{ type: T, payload?: P }
```
as argument, return void

```javascript
const [value, dispatch] = useObservableReducer<"count", "plus" | "minus" | "replace", number>("count", (previous, { type, payload }) => {
    if(type === "plus") {
        return previous + 1;
    }

    if(type === "minus") {
        return previous - 1;
    }

    if(type === "replace" && payload !== undefined) {
        return payload;
    }

    return previous;
});

// dispatch a "plus" Action
dispatch({
    type: "plus"
});
// dispatch a "minus" Action
dispatch({
    type: "minus"
});
// dispatch a "replace" Action
dispatch({
    type: "replace",
    payload: 99
})

```
[example](https://codesandbox.io/p/sandbox/rx-store-react-useobservablereducer-k243sz)

### useObservableAsyncComputation

Desc: a deferred computation result that reflect to React state, the computation function will be automatically invoked if the state get changed.

Params: 
1, computation function, that take all defined state as a argument, and return a Promise or Observable that resolve a computed result.
2: fallback, optional, a replacement value used when async process failed.
3: comparator, optional, a comparator function that determine whether NRS inner state changed

Return:
```javascript
{
    state: FULFILLED | ERROR | PENDING;
    value: R;
    error: any;
}
```
R stands for computed result

```javascript
const { state, value, error } = useObservableAsyncComputation(({ count, checked }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(checked) {
                resolve(String(count));
                return;
            }
            reject(String(checked))
        }, count)
    })
})

```
[example]()

### useObservableAsyncReducer

Desc: a global state control, which return a Promise or Observable resolve a reduced value, for complex async state handling

params: a reducer function returning a Promise or an Observable that resolve a reduced value
Return: an constant array
```javascript
[
    {
        state: FULFILLED | ERROR | PENDING;
        value: R;
        error: any;
    },
    (
        action: {
            type: T;
            payload?: P;
        }
    ) => void 
    // dispatch function
]
```
R stands for reduced result, T stands for different action type, payload stands for optional R

[example]()