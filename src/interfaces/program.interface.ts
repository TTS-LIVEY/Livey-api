import { Program } from "@prisma/client";
import { RequestHandler } from "express";
import { IErrorDto } from "../dto/error.dto";
import { ICreateProgramDto, IReturnProgramDto } from "../dto/program.dto";

export interface ICreateProgram {
  program_title: string;
  schedule_title: string;
}
export interface IReturnProgram extends Program {
  content_id: number;
}

export interface IProgramRepository {
  create(programDetail: ICreateProgram): Promise<Program>;
}

export interface IProgramHandler {
  createProgram: RequestHandler<
    {},
    IReturnProgramDto | IErrorDto,
    ICreateProgramDto
  >;
}
