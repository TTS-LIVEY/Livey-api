import { RequestHandler } from "express";
import {
  ICreateuserDto,
  ILoginDto,
  IUpdateWeightDto,
  IUserDto,
} from "../dto/user.dto";
import { IErrorDto } from "../dto/error.dto";
import { hashPassword, verifyPassword } from "../utils/bcrypts";
import { ICredentialDto } from "../dto/auth.dto";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../const";
import {
  IUserHandler,
  IUserRepository,
  UpdatedUserDetailWithoutPassword,
  Username,
} from "../interfaces/user.interface";
import { User } from "@prisma/client";

export default class UserHandler implements IUserHandler {
  constructor(private Repo: IUserRepository) {}
  public registration: RequestHandler<
    {},
    IUserDto | IErrorDto,
    ICreateuserDto
  > = async (req, res) => {
    const {
      name,
      username,
      password: plainPassword,
      body_height,
      body_weight,
    } = req.body;

    const {
      id: registeredId,
      username: registeredUsername,
      registered_date,
    } = await this.Repo.createuser({
      name,
      username,
      password: hashPassword(plainPassword),
      body_height,
      body_weight,
    });
    return res.status(201).json({
      id: registeredId,
      username: registeredUsername,
      registered_date,
      body_height,
      body_weight,
    });
  };
  public login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto> =
    async (req, res) => {
      const { username, password: plainPassword } = req.body;
      if (username === null)
        return res.status(404).json({ message: `User not found` }).end();

      try {
        const { password, id } = await this.Repo.findByUsername(username);
        if (!verifyPassword(plainPassword, password))
          throw new Error("Invalid username or password");
        const accessToken = sign({ id }, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: "12h",
          issuer: "livey-api",
          subject: "user-credential",
        });
        return res.status(200).json({ accessToken }).end();
      } catch (err) {
        return res
          .status(401)
          .json({ message: `Username or password incorrect` })
          .end();
      }
    };
  public updateWeightDetail: RequestHandler<
    Username,
    UpdatedUserDetailWithoutPassword | IErrorDto,
    IUpdateWeightDto
  > = async (req, res) => {
    const { body_weight } = req.body;
    const newWeight = await this.Repo.updateWeight(req.params.username, {
      body_weight,
    });
    console.log(newWeight);

    return res.status(200).json(newWeight).end();
  };
}
