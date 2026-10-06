import { type NonSensitivePatientEntry, type NewPatientEntry, NewEntrySchema, type PatientEntry, NewEntryPatientSchema, type Entry, type NewEntry} from "../types.ts";
import patientsService from "../services/patientsService.ts";
import entryService from "../services/entryService.ts";
import express, { type Response, type Request, type NextFunction } from "express";
import { z } from "zod";
const router = express.Router();

interface errorMessage {
    error: string;
}

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntryPatientSchema.parse(req.body);
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

router.get("/:id", (req: Request<{id: string}>, res: Response<PatientEntry | errorMessage>) => {
    const { id } = req.params;
    const patient = patientsService.getPatientById(id);
    if (patient) {
        res.status(200).json(patient);
    }
    else {
        res.status(404).json({error: "Patient not found"});
    }
});

router.post("/:id/entries", newEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry | errorMessage>) => {
    const { id } = req.params;
    const newPatientEntry = entryService.addEntry(id, req.body);
    if (newPatientEntry) {
        res.status(200).json(newPatientEntry);
    } else {
        res.status(404).json({error: "Patient not found"});
    }
});

router.use(errorMiddleware);

export default router;