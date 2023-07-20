"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableImmutableState = exports.createObservableNormalState = exports.createObservableState = void 0;
var react_1 = require("react");
var createObservableState = function (store) {
    var observe = store.observe, getState = store.getState;
    return function (key) {
        var data = (0, react_1.useSyncExternalStore)(function (onchange) { return observe(key, onchange); }, function () { return getState(key); });
        var mutator = (0, react_1.useCallback)(function (val) {
            var _a;
            store.setState((_a = {}, _a[key] = val, _a));
        }, [key]);
        return (0, react_1.useMemo)(function () { return [data, mutator]; }, [data, mutator]);
    };
};
exports.createObservableState = createObservableState;
var createObservableNormalState = function (store) {
    return (0, exports.createObservableState)(store);
};
exports.createObservableNormalState = createObservableNormalState;
var createObservableImmutableState = function (store) {
    return (0, exports.createObservableState)(store);
};
exports.createObservableImmutableState = createObservableImmutableState;
