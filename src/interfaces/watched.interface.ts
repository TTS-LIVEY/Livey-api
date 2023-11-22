import { History } from "@prisma/client";
import { IPostWatchedDto, IWatchedDto } from "../dto/watched.dto";
import { RequestHandler } from "express";
import { IErrorDto } from "../dto/error.dto";

export interface Content {
  id: string;
}

export interface IWatchedRepository {
  createWatched(userId: string, contentId: number): Promise<History>;
}

export interface IWatchedHandler {
  create: RequestHandler<{}, IWatchedDto | IErrorDto, IPostWatchedDto>;
}
