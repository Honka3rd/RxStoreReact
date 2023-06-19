"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableImmutableReducer = exports.createObservableNormalReducer = exports.createObservableReducer = void 0;
var react_1 = require("react");
var createObservableReducer = function (store) {
    var createDispatch = store.createDispatch, getDefault = store.getDefault, observe = store.observe;
    return function (key, reducer) {
        var reducerSingleton = (0, react_1.useRef)(reducer);
        reducerSingleton.current = reducer;
        var dispatch = (0, react_1.useMemo)(function () {
            return createDispatch({
                key: key,
                reducer: reducerSingleton.current,
            });
        }, [key]);
        var _a = (0, react_1.useState)(getDefault(key)), payload = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () { return observe(key, set); }, []);
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
