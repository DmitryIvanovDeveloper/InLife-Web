import { Avatar, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Switch, Tab, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useStudents } from '../../Data/useStudents';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StudentDialogueStatistics from '../Statistic/StudentDialogueStatistics/StudentDialogueStatistics';
import Flashcard from '../FlashCards/Flashcard';
import FlashCards from '../FlashCards/FiashCards';
import { useTeacher } from '../../Data/useTeacher';
import { useDialogueItemConstructor } from '../../Data/useDialogues';
import QuizlBuilder from '../QuizlBuilder/QuizlBuilder';
import NewCard from '../FlashCards/NewCard/NewCard';

export interface IStudentListProps {
    studentId: string
}

export default function StudentInteractive(props: IStudentListProps) {
    const [tab, setTab] = useState<string>("1");
    const [constructor, setConstructor] = useDialogueItemConstructor();

    const [isCreateQuizlGame, setIsCreateQuizlGame] = useState<boolean>(false);

    const [isCreateNewWord, setIsCreateNewWord] = useState<boolean>(false);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);

        if (newValue == "2") {
            setConstructor(<FlashCards studentId={props.studentId} />);
            return;
        }
        setConstructor(null);
    };

    function Modal(): ReactElement {
        const theme = useTheme();
        const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



        return (
            <Dialog
                fullScreen={fullScreen}
                open={isCreateQuizlGame}
                onClose={() => setIsCreateQuizlGame(false)}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "900px",  // Set your width here
                        },
                    },
                }}
            >
                <DialogContent >
                    <DialogContentText>
                        <NewCard
                            studentId={props.studentId}
                            cardData={undefined}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsCreateQuizlGame(false)} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <TabContext value={tab}>
            {isCreateQuizlGame
                ? <QuizlBuilder 
                    onCreateNewWord={() => setIsCreateNewWord(true)} 
                    setOnClose={() => setIsCreateQuizlGame(false)}
                    quizlGame={[]}
                />
                : null
            }
            {isCreateNewWord
                ? <Modal />
                : null
            }

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Game Statistic" value="1" />
                    <Tab label="Vocabulary" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1"><StudentDialogueStatistics studentId={props.studentId} /></TabPanel>
            <TabPanel value="2">
                <Button onClick={() => setIsCreateQuizlGame(true)}>Add Quizl Game</Button>
            </TabPanel>
        </TabContext>
    );
}