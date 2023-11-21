import { content, program } from "@prisma/client";

import { RequestHandler } from "express";
import { IContentDto, ICreateContentDto } from "../dto/content.dto";
import { IErrorDto } from "../dto/error.dto";

export interface IContentAll extends content {}
export interface ICreateContent {
  video_type: string;
  video_url: string;
  video_title: string;
  thumbnail_url: string;
  body_part: string;
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
export interface IContentRepository {
  createContent(id: string, content: ICreateContent): Promise<content>;
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
