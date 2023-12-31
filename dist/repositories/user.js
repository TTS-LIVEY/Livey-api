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
const SELECT = {
    id: true,
    username: true,
    registered_date: true,
    body_weight: true,
    body_height: true,
};
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createuser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.prisma.user.create({
                data: user,
                select: SELECT,
            });
            return createdUser;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const allUser = yield this.prisma.user.findMany({});
            return allUser;
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUsernameSuccess = yield this.prisma.user.findUniqueOrThrow({
                where: {
                    username: username,
                },
            });
            return findUsernameSuccess;
        });
    }
    updateWeight(username, userDetail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.update({
                data: userDetail,
                select: {
                    id: true,
                    name: true,
                    username: true,
                    registered_date: true,
                    body_weight: true,
                    body_height: true,
                    History: {
                        select: {
                            history_id: true,
                            userId: true,
                            contentId: true,
                        },
                    },
                },
                where: {
                    username,
                },
            });
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    username: true,
                    name: true,
                },
            });
        });
    }
}
exports.default = UserRepository;
