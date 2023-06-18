"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableReducer = void 0;
var react_1 = require("react");
var createObservableState_1 = require("./createObservableState");
var createObservableReducer = function (store) {
    var createDispatch = store.createDispatch;
    var useObservableState = (0, createObservableState_1.createObservableState)(store);
    return function (key, reducer) {
        var reducerSingleton = (0, react_1.useRef)(reducer);
        reducerSingleton.current = reducer;
        var dispatch = (0, react_1.useMemo)(function () {
            return createDispatch({
                key: key,
                reducer: reducerSingleton.current,
            });
        }, [key]);
        var payload = useObservableState(key)[0];
        return (0, react_1.useMemo)(function () { return [payload, dispatch]; }, [payload, dispatch]);
    };
};
exports.createObservableReducer = createObservableReducer;
