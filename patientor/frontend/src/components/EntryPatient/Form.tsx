import { MenuItem, Select, TextField, Button, SelectChangeEvent, InputLabel, FormControl  } from "@mui/material";
import React, { useState } from "react";
import type { Entry, NewEntry, HealthCheckRating, Diagnosis} from "../../types";
import axios from "axios";
import patientService from "../../services/patients";
import Stack from '@mui/material/Stack';

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";
interface FormProps {
  type: EntryType;
  onEntryCreated: (patientId: string, entry: Entry) => void;
  id: string;
  setErrorMessage: (message: string | null) => void;
  cancelNewEntry: () => void;
  diagnoses?: Diagnosis[];
}

const Form = ({ type, onEntryCreated, id, setErrorMessage, cancelNewEntry, diagnoses }: FormProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleSubmitNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const commonData = {
      date,
      description,
      specialist,
      diagnosisCodes,
    };
    let submitData: NewEntry;
    switch (type) {
      case "HealthCheck":
        submitData = {
          ...commonData,
          type: "HealthCheck",
          healthCheckRating
        };
        break;
      case "OccupationalHealthcare":
        submitData = {
          ...commonData,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: sickLeaveStartDate && sickLeaveEndDate
            ? {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate,
            }: undefined
        };
        break;
      case "Hospital":
        submitData = {
          ...commonData,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        };
        break;
      default:
        throw new Error(`Tipo de entrada no soportado: ${type}`);
    }
    try {
      const newEntry = await patientService.createEntry(id, submitData);
      console.log('New entry created:', newEntry);
      onEntryCreated(id, newEntry);
      setDate('');
      setDescription('');
      setSpecialist('');
      setDiagnosisCodes([]);
      setHealthCheckRating(0);
      setEmployerName('');
      setSickLeaveStartDate('');
      setSickLeaveEndDate('');
      setDischargeDate('');
      setDischargeCriteria('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || 'Unknown Axios error');
        setErrorMessage(error.response?.data?.error || 'Unknown Axios error');
      }else {
        console.error('Unknown error', error);
      }

    }
  };

  const handleDiagnosisCodeChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const commonFields = (
    <>
      {/* <DatePicker 
          label="Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
        /> */}
      <TextField
        type="date"
        label="Date"
        slotProps={{ inputLabel: { shrink: true } }}
        value={date}
        onChange={({ target }) => setDate(target.value)}
        required
      />

      <TextField
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        required
      />
      <TextField
        label="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        required
      />
      {diagnoses && (
        <FormControl fullWidth>
          <InputLabel id="diagnosis-codes-label">
            Diagnosis Codes
          </InputLabel>
          <Select
            value={diagnosisCodes}
            label="Diagnosis Codes"
            multiple
            onChange={handleDiagnosisCodeChange}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code} - {diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}  
    </>
  );
  return (
    <form onSubmit={handleSubmitNewEntry}>
      <Stack direction="column" spacing={2}>
        {commonFields}
        {type === "HealthCheck" && (
          // <InputLabel id="rating"></InputLabel>
          <Select
            value={healthCheckRating}
            label="Health Check Rating"
            onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
          >
            <MenuItem value={0}>0 - Healthy</MenuItem>
            <MenuItem value={1}>1 - Low Risk</MenuItem>
            <MenuItem value={2}>2 - High Risk</MenuItem>
            <MenuItem value={3}>3 - Critical Risk</MenuItem>
          </Select>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              required
            />
            <TextField
              type="date"
              label="Sick Leave Start Date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              type="date"
              label="Sick Leave End Date"
              slotProps={{ inputLabel: { shrink: true } }}
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>

        )}

        {type === "Hospital" && (
          <>
            <TextField
              type="date"
              label="Discharge Date"
              value={dischargeDate}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              required
            />
          </>
        )}
      </Stack>
      <Button type="submit" variant="contained" sx={{mt: 2}}>ADD</Button>
      <Button type="button" variant="outlined" sx={{mt: 2, ml: 2}} onClick={cancelNewEntry}>CANCEL</Button>
    </form>
  );

};

export default Form;