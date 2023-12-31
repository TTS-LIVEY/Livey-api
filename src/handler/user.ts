import { RequestHandler } from "express";
import {
  ICreateuserDto,
  ILoginDto,
  IUpdateWeightDto,
  IUserDetailDto,
  IUserDto,
} from "../dto/user.dto";
import { IErrorDto } from "../dto/error.dto";
import { hashPassword, verifyPassword } from "../utils/bcrypts";
import { ICredentialDto } from "../dto/auth.dto";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../const";
import {
  IUserAll,
  IUserHandler,
  IUserRepository,
  UpdatedUserDetailWithoutPassword,
  Username,
} from "../interfaces/user.interface";
import { User } from "@prisma/client";
import { AuthStatus } from "../middleware/jwt";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library";

export default class UserHandler implements IUserHandler {
  constructor(private Repo: IUserRepository) {}
  public registration: RequestHandler<
    {},
    IUserDto | IErrorDto,
    ICreateuserDto
  > = async (req, res) => {
    try {
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
    } catch (error) {
      const userNameIdeal = await this.Repo.findByUsername(req.body.username);

      if (userNameIdeal.username === req.body.username) {
        return res.status(500).json({ message: `username duplicated` }).end();
      }
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025" &&
        PrismaClientUnknownRequestError
      ) {
        return res
          .status(500)
          .json({
            message: `name is invalid`,
          })
          .end();
      }
      return res
        .status(500)
        .json({
          message: `Internal Server Error`,
        })
        .end();
    }
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
  public checkUser: RequestHandler<
    {},
    IUserDetailDto | IErrorDto,
    unknown,
    unknown,
    AuthStatus
  > = async (req, res) => {
    try {
      const idUser = await this.Repo.findById(res.locals.user.id);
      return res.status(200).json(idUser).end();
    } catch (error) {
      return res.status(501).json({ message: `Unauthorized user` }).end();
    }
  };
  public getAllUser: RequestHandler<{}, IUserAll[] | IErrorDto> = async (
    req,
    res
  ) => {
    try {
      const userAll = await this.Repo.getAll();
      return res.status(200).json(userAll).end();
    } catch (error) {
      return res.status(404).json({ message: `content not found` }).end();
    }
  };
}
