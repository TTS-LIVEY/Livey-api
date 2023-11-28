export interface IPostWatchedDto {
  is_watched: boolean;
  contentId: number;
}

export interface IWatchedDto {
  history_id: string;
  userId: string;
  contentId: number;
}

export interface IUpdateCompleteDto {
  is_complete: boolean;
}

export interface INewCompleteDto {
  history_id: string;
  is_complete: boolean;
  is_favorite: boolean;
  contentId: number;
  userId: string;
}
export interface IUpdateFavDto {
  is_favorite: boolean;
}
