"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.pumpAsync = void 0;
var pump_1 = require("pump");
var pumpAsync = function () {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return new Promise(function (rs, rj) {
        pump_1["default"].apply(void 0, __spreadArray(__spreadArray([], streams, false), [function (err) {
                err ? rj(err) : rs();
            }], false));
    });
};
exports.pumpAsync = pumpAsync;
