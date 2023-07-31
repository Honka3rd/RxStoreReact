"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableImmutableStates = exports.createObservableNormalStates = void 0;
var immutable_1 = require("immutable");
var react_1 = require("react");
var createObservableNormalStates = function (store) {
    var observeMultiple = store.observeMultiple, getDefaults = store.getDefaults;
    return function (keys) {
        var keysRef = (0, react_1.useRef)(keys);
        var _a = (0, react_1.useState)(getDefaults(keysRef.current)), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () { return observeMultiple(keysRef.current, set); }, []);
        return state;
    };
};
exports.createObservableNormalStates = createObservableNormalStates;
var createObservableImmutableStates = function (store) {
    var observeMultiple = store.observeMultiple, getDefaults = store.getDefaults;
    var recordFactory = function (keys) {
        return (0, immutable_1.Record)(getDefaults(keys).toObject());
    };
    return function (keys) {
        var keysRef = (0, react_1.useRef)(keys);
        var factory = (0, react_1.useCallback)(recordFactory(keysRef.current), []);
        var _a = (0, react_1.useState)(factory()), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () {
            return observeMultiple(keysRef.current, function (data) {
                set(factory(data));
            });
        }, []);
        return state;
    };
};
exports.createObservableImmutableStates = createObservableImmutableStates;
