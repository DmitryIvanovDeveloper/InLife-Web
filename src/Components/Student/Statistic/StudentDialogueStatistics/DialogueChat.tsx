//@ts-nocheck
import { Box, Button } from '@mui/material';
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

    const [selctedTime, setSelectedTime] = useState<string>();
    const [dialogueTime, setDialogueTime] = useState<number>();
    const [dialogueStatisticByTime, setDialoguesStatisticByTime] = useState<IStudentDialogueStatisticModel | null>();
    const [student, setStudent] = useState<IStudentModel>();
    const [spentTime, setSpentTime] = useState<number>();

    const setDialogueParameters = (id: string, time: number) => {
        setSelectedTime(id);
        setDialogueTime(time);
    }

    useEffect(() => {
        var dialoguesStatisticByTime = props.dialogueStatisticByDate.find(dialogueStatistic => dialogueStatistic.startDate.getTime() == dialogueTime);
        console.log(dialoguesStatisticByTime?.dialogueHistory)
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
        var spentTime = moment(dialogueStatisticByTime?.startDate).diff(dialogueStatisticByTime?.endDate, 'minutes');
        setSpentTime(spentTime);
    }, [dialogueTime]);

    return (
        <Box>
            {props.dialogueStatisticByDate.filter(dialogue => dialogue.dialogueId == props.dialogueStatisticId).map(dialogue => (
                <Button
                    variant={dialogue.startDate.toDateString() == selctedTime ? "contained" : "outlined"}
                    onClick={() => setDialogueParameters(dialogue.startDate.toString(), dialogue.startDate.getTime())}
                >
                    {`${dialogue.startDate.getHours()}:${dialogue.startDate.getMinutes()}`}
                </Button>

            ))}
            {dialogueStatisticByTime?.dialogueHistory.map(phrase => (
                <Box>
                    <MessageBox
                        title={Locations.find(location => location.id == dialogueRecoil.levelId)?.name}
                        position={"left"}
                        type={"text"}
                        text={phrase.phrase}
                    />
                    {phrase.answers
                       
                        .map(answer => (
                            <MessageBox
                                title={`${student?.name} ${student?.lastName}`}
                                position={"right"}
                                type={"text"}
                                text={answer.answer}
                            />
                        ))
                        .sort(((a, b) => a.orderId > b.orderId ? 1 : -1))
                    }

                </Box>
            ))}
        </Box>
    )
}