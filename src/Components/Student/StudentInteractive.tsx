import { Avatar, Box, Button, Card, Grid, Switch, Tab, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStudents } from '../../Data/useStudents';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StudentDialogueStatistics from '../Statistic/StudentDialogueStatistics/StudentDialogueStatistics';
import Flashcard from '../FlashCards/Flashcard';
import FlashCards from '../FlashCards/FiashCards';
import { useTeacher } from '../../Data/useTeacher';
import { useDialogueItemConstructor } from '../../Data/useDialogues';

export interface IStudentListProps {
    studentId: string
}

export default function StudentInteractive(props: IStudentListProps) {
    const [tab, setTab] = useState<string>("1");
    const [constructor, setConstructor] = useDialogueItemConstructor();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);

        if (newValue == "2") {
            setConstructor(<FlashCards studentId={props.studentId}/>);
            return;
        }
        setConstructor(null);

      };

    return (
        <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Game Statistic" value="1" />
            <Tab label="Vocabulary" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><StudentDialogueStatistics studentId={props.studentId} /></TabPanel>
        <TabPanel value="2"></TabPanel>
      </TabContext>
    );
}


