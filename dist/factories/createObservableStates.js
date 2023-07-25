"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObservableImmutableStates = exports.createObservableNormalStates = void 0;
var immutable_1 = __importDefault(require("immutable"));
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
    var observeMultiple = store.observeMultiple, getDefaults = store.getDefaults;
    var recordDefaultFactory = function (keys) {
        return immutable_1.default.Record(getDefaults(keys).toObject());
    };
    var recordFactory = function (states) {
        return immutable_1.default.Record(states);
    };
    return function (keys) {
        var factoryDefault = (0, react_1.useCallback)(function () { return recordDefaultFactory(keys); }, []);
        var _a = (0, react_1.useState)(factoryDefault()), state = _a[0], set = _a[1];
        (0, react_1.useEffect)(function () {
            return observeMultiple(keys, function (data) {
                set(recordFactory(data));
            });
        }, []);
        return state;
    };
};
exports.createObservableImmutableStates = createObservableImmutableStates;
