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
class JournalHandler {
    constructor(Repo) {
        this.Repo = Repo;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { journal_rating, journal_note, journal_weight } = req.body;
            const { date_add, journal_note: db_journal_note } = yield this.Repo.createJournal(res.locals.user.id, {
                journal_rating,
                journal_note,
                journal_weight,
            });
            console.log(journal_rating);
            console.log(res.locals.user.id);
            return res
                .status(200)
                .json({ journal_rating, journal_note, journal_weight, date_add })
                .end();
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const ownerId = res.locals.user.id;
                const journalUser = yield this.Repo.getJournal();
                return res.status(200).json(journalUser).end();
            }
            catch (error) {
                return res.status(500).json({ message: `Unauthorized access` }).end();
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { journal_note, journal_rating, journal_weight } = req.body;
            const { updated_at } = yield this.Repo.updateJournal(req.params.id, {
                journal_note,
                journal_rating,
                journal_weight,
            });
            return res
                .status(200)
                .json({ journal_note, journal_rating, journal_weight, updated_at })
                .end();
        });
    }
}
exports.default = JournalHandler;
