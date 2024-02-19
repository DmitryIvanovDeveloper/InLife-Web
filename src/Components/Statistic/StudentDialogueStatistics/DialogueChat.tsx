
import { Avatar, Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { MessageBox } from 'react-chat-elements'
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import INpc, { Locations } from '../../../Data/Locations';
import { useDialogue } from '../../../Data/useDialogues';
import { useStudents } from '../../../Data/useStudents';
import IStudentDialogueStatisticModel from '../../../ThereGame.Business/Models/IStudentDialogueStatisticModel';
import IStudentModel from '../../../ThereGame.Business/Models/IStudentModel';
import 'react-chat-elements/dist/main.css'
import Message from '../../ChatElement/Message';

export interface IDialogueChatProps {
    dialogueStatisticId: string;
    dialogueStatisticByDate: IStudentDialogueStatisticModel[]
}

export default function DialogueChat(props: IDialogueChatProps) {
    const location = useLocation();
    const dialogueRecoil = useDialogue(props.dialogueStatisticId);

    const [students, setStudents] = useStudents();
    const [selctedStartDate, setSelectedStartDate] = useState<Date>();
    const [dialogueTime, setDialogueTime] = useState<number>();
    const [dialogueStatisticByTime, setDialoguesStatisticByTime] = useState<IStudentDialogueStatisticModel | null>();
    const [student, setStudent] = useState<IStudentModel>();
    const [spentTime, setSpentTime] = useState<string>();
    const [npc, setNpc] = useState<INpc | null>();

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
        var npc = Locations.find(location => location.id == dialogueRecoil.levelId)
        if (!!npc) {
            setNpc(npc)
        }
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
            <Box display='flex' justifyContent='space-around' margin={2}>
                <Avatar sx={{ width: 100, height: 100}} src={npc?.avatar ?? ""} />
                <Box
                    sx={{ margin: 2, borderRadius: 1, padding: 1}}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                >
                    <Typography>spent time</Typography>
                    <Typography fontWeight="900">{spentTime}</Typography>
                </Box>
                <Avatar sx={{ width: 100, height: 100}} src={student?.avatar ?? ""} />
            </Box>
            <Tabs
                value={selctedStartDate}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                TabIndicatorProps={{
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
                        <Message
                            title={npc?.name ?? ""}
                            position={"left"}
                            type={"text"}
                            text={history.phrase}
                        />
                        {sort(history.answers).map(answer => (
                            <Message
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

