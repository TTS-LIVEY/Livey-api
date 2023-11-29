import { History } from "@prisma/client";
import {
  INewCompleteDto,
  IPostWatchedDto,
  IUpdateCompleteDto,
  IUpdateFavDto,
  IWatchedDto,
} from "../dto/watched.dto";
import { RequestHandler } from "express";
import { IErrorDto } from "../dto/error.dto";
import { Id } from "./content.interface";
import { AuthStatus } from "../middleware/jwt";

export interface histId {
  id: string;
}
export interface HistID {
  historyid: string;
}

export interface IWatchHistory extends History {}
export interface INewComplete extends History {}
export interface INewFavorite extends History {}
export interface IWatchedRepository {
  createWatched(userId: string, contentId: number): Promise<History>;
  getHistory(id: string): Promise<History[]>;
  getHistoryById(id: string): Promise<History>;
  updateComplete(
    HistID: string,
    historyComplete: IUpdateCompleteDto
  ): Promise<History>;
  updateFavorite(
    HistID: string,
    historyFavorite: IUpdateFavDto
  ): Promise<History>;
}

export interface IWatchedHandler {
  create: RequestHandler<
    histId,
    IWatchedDto | IErrorDto,
    IPostWatchedDto,
    undefined,
    AuthStatus
  >;
  get: RequestHandler<
    histId,
    IWatchHistory[] | IErrorDto,
    undefined,
    undefined,
    AuthStatus
  >;
  updateComp: RequestHandler<
    HistID,
    INewComplete | IErrorDto,
    IUpdateCompleteDto
  >;
  updateFav: RequestHandler<HistID, INewFavorite | IErrorDto, IUpdateFavDto>;
}
