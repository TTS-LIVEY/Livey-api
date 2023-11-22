import { PrismaClient, Content } from "@prisma/client";
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
  ): Promise<Content> {
    return await this.prisma.content.create({
      data: {
        body_part: content.body_part,
        video_title: content.video_title,
        thumbnail_url: content.thumbnail_url,
        video_type: content.video_type,
        video_url: content.video_url,
        Program: {
          connect: {
            program_title_schedule_title: {
              program_title: content.program_title,
              schedule_title: content.schedule_title,
            },
          },
        },
      },
    });
  }
  public async getContent(): Promise<IContentAll[]> {
    const allContent = await this.prisma.content.findMany({
      include: {
        History: {
          select: {
            history_id: true,
            userId: true,
            contentId: true,
          },
        },
      },
    });
    return allContent;
  }
  public async getContentById(id: number): Promise<IContentAll> {
    const individualContent = await this.prisma.content.findUniqueOrThrow({
      where: { content_id: id },
    });
    return individualContent;
  }
  public async deleteContent(id: number): Promise<IContentAll> {
    const deletedContent = await this.prisma.content.delete({
      where: { content_id: id },
    });
    return deletedContent;
  }
}
