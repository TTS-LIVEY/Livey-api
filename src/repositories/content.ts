import { PrismaClient, content } from "@prisma/client";
import {
  IContentAll,
  IContentRepository,
  ICreateContent,
} from "../interfaces/content.interface";

export default class ContentRepository implements IContentRepository {
  constructor(private prisma: PrismaClient) {}
  public async createContent(
    id: string,
    content: ICreateContent
  ): Promise<content> {
    return await this.prisma.content.create({
      data: {
        ...content,
      },
    });
  }
  public async getContent(): Promise<IContentAll[]> {
    const allContent = await this.prisma.content.findMany();
    return allContent;
  }
  public async getContentById(id: number): Promise<IContentAll> {
    const individualContent = await this.prisma.content.findUniqueOrThrow({
      where: { id },
    });
    return individualContent;
  }
  public async deleteContent(id: number): Promise<IContentAll> {
    const deletedContent = await this.prisma.content.delete({
      where: { id },
    });
    return deletedContent;
  }
}
