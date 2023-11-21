import { RequestHandler } from "express";
import {
  ICreateJournal,
  IJournalHandler,
  IJournalRepository,
} from "../interfaces/journal.interface";
import { ICreateJornalDto, IJournalDto } from "../dto/journal.dto";
import { IErrorDto } from "../dto/error.dto";

export default class JournalHandler implements IJournalHandler {
  constructor(private Repo: IJournalRepository) {}
  public create: RequestHandler<{}, IJournalDto | IErrorDto, ICreateJornalDto> =
    async (req, res) => {
      const { journal_rating, journal_note, journal_weight } = req.body;
      const { date_add } = await this.Repo.createJournal(res.locals.id, {
        journal_rating,
        journal_note,
        journal_weight,
      });
      console.log(journal_rating);
      return res
        .status(200)
        .json({ journal_rating, journal_note, journal_weight, date_add })
        .end();
    };
}
