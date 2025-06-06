import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// app.use(express.static(path.join(__dirname, 'public')));

import userRouter from "./routes/user.routes.js";
app.use("/users", userRouter);

import libraryRouter from "./routes/library.routes.js";
app.use("/library", libraryRouter);

import homeRouter from "./routes/aboutUs.routes.js"
app.use("/aboutUs", homeRouter);

export { app };
