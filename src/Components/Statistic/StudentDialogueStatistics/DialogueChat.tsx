
import {  Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import INpc, { Locations } from '../../../Data/Locations';
import { useDialogue } from '../../../Data/useDialogues';
import { useStudents } from '../../../Data/useStudents';
import { IDialogueHistory } from '../../../ThereGame.Business/Models/IStudentDialogueStatisticModel';
import IStudentModel from '../../../ThereGame.Business/Models/IStudentModel';
import 'react-chat-elements/dist/main.css'
import Message from '../../ChatElement/Message';

export interface IDialogueChatProps {
    studentId?: string;
    dialogueId: string;
    statisticHistoty: IDialogueHistory[]
}

export default function DialogueChat(props: IDialogueChatProps) {
    const dialogueRecoil = useDialogue(props.dialogueId);
    const [students] = useStudents();
    const [student, setStudent] = useState<IStudentModel>();
    const [npc, setNpc] = useState<INpc | null>();


    useEffect(() => {
        var npc = Locations.find(location => location.id == dialogueRecoil.levelId)
        if (!!npc) {
            setNpc(npc)
        }
        var expectedStudent = students.find(student => student.id == props.studentId)
        console.log(students);

        setStudent(expectedStudent);
    }, [props.dialogueId]);

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
            <Box
                sx={{
                    backgroundColor: "#e0f2f1",
                    borderRadius: 1,
                    padding: 2,
                    margin: 2,
                }}
            >
                {sort(props.statisticHistoty).map(history => (
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

