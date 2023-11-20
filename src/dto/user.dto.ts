export interface ICreateuserDto {
  name: string;
  username: string;
  password: string;
  body_weight?: number;
  body_height?: number;
}
export interface IUserDto {
  id: string;
  username: string;
  registered_date: Date;
  body_weight?: number | null;
  body_height?: number | null;
}

export interface ILoginDto {
  username: string;
  password: string;
}

export interface IUpdateWeightDto {
  body_weight: number;
}
