"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPassword = exports.adminUser = exports.JWT_SECRET = void 0;
const { JWT_SECRET: ENV_JWI_SECRET } = process.env;
if (!ENV_JWI_SECRET)
    throw new Error("JWT_SECRET environment variable is no configured");
exports.JWT_SECRET = ENV_JWI_SECRET;
exports.adminUser = "Aster123";
exports.adminPassword = "123456";
