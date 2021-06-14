"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SendMail_1 = __importDefault(require("./controllers/SendMail"));
var routes = express_1.Router();
routes.post('/sendMail', SendMail_1.default.execute);
exports.default = routes;
