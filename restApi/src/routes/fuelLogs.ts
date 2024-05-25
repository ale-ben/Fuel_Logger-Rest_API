import express, {Request, Response, Router} from "express";
import {validate} from "../middleware/typeCheck";
import {z} from "zod";
import {FuelLog, zFuelLog} from "../types/fuelLogTypes";
import {getLogs, saveLog} from "../utils/Influxdb";


export const router: Router = express.Router();

router.post("/new", validate(z.object({body: zFuelLog})) ,(req: Request, res: Response) => {
    /*
       #swagger.description = 'Endpoint to add a new fuel log' */

    const fLog: FuelLog = zFuelLog.parse(req.body);
    saveLog(fLog).then(() => console.log("Saved"));

    res.json({ok: true});
});

router.get("/all", (req: Request, res: Response) => {
    /*
       #swagger.description = 'Endpoint to get all logs' */

    getLogs();

    res.json({ok: true});
});