import diagnoses from "../../data/diagnosesEntries.ts";
import type { DiagnosisEntry } from "../types.ts";

const getDiagnoses = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};