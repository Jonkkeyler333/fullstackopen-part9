import express, {type Request, type Response} from 'express';
import calculateBmi from './bmiCalculator.ts';
import calculateExercises from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

interface exerBodyRequest {
  daily_exercises : number[],
  target: number
}

app.get('/hello', (_req: Request, res: Response) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;
  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))){
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const heightNum: number = Number(height);
  const weightNum: number = Number(weight);

  const result: string = calculateBmi(heightNum, weightNum);

  return res.status(200).json({ weight: weightNum, height: heightNum, bmi: result });

});


app.post('/exercises', (req: Request<Record<string, never>, Record<string, never>, exerBodyRequest>, res: Response) => {
  const { daily_exercises, target } = req.body;
  if (!target || !daily_exercises) {
    return res.status(400).json({ error: "parameters missing" });
  }
  if (isNaN(Number(target)) || !Array.isArray(daily_exercises) || daily_exercises.some(day => isNaN(Number(day)))) {
    return res.status(400).json({ error: "malformatted parameters"});
  }

  const exercise: number[] = daily_exercises.map(day => Number(day));
  const targetNum: number = Number(target);

  const result = calculateExercises(exercise, targetNum);

  return res.status(200).json(result);

});

const PORT = 3000;

app.listen(PORT, ()=> {
  console.log(`Server Running at ${PORT} port`); 
});
