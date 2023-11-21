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

const app = express();
const PORT = 8085;
const client = new PrismaClient();
const userRepo: IUserRepository = new UserRepository(client);
const userHandler: IUserHandler = new UserHandler(userRepo);
const contentRepo: IContentRepository = new ContentRepository(client);
const contentHandler: IContentHandler = new ContentHandler(contentRepo);
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello parn");
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
contentRouter.post("/", contentHandler.create);
contentRouter.get("/", contentHandler.getAll);
contentRouter.get("/:id", contentHandler.getById);
contentRouter.delete("/:id", contentHandler.deleteById);

app.listen(PORT, () => {
  console.log(`Livey-API is listening on port ${PORT}`);
});
