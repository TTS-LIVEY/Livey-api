import { RequestHandler } from "express";
import {
  Content,
  IWatchedHandler,
  IWatchedRepository,
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
}
