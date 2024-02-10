//@ts-nocheck
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { MessageBox } from 'react-chat-elements'
import IDialogueStatistic from '../../../../ThereGame.Business/Models/IDialogueStatistic';
import { useDialogue } from '../../../../Data/useDialogues';
import { useLocation } from 'react-router-dom';
import { Locations } from '../../../../Data/Locations';
import { useStudents } from '../../../../Data/useStudents';
import IStudentModel from '../../../../ThereGame.Business/Models/IStudentModel';
import 'react-chat-elements/dist/main.css'

export interface IDialogueChatProps {
    dialogueStatisticId: string;
    dialogueStatisticByDate: IDialogueStatistic[]
}

export default function DialogueChat(props: IDialogueChatProps) {
    const dialogueRecoil = useDialogue(props.dialogueStatisticId);
    const [students, setStudents] = useStudents();

    const location = useLocation();

    const [dialogueId, setDialogueId] = useState<string>();
    const [dialogueTime, setDialogueTime] = useState<number>();
    const [dialogueStatisticByTime, setDialoguesStatisticByTime] = useState<IDialogueStatistic | null>();
    const [student, setStudent] = useState<IStudentModel>();

    const setDialogueParameters = (dialogueId: string, time: number) => {
        setDialogueId(dialogueId);
        setDialogueTime(time);
    }

    useEffect(() => {
        var dialoguesStatisticByTime = props.dialogueStatisticByDate.find(dialogueStatistic => dialogueStatistic.date.getTime() == dialogueTime);
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
    
    return (
        <Box>
            {props.dialogueStatisticByDate.filter(dialogue => dialogue.id == props.dialogueStatisticId).map(dialogue => (
                    <Button
                        variant={dialogue.id == dialogueId ? "contained" : "outlined"}
                        onClick={() => setDialogueParameters(dialogue.id, dialogue.date.getTime())}
                    >
                        {`${dialogue.date.getHours()}:${dialogue.date.getMinutes()}`}
                    </Button>

                ))}
            {dialogueStatisticByTime?.phraseAnswerHistory.map(phraseAnswers => (
                <Box>
                    <MessageBox
                        position={"left"}
                        type={"text"}
                        title={Locations.find(location => location.id == dialogueRecoil.levelId).name}
                        text={phraseAnswers.phrase}
                    />
                    {phraseAnswers.answers.map(answer => (
                        <MessageBox
                            title={`${student?.name} ${student?.lastName}`}
                            position={"right"}
                            type={"text"}
                            text={answer}
                        />
                    ))}
                </Box>
            ))}
        </Box>


    )
}