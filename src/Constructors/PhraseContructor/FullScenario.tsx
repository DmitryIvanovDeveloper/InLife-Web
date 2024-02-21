import { Box, Typography } from "@mui/material";
import { useDialogue } from "../../Data/useDialogues";
import Message from "../../Components/ChatElement/Message";
import { useEffect, useState } from "react";
import { useSelectDialogueLine } from "../../Data/useDialogueItemSelection";
import IAnswerModel from "../../ThereGame.Business/Models/IAnswerModel";
import IPhraseModel from "../../ThereGame.Business/Models/IPhraseModel";

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ISelectDialogueLine from "../models/ISelectDialogueLine";

export interface IPhraseConstructor {
    dialogueId: string;
    id: string
}

export default function FullScenario(props: IPhraseConstructor): JSX.Element | null {

    const [selectDialogueLine, setSelectDialogueLine] = useSelectDialogueLine();

    const dialogueRecoil = useDialogue(props.dialogueId);

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

    const Builder = (phrase: IPhraseModel) => {
        const [currentDialogueLine, setCurrentDialogueLine] = useState<IAnswerModel | undefined>();
        const theme = useTheme();
        const [value, setValue] = useState(0);

        const handleChange = (event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
        };

       

        useEffect(() => {
            if (!dialogueRecoil.phrase.answers.length) {
                return;
            }

            var answer = dialogueRecoil.phrase.answers.find(answer => answer?.id == selectDialogueLine.line.id);
            if (!answer) {
                return;
            }

            setCurrentDialogueLine(answer);

        }, [selectDialogueLine.line.id]);

        if (!phrase) {
            return;
        }

        return (
            <Box>
                <Message
                    title={``}
                    position={"left"}
                    type={"text"}
                    text={phrase.text}
                />
                <Box display='flex' justifyContent='end' >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        aria-label="full width tabs example"
                    >
                        {phrase.answers.map((answer, index) => (
                            <Tab onClick={() => onSelectTab(answer.id, index)} label={`Story Line ${index}`} {...a11yProps(0)} />
                        ))}

                    </Tabs>
                </Box>


                {currentDialogueLine?.texts.map((text, index) => (
                    <Box>
                        <TabPanel value={value} index={index} dir={theme.direction}>
                            <Message
                                title={``}
                                position={"right"}
                                type={"text"}
                                text={text}
                            />
                        </TabPanel>
                        {!currentDialogueLine
                            ? null
                            : Builder(currentDialogueLine.phrases[0])
                        }

                    </Box>

                ))}
            </Box>
        )
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, },
                p: 5,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                overflowY: "scroll",
                backgroundColor: "#e0f2f1",
                borderRadius: 1,
                padding: 2,
                margin: 2,
            }}
            autoComplete="off"
        >
            <Typography align="center">{dialogueRecoil.name.toUpperCase()}</Typography>
            {Builder(dialogueRecoil.phrase)}
        </Box>
    )
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}