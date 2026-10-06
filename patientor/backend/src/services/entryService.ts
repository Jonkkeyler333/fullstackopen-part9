import { type NewEntry, type Entry } from "../types.ts";
import patients from "../../data/patientEntries.ts";
import { v1 as uuid } from "uuid";

const addEntry = (patientId: string, entry: NewEntry): Entry | null => {
    const patient = patients.find(elem => elem.id === patientId);
    if (!patient){
        return null;
    };
    if (!patient.entries){
        patient.entries = [];
    }
    const newEntry = { id: uuid(), ...entry };
    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    addEntry
};