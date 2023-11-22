export interface ICreateJornalDto {
  journal_rating: number;
  journal_note: string;
  journal_weight: number;
}

export interface IJournalDto {
  journal_rating: number;
  journal_note: string;
  journal_weight: number;
  date_add: Date;
}

export interface IUpdateJournalDto {
  journal_rating: number;
  journal_note: string;
  journal_weight: number;
}
