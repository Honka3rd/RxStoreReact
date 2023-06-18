"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableAsyncSelector = void 0;
var react_1 = require("react");
var rx_store_types_1 = require("rx-store-types");
var createObservableAsyncSelector = function (store) {
    var withAsyncComputation = store.withAsyncComputation;
    return function (computation, defaultVal, comparator) {
        var _a;
        var computationRef = (0, react_1.useRef)(computation);
        var comparatorRef = (0, react_1.useRef)(comparator);
        computationRef.current = computation;
        comparatorRef.current = comparator;
        var computed = (0, react_1.useMemo)(function () {
            return withAsyncComputation({
                computation: computationRef.current,
                comparator: comparatorRef.current,
            });
        }, []);
        var _b = (0, react_1.useState)({
            state: computed.get().state,
            val: (_a = computed.get().value) !== null && _a !== void 0 ? _a : defaultVal,
            err: null,
        }), state = _b[0], set = _b[1];
        (0, react_1.useEffect)(function () {
            return computed.observe(function (r) {
                var _a;
                if (r.success) {
                    set({
                        state: rx_store_types_1.AsyncStates.FULFILLED,
                        val: r.result,
                        err: null,
                    });
                    return;
                }
                set({
                    state: rx_store_types_1.AsyncStates.ERROR,
                    val: (_a = computed.get().value) !== null && _a !== void 0 ? _a : defaultVal,
                    err: r.cause,
                });
            }, function () {
                var _a;
                set({
                    state: rx_store_types_1.AsyncStates.PENDING,
                    val: (_a = computed.get().value) !== null && _a !== void 0 ? _a : defaultVal,
                    err: null,
                });
            });
        }, [defaultVal]);
        return state;
    };
};
exports.createObservableAsyncSelector = createObservableAsyncSelector;
