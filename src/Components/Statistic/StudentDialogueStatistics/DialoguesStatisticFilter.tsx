import { Avatar, Box, Tab, Tabs } from "@mui/material";
import StudentCalendarActivity from "./StudentCalendarActivity/StudentCalendarActivity";
import { useDialogueItemConstructor, useDialogues } from "../../../Data/useDialogues";
import IStudentDialogueStatisticModel from "../../../ThereGame.Business/Models/IStudentDialogueStatisticModel";
import { useEffect, useState } from "react";
import { IDialogueModel } from "../../../ThereGame.Business/Models/IDialogueModel";
import INpc, { Locations } from "../../../Data/Locations";
import React from "react";
import DialogueChat from "./DialogueChat";
import moment from "moment";
import { isDateSame } from "../../../ThereGame.Infrastructure/Helpers/DatesCompare";
import { useDialoguesStatistic } from "../../../Data/useDialogueStatistic";
import DevidedLabel from "../../Headers/DevidedLabel";

export interface IDialoguesStatisticFilterProps {
    studentId: string;
}
export default function DialoguesStatisticFilter(props: IDialoguesStatisticFilterProps) {
    const [date, onChangeDate] = useState<Date>();
    const [dialogues, _] = useDialogues();
    const [dialogueItemConstructor, setDialogueItemConstructor] = useDialogueItemConstructor();
    const [dialoguesStatistic] = useDialoguesStatistic();

    const [selectedDialogue, setSelectedDialogue] = useState<IDialogueModel | null>(null);

    const [npcs, setNpcs] = useState<INpc[]>([]);
    const [selectedNpc, setSelectedNpc] = useState<INpc | null>(null);
    const [statisticByDate, setStatisticsByDate] = useState<IStudentDialogueStatisticModel[]>([]);
    const [selectedStatistic, setSelectedStatistic] = useState<IStudentDialogueStatisticModel | null>(null);

    const [filtredDialogues, setFiltredDialogues] = useState<IDialogueModel[]>([])

    const onSelectDialogue = (event: React.SyntheticEvent, newDialogue: IDialogueModel) => {
        setSelectedDialogue(newDialogue);
    };

    const onSelectTime = (event: React.SyntheticEvent, statistic: IStudentDialogueStatisticModel) => {
        setDialogueItemConstructor(() => <DialogueChat
            studentId={props?.studentId}
            dialogueId={statistic.dialogueId}
            statisticHistoty={statistic.dialogueHistory}
        />)
        setSelectedStatistic(statistic);
    };

    const onSelectNpc = (event: React.SyntheticEvent, npc: INpc) => {
        setSelectedNpc(npc);
        setDialogueItemConstructor(() => <div></div>)
    };


    useEffect(() => {
        onChangeDate(new Date())
    }, [dialoguesStatistic]);

    useEffect(() => {

        setDefaultFilter();
        var dialogueStatisticsByDate = dialoguesStatistic
            .filter(dialogueStatistic => isDateSame(dialogueStatistic.startDate, date as Date));

        setStatisticsByDate(dialogueStatisticsByDate);

    }, [date]);

    useEffect(() => {
        setDefaultFilter();
    }, [statisticByDate])

    useEffect(() => {
        setSelectedDialogue(null)
    }, [selectedNpc])

    const setDefaultFilter = () => {
        setNpcs([])
        setSelectedNpc(null)
        setSelectedDialogue(null);
        setSelectedStatistic(null)

        if (!statisticByDate.length) {
            return;
        }

        var dialoguesByDate = getFiltredDialoguesByStatistic(statisticByDate);
        setFiltredDialogues(dialoguesByDate);
        setSelectedDialogue(dialoguesByDate[0])
        var npcs = Locations.filter(npc => dialoguesByDate.find(dialogue => dialogue.levelId == npc.id));
        setNpcs(npcs);
        setSelectedNpc(npcs[0])
    }

    const getFiltredDialoguesByNpc = (npc: INpc | null): IDialogueModel[] => {
        if (!npc) {
            return [];
        }

        return filtredDialogues.filter(dialogue => dialogue.levelId == npc.id);
    }

    const getFiltredDialoguesByStatistic = (statistics: IStudentDialogueStatisticModel[]): IDialogueModel[] => {

        var dialoguesByStatistic = dialogues.filter(dialogue => statistics.find(ds => ds.dialogueId == dialogue.id));
        return dialoguesByStatistic;
    }

    const getDialogueStatisticTime = (): IStudentDialogueStatisticModel[] => {
        if (!selectedDialogue) {
            return [];
        }

        var filteredDialogue = statisticByDate.filter(statistic => statistic.dialogueId == selectedDialogue.id);
        return sortByStartTime(filteredDialogue);
    }

    const getSpentTime = (): number => {
        if (!selectedStatistic) {
            return 0;
        }

        return moment(selectedStatistic?.endDate).diff(selectedStatistic?.startDate, 'seconds')
    }

    const sortByStartTime = (statistic: IStudentDialogueStatisticModel[]) => {
        return statistic.sort((a, b) => {
            return new Date(a.startDate).getTime() -
                new Date(b.startDate).getTime()
        }).reverse();
    }

    return (
            <Box>
                <StudentCalendarActivity
                    highlightDates={dialoguesStatistic.map(statistic => new Date(statistic.startDate))}
                    onChange={onChangeDate}
                    date={date ?? new Date()}
                    label="date"
                />
                <DevidedLabel name="" />

                <Box
                    sx={{ 
                        flexGrow: 1, 
                        bgcolor: 'background.paper', 
                        display: 'flex', 
                        overflow: 'sroll',
                        height: "100vh" 
                    }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={selectedNpc}
                        onChange={onSelectNpc}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', width: "100%" }}
                    >
                        <Tab
                            value={"location"}
                            label={"Actors"}
                            disabled={true}
                        >
                        </Tab>
                        {npcs
                            .map((location, index) => (
                                <Tab
                                    value={location}
                                    label={
                                    <Avatar sx={{ width: "70px", height: "70px" }} src={location.avatar} />}
                                    {...a11yProps(index)}
                                >
                                </Tab>
                            ))}
                    </Tabs>

                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={selectedDialogue}
                        onChange={onSelectDialogue}
                        aria-labelledby="dsdsd"
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', width: "100%" }}
                    >
                        <Tab
                            label={"Played Scenes"}
                            disabled={true}
                        >
                        </Tab>
                        {getFiltredDialoguesByNpc(selectedNpc)
                            .map((filtredDialogue, index) => (
                                <Tab
                                    value={filtredDialogue}
                                    label={filtredDialogue.name}
                                    {...a11yProps(index)}
                                >
                                </Tab>
                            ))}
                    </Tabs>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={selectedStatistic}
                        onChange={onSelectTime}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', width: "100%" }}
                    >
                        <Tab
                            label={"Time"}
                            disabled={true}
                        >
                        </Tab>
                        {getDialogueStatisticTime()
                            .map((statistic, index) => (
                                <Tab
                                    value={statistic}
                                    label={`${statistic.startDate.getHours()}:${statistic.startDate.getMinutes()}`}
                                    {...a11yProps(index)}
                                >
                                </Tab>
                            ))}
                    </Tabs>

                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        aria-labelledby="dsdsd"
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider', width: "100%" }}
                    >
                        <Tab
                            label={"Spent Time (m:s)"}
                            disabled={true}
                        />

                        <Tab
                            disabled={true}
                            label={convertSecondsToMinutes(getSpentTime())}
                        />
                    </Tabs>
                </Box>
            </Box>
    )
}

const convertSecondsToMinutes = (seconds: number): string => {
    if (!seconds) {
       return ""
    }
    var time_s = seconds;
    var minute = Math.floor(time_s / 60);
    var rest_seconds = time_s % 60;

    return minute.toString().padStart(2, '0') + ":" + rest_seconds.toString().padStart(2, '0');
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}