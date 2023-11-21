import { PrismaClient, journal } from "@prisma/client";
import {
  ICreateJournal,
  IJournalRepository,
} from "../interfaces/journal.interface";

export default class JournalRepository implements IJournalRepository {
  constructor(private prisma: PrismaClient) {}
  public async createJournal(
    id: string,
    journalDetail: ICreateJournal
  ): Promise<journal> {
    return await this.prisma.journal.create({
      data: {
        ...journalDetail,
      },
    });
  }
}
