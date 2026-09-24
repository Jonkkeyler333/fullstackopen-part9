import express, {type Response} from 'express';
import diagnosesService from '../services/diagnosisService.ts';
import type { DiagnosisEntry } from '../types.ts';

const router = express.Router();

router.get("/", (_req, res: Response<DiagnosisEntry[]>) => {
    res.status(200).json(diagnosesService.getDiagnoses());
});

export default router;