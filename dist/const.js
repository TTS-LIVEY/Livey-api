"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminID = exports.JWT_SECRET = void 0;
const { JWT_SECRET: ENV_JWI_SECRET } = process.env;
if (!ENV_JWI_SECRET)
    throw new Error("JWT_SECRET environment variable is no configured");
exports.JWT_SECRET = ENV_JWI_SECRET;
exports.adminID = "24d17988-c92c-447f-aa2b-48969187dae2";
