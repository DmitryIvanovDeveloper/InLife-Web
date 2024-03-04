import { Avatar, AvatarGroup, Box, CircularProgress, Fab, IconButton, Tab, Tabs } from "@mui/material";
import { IDialogueModel } from "../../ThereGame.Business/Models/IDialogueModel";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {  useEffect, useState } from "react";
import DialogueConstructor from "../../Constructors/DialogueConstructor/DialogueConstructor";
import { useDialogueItemConstructor, useDialogues } from "../../Data/useDialogues";
import { useTeacher } from "../../Data/useTeacher";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import useDialogueQueriesApi from "../../ThereGame.Api/Queries/DialogueQueriesApi";
import { green } from '@mui/material/colors';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteSceneButton from "../Button/DeleteSceneButton";
import INpc from "../../Data/Locations";
import DeskImage from "./DeskImage";
import useConstructorActions from "../../Data/ConstructorActions";


export interface IDialogueTabsProps {
    npc: INpc
}

export default function NpcScenes(props: IDialogueTabsProps) {
    const [success, setSuccess] = useState(false);
    const [teacher] = useTeacher();
    const [selectedDialogue, setSelectedDialogue] = useState<IDialogueModel | null>(null);
    const [dialogues] = useDialogues()
    const [isOpenSettings] = useState<boolean>(true);
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const constructorActions = useConstructorActions();

    const dialogueQueriesApi = useDialogueQueriesApi();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };


    const onCreate = async () => {
        setIsCreating(true);
        await dialogueQueriesApi.create(props.npc.id);
        setSuccess(true)
        setIsCreating(false)
    }

    const onClick = (clickedDialogue: IDialogueModel) => {
        if (selectedDialogue?.id == clickedDialogue.id) {
            setSelectedDialogue(null);
            localStorage.removeItem("SelectedNpcDialogueId");
            return;
        }
        constructorActions.setSelectedScenario(clickedDialogue.id);
        
        setSelectedDialogue(clickedDialogue);
    }

    return (
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem
                disablePadding
                sx={{ width: '100%', bgcolor: 'background.paper' }}
            >
                <Box
                    sx={{
                        width: '100%',
                    }}
                    display='flex' 
                    flexDirection='column'
                    justifyContent='space-between'
                    marginRight={3}

                >
                    {dialogues
                        .filter(d => d.levelId == props.npc.id)
                        .filter(dialogue => !selectedDialogue ? dialogue : dialogue.id == selectedDialogue.id)
                        .map((dialogue) => (
                            <Box display='flex' flexDirection='row' justifyContent='space-between'>
                                {dialogue.id == selectedDialogue?.id
                                    ? <IconButton sx={{ margin: 2 }} onClick={() => onClick(dialogue)}>
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                    : null
                                }
                                <ListItemButton
                                    sx={{ borderRadius: 2 }}
                                    onClick={() => onClick(dialogue)}
                                >
                                    <ListItemText id={dialogue.id} primary={`${!dialogue.name ? "New Scene" : dialogue.name.toUpperCase()} `} />
                                    <AvatarGroup max={4} total={dialogue.studentsId.length}>
                                        {dialogue.studentsId.map(studentId => (
                                            <Avatar alt="Remy Sharp" src={teacher?.students.find(student => student.id == studentId)?.avatar} />
                                        ))}
                                    </AvatarGroup>

                                </ListItemButton>

                                {dialogue.id == selectedDialogue?.id
                                    ? <DeleteSceneButton name={dialogue.name} dialogueId={dialogue.id} onDelete={() => onClick(selectedDialogue)}/>
                                    : null
                                }
                            </Box>
                        ))}
                </Box>

            </ListItem>
            {!!selectedDialogue
                ? null
                : <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'end', margin: "20px" }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        onClick={onCreate}
                    >
                        {isCreating ? <CheckIcon /> : <AddIcon />}
                    </Fab>
                </Box>
            }
            {!isOpenSettings
                ? null
                : <DialogueConstructor id={selectedDialogue?.id ?? ""} />
            }
        </List>
    )
}