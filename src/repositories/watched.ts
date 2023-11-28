import { History, PrismaClient } from "@prisma/client";
import { IWatchedRepository } from "../interfaces/watched.interface";
import {
  IPostWatchedDto,
  IUpdateCompleteDto,
  IUpdateFavDto,
  IWatchedDto,
} from "../dto/watched.dto";

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
  public async getHistoryById(id: string): Promise<History> {
    const userHistoryId = await this.prisma.history.findFirstOrThrow({
      where: { userId: id },
      include: {
        User: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    return userHistoryId;
  }
  public async getHistory(id: string): Promise<History[]> {
    const userHistory = await this.prisma.history.findMany({
      where: { userId: id },
      include: {
        User: {
          select: {
            id: true,
            username: true,
          },
        },
        Content: {
          select: {
            content_id: true,
          },
        },
      },
    });
    if (userHistory === null) {
      throw new Error(`user history not found`);
    }
    return userHistory;
  }
  public async updateComplete(
    histId: string,
    historyComplete: IUpdateCompleteDto
  ): Promise<History> {
    const newCompleterDetail = await this.prisma.history.update({
      where: { history_id: histId },
      data: historyComplete,
    });
    return newCompleterDetail;
  }
  public async updateFavorite(
    histId: string,
    historyFavorite: IUpdateFavDto
  ): Promise<History> {
    const newfavoriteDetail = await this.prisma.history.update({
      where: { history_id: histId },
      data: historyFavorite,
    });
    return newfavoriteDetail;
  }
}
