import { RequestHandler } from "express";
import {
  IWatchHistory,
  IWatchedHandler,
  IWatchedRepository,
  histId,
} from "../interfaces/watched.interface";
import { IPostWatchedDto, IWatchedDto } from "../dto/watched.dto";
import { IErrorDto } from "../dto/error.dto";

export default class WatchedHandler implements IWatchedHandler {
  constructor(private Repo: IWatchedRepository) {}

  public create: RequestHandler<{}, IWatchedDto | IErrorDto, IPostWatchedDto> =
    async (req, res) => {
      const { contentId } = req.body;

      const { history_id, userId } = await this.Repo.createWatched(
        res.locals.user.id,
        contentId
      );
      console.log;
      return res.status(200).json({ history_id, userId, contentId });
    };
  public get: RequestHandler<histId, IWatchHistory[] | IErrorDto> = async (
    req,
    res
  ) => {
    try {
      const historyDetail = await this.Repo.getHistory(req.params.id);
      console.log(res.locals.user.id);
      if (historyDetail === null)
        return res.status(404).json({ message: `No records found` }).end();
      return res
        .status(200)
        .json({ ...historyDetail })
        .end();
    } catch (error) {
      return res.status(500).json({ message: `Internal server error` }).end();
    }
  };
}
