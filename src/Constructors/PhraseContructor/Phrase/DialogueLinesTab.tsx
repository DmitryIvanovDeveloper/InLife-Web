import TabList from "@mui/lab/TabList";
import { Grid, Tab} from "@mui/material";
import IAnswerModel from "../../../ThereGame.Business/Models/IAnswerModel";
import { useEffect, useState } from "react";
import { useSelectDialogueLine } from "../../../Data/useDialogueItemSelection";
import ISelectDialogueLine from "../../models/ISelectDialogueLine";
import useAnswerQueriesApi from "../../../ThereGame.Api/Queries/AnswerQueriesApi";

export interface IDialogueLinesProps {
    answers: IAnswerModel[];
    setEditDialogueItemType: () => void;
}

export default function DialogueLinesTabSettings(props: IDialogueLinesProps) {
    const [selectDialogueLine, setSelectDialogueLine] = useSelectDialogueLine();

    const [isCreating, setIsCreating] = useState<boolean>(false);

    const answerQueriesApi = useAnswerQueriesApi();

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
            </Grid>
        </Grid>
    )
}