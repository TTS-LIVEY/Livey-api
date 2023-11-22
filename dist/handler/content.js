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
const oembed_1 = require("../utils/oembed");
const const_1 = require("../const");
class ContentHandler {
    constructor(Repo) {
        this.Repo = Repo;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (res.locals.user.id !== const_1.adminID) {
                    console.log(res.locals.user.id);
                    return res.status(501).json({ message: `Unauthorized access` }).end();
                }
                const { video_url, video_type, body_part, program_title, schedule_title, } = req.body;
                const { thumbnail_url, title } = yield (0, oembed_1.oembedUrl)(video_url);
                const newContent = yield this.Repo.createContent(res.locals.id, {
                    video_url,
                    video_type,
                    thumbnail_url,
                    body_part,
                    program_title,
                    schedule_title,
                    video_title: title,
                });
                return res
                    .status(200)
                    .json(Object.assign({}, newContent))
                    .end();
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: `Internal server error` }).end();
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allContent = yield this.Repo.getContent();
                return res.status(200).json(allContent).end();
            }
            catch (error) {
                return res.status(404).json({ message: `content not found` }).end();
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const contentById = yield this.Repo.getContentById(Number(req.params.id));
                if (contentById === null)
                    return res.status(404).json({ message: `Id not found` });
                return res.status(200).json(contentById).end();
            }
            catch (error) {
                return res.status(500).json({ message: `Internal server error` }).end();
            }
        });
        this.deleteById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (res.locals.user.id !== const_1.adminID) {
                    console.log(res.locals.user.id);
                    return res.status(501).json({ message: `Unauthorized access` }).end();
                }
                const delContent = yield this.Repo.deleteContent(Number(req.params.id));
                return res.status(200).json(delContent).end();
            }
            catch (error) {
                return res.status(500).json({ message: `Internal server error` }).end();
            }
        });
    }
}
exports.default = ContentHandler;
