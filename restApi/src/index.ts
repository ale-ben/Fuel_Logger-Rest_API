// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger-output.json';
import {router as apiRouter} from "./routes/fuelLogs";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/logs", apiRouter
/*
* #swagger.tags = ['Logs']
* */);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});