"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableState = void 0;
var react_1 = require("react");
var createObservableState = function (store) {
    var observe = store.observe, getDefault = store.getDefault;
    return function (key) {
        var _a = (0, react_1.useState)(getDefault(key)), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () { return observe(key, set); }, []);
        return state;
    };
};
exports.createObservableState = createObservableState;
