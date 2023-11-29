import { RequestHandler } from "express";
import {
  IProgramHandler,
  IProgramRepository,
} from "../interfaces/program.interface";
import { ICreateProgramDto, IReturnProgramDto } from "../dto/program.dto";
import { IErrorDto } from "../dto/error.dto";

export default class ProgramHandler implements IProgramHandler {
  constructor(private Repo: IProgramRepository) {}
  public createProgram: RequestHandler<
    {},
    IReturnProgramDto | IErrorDto,
    ICreateProgramDto
  > = async (req, res) => {
    const { program_title, schedule_title } = req.body;
    if (program_title === null || schedule_title === null)
      return res
        .status(400)
        .json({ message: `Wheather program or schedule did not exist` })
        .end();
    const programDetail = await this.Repo.create({
      program_title,
      schedule_title,
    });
    return res
      .status(200)
      .json({ ...programDetail })
      .end();
  };
}
