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
class JournalRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createJournal(id, journalDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.journal.create({
                data: Object.assign(Object.assign({}, journalDetail), { user: { connect: { id: id } } }),
            });
        });
    }
    getJournal() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.journal.findMany();
        });
    }
    updateJournal(id, journalDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.journal.update({
                where: { id },
                data: journalDetail,
            });
        });
    }
}
exports.default = JournalRepository;
