import { RequestHandler } from "express";

import { IContentDto, ICreateContentDto } from "../dto/content.dto";
import { IErrorDto } from "../dto/error.dto";

import { oembedUrl } from "../utils/oembed";
import {
  IContentAll,
  IContentHandler,
  IContentRepository,
  Id,
} from "../interfaces/content.interface";
import { adminID } from "../const";

export default class ContentHandler implements IContentHandler {
  constructor(private Repo: IContentRepository) {}
  public create: RequestHandler<
    {},
    IContentDto | IErrorDto,
    ICreateContentDto
  > = async (req, res) => {
    try {
      if (res.locals.user.id !== adminID) {
        console.log(res.locals.user.id);
        return res.status(501).json({ message: `Unauthorized access` }).end();
      }
      const { video_url, video_type, body_part } = req.body;
      const { thumbnail_url, title } = await oembedUrl(video_url);

      const newContent = await this.Repo.createContent(res.locals.id, {
        video_url,
        video_type,
        thumbnail_url,
        body_part,
        video_title: title,
      });

      return res
        .status(200)
        .json({ ...newContent })
        .end();
    } catch (err) {
      return res.status(500).json({ message: `Internal server error` }).end();
    }
  };
  public getAll: RequestHandler<{}, IContentAll[] | IErrorDto> = async (
    req,
    res
  ) => {
    try {
      const allContent = await this.Repo.getContent();
      return res.status(200).json(allContent).end();
    } catch (error) {
      return res.status(404).json({ message: `content not found` }).end();
    }
  };
  public getById: RequestHandler<Id, IContentAll | IErrorDto> = async (
    req,
    res
  ) => {
    try {
      const contentById = await this.Repo.getContentById(Number(req.params.id));
      if (contentById === null)
        return res.status(404).json({ message: `Id not found` });
      return res.status(200).json(contentById).end();
    } catch (error) {
      return res.status(500).json({ message: `Internal server error` }).end();
    }
  };
  public deleteById: RequestHandler<Id, IContentAll | IErrorDto> = async (
    req,
    res
  ) => {
    try {
      if (res.locals.user.id !== adminID) {
        console.log(res.locals.user.id);
        return res.status(501).json({ message: `Unauthorized access` }).end();
      }
      const delContent = await this.Repo.deleteContent(Number(req.params.id));
      return res.status(200).json(delContent).end();
    } catch (error) {
      return res.status(500).json({ message: `Internal server error` }).end();
    }
  };
}
