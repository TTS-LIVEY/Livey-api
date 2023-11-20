import { PrismaClient, user } from "@prisma/client";

import {
  ICreateuserDto,
  ILoginDto,
  IUpdateWeightDto,
  IUserDto,
} from "../dto/user.dto";
import {
  IUserRepository,
  UpdatedUserDetailWithoutPassword,
} from "../interfaces/user.interface";

export default class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}
  public async createuser(user: ICreateuserDto): Promise<IUserDto> {
    const createdUser = await this.prisma.user.create({
      data: user,
      select: {
        id: true,
        username: true,
        registered_date: true,
        body_weight: true,
        body_height: true,
      },
    });
    return createdUser;
  }
  public async findByUsername(username: string): Promise<user> {
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
        watchedId: true,
        favoriteId: true,
      },
      where: {
        username,
      },
    });
  }
}
