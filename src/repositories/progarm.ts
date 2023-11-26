import { PrismaClient, Program } from "@prisma/client";
import {
  ICreateProgram,
  IProgramRepository,
  IReturnProgram,
} from "../interfaces/program.interface";

export default class ProgramRepository implements IProgramRepository {
  constructor(private prisma: PrismaClient) {}
  public async create(programDetail: ICreateProgram): Promise<Program> {
    return await this.prisma.program.create({
      data: {
        ...programDetail,
      },
    });
  }
}
