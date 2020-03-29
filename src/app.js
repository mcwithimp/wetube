import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import routes from "./routes";
import "./passport";

const app = express();

app.use(helmet());
app.set("views", [
  `${__dirname}/views`,
  `${__dirname}/views/global`,
  `${__dirname}/views/users`,
  `${__dirname}/views/videos`
]);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(`${__dirname}/static`));
app.set("view engine", "pug");

// from express v4.16.0
// some of body-parser are built-in express
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));

const MongoStore = connectMongo(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    resave: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
