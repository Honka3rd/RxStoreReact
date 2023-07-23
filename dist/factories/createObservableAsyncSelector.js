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
        var _a = (0, react_1.useState)({
            state: rx_store_types_1.AsyncStates.FULFILLED,
            value: fallback,
            error: null,
        }), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () {
            return computed.observe(function (r) {
                if (r.success) {
                    set({
                        state: rx_store_types_1.AsyncStates.FULFILLED,
                        value: r.result,
                        error: null,
                    });
                    return;
                }
                set({
                    state: rx_store_types_1.AsyncStates.ERROR,
                    value: fallback,
                    error: r.cause,
                });
            }, function () {
                var value = computed.get().value;
                set({
                    state: rx_store_types_1.AsyncStates.PENDING,
                    value: value === undefined ? fallback : value,
                    error: null,
                });
            });
        }, [fallback]);
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
