import TabList from "@mui/lab/TabList";
import { Grid, Tab, CircularProgress, IconButton } from "@mui/material";
import DeleteButton from "../../../Components/Button/DeleteButton";
import IAnswerModel from "../../../ThereGame.Business/Models/IAnswerModel";
import { useEffect, useState } from "react";
import { useSelectDialogueLine } from "../../../Data/useDialogueItemSelection";
import ISelectDialogueLine from "../../models/ISelectDialogueLine";
import { DialogueItemType } from "../../../Components/GraphTree/DialogueitemType";
import useAnswerQueriesApi from "../../../ThereGame.Api/Queries/AnswerQueriesApi";
import usePhraseQueriesApi from "../../../ThereGame.Api/Queries/PhraseQueriesApi";
import { IoMdAddCircle } from "react-icons/io";

export interface IDialogueLinesProps {
    answers: IAnswerModel[];
    setEditDialogueItemType: () => void;
}

export default function DialogueLinesTab(props: IDialogueLinesProps) {
    const [selectDialogueLine, setSelectDialogueLine] = useSelectDialogueLine();
    
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const answerQueriesApi = useAnswerQueriesApi();
    const phraseQueriesApi = usePhraseQueriesApi();

    const onCreateAnswers = async () => {
        setIsCreating(true);
        await answerQueriesApi.create(selectDialogueLine.dialogueItemId);
        setIsCreating(false);

    }

    const onDelete = async (dialogueItemType: DialogueItemType) => {
        setIsDeleting(true);

        if (dialogueItemType == DialogueItemType.Answer) {
            await answerQueriesApi.delete(selectDialogueLine.line.id);
            localStorage.removeItem(selectDialogueLine.line.id);
        }
        if (dialogueItemType == DialogueItemType.Phrase) {

            await phraseQueriesApi.delete(selectDialogueLine.dialogueItemId);
            localStorage.removeItem(selectDialogueLine.dialogueItemId);
        }

        setIsDeleting(false);
    }
    
    const onSelectTab = (id: string, index: number) => {
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

    useEffect(() => {
        if (!!selectDialogueLine.line.id) {
            return;
        }

        onSelectTab(props.answers[0]?.id, 0)
    }, [selectDialogueLine.line]);

    return (
        <Grid display='flex' direction='row' alignItems='flex-start' justifyContent='space-between'>
            <Grid display='flex' direction='row' alignItems='center'>
                <TabList onChange={props.setEditDialogueItemType} aria-label="lab API tabs example">
                    {!!props.answers.length
                        ? props.answers.map((answer, index) => (
                            <Tab
                                value={answer?.id}
                                key={answer?.id}
                                label={`story line ${index + 1}`} 
                                onClick={() => {
                                    onSelectTab(answer?.id, index);
                                }}
                            />
                        ))
                        : <Tab value="" label={`story line 1`} />
                    }
                </TabList>
                {isCreating
                    ? <CircularProgress color='error' size={20} />
                    : <IconButton onClick={onCreateAnswers}>
                        <IoMdAddCircle />
                    </IconButton>
                }

            </Grid>

            {!isDeleting
                ? <DeleteButton onDelete={onDelete}/>
                : <CircularProgress color='error' size={20} />
            }
        </Grid>
    )
}