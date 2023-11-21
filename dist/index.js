"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./repositories/user"));
const user_2 = __importDefault(require("./handler/user"));
const content_1 = __importDefault(require("./repositories/content"));
const content_2 = __importDefault(require("./handler/content"));
const jwt_1 = __importDefault(require("./middleware/jwt"));
const journal_1 = __importDefault(require("./repositories/journal"));
const journal_2 = __importDefault(require("./handler/journal"));
const app = (0, express_1.default)();
const PORT = 8085;
const client = new client_1.PrismaClient();
const userRepo = new user_1.default(client);
const userHandler = new user_2.default(userRepo);
const contentRepo = new content_1.default(client);
const contentHandler = new content_2.default(contentRepo);
const journalRepo = new journal_1.default(client);
const journalHandler = new journal_2.default(journalRepo);
const jwtMiddleware = new jwt_1.default();
app.use(express_1.default.json());
app.get("/", jwtMiddleware.auth, (req, res) => {
    console.log(res.locals);
    return res.status(200).send("Welcome to Livey").end();
});
//user register and login
const userRouter = express_1.default.Router();
app.use("/user", userRouter);
userRouter.post("/", userHandler.registration);
userRouter.post("/login", userHandler.login);
userRouter.patch("/:username", userHandler.updateWeightDetail);
const contentRouter = express_1.default.Router();
app.use("/content", contentRouter);
contentRouter.post("/", jwtMiddleware.auth, contentHandler.create);
contentRouter.get("/", contentHandler.getAll);
contentRouter.get("/:id", contentHandler.getById);
contentRouter.delete("/:id", jwtMiddleware.auth, contentHandler.deleteById);
const journalRouter = express_1.default.Router();
app.use("/journal", journalRouter);
journalRouter.post("/", jwtMiddleware.auth, journalHandler.create);
app.listen(PORT, () => {
    console.log(`Livey-API is listening on port ${PORT}`);
});