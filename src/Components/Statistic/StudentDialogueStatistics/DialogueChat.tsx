//@ts-nocheck
import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { MessageBox } from 'react-chat-elements'
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { Locations } from '../../../Data/Locations';
import { useDialogue } from '../../../Data/useDialogues';
import { useStudents } from '../../../Data/useStudents';
import IStudentDialogueStatisticModel from '../../../ThereGame.Business/Models/IStudentDialogueStatisticModel';
import IStudentModel from '../../../ThereGame.Business/Models/IStudentModel';
import 'react-chat-elements/dist/main.css'

export interface IDialogueChatProps {
    dialogueStatisticId: string;
    dialogueStatisticByDate: IStudentDialogueStatisticModel[]
}

export default function DialogueChat(props: IDialogueChatProps) {
    const theme = useTheme();
    const location = useLocation();
    const dialogueRecoil = useDialogue(props.dialogueStatisticId);

    const [students, setStudents] = useStudents();
    const [selctedStartDate, setSelectedStartDate] = useState<Date>();
    const [dialogueTime, setDialogueTime] = useState<number>();
    const [dialogueStatisticByTime, setDialoguesStatisticByTime] = useState<IStudentDialogueStatisticModel | null>();
    const [student, setStudent] = useState<IStudentModel>();
    const [spentTime, setSpentTime] = useState<string>();


    const setDialogueParameters = (date: Date, time: number) => {
        setSelectedStartDate(date);
        setDialogueTime(time);
    }

    useEffect(() => {
        if (!dialogueTime) {
            return;
        }

        var dialoguesStatisticByTime = props.dialogueStatisticByDate
            .find(dialogueStatistic => dialogueStatistic.startDate.getTime() == dialogueTime);

        setDialoguesStatisticByTime(dialoguesStatisticByTime);
    }, [dialogueTime]);

    useEffect(() => {
        setDialoguesStatisticByTime(null)
    }, [props.dialogueStatisticByDate, props.dialogueStatisticId]);


    useEffect(() => {
        const query = new URLSearchParams(location.search);
        var expectedStudent = students.find(student => student.id == query.get("id"))
        setStudent(expectedStudent);
    }, []);

    useEffect(() => {
        var spentTime = moment(dialogueStatisticByTime?.endDate).diff(dialogueStatisticByTime?.startDate, 'seconds');

        setSpentTime(convertSecondsToMinutes(spentTime));
    }, [dialogueTime, dialogueStatisticByTime]);

    const convertSecondsToMinutes = (seconds: number): string => {
        var time_s = seconds;
        var minute = Math.floor(time_s / 60);
        var rest_seconds = time_s % 60;

        return minute.toString().padStart(2, '0') + ":" + rest_seconds.toString().padStart(2, '0');
    }

    const sort = (array: any[] | undefined): any[] => {
        if (!array) {
            return []
        }

        return [...array].sort((a, b) => {
            if (!a || !b) return 0;
            return a.orderId - b.orderId;
        })
    }

    return (
        <Box>
            <Tabs
                value={selctedStartDate}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                TabIndicatorProps={{
                    backgroundColor: "#009688",
                    fontWeight: "900"
                }}
            >
                {props.dialogueStatisticByDate.filter(dialogue => dialogue.dialogueId == props.dialogueStatisticId).map(dialogue => (
                    <Tab
                        color='white'
                        label={`${dialogue.startDate.getHours()}:${dialogue.startDate.getMinutes()}`}
                        value={dialogue.startDate}
                        sx={{ height: 10 }}
                        onClick={() => setDialogueParameters(dialogue.startDate, dialogue.startDate.getTime())}
                    >
                    </Tab>
                ))}
            </Tabs>
            <Box
                display='flex'
                alignItems='end'
                flexDirection='column'
            >
                <Box
                    sx={{backgroundColor: "#009688", margin: 2, borderRadius: 1, padding: 1}}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                >
                    <Typography color='white'>spent time</Typography>
                    <Typography color='white' fontWeight="900">{spentTime}</Typography>
                </Box>
            </Box>


            <Box
                sx={{
                    backgroundColor: "#e0f2f1",
                    borderRadius: 1,
                    padding: 2,
                    margin: 2,
                }}
            >
                {sort(dialogueStatisticByTime?.dialogueHistory).map(history => (
                    <Box>
                        <MessageBox
                            title={Locations.find(location => location.id == dialogueRecoil.levelId)?.name}
                            position={"left"}
                            type={"text"}
                            text={history.phrase}
                        />
                        {sort(history.answers).map(answer => (
                            <MessageBox
                                title={`${student?.name} ${student?.lastName}`}
                                position={"right"}
                                type={"text"}
                                text={answer.text}
                            />
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

