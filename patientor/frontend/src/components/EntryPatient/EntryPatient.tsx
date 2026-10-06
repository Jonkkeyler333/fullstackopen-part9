import { Container, InputLabel, MenuItem, Select, Typography, Button } from "@mui/material";
import { Entry, Diagnosis } from '../../types';
import { useState } from "react";
import Form from "./Form";

interface props {
    id: string;
    onEntryCreated: (patientId: string, entry: Entry) => void;
    diagnoses: Diagnosis[];
}

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";

const EntryPatient = ({ id, onEntryCreated, diagnoses }: props) => {
    const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showEntryForm, setShowEntryForm] = useState<boolean>(false);

    const cancelNewEntry = () => {
        setShowEntryForm(false);
        setErrorMessage(null);
    };

    return (
        <Container>
            {showEntryForm ? null : <Button variant="contained" onClick={() => setShowEntryForm(true)}>Add New Entry</Button>}
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            {showEntryForm && (
                <>
                <Typography variant="h6">
                    New Entry
                </Typography>
                <InputLabel id="type">Entry Type</InputLabel>
                <Select
                    value={entryType}
                    labelId="type"
                    label="Entry Type"
                    onChange={({ target }) => setEntryType(target.value as EntryType)}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
                    <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
                    <MenuItem value={"Hospital"}>Hospital</MenuItem>
                </Select>
                <Form type={entryType} onEntryCreated={onEntryCreated} id={id} setErrorMessage={setErrorMessage} cancelNewEntry={cancelNewEntry} diagnoses={diagnoses} />
                </>
            )}
        </Container>
    );
};

export default EntryPatient;