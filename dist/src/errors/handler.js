"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup_1 = require("yup");
var errorHandler = function (error, request, response, next) {
    if (error instanceof yup_1.ValidationError) {
        var errors_1 = {};
        error.inner.forEach(function (err) {
            errors_1[err.path] = err.errors;
        });
        return response.json({ icon: 'warning', alert: 'Aviso de validação', errors: errors_1 });
    }
    console.error(error);
    return response.status(500).json({
        message: 'Internal server error'
    });
};
exports.default = errorHandler;
