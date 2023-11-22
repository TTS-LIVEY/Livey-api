import { PrismaClient, Journal } from "@prisma/client";
import {
  ICreateJournal,
  IJournal,
  IJournalRepository,
} from "../interfaces/journal.interface";
import { IUpdateJournalDto } from "../dto/journal.dto";

export default class JournalRepository implements IJournalRepository {
  constructor(private prisma: PrismaClient) {}
  public async createJournal(
    id: string,
    journalDetail: ICreateJournal
  ): Promise<Journal> {
    return await this.prisma.journal.create({
      data: {
        ...journalDetail,
        User: { connect: { id: id } },
      },
    });
  }
  public async getJournal(): Promise<IJournal[]> {
    return await this.prisma.journal.findMany();
  }
  public async updateJournal(
    id: string,
    journalDetail: IUpdateJournalDto
  ): Promise<Journal> {
    return await this.prisma.journal.update({
      where: { journal_id: id },
      data: journalDetail,
    });
  }
}
