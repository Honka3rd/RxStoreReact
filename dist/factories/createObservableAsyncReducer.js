"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableAsyncReducer = void 0;
var react_1 = require("react");
var createObservableState_1 = require("./createObservableState");
var createObservableAsyncReducer = function (store) {
    var createAsyncDispatch = store.createAsyncDispatch;
    var useObservableState = (0, createObservableState_1.createObservableState)(store);
    return function (key, reducer) {
        var reducerSingleton = (0, react_1.useRef)(reducer);
        reducerSingleton.current = reducer;
        var dispatch = (0, react_1.useMemo)(function () {
            return createAsyncDispatch({
                key: key,
                reducer: reducerSingleton.current,
            });
        }, [key]);
        var payload = useObservableState(key);
        return (0, react_1.useMemo)(function () { return [payload, dispatch]; }, [payload, dispatch]);
    };
};
exports.createObservableAsyncReducer = createObservableAsyncReducer;
