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

const app = express();
const PORT = 8085;
const client = new PrismaClient();
const userRepo: IUserRepository = new UserRepository(client);
const userHandler: IUserHandler = new UserHandler(userRepo);
const contentRepo: IContentRepository = new ContentRepository(client);
const contentHandler: IContentHandler = new ContentHandler(contentRepo);
const journalRepo: IJournalRepository = new JournalRepository(client);
const journalHandler: IJournalHandler = new JournalHandler(journalRepo);
const jwtMiddleware = new JWTMiddleware();

app.use(express.json());

app.get("/", jwtMiddleware.auth, (req, res) => {
  console.log(res.locals);
  return res.status(200).send("Welcome to Livey").end();
});
//user register and login
const userRouter = express.Router();
app.use("/user", userRouter);
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

app.listen(PORT, () => {
  console.log(`Livey-API is listening on port ${PORT}`);
});