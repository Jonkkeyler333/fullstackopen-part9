import { Gender, type NewPatientEntry } from "../src/types.ts";

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};

const isGender = (param: string): param is Gender => {
  return (Object.values(Gender) as string[]).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date of birth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorect or missing name: " + name);
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)){
    throw new Error("Incorrect or missing occupation: " + ssn);
  }
  return ssn;
};

const parseNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object'){
        throw new Error("Incorrect or missing data");
    }
    if ('name' in object && 'ssn' in object && 'occupation' in object && 'dateOfBirth' in object && 'gender' in object){
        const newEntry : NewPatientEntry = {
            name: parseName(object.name),
            ssn: parseSsn(object.ssn),
            occupation: parseOccupation(object.occupation),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender)
        };
        return newEntry;
    }
    throw new Error("Incorrect data: some fields are missing");
};

export default parseNewPatientEntry;