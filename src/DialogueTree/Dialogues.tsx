import Box from '@mui/material/Box';
import { useState } from 'react';
import INpc from '../Data/Locations';
import useDialogueQueriesApi from '../ThereGame.Api/Queries/DialogueQueriesApi';
import NpcList from '../Components/Npc/NpcList';
import NpcProfile from '../Components/Npc/NpcProfile';
import { Tab } from '@mui/material';
import { useStudents } from '../Data/useStudents';
import Typography from '@mui/joy/Typography';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import StudentList from '../Components/StudentsList';

export interface IDialoguesProps { }

export default function Dialogues(props: IDialoguesProps): JSX.Element | null {

    const dialogueQueriesApi = useDialogueQueriesApi();

    const [npc, setNpc] = useState<INpc | null>(null);

    const [isNewDialogueCreating, setIsNewDialogueCreating] = useState<boolean>();
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };
    const onSelectNpc = (npc: INpc) => {
        setNpc(npc);
    }



    const createNewDialogue = async () => {
        setIsNewDialogueCreating(true);
        await dialogueQueriesApi.create(npc?.id ?? "");
        setIsNewDialogueCreating(false)
    }

    function tabs() {
        return (
            <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Actors" {...a11yProps(0)} />
                        <Tab label="Students" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <NpcList onSelectNpc={onSelectNpc} />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <StudentList />
                    </TabPanel>
                </SwipeableViews>
            </Box>
        )
    }

    return (
        <Box component="form"
            sx={{
                mt: 2,
                ml: 2,
                '& > :not(style)': { m: 1, width: '100%', height: "100%" },
                display: "flex",
                flexDirection: "column",
                height: 1000,
                overflow: "hidden",
                overflowY: "scroll",
            }}

            autoComplete="off" >


            {!npc
                ? tabs()
                : <NpcProfile npc={npc} onToList={() => setNpc(null)} />
            }
        </Box>
    );
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