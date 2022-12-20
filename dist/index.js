"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var indexRoute_1 = __importDefault(require("./routes/indexRoute"));
exports.app = (0, express_1.default)();
var port = 8000;
// route default homepage
exports.app.get('/api', indexRoute_1.default);
// start the express server
exports.app.listen(port, function () {
    console.log("server started at http://localhost:".concat(port));
});
