"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableImmutableSelector = exports.createObservableSelector = void 0;
var react_1 = require("react");
var createObservableSelector = function (store) {
    var withComputation = store.withComputation;
    return function (computation) {
        var computationRef = (0, react_1.useRef)(computation);
        computationRef.current = computation;
        var computed = (0, react_1.useMemo)(function () { return withComputation({ computation: computationRef.current }); }, []);
        var _a = (0, react_1.useState)(computed.get()), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () { return computed.observe(set); }, []);
        return state;
    };
};
exports.createObservableSelector = createObservableSelector;
var createObservableImmutableSelector = function (store) {
    var withComputation = store.withComputation;
    return function (computation) {
        var computationRef = (0, react_1.useRef)(computation);
        computationRef.current = computation;
        var computed = (0, react_1.useMemo)(function () { return withComputation({ computation: computationRef.current }); }, []);
        var _a = (0, react_1.useState)(computed.get()), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () { return computed.observe(set); }, []);
        return state;
    };
};
exports.createObservableImmutableSelector = createObservableImmutableSelector;
