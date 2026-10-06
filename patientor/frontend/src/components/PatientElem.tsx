import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient, Diagnosis, Entry } from "../types";
import diagnosisService from "../services/diagnosis";
import patientService from "../services/patients";
import { Typography, Container, Box } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EntryDetails from "./EntryDetails";
import EntryPatient from "./EntryPatient/EntryPatient";

interface Props {
  patients: Patient[];
  onEntryCreated: (patientId: string, entry: Entry) => void;
}

const PatientElem = ({ patients, onEntryCreated }: Props) => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    diagnosisService.getAll()
    .then(data => setDiagnoses(data))
    .catch(error => console.error(error));
    patientService.getById(id || "")
    .then(data => setPatient(data))
    .catch(error => {
      console.error(error);
      setPatient(patients.find((elem) => elem.id === id));
    });
  }, [id, patients]);
  

  if (!patient) {
    return (
      <div>
        <Typography>Any here</Typography>
      </div>
    );
  }
  return (
    <Container>
      <Box display='flex' flexDirection="row" gap={1}>
        <Typography variant="h4">
          {patient.name }
        </Typography>
        {patient.gender === "female" ? (
          <FemaleIcon />
        ) : patient.gender === "male" ? (
          <MaleIcon />
        ) : (
          <AssignmentIndIcon />
        )}
      </Box>
      <Typography variant="body1">
        ssn: {patient.ssn}
      </Typography>
      <Typography variant="body1">
        occupation: {patient.occupation}
      </Typography>
      <Typography variant="body1">
        date of birth: {patient.dateOfBirth}
      </Typography>
      {patient.entries && (
        <div>
          <Typography variant="h5">
            Entries
          </Typography>      
            {patient.entries.map(entry => (
              // <div key={entry.id}>
              //   {entry.date} {entry.description}
              //   <ul>
              //     {entry.diagnosisCodes && entry.diagnosisCodes.map(elem => (
              //       <li key={elem}>
              //         {elem} {diagnoses && diagnoses.find(diagnosis => diagnosis.code === elem)?.name}
              //       </li>
              //     ))}
              //   </ul>
              // </div>
              <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}
        </div>
      )}
      <Container>
        {id && <EntryPatient id={id} onEntryCreated={onEntryCreated} diagnoses={diagnoses} />}
      </Container>
    </Container>
  );
};

export default PatientElem;
