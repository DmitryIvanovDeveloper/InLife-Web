import TabList from "@mui/lab/TabList";
import { Grid, Tab, CircularProgress, IconButton, Typography, Box } from "@mui/material";
import IAnswerModel from "../../../ThereGame.Business/Models/IAnswerModel";
import { useEffect, useState } from "react";
import { useSelectDialogueLine } from "../../../Data/useDialogueItemSelection";
import ISelectDialogueLine from "../../models/ISelectDialogueLine";
import useAnswerQueriesApi from "../../../ThereGame.Api/Queries/AnswerQueriesApi";
import { IoMdAddCircle } from "react-icons/io";
import { useDialogueItemColorsMap } from "../../../Data/useDialogueItemColors";
import * as React from 'react';
import { tabsClasses } from '@mui/material/Tabs';
import ModalConstructor from "../../ModalContructor";
import { useConstructorActionsState } from "../../../Data/useConstructorActionsState";

export interface IDialogueLinesProps {
    answers: IAnswerModel[];
    setEditDialogueItemType: () => void;
    hasInstruction: boolean;
}

export default function DialogueLinesTabSettings(props: IDialogueLinesProps) {
    const [selectDialogueLine, setSelectDialogueLine] = useSelectDialogueLine();
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [dialogueItemColorsMap] = useDialogueItemColorsMap();
    const answerQueriesApi = useAnswerQueriesApi();
    const [isDialogueLineInstructionOpen, setIsDialogueLineInstructionOpen] = useState<boolean>(false);
    const [isSaveInstructionOpen, setIsSaveInstructionOpen] = useState<boolean>(false);
    const [actions] = useConstructorActionsState();

    const onCreateAnswers = async () => {
        if (!selectDialogueLine.dialogueItemId) {
            return;
        }

        setIsDialogueLineInstructionOpen(false)
        setIsSaveInstructionOpen(true);
        setIsCreating(true);
        await answerQueriesApi.create(selectDialogueLine.dialogueItemId);
        setIsCreating(false);
    }

    const onSelectTab = (id: string, index: number) => {
        if (!id) {
            return;
        }

        const selectedDialogueLine: ISelectDialogueLine = {
            dialogueItemId: selectDialogueLine.dialogueItemId,
            line: {
                name: `story line ${index + 1}`,
                id
            },
            nextDialogueItemId: selectDialogueLine.nextDialogueItemId
        }

        setSelectDialogueLine(selectedDialogueLine);
    }

    function StoryLineLabel(id: string, index: number) {
        return (
            <Box>
                <Typography>Story Line</Typography>
                <Typography
                    sx={{
                        backgroundColor: dialogueItemColorsMap.find(item => item.id == id)?.color ?? "",
                        borderRadius: 2,
                        color: 'white'
                    }}
                >
                    {index + 1}
                </Typography>
            </Box>
        )
    }

    function Tabs() {
        return (
            <TabList
                onChange={props.setEditDialogueItemType}
                variant={props.answers.length <= 0 ? 'fullWidth' : "scrollable"}

                aria-label="visible arrows tabs example"
                sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        '&.Mui-disabled': { opacity: 0.3 },
                    },
                }}
            >
                {props.answers.map((answer, index) => (
                    <Tab
                        sx={{ m: 0 }}
                        value={answer?.id}
                        key={answer?.id}
                        label={StoryLineLabel(answer.id, index)}
                        onClick={() => {
                            onSelectTab(answer?.id, index);
                        }}
                    />
                ))}
                {isCreating
                    ? <CircularProgress color='error' size={20} />
                    : <IconButton onClick={onCreateAnswers}>
                        <IoMdAddCircle />
                    </IconButton>
                }

            </TabList>
        )
    }

    useEffect(() => {
        if (!!selectDialogueLine.dialogueItemId) {
            return;
        }

        onSelectTab(props.answers[0]?.id, 0)
    }, [selectDialogueLine.line]);

    useEffect(() => {
        var isOpen = props.hasInstruction
        setIsDialogueLineInstructionOpen(isOpen);
    }, [props.hasInstruction]);

    if (isDialogueLineInstructionOpen) {
        return (
            <ModalConstructor
                element={Tabs()}
                isOpen={isDialogueLineInstructionOpen}
                editDialogueItemType={undefined}
                onClose={() => setIsDialogueLineInstructionOpen(false)}
                description={`If you need a student answer me then lets think abount 'Story Line'! I can say different phrases depending on it. if you need it, create new one or you can do it later in my notebook`}
            />
        )
    }
    if (isSaveInstructionOpen) {
        return (
            <ModalConstructor
                element={<div></div>}
                isOpen={isSaveInstructionOpen}
                editDialogueItemType={undefined}
                onClose={() => setIsSaveInstructionOpen(false)}
                description='Awesome! I want to color a new one'
            />
        )
    }

    return (
        <Grid display='flex' direction='row' alignItems='center' justifyContent='space-between' >
            <Grid display='flex' direction='row' alignItems='center'>
                {Tabs()}
                
            </Grid>
        </Grid>
    )
}