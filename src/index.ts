import { PrismaClient } from "@prisma/client";
import express from "express";

import UserRepository from "./repositories/user";

import UserHandler from "./handler/user";
import ContentRepository from "./repositories/content";
import ContentHandler from "./handler/content";
import {
  IContentHandler,
  IContentRepository,
} from "./interfaces/content.interface";
import { IUserHandler, IUserRepository } from "./interfaces/user.interface";
import JWTMiddleware from "./middleware/jwt";
import {
  IJournalHandler,
  IJournalRepository,
} from "./interfaces/journal.interface";
import JournalRepository from "./repositories/journal";
import JournalHandler from "./handler/journal";
import cors from "cors";
import WatchedHandler from "./handler/watched";
import {
  IWatchedHandler,
  IWatchedRepository,
} from "./interfaces/watched.interface";
import WatchedRepository from "./repositories/watched";
import {
  IProgramHandler,
  IProgramRepository,
} from "./interfaces/program.interface";
import ProgramRepository from "./repositories/progarm";
import ProgramHandler from "./handler/program";

const app = express();
const PORT = 8085;
const client = new PrismaClient();

const userRepo: IUserRepository = new UserRepository(client);
const userHandler: IUserHandler = new UserHandler(userRepo);
const contentRepo: IContentRepository = new ContentRepository(client);
const contentHandler: IContentHandler = new ContentHandler(contentRepo);
const journalRepo: IJournalRepository = new JournalRepository(client);
const journalHandler: IJournalHandler = new JournalHandler(journalRepo);
const historyRepo: IWatchedRepository = new WatchedRepository(client);
const historyHandler: IWatchedHandler = new WatchedHandler(historyRepo);
const programRepo: IProgramRepository = new ProgramRepository(client);
const programHandler: IProgramHandler = new ProgramHandler(programRepo);
const jwtMiddleware = new JWTMiddleware();

app.use(express.json());
app.use(cors());

app.get("/", jwtMiddleware.auth, (req, res) => {
  console.log(res.locals);
  return res.status(200).send("Welcome to Livey").end();
});
//user register and login
const userRouter = express.Router();
app.use("/user", userRouter);
userRouter.get("/me", jwtMiddleware.auth, userHandler.checkUser);
userRouter.post("/", userHandler.registration);
userRouter.post("/login", userHandler.login);
userRouter.patch("/:username", userHandler.updateWeightDetail);

const contentRouter = express.Router();
app.use("/content", contentRouter);
contentRouter.post("/", jwtMiddleware.auth, contentHandler.create);
contentRouter.get("/", contentHandler.getAll);
contentRouter.get("/:id", contentHandler.getById);
contentRouter.delete("/:id", jwtMiddleware.auth, contentHandler.deleteById);

const journalRouter = express.Router();
app.use("/journal", journalRouter);
journalRouter.post("/", jwtMiddleware.auth, journalHandler.create);
journalRouter.get("/", journalHandler.getAll);
journalRouter.patch("/:id", jwtMiddleware.auth, journalHandler.update);

const historyRouter = express.Router();
app.use("/history", historyRouter);
historyRouter.post("/", jwtMiddleware.auth, historyHandler.create);
historyRouter.get("/me", jwtMiddleware.auth, historyHandler.get);
historyRouter.patch(
  "/complete/:historyid",
  jwtMiddleware.auth,
  historyHandler.updateComp
);
historyRouter.patch(
  "/fav/:historyid",
  jwtMiddleware.auth,
  historyHandler.updateFav
);

const programRouter = express.Router();
app.use("/program", programRouter);
programRouter.post("/", jwtMiddleware.auth, programHandler.createProgram);

app.listen(PORT, () => {
  console.log(`Livey-API is listening on port ${PORT}`);
});
