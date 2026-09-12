import { isNumber } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface calculateParams {
  exercise: number[];
  target: number;
}

const checkParams = (args: string[]): calculateParams => {
  if (args.length < 4) throw new Error("Incorrect number of arguments");
  for (let index = 2; index < args.length; index++) {
    if (!isNumber(args[index]))
      throw new Error("Provided values were not numbers");
  }
  return {
    exercise: args.slice(3, args.length).map((value) => Number(value)),
    target: Number(args[2]),
  };
};

const calculateExercises = (exercise: number[], target: number): Result => {
  const periodLength = exercise.length;
  const exercise_days = exercise.filter((day) => day > 0);
  const trainingDays = exercise_days.length;
  const total_hours = exercise_days.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const average = total_hours / periodLength;
  const success = average >= target;
  const ratings = [
    { ratio: 0.5, description: "you need to improve your training", score: 1 },
    { ratio: 1, description: "not too bad but could be better", score: 2 },
    { ratio: 1.5, description: "you are doing great, keep it up!", score: 3 },
  ];
  const ratio_person = average / target;
  const rating =
    ratings.find((r) => ratio_person <= r.ratio) ?? ratings[ratings.length - 1];
  return {
    periodLength,
    trainingDays,
    success,
    rating: rating.score,
    ratingDescription: rating.description,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { exercise, target } = checkParams(process.argv);
    console.log(calculateExercises(exercise, target));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong. ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.error(errorMessage);
  }
}

export default calculateExercises;
