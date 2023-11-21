"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const const_1 = require("../const");
class JWTMiddleware {
    constructor() {
        this.auth = (req, res, next) => {
            try {
                const token = req.header("Authorization").replace("Bearer ", "");
                const { id } = (0, jsonwebtoken_1.verify)(token, const_1.JWT_SECRET);
                console.log(`Found user id in JWT token: ${id}`);
                res.locals = {
                    user: {
                        id,
                    },
                };
                return next();
            }
            catch (error) {
                if (error instanceof TypeError)
                    return res
                        .status(402)
                        .send("Authorization hjeader is expected but got none")
                        .end();
                if (error instanceof jsonwebtoken_1.JsonWebTokenError)
                    return res.status(403).send(`Forbidden token`).end();
                return res.status(500).send(`Internal server error`).end();
            }
        };
    }
}
exports.default = JWTMiddleware;
