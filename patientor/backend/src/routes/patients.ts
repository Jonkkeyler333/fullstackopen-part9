import { type NonSensitivePatientEntry, type NewPatientEntry, NewEntrySchema } from "../types.ts";
import patientsService from "../services/patientsService.ts";
import express, { type Response, type Request, type NextFunction } from "express";
import { z } from "zod";
const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        console.log(error.issues);
        res.status(400).json({ error: error.issues });
    } else {
        next(error);
    }
};

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.status(200).json(patientsService.getNonSensitivePatients());
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<NonSensitivePatientEntry | string>) => {
    const addedEntry = patientsService.addPatiend(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;