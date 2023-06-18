"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableStates = void 0;
var react_1 = require("react");
var createObservableStates = function (store) {
    var observeMultiple = store.observeMultiple, getDefaults = store.getDefaults;
    return function (keys) {
        var _a = (0, react_1.useState)(getDefaults(keys)), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () { return observeMultiple(keys, set); }, []);
        return state;
    };
};
exports.createObservableStates = createObservableStates;
