import { RequestHandler } from "express";
import {
  ICreateJournal,
  IJournal,
  IJournalHandler,
  IJournalRepository,
  IUpdateJournal,
  Idd,
} from "../interfaces/journal.interface";

import { IErrorDto } from "../dto/error.dto";
import {
  ICreateJornalDto,
  IJournalDto,
  IUpdateJournalDto,
} from "../dto/journal.dto";
import { adminID } from "../const";

export default class JournalHandler implements IJournalHandler {
  constructor(private Repo: IJournalRepository) {}
  public create: RequestHandler<{}, IJournalDto | IErrorDto, ICreateJornalDto> =
    async (req, res) => {
      const { journal_rating, journal_note, journal_weight } = req.body;
      const { date_add, journal_note: db_journal_note } =
        await this.Repo.createJournal(res.locals.user.id, {
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
    };
  public getAll: RequestHandler<{}, IJournal[] | IErrorDto> = async (
    req,
    res
  ) => {
    try {
      // const ownerId = res.locals.user.id;
      const journalUser = await this.Repo.getJournal();
      return res
        .status(200)
        .json({ ...journalUser })
        .end();
    } catch (error) {
      return res.status(500).json({ message: `Unauthorized access` }).end();
    }
  };
  public update: RequestHandler<
    Idd,
    IUpdateJournal | IErrorDto,
    IUpdateJournalDto
  > = async (req, res) => {
    const { journal_note, journal_rating, journal_weight } = req.body;
    const { updated_at } = await this.Repo.updateJournal(req.params.id, {
      journal_note,
      journal_rating,
      journal_weight,
    });
    return res
      .status(200)
      .json({ journal_note, journal_rating, journal_weight, updated_at })
      .end();
  };
}
