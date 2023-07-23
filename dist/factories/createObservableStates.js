"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableImmutableStates = exports.createObservableNormalStates = void 0;
var react_1 = require("react");
var createObservableNormalStates = function (store) {
    var observeMultiple = store.observeMultiple, getStates = store.getStates;
    return function (keys) {
        var data = (0, react_1.useSyncExternalStore)(function (onchange) { return observeMultiple(keys, onchange); }, function () { return getStates(keys); });
        return data;
    };
};
exports.createObservableNormalStates = createObservableNormalStates;
var createObservableImmutableStates = function (store) {
    var observeMultiple = store.observeMultiple, getStates = store.getStates;
    return function (keys) {
        var data = (0, react_1.useSyncExternalStore)(function (onchange) { return observeMultiple(keys, onchange); }, function () { return getStates(keys); });
        return data;
    };
};
exports.createObservableImmutableStates = createObservableImmutableStates;
