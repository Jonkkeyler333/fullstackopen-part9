import type {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types.ts";
import { v1 as uuid } from "uuid";

import patients from "../../data/patientEntries.ts";

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatiend = (entry: NewPatientEntry): NonSensitivePatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatiend,
};
