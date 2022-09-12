"use strict";
exports.__esModule = true;
var deploy_1 = require("./deploy");
var upload_1 = require("./upload");
function router(fastify) {
    (0, deploy_1["default"])(fastify);
    (0, upload_1["default"])(fastify);
}
exports["default"] = router;
