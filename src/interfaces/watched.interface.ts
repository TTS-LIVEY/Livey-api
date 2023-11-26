import { History } from "@prisma/client";
import { IPostWatchedDto, IWatchedDto } from "../dto/watched.dto";
import { RequestHandler } from "express";
import { IErrorDto } from "../dto/error.dto";
import { Id } from "./content.interface";

export interface histId {
  id: string;
}

export interface IWatchHistory extends History {}

export interface IWatchedRepository {
  createWatched(userId: string, contentId: number): Promise<History>;
  getHistory(id: string): Promise<History[]>;
}

export interface IWatchedHandler {
  create: RequestHandler<{}, IWatchedDto | IErrorDto, IPostWatchedDto>;
  get: RequestHandler<histId, IWatchHistory[] | IErrorDto>;
}
