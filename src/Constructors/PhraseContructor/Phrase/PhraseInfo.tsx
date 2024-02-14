//@ts-nocheck
import { Box, Tab, TextField, Grid, IconButton } from "@mui/material";
import { MessageBox } from "react-chat-elements";
import { useState, useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import IPhraseModel from "../../../ThereGame.Business/Models/IPhraseModel";
import { useNextDialogueItemSelection } from "../../../Data/useDialogueItemSelection";
import { IoMdAddCircle } from "react-icons/io";
import useAnswerQueriesApi from "../../../ThereGame.Api/Queries/AnswerQueriesApi";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export interface IPhraseInfoProps {
    phrase: IPhraseModel;
    onChangeText: (phrase: string) => void;
}
export default function PhraseInfo(props: IPhraseInfoProps) {

    const answerQueriesApi = useAnswerQueriesApi();

    const [_, setNextdialoguItemSelection] = useNextDialogueItemSelection();

    const [selectedAnswerTabId, setSelectedAnswerTabId] = useState<string>("");
    const [variations, setVariations] = useState<string[]>([]);
    const [nextPhrase, setNextPharse] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false);


    useEffect(() => {
        if (!props.phrase.answers.length) {
            setVariations([])
            return;
        }

        setSelectedAnswerTabId(props.phrase.answers[0].id ?? "");
        setVariations(props.phrase.answers[0].texts)

    }, [props.phrase]);


    useEffect(() => {
        var nextPhrase = props.phrase.answers.find(answer => answer.id == selectedAnswerTabId)?.phrases[0];
        setNextPharse(nextPhrase?.text ?? "");

        setNextdialoguItemSelection(nextPhrase?.id ?? "");
    }, [variations, props.phrase, selectedAnswerTabId]);

    const handleChange = (event: React.SyntheticEvent, answerTabId: number) => {
        setSelectedAnswerTabId(answerTabId.toString());
    };

    const onCreateDialogueLine = async () => {
        await answerQueriesApi.create(props.phrase.id);
    }

    return (
        <Box>
            {/* <PhraseInstruction /> */}
            <Box
                sx={{
                    backgroundColor: "#e0f2f1",
                    borderRadius: 1,
                    padding: 2,
                    margin: 2,
                }}
            >

                <TabContext value={selectedAnswerTabId}>
                    <Grid display='flex' direction='row' alignItems='center'>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            {!!props.phrase.answers.length
                                ? props.phrase.answers.map((answer, id) => (
                                    <Tab onClick={() => setVariations(answer.texts)} label={`story line ${id + 1}`} value={answer.id} />
                                ))
                                : <Tab label={`story line 1`} />
                            }
                        </TabList>
                        <IconButton onClick={onCreateDialogueLine}>
                            <IoMdAddCircle />
                        </IconButton>
                    </Grid>
                    <Grid display='flex' direction='row' alignItems='center'>
                        <IconButton onClick={() => setIsEdit(!isEdit)}>
                            <DriveFileRenameOutlineIcon />
                        </IconButton>
                    </Grid>
                    <MessageBox
                        title={``}
                        position={"left"}
                        type={"text"}
                        text={props.phrase?.text}
                    />
                    {variations.map(answer => (
                        <Box >
                            <MessageBox
                                title={`student [possible answer]`}
                                position={"right"}
                                type={"text"}
                                text={answer}
                            />
                        </Box>
                    ))}
                    {!!nextPhrase
                        ? <MessageBox
                            title={`dsds`}
                            position={"left"}
                            type={"text"}
                            text={nextPhrase}
                        />
                        : null

                    }

                </TabContext>
            </Box >
            {!isEdit
                ? null
                : <TextField
                    sx={{ m: 3 }}
                    InputLabelProps={{ shrink: true }}
                    value={props.phrase.text}
                    id="outlined-basic"
                    label="Phrase"
                    variant="outlined"
                    onChange={(event) => props.onChangeText(event.target.value)}
                    required={true}
                    placeholder="Hey! Hello! Today is a great day for fitness!"
                    fullWidth
                />
            }

        </Box >

    )
}