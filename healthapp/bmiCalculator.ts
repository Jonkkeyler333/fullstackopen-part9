import { isNumber } from "./utils.ts";

interface BmiParams {
  height: number;
  weight: number;
}

const checkParams = (args: string[]) : BmiParams => {
  if (args.length !== 4) throw new Error("Incorrect number of arguments");
  if (!isNumber(args[2]) || !isNumber(args[3])) throw new Error("Provided values were not numbers");
  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };

};

const calculateBmi = (height: number, weight: number) : string => {
  const height_m : number = height / 100;
  const bmi : number = weight / (height_m**2);
  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17 && bmi >= 16.0) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5 && bmi >= 17) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25 && bmi >= 18.5) {
    return "Normal range";
  } else if (bmi < 30 && bmi >= 25) {
    return "Overweight";
  } else if (bmi < 35 && bmi >= 30) {
    return "Obese (Class I)";
  } else if (bmi < 40 && bmi >= 35) {
    return "Obese (Class II)";
  } else if (bmi >= 40) {
    return "Obese (Class III)";
  } else {
    return "Invalid input";
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    console.log("This file is being run directly");
    const {height, weight} = checkParams(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error){
      errorMessage += error.message;
    }
    console.error(errorMessage);
  }
}

export default calculateBmi;