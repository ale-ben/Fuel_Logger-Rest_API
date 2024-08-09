import express, {Request, Response, Router} from "express";
import {validate} from "../middleware/typeCheck";
import {z} from "zod";
import {FuelLog, zFuelLog} from "../types/fuelLogTypes";
import {deleteLogs, getLogs, saveLog} from "../utils/Influxdb";
import {zTimePeriod} from "../types/EndpointTypes";


export const router: Router = express.Router();

router.post("/:carName/new", validate(z.object({body: zFuelLog})), (req: Request, res: Response) => {
    /*
       #swagger.description = 'Endpoint to add a new fuel log' */

    const carName = req.params.carName;
    const fLog: FuelLog = zFuelLog.parse(req.body);
    saveLog(carName, fLog).then(() => console.log("Saved"));

    res.json({ok: true});
});

router.get("/:carName/all", async (req: Request, res: Response) => {
    /*
       #swagger.description = 'Endpoint to get all logs' */
    const carName = req.params.carName;
    const logs = await getLogs(carName);

    res.json(logs);
});

router.delete("/:carName/delete", validate(z.object({query: zTimePeriod})), async (req: Request, res: Response) => {
    const carName = req.params.carName;
    const timePeriod = zTimePeriod.parse(req.query);

    await deleteLogs(carName, timePeriod);
    res.json({ok: true});
})