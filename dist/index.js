"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.immutableStateObserverManager = exports.stateObserverManager = void 0;
var createObservableState_1 = require("./factories/createObservableState");
var createObservableStates_1 = require("./factories/createObservableStates");
var createObservableSelector_1 = require("./factories/createObservableSelector");
var createObservableReducer_1 = require("./factories/createObservableReducer");
var createObservableAsyncSelector_1 = require("./factories/createObservableAsyncSelector");
var createObservableAsyncReducer_1 = require("./factories/createObservableAsyncReducer");
var stateObserverManager = function (store) { return ({
    useObservableState: (0, createObservableState_1.createObservableState)(store),
    useObservableStates: (0, createObservableStates_1.createObservableStates)(store),
    useObservableSelector: (0, createObservableSelector_1.createObservableSelector)(store),
    useObservableReducer: (0, createObservableReducer_1.createObservableReducer)(store),
    useObservableAsyncComputation: (0, createObservableAsyncSelector_1.createObservableAsyncSelector)(store),
    useObservableAsyncReducer: (0, createObservableAsyncReducer_1.createObservableAsyncReducer)(store),
}); };
exports.stateObserverManager = stateObserverManager;
var immutableStateObserverManager = function (store) { return ({
    useImmutableObservableState: (0, createObservableState_1.createObservableImmutableState)(store),
    useImmutableObservableStates: (0, createObservableStates_1.createObservableImmutableStates)(store),
    useImmutableObservableSelector: (0, createObservableSelector_1.createObservableImmutableSelector)(store),
    useImmutableObservableReducer: (0, createObservableReducer_1.createObservableImmutableReducer)(store),
    useImmutableObservableAsyncComputation: (0, createObservableAsyncSelector_1.createObservableAsyncImmutableSelector)(store),
    useImmutableObservableAsyncReducer: (0, createObservableAsyncReducer_1.createObservableAsyncImmutableReducer)(store),
}); };
exports.immutableStateObserverManager = immutableStateObserverManager;
