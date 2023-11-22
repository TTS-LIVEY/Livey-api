import { Journal } from "@prisma/client";
import { RequestHandler } from "express";
import {
  ICreateJornalDto,
  IJournalDto,
  IUpdateJournalDto,
} from "../dto/journal.dto";
import { IErrorDto } from "../dto/error.dto";
import { Id } from "./content.interface";

export interface Idd {
  id: string;
}

export interface ICreateJournal {
  journal_rating: number;
  journal_note: string;
  journal_weight: number;
}
export interface IJournal extends Journal {}
export interface IUpdateJournal {
  journal_note: string;
  journal_weight: number;
  journal_rating: number;
  updated_at: Date;
}

export interface IJournalRepository {
  createJournal(id: string, journalDetail: ICreateJournal): Promise<Journal>;
  getJournal(): Promise<IJournal[]>;
  updateJournal(id: string, journalDetail: IUpdateJournalDto): Promise<Journal>;
}

export interface IJournalHandler {
  create: RequestHandler<{}, IJournalDto | IErrorDto, ICreateJornalDto>;
  getAll: RequestHandler<{}, IJournal[] | IErrorDto>;
  update: RequestHandler<Idd, IUpdateJournal | IErrorDto, IUpdateJournalDto>;
}
