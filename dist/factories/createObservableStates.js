"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableImmutableStates = exports.createObservableNormalStates = void 0;
var immutable_1 = __importDefault(require("immutable"));
var react_1 = require("react");
var createObservableNormalStates = function (store) {
    var observeMultiple = store.observeMultiple, getDefaults = store.getDefaults;
    return function (keys) {
        var _a = (0, react_1.useState)(getDefaults(keys)), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () { return observeMultiple(keys, set); }, []);
        return state;
    };
};
exports.createObservableNormalStates = createObservableNormalStates;
var createObservableImmutableStates = function (store) {
    var observeMultiple = store.observeMultiple, getDefaults = store.getDefaults;
    var recordFactory = function (keys) {
        return immutable_1.default.Record(getDefaults(keys).toObject());
    };
    return function (keys) {
        var keysRef = (0, react_1.useRef)(keys);
        var factory = (0, react_1.useCallback)(recordFactory(keysRef.current), []);
        var _a = (0, react_1.useState)(factory()), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () {
            return observeMultiple(keys, function (data) {
                set(factory(data));
            });
        }, []);
        return state;
    };
};
exports.createObservableImmutableStates = createObservableImmutableStates;
