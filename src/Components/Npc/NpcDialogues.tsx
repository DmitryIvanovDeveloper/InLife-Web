import { Avatar, AvatarGroup, Box, Fab, IconButton, Tab, Tabs } from "@mui/material";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useEffect, useState } from "react";
import DialogueConstructor from "../../Constructors/DialogueConstructor/DialogueConstructor";
import { useDialogueItemConstructor } from "../../Data/useDialogues";
import { useTeacher } from "../../Data/useTeacher";
import DialogueGraph from "../GraphTree/DialogueGraph";
import StudentDialogueStatistics from "../Statistic/StudentDialogueStatistics/StudentDialogueStatistics";

export interface IDialogueTabsProps {
    npcId: string
}

export default function NpcDialogues(props: IDialogueTabsProps) {
    const [teacher] = useTeacher();

    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [selectedDialogue, setSelectedDialogue] = useState<IDialogueModel | null>(null);
    const [dialogues, setDialogues] = useState<IDialogueModel[]>(teacher?.dialogues ?? []);
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);

    const onClick = (clickedDialogue: IDialogueModel) => {
        if (selectedDialogue?.id == clickedDialogue.id) {
            setSelectedDialogue(null);
            setDialogueItemConstructor(() => <div></div>);

            return;
        }

        setSelectedDialogue(clickedDialogue);
        setDialogueItemConstructor(() => <DialogueConstructor id={clickedDialogue.id} setStates={() => { }} />);
    }

    useEffect(() => {
        setDialogues(teacher?.dialogues.filter(d => d.levelId == props.npcId) ?? []);
    }, [teacher]);

    return (
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem
                disablePadding
                sx={{ width: '100%', bgcolor: 'background.paper' }}
            >
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }} display='flex' flexDirection='column' justifyContent='space-between'>
                    {dialogues
                        .filter(dialogue => !selectedDialogue ? dialogue : dialogue.id == selectedDialogue.id)
                        .map((dialogue) => (
                            <Box display='flex' flexDirection='row' justifyContent='space-between'>
                                <ListItemButton
                                    onClick={() => onClick(dialogue)}
                                >
                                    <ListItemText id={dialogue.id} primary={`${dialogue.name}`} />
                                    <AvatarGroup max={4} total={dialogue.studentsId.length}>
                                        {dialogue.studentsId.map(studentId => (
                                            <Avatar alt="Remy Sharp" src={teacher?.students.find(student => student.id == studentId)?.avatar} />
                                        ))}
                                    </AvatarGroup>

                                </ListItemButton>
                                <IconButton onClick={() => setIsOpenSettings(!isOpenSettings)}>
                                    <SettingsRoundedIcon />
                                </IconButton>
                            </Box>
                        ))}
                    {isOpenSettings || selectedDialogue
                        ? null
                        : <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'end', margin: "20px" }}>
                            <Fab
                                aria-label="save"
                                color="primary"
                            // sx={buttonSx}
                            // onClick={() => props.onClick()}
                            // disabled={props.isDisabled}
                            >
                            </Fab>
                        </Box>
                    }

                </Box>

            </ListItem>
            {!isOpenSettings
                ? null //<StudentDialogueStatistics />
                : <DialogueConstructor id={selectedDialogue?.id ?? ""} />
            }
        </List>
    )
}