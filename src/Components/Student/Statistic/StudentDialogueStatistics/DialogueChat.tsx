//@ts-nocheck
import { Box, Tab, Tabs } from '@mui/material';
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
import { green } from '@mui/material/colors';

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
        var dialoguesStatisticByTime = props.dialogueStatisticByDate.find(dialogueStatistic => dialogueStatistic.startDate.getTime() == dialogueTime);
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
                sx={{ 
                    backgroundColor: "#e0f2f1", 
                    borderRadius: 1,
                    padding: 2,
                    margin: 2,
                 }}

            >
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

        </Box>
    )
}