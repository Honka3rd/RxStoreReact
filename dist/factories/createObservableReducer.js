"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableImmutableReducer = exports.createObservableNormalReducer = exports.createObservableReducer = void 0;
var react_1 = require("react");
var createObservableReducer = function (store) {
    var createDispatch = store.createDispatch, getState = store.getState, observe = store.observe;
    return function (key, reducer) {
        var reducerSingleton = (0, react_1.useRef)(reducer);
        var dispatch = (0, react_1.useMemo)(function () {
            return createDispatch({
                key: key,
                reducer: reducerSingleton.current,
            });
        }, [key]);
        var payload = (0, react_1.useSyncExternalStore)(function (onchange) { return observe(key, onchange); }, function () { return getState(key); });
        return (0, react_1.useMemo)(function () { return [payload, dispatch]; }, [payload, dispatch]);
    };
};
exports.createObservableReducer = createObservableReducer;
var createObservableNormalReducer = function (store) {
    return (0, exports.createObservableReducer)(store);
};
exports.createObservableNormalReducer = createObservableNormalReducer;
var createObservableImmutableReducer = function (store) {
    return (0, exports.createObservableReducer)(store);
};
exports.createObservableImmutableReducer = createObservableImmutableReducer;
