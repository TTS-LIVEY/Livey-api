"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypts_1 = require("../utils/bcrypts");
const jsonwebtoken_1 = require("jsonwebtoken");
const const_1 = require("../const");
const library_1 = require("@prisma/client/runtime/library");
class UserHandler {
    constructor(Repo) {
        this.Repo = Repo;
        this.registration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, username, password: plainPassword, body_height, body_weight, } = req.body;
                const { id: registeredId, username: registeredUsername, registered_date, } = yield this.Repo.createuser({
                    name,
                    username,
                    password: (0, bcrypts_1.hashPassword)(plainPassword),
                    body_height,
                    body_weight,
                });
                return res.status(201).json({
                    id: registeredId,
                    username: registeredUsername,
                    registered_date,
                    body_height,
                    body_weight,
                });
            }
            catch (error) {
                const userNameIdeal = yield this.Repo.findByUsername(req.body.username);
                if (userNameIdeal.username === req.body.username) {
                    return res.status(500).json({ message: `username duplicated` }).end();
                }
                if (error instanceof library_1.PrismaClientKnownRequestError &&
                    error.code === "P2025" &&
                    library_1.PrismaClientUnknownRequestError) {
                    return res
                        .status(500)
                        .json({
                        message: `name is invalid`,
                    })
                        .end();
                }
                return res
                    .status(500)
                    .json({
                    message: `Internal Server Error`,
                })
                    .end();
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password: plainPassword } = req.body;
            if (username === null)
                return res.status(404).json({ message: `User not found` }).end();
            try {
                const { password, id } = yield this.Repo.findByUsername(username);
                if (!(0, bcrypts_1.verifyPassword)(plainPassword, password))
                    throw new Error("Invalid username or password");
                const accessToken = (0, jsonwebtoken_1.sign)({ id }, const_1.JWT_SECRET, {
                    algorithm: "HS512",
                    expiresIn: "12h",
                    issuer: "livey-api",
                    subject: "user-credential",
                });
                return res.status(200).json({ accessToken }).end();
            }
            catch (err) {
                return res
                    .status(401)
                    .json({ message: `Username or password incorrect` })
                    .end();
            }
        });
        this.updateWeightDetail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body_weight } = req.body;
            const newWeight = yield this.Repo.updateWeight(req.params.username, {
                body_weight,
            });
            console.log(newWeight);
            return res.status(200).json(newWeight).end();
        });
        this.checkUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = yield this.Repo.findById(res.locals.user.id);
                return res.status(200).json(idUser).end();
            }
            catch (error) {
                return res.status(501).json({ message: `Unauthorized user` }).end();
            }
        });
        this.getAllUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userAll = yield this.Repo.getAll();
                return res.status(200).json(userAll).end();
            }
            catch (error) {
                return res.status(404).json({ message: `content not found` }).end();
            }
        });
    }
}
exports.default = UserHandler;
