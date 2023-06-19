"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableImmutableState = exports.createObservableNormalState = exports.createObservableState = void 0;
var react_1 = require("react");
var createObservableState = function (store) {
    var observe = store.observe, getDefault = store.getDefault;
    return function (key) {
        var _a = (0, react_1.useState)(getDefault(key)), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () { return observe(key, set); }, []);
        var mutator = (0, react_1.useCallback)(function (val) {
            var _a;
            store.setState((_a = {}, _a[key] = val, _a));
        }, [key]);
        return (0, react_1.useMemo)(function () { return [state, mutator]; }, [state, mutator]);
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
