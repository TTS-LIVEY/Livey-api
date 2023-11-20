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
class ContentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createContent(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.content.create({
                data: Object.assign({}, content),
            });
        });
    }
    getContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const allContent = yield this.prisma.content.findMany();
            return allContent;
        });
    }
    getContentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const individualContent = yield this.prisma.content.findUniqueOrThrow({
                where: { id },
            });
            return individualContent;
        });
    }
    deleteContent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedContent = yield this.prisma.content.delete({
                where: { id },
            });
            return deletedContent;
        });
    }
}
exports.default = ContentRepository;
