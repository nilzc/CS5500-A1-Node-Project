"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server. Declares RESTful web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 *     <li>follows</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database service.
 */
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const logErrors_1 = require("./error_handlers/logErrors");
const dbErrorHandler_1 = require("./error_handlers/dbErrorHandler");
const errorHandler_1 = require("./error_handlers/errorHandler");
const TuitController_1 = require("./controllers/TuitController");
const UserController_1 = require("./controllers/UserController");
const LikeController_1 = require("./controllers/LikeController");
const FollowController_1 = require("./controllers/FollowController");
const BookmarkController_1 = require("./controllers/BookmarkController");
const MessageController_1 = require("./controllers/MessageController");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/hello', (req, res) => res.send('Hello World!'));
app.get('/add/:a/:b', (req, res) => res.send(req.params.a + req.params.b));
mongoose_1.default.connect(`${process.env.DB_URI}`, (err) => {
    if (err)
        throw err;
    console.log("Mongoose connected!");
});
const userController = UserController_1.UserController.getInstance(app);
const tuitController = TuitController_1.TuitController.getInstance(app);
const likeController = LikeController_1.LikeController.getInstance(app);
const followController = FollowController_1.FollowController.getInstance(app);
const bookmarkController = BookmarkController_1.BookmarkController.getInstance(app);
const messageController = MessageController_1.MessageController.getInstance(app);
/**
 * Starts a server listening at port 4000 locally or
 * using environment variable POT on Heroku if applicable
 */
const PORT = 4000;
app.use(logErrors_1.logErrors);
app.use(dbErrorHandler_1.dbErrorHandler);
app.use(errorHandler_1.errorHandler);
app.listen(process.env.PORT || PORT);
