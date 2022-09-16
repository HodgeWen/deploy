"use strict";
exports.__esModule = true;
var path_1 = require("path");
function createRouter(prefix, routerConf) {
    return function (fastify) {
        Object.keys(routerConf).forEach(function (method) {
            var handlers = routerConf[method];
            Object.keys(handlers).forEach(function (key) {
                var url = (0, path_1.join)("/".concat(prefix), key).replace(/\\/g, '/').replace(/\/$/, '');
                fastify[method.toLowerCase()](url, handlers[key]);
            });
        });
    };
}
exports["default"] = createRouter;
