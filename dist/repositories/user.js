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
class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createuser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.prisma.user.create({
                data: user,
                select: {
                    id: true,
                    username: true,
                    registered_date: true,
                    body_weight: true,
                    body_height: true,
                },
            });
            return createdUser;
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
                    watchedId: true,
                    favoriteId: true,
                },
                where: {
                    username,
                },
            });
        });
    }
}
exports.default = UserRepository;
