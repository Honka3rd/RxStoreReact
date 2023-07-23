"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableAsyncImmutableSelector = exports.createObservableAsyncNormalSelector = exports.createObservableAsyncSelector = void 0;
var react_1 = require("react");
var rx_store_types_1 = require("rx-store-types");
var createObservableAsyncSelector = function (store) {
    var withAsyncComputation = store.withAsyncComputation;
    return function (computation, fallback, comparator) {
        var computationSingleton = (0, react_1.useRef)(computation);
        var comparatorSingleton = (0, react_1.useRef)(comparator);
        var computed = (0, react_1.useMemo)(function () {
            return withAsyncComputation({
                computation: computationSingleton.current,
                comparator: comparatorSingleton.current,
            });
        }, []);
        var data = (0, react_1.useSyncExternalStore)(function (onchange) { return computed.observe(onchange, onchange); }, function () { return computed.get(); });
        var state = (0, react_1.useMemo)(function () {
            switch (data.state) {
                case rx_store_types_1.AsyncStates.FULFILLED:
                    return {
                        state: rx_store_types_1.AsyncStates.FULFILLED,
                        value: data.value,
                        success: true
                    };
                case rx_store_types_1.AsyncStates.ERROR:
                    return {
                        state: rx_store_types_1.AsyncStates.ERROR,
                        value: fallback,
                        success: false
                    };
                default:
                    return {
                        state: rx_store_types_1.AsyncStates.PENDING,
                        value: data.value,
                    };
            }
        }, [fallback, data]);
        return state;
    };
};
exports.createObservableAsyncSelector = createObservableAsyncSelector;
var createObservableAsyncNormalSelector = function (store) {
    return (0, exports.createObservableAsyncSelector)(store);
};
exports.createObservableAsyncNormalSelector = createObservableAsyncNormalSelector;
var createObservableAsyncImmutableSelector = function (store) {
    return (0, exports.createObservableAsyncSelector)(store);
};
exports.createObservableAsyncImmutableSelector = createObservableAsyncImmutableSelector;
