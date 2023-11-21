import { journal } from "@prisma/client";
import { RequestHandler } from "express";
import { ICreateJornalDto, IJournalDto } from "../dto/journal.dto";
import { IErrorDto } from "../dto/error.dto";

export interface ICreateJournal {
  journal_rating: number;
  journal_note: string;
  journal_weight: number;
}

export interface IJournalRepository {
  createJournal(id: string, journalDetail: ICreateJournal): Promise<journal>;
}

export interface IJournalHandler {
  create: RequestHandler<{}, IJournalDto | IErrorDto, ICreateJornalDto>;
}
