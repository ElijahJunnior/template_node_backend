import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import "@shared/container";

import cors from "cors";
import express from "express";

import upload from "@config/multerImageUpload";
import { errorHandleMiddleware } from "@middlewares/errorHandleMiddleware";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(cors());

router.use("/images/", express.static(`${upload.tmp_folder}/images`));

app.use(router);

app.use(errorHandleMiddleware);

export { app };
