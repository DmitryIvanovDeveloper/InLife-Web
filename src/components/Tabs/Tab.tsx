import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTeacher } from '../../Data/useTeacher';
import { useStudents } from '../../Data/useStudents';
import { useDialogues } from '../../Data/useDialogues';
import { Button, Grid } from '@mui/material';
import CopyToClipboardButton from '../CopyToClipboard/CopyToClipboard';
import { Routes } from '../../Routes';
import { useNavigate } from 'react-router-dom';
import StudentCard from '../Student/Student';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [teacher] = useTeacher();
    const [students] = useStudents();
    const [dialogues] = useDialogues();
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={`Students [${students.length}]`} {...a11yProps(0)} />
                    <Tab label={`Dialogues [${dialogues.length}]`} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <CopyToClipboardButton link={`${process.env.REACT_APP_SERVER}${Routes.signUpStudent}?id=${teacher?.id}`} />

                <Grid display='flex' flexDirection='row'>
                    {students.map(student => (
                        <StudentCard student={student} />
                    ))}
                </Grid>

            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Grid display='flex' justifyContent='center' alignItems='center'>
                    <QuestionAnswerIcon  />
                    <Button onClick={() => navigate(Routes.dialoguesBuilder)} variant='text'>Go to Dialogue Builder</Button>
                </Grid>

                <Grid display='flex' flexDirection='row'>
                    {dialogues.map(dialogue => (
                        <Typography marginRight={1}>{dialogue.name}</Typography>
                    ))}
                </Grid>
            </CustomTabPanel>
        </Box>
    );
}