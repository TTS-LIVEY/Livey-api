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
                data: {
                    body_part: content.body_part,
                    video_title: content.video_title,
                    thumbnail_url: content.thumbnail_url,
                    video_type: content.video_type,
                    video_url: content.video_url,
                    Program: {
                        connect: {
                            program_title_schedule_title: {
                                program_title: content.program_title,
                                schedule_title: content.schedule_title,
                            },
                        },
                    },
                },
            });
        });
    }
    getContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const allContent = yield this.prisma.content.findMany({
                include: {
                    History: {
                        select: {
                            history_id: true,
                            userId: true,
                            contentId: true,
                        },
                    },
                },
            });
            return allContent;
        });
    }
    getContentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const individualContent = yield this.prisma.content.findUniqueOrThrow({
                where: { content_id: id },
            });
            return individualContent;
        });
    }
    deleteContent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedContent = yield this.prisma.content.delete({
                where: { content_id: id },
            });
            return deletedContent;
        });
    }
}
exports.default = ContentRepository;
