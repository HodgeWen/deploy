"use strict";
exports.__esModule = true;
var path_1 = require("path");
function createRouter(prefix, routerConf) {
    return function (fastify) {
        Object.keys(routerConf).forEach(function (method) {
            var handlers = routerConf[method];
            Object.keys(handlers).forEach(function (key) {
                fastify[method.toLowerCase()]((0, path_1.join)("/".concat(prefix), key).replace(/\/$/, '').replace(/\\/g, '/'), handlers[key]);
            });
        });
    };
}
exports["default"] = createRouter;
