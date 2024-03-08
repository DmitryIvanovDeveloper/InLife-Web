
import { Box, Grid, List, Slide } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import INpc, { Locations } from '../../../Data/Locations';
import { useDialogue } from '../../../Data/useDialogues';
import { useStudents } from '../../../Data/useStudents';
import { IDialogueHistory } from '../../../ThereGame.Business/Models/IStudentDialogueStatisticModel';
import IStudentModel from '../../../ThereGame.Business/Models/IStudentModel';
import Message from '../../ChatElement/Message';
import Notebook from '../../../Images/Notebook.png'
import 'react-chat-elements/dist/main.css'
import { v4 as uuidv4 } from 'uuid';

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
    const [checked, setChecked] = useState(false);

    const containerRef = useRef<HTMLElement>(null);

    const sort = (array: any[] | undefined): any[] => {
        if (!array) {
            return []
        }

        return [...array].sort((a, b) => {
            if (!a || !b) return 0;
            return a.orderId - b.orderId;
        })
    }

    useEffect(() => {
        var npc = Locations.find(location => location.id == dialogueRecoil.levelId)
        if (!!npc) {
            setNpc(npc)
        }
        var expectedStudent = students.find(student => student.id == props.studentId)

        setStudent(expectedStudent);
    }, [props.dialogueId]);

    useEffect(() => {
        setChecked(false);
        var timeout = setTimeout(() => {
            setChecked(true);
            clearTimeout(timeout);
        }, 1000);
    }, [props.statisticHistoty]);
    
    return (
        <Grid  height='100dvh' >
            <Box
                ref={containerRef}
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 60,
                    p: 0,
                    m: 0,
                    display: 'flex',
                    width: '650px',
                }}
            >
                <Slide
                    direction='left'
                    in={checked} container={containerRef.current}
                    easing={{
                        enter: "linear",
                        exit: "linear"
                    }}>
                    <Box>

                        <Box
                            component='image'
                            sx={{
                                width: '100%',
                                maxWidth: '950px',
                                content: {
                                    xs: `url(${Notebook})`, //img src from xs up to md
                                    md: `url(${Notebook})`,  //img src from md and up
                                },
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: 120,
                                right: 25,
                                width: '88%',
                                display: "flex",
                                justifyContent: 'center',
                                flexDirection: "column",
                                alignItems: 'stretch',
                                pr: 2,
                                overflow: "auto"
                            }}
                        >
                            <List style={{ maxHeight: '650px', overflow: 'auto' }}>
                                {sort(props.statisticHistoty).map(history => (
                                    <Box
                                        key={uuidv4()}
                                    >
                                        <Message
                                            title={npc?.name ?? ""}
                                            position={"left"}
                                            type={"text"}
                                            text={history.phrase}
                                        />
                                        {sort(history.answers).map(answer => (
                                            <Message
                                                key={uuidv4()}

                                                title={`${student?.name} ${student?.lastName}`}
                                                position={"right"}
                                                type={"text"}
                                                text={answer.text}
                                            />
                                        ))}
                                    </Box>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Slide>
            </Box>
        </Grid>
    )
}

