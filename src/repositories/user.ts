import { PrismaClient, User } from "@prisma/client";

import {
  ICreateuserDto,
  ILoginDto,
  IUpdateWeightDto,
  IUserDto,
} from "../dto/user.dto";
import {
  IUserAll,
  IUserRepository,
  UpdatedUserDetailWithoutPassword,
  UserDetail,
} from "../interfaces/user.interface";

const SELECT = {
  id: true,
  username: true,
  registered_date: true,
  body_weight: true,
  body_height: true,
};

export default class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}
  public async createuser(user: ICreateuserDto): Promise<IUserDto> {
    const createdUser = await this.prisma.user.create({
      data: user,
      select: SELECT,
    });
    return createdUser;
  }
  public async getAll(): Promise<IUserAll[]> {
    const allUser = await this.prisma.user.findMany({});
    return allUser;
  }
  public async findByUsername(username: string): Promise<User> {
    const findUsernameSuccess = await this.prisma.user.findUniqueOrThrow({
      where: {
        username: username,
      },
    });
    return findUsernameSuccess;
  }
  public async updateWeight(
    username: string,
    userDetail: IUpdateWeightDto
  ): Promise<UpdatedUserDetailWithoutPassword> {
    return await this.prisma.user.update({
      data: userDetail,
      select: {
        id: true,
        name: true,
        username: true,
        registered_date: true,
        body_weight: true,
        body_height: true,
        History: {
          select: {
            history_id: true,
            userId: true,
            contentId: true,
          },
        },
      },
      where: {
        username,
      },
    });
  }
  public async findById(userId: string): Promise<UserDetail> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        name: true,
      },
    });
  }
}
