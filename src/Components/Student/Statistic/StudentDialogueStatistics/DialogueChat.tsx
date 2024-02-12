//@ts-nocheck
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MessageBox } from 'react-chat-elements'
import IStudentDialogueStatisticModel from '../../../../ThereGame.Business/Models/IStudentDialogueStatisticModel';
import { useDialogue } from '../../../../Data/useDialogues';
import { useLocation } from 'react-router-dom';
import { Locations } from '../../../../Data/Locations';
import { useStudents } from '../../../../Data/useStudents';
import IStudentModel from '../../../../ThereGame.Business/Models/IStudentModel';
import moment from 'moment';

import 'react-chat-elements/dist/main.css'

export interface IDialogueChatProps {
    dialogueStatisticId: string;
    dialogueStatisticByDate: IStudentDialogueStatisticModel[]
}

export default function DialogueChat(props: IDialogueChatProps) {
    const dialogueRecoil = useDialogue(props.dialogueStatisticId);
    const [students, setStudents] = useStudents();

    const location = useLocation();

    const [selctedStartDate, setSelectedStartDate] = useState<Date>();
    const [dialogueTime, setDialogueTime] = useState<number>();
    const [dialogueStatisticByTime, setDialoguesStatisticByTime] = useState<IStudentDialogueStatisticModel | null>();
    const [student, setStudent] = useState<IStudentModel>();
    const [spentTime, setSpentTime] = useState<number>();
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

    const convertSecondsToMinutes = (seconds: number) => {
        var time_s = seconds;
        var minute = Math.floor(time_s / 60);
        var rest_seconds = time_s % 60;

       return minute.toString().padStart(2, '0') + ":" + rest_seconds.toString().padStart(2, '0');
    }

    const sort = (array: any[] | undefined): any[] => {
        if(!array){
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
                color='white'
                value={selctedStartDate}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                {props.dialogueStatisticByDate.filter(dialogue => dialogue.dialogueId == props.dialogueStatisticId).map(dialogue => (
                    <Tab
                        label={`${dialogue.startDate.getHours()}:${dialogue.startDate.getMinutes()}`}
                        value={dialogue.startDate}
                        onClick={() => setDialogueParameters(dialogue.startDate, dialogue.startDate.getTime())}
                    >
                    </Tab>
                ))}
            </Tabs>
            <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            >
                <Typography>spentTime</Typography>
                <Typography>{spentTime}</Typography>
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
                                ))
                            }
                        </Box>
                    ))}
            </Box>
        </Box>
    )
}

