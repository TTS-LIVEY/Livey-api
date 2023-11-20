import axios from "axios";
import { oembedDto } from "../dto/oembed.dto";

export const oembedUrl = async (url: string): Promise<oembedDto> => {
  const videoDetail = await axios.get<oembedDto>(
    `https://noembed.com/embed?url=${url}`
  );
  const videoResult = videoDetail.data;
  const { title, thumbnail_url } = videoResult;

  return { title, thumbnail_url };
};
