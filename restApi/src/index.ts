// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger-output.json';
import {router as logRouter} from "./routes/fuelLogs";
import {initInfluxdbClient} from "./utils/Influxdb";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

initInfluxdbClient();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

app.use("/logs", logRouter
/*
* #swagger.tags = ['Logs']
* */);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});