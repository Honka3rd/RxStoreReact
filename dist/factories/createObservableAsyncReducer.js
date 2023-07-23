"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableAsyncImmutableReducer = exports.createObservableAsyncNormalReducer = exports.createObservableAsyncReducer = void 0;
var react_1 = require("react");
var rx_store_types_1 = require("rx-store-types");
var createObservableAsyncReducer = function (store) {
    var createAsyncDispatch = store.createAsyncDispatch;
    return function (key, reducer, fallback) {
        var reducerSingleton = (0, react_1.useRef)(reducer);
        var dispatchAsync = (0, react_1.useMemo)(function () {
            return createAsyncDispatch({
                key: key,
                reducer: reducerSingleton.current,
            });
        }, [key]);
        var _a = (0, react_1.useState)({
            value: store.getState(key),
            state: rx_store_types_1.AsyncStates.FULFILLED,
            error: null,
        }), state = _a[0], set = _a[1];
        var dispatch = (0, react_1.useCallback)(function (action) {
            dispatchAsync(action, {
                start: function () {
                    set(function (prev) { return (__assign(__assign({}, prev), { state: rx_store_types_1.AsyncStates.PENDING, err: null })); });
                },
                fail: function (error) {
                    set({
                        state: rx_store_types_1.AsyncStates.ERROR,
                        success: false,
                        error: error,
                        value: fallback === undefined ? store.getDefault(key) : fallback,
                    });
                },
                success: function (r) {
                    set({
                        state: rx_store_types_1.AsyncStates.FULFILLED,
                        success: true,
                        error: null,
                        value: r,
                    });
                },
            });
        }, [dispatchAsync]);
        return (0, react_1.useMemo)(function () { return [state, dispatch]; }, [state, dispatch]);
    };
};
exports.createObservableAsyncReducer = createObservableAsyncReducer;
var createObservableAsyncNormalReducer = function (store) {
    return (0, exports.createObservableAsyncReducer)(store);
};
exports.createObservableAsyncNormalReducer = createObservableAsyncNormalReducer;
var createObservableAsyncImmutableReducer = function (store) {
    return (0, exports.createObservableAsyncReducer)(store);
};
exports.createObservableAsyncImmutableReducer = createObservableAsyncImmutableReducer;
