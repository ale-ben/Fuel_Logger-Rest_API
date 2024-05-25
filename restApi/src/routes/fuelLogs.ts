import express, {Request, Response, Router} from "express";

export const router: Router = express.Router();

router.get("/new", (req: Request, res: Response) => {
    /*
       #swagger.description = 'Endpoint to sign in a specific user' */
    res.send("Express + TypeScript Server");
});