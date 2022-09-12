"use strict";
exports.__esModule = true;
var fastify_1 = require("fastify");
var multipart_1 = require("@fastify/multipart");
var cors_1 = require("@fastify/cors");
var router_1 = require("./router");
var fastify = (0, fastify_1["default"])({
    logger: {
        transport: {
            target: 'pino-pretty',
            /** @type {import('pino-pretty').PrettyOptions} */
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
                colorize: true
            }
        }
    }
});
fastify.register(multipart_1["default"]);
fastify.register(cors_1["default"]);
(0, router_1["default"])(fastify);
fastify.listen({ port: 22333 })["catch"](function (reason) {
    fastify.log.error(reason);
});
