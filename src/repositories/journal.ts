import { PrismaClient, journal } from "@prisma/client";
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
  ): Promise<journal> {
    return await this.prisma.journal.create({
      data: {
        ...journalDetail,
        user: { connect: { id: id } },
      },
    });
  }
  public async getJournal(): Promise<IJournal[]> {
    return await this.prisma.journal.findMany();
  }
  public async updateJournal(
    id: string,
    journalDetail: IUpdateJournalDto
  ): Promise<journal> {
    return await this.prisma.journal.update({
      where: { id },
      data: journalDetail,
    });
  }
}
