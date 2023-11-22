export interface IPostWatchedDto {
  is_watched: boolean;
  contentId: number;
}

export interface IWatchedDto {
  history_id: string;
  userId: string;
  contentId: number;
}
