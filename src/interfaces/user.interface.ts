import { Content, User } from "@prisma/client";
import {
  ICreateuserDto,
  ILoginDto,
  IUpdateWeightDto,
  IUserDetailDto,
  IUserDto,
} from "../dto/user.dto";
import { RequestHandler } from "express";
import { ICredentialDto } from "../dto/auth.dto";
import { IErrorDto } from "../dto/error.dto";
import { AuthStatus } from "../middleware/jwt";

export interface Username {
  username: string;
}
export interface IUserAll extends User {}
export interface UpdatedUserDetailWithoutPassword {
  id: string;
  name: string;
  username: string;
  registered_date: Date;
  body_weight: number | null;
  body_height: number | null;
}

export interface UserDetail {
  id: string;
  name: string;
  username: string;
}
export interface IUserRepository {
  createuser(user: ICreateuserDto): Promise<IUserDto>;
  findByUsername(username: string): Promise<User>;
  getAll(): Promise<IUserAll[]>;
  findById(userId: string): Promise<UserDetail>;
  updateWeight(
    username: string,
    userDetail: IUpdateWeightDto
  ): Promise<UpdatedUserDetailWithoutPassword>;
}

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateuserDto>;
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>;
  getAllUser: RequestHandler<{}, IUserAll[] | IErrorDto>;
  checkUser: RequestHandler<
    {},
    IUserDetailDto | IErrorDto,
    unknown,
    unknown,
    AuthStatus
  >;
  updateWeightDetail: RequestHandler<
    Username,
    UpdatedUserDetailWithoutPassword | IErrorDto,
    IUpdateWeightDto
  >;
}
