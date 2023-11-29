import { RequestHandler } from "express";
import {
  HistID,
  INewComplete,
  INewFavorite,
  IWatchHistory,
  IWatchedHandler,
  IWatchedRepository,
  histId,
} from "../interfaces/watched.interface";
import {
  IPostWatchedDto,
  IUpdateCompleteDto,
  IUpdateFavDto,
  IWatchedDto,
} from "../dto/watched.dto";
import { IErrorDto } from "../dto/error.dto";
import { AuthStatus } from "../middleware/jwt";

export default class WatchedHandler implements IWatchedHandler {
  constructor(private Repo: IWatchedRepository) {}

  public create: RequestHandler<
    histId,
    IWatchedDto | IErrorDto,
    IPostWatchedDto
  > = async (req, res) => {
    try {
      const { contentId } = req.body;
      const historyDetail = await this.Repo.getHistory(req.params.id);

      if (
        historyDetail.find((data) => {
          return data.contentId === contentId;
        })
      ) {
        return res.status(200).json({ message: `Duplicate history` }).end();
      }

      const { history_id, userId: db_userId } = await this.Repo.createWatched(
        res.locals.user.id,
        contentId
      );
      const createdHist = {
        history_id,
        userId: db_userId,
        contentId,
      };

      return res.status(200).json(createdHist);
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message }).end();
    }
  };
  public get: RequestHandler<histId, IWatchHistory[] | IErrorDto> = async (
    req,
    res
  ) => {
    try {
      const historyDetail = await this.Repo.getHistory(req.params.id);
      if (historyDetail === null)
        return res.status(404).json({ message: `No records found` }).end();
      return res.status(200).json(historyDetail).end();
    } catch (error) {
      return res.status(500).json({ message: `Internal server error` }).end();
    }
  };
  public updateComp: RequestHandler<
    HistID,
    INewComplete | IErrorDto,
    IUpdateCompleteDto
  > = async (req, res) => {
    try {
      const { is_complete } = req.body;
      const newComplete = await this.Repo.updateComplete(req.params.historyid, {
        is_complete,
      });

      return res.status(200).json(newComplete).end();
    } catch (error) {
      return res
        .status(500)
        .json({ message: `unable to find any update` })
        .end();
    }
  };
  public updateFav: RequestHandler<
    HistID,
    INewFavorite | IErrorDto,
    IUpdateFavDto
  > = async (req, res) => {
    try {
      const { is_favorite } = req.body;
      if (is_favorite === undefined)
        return res.status(404).json({ message: `is_fav is ${is_favorite}` });

      const newFav = await this.Repo.updateFavorite(req.params.historyid, {
        is_favorite,
      });

      return res.status(200).json(newFav).end();
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message }).end();
    }
  };
}
