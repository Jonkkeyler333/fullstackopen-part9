import express from "express";
import diagnosesRouter from '../src/routes/diagnoses.ts';
import patientsRouter from '../src/routes/patients.ts';

const app = express();

app.use(express.json());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_req, res) => {
    console.log('hey I pong u');
    res.status(200).send("pong");
});

const PORT: number = 3001;

app.listen(PORT, () => {
    console.log(`Server up in ${PORT} port`);
});