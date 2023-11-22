import { History, PrismaClient } from "@prisma/client";
import { IWatchedRepository } from "../interfaces/watched.interface";
import { IPostWatchedDto, IWatchedDto } from "../dto/watched.dto";

export default class WatchedRepository implements IWatchedRepository {
  constructor(private prisma: PrismaClient) {}
  public async createWatched(
    userId: string,
    contentId: number
  ): Promise<History> {
    return await this.prisma.history.create({
      data: {
        User: {
          connect: { id: userId },
        },
        Content: {
          connect: { content_id: contentId },
        },
      },
    });
  }
}
