import express, {Request, Response, Router} from "express";
import {validate} from "../middleware/typeCheck";
import {z} from "zod";
import {FuelLog, zFuelLog} from "../types/fuelLogTypes";
import {getLogs, saveLog} from "../utils/Influxdb";


export const router: Router = express.Router();

router.post("/:carName/new", validate(z.object({body: zFuelLog})) ,(req: Request, res: Response) => {
    /*
       #swagger.description = 'Endpoint to add a new fuel log' */

    const carName = req.params.carName;
    const fLog: FuelLog = zFuelLog.parse(req.body);
    saveLog(carName, fLog).then(() => console.log("Saved"));

    res.json({ok: true});
});

router.get("/:carName/all", (req: Request, res: Response) => {
    /*
       #swagger.description = 'Endpoint to get all logs' */
    const carName = req.params.carName;
    getLogs(carName);

    res.json({ok: true});
});