import { Container, Paper, Typography } from '@mui/material';
import type { Diagnosis, Entry } from '../types';
import { green, yellow, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const colors = { 0: green[600], 1: yellow[500], 2: red[600], 3: red[900] };

const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
    switch (entry.type) {
        case "HealthCheck":
            const color = colors[entry?.healthCheckRating];
            return (
                <Container>
                    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant="body1">
                            {entry.date} <MedicalServicesIcon />
                        </Typography>
                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                            {entry.description}
                        </Typography>
                        <FavoriteIcon sx={{ color }} />
                        <Typography variant="body1">
                            diagnose by {entry.specialist}
                        </Typography>
                        <ul>
                            {entry.diagnosisCodes && entry.diagnosisCodes.map(elem => (
                                <li key={elem}>
                                    <Typography variant="body2">
                                        {elem} {diagnoses && diagnoses.find(diagnosis => diagnosis.code === elem)?.name}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Paper>
                </Container>
            );
        case "OccupationalHealthcare":
            return (
                <Container>
                    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant="body1">
                            {entry.date} <BusinessCenterIcon /> {entry.employerName}
                        </Typography>
                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                            {entry.description}
                        </Typography>
                        <Typography variant="body1">
                            diagnose by {entry.specialist}
                        </Typography>
                        <Typography variant='body2'>
                            {entry.sickLeave && (
                                entry.sickLeave.startDate
                            )}
                            {entry.sickLeave && (
                                entry.sickLeave.endDate
                            )}
                        </Typography>
                        <ul>
                            {entry.diagnosisCodes && entry.diagnosisCodes.map(elem => (
                                <li key={elem}>
                                    <Typography variant="body2">
                                        {elem} {diagnoses && diagnoses.find(diagnosis => diagnosis.code === elem)?.name}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Paper>
                </Container>
            );
        case "Hospital":
            return (
                <Container>
                    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant="body1">
                            {entry.date}
                        </Typography>
                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                            {entry.description}
                        </Typography>
                        <Typography variant="body1">
                            diagnose by {entry.specialist}
                        </Typography>
                            {entry.discharge && (
                                <Typography variant='body2'>
                                    Discharge date: {entry.discharge.date}
                                </Typography>
                            )}
                            {entry.discharge && (
                                 <Typography variant='body2'>
                                    Discharge criteria: {entry.discharge.criteria}
                                </Typography>
                            )}
                        <ul>
                            {entry.diagnosisCodes && entry.diagnosisCodes.map(elem => (
                                <li key={elem}>
                                    <Typography variant="body2">
                                        {elem} {diagnoses && diagnoses.find(diagnosis => diagnosis.code === elem)?.name}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Paper>
                </Container>
            );
        default:
            break;
    }
};

export default EntryDetails;