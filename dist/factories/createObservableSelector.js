"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableImmutableSelector = exports.createObservableNormalSelector = exports.createObservableSelector = void 0;
var react_1 = require("react");
var createObservableSelector = function (store) {
    var withComputation = store.withComputation;
    return function (computation) {
        var computationRef = (0, react_1.useRef)(computation);
        var computed = (0, react_1.useMemo)(function () { return withComputation({ computation: computationRef.current }); }, []);
        var data = (0, react_1.useSyncExternalStore)(function (onchange) { return computed.observe(onchange); }, function () { return computed.get(); });
        return data;
    };
};
exports.createObservableSelector = createObservableSelector;
var createObservableNormalSelector = function (store) {
    return (0, exports.createObservableSelector)(store);
};
exports.createObservableNormalSelector = createObservableNormalSelector;
var createObservableImmutableSelector = function (store) {
    return (0, exports.createObservableSelector)(store);
};
exports.createObservableImmutableSelector = createObservableImmutableSelector;
