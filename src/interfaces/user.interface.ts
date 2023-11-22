import { Content, User } from "@prisma/client";
import {
  ICreateuserDto,
  ILoginDto,
  IUpdateWeightDto,
  IUserDto,
} from "../dto/user.dto";
import { RequestHandler } from "express";
import { ICredentialDto } from "../dto/auth.dto";
import { IErrorDto } from "../dto/error.dto";

export interface Username {
  username: string;
}

export interface UpdatedUserDetailWithoutPassword {
  id: string;
  name: string;
  username: string;
  registered_date: Date;
  body_weight: number | null;
  body_height: number | null;
}

export interface IUserRepository {
  createuser(user: ICreateuserDto): Promise<IUserDto>;
  findByUsername(username: string): Promise<User>;
  updateWeight(
    username: string,
    userDetail: IUpdateWeightDto
  ): Promise<UpdatedUserDetailWithoutPassword>;
}

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateuserDto>;
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>;
  updateWeightDetail: RequestHandler<
    Username,
    UpdatedUserDetailWithoutPassword | IErrorDto,
    IUpdateWeightDto
  >;
}
