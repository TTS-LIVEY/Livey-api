import { Content, Program } from "@prisma/client";

import { RequestHandler } from "express";
import { IContentDto, ICreateContentDto } from "../dto/content.dto";
import { IErrorDto } from "../dto/error.dto";

export interface IContentAll extends Content {}
export interface ICreateContent {
  video_type: string;
  video_url: string;
  video_title: string;
  thumbnail_url: string;
  body_part: string;
  program_title: string;
  schedule_title: string;
}
export interface IContent {
  video_title: string;
  thumbnail_url: string;
  video_type: string;
  video_url: string;
  body_part: string;
}

export interface Id {
  id: number;
}
export interface IWatched {
  id: string;
  is_watched: boolean;
  userId: string;
  contentId: string;
}
export interface IContentRepository {
  createContent(id: string, content: ICreateContent): Promise<Content>;
  getContent(): Promise<IContentAll[]>;
  getContentById(id: number): Promise<IContentAll>;
  deleteContent(id: number): Promise<IContentAll>;
}
export interface IContentHandler {
  create: RequestHandler<{}, IContentDto | IErrorDto, ICreateContentDto>;
  getAll: RequestHandler<{}, IContentAll[] | IErrorDto>;
  getById: RequestHandler<Id, IContentAll | IErrorDto>;
  deleteById: RequestHandler<Id, IContentAll | IErrorDto>;
}
