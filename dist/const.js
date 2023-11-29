"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminID = exports.JWT_SECRET = void 0;
require("dotenv/config");
const { JWT_SECRET: ENV_JWI_SECRET } = process.env;
if (!ENV_JWI_SECRET)
    throw new Error("JWT_SECRET environment variable is no configured");
exports.JWT_SECRET = ENV_JWI_SECRET;
exports.adminID = "8c6e2dc4-cbd4-49ed-bf5d-b383862bac31";
