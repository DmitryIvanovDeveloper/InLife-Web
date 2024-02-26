import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import INpc from '../Data/Locations';
import NpcList from '../Components/Npc/NpcList';
import NpcProfile from '../Components/Npc/NpcProfile';
import { Tab, Button } from '@mui/material';
import Typography from '@mui/joy/Typography';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import StudentList from '../Components/StudentsList';
import { useDialogueItemConstructor } from '../Data/useDialogues';
import DeskImage from '../Components/Npc/DeskImage';
import { useNpcSelection } from '../Data/useSelectedNpc';
import MenuAppBar from '../Components/AppBars/MenuAppBar';
import GameWebGL from '../Components/GameWebGL/GameWebGL';
import useConstructorActions from '../Data/ConstructorActions';

export interface IDialoguesProps { }

//TODO Rename
export default function Dialogues(props: IDialoguesProps): JSX.Element | null {

    const theme = useTheme();
    const [npc, setNpc] = useNpcSelection();
    const [value, setValue] = useState(0);
    const [_, setDialogueItemConstructor] = useDialogueItemConstructor();
    const constructorActions = useConstructorActions();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setDialogueItemConstructor(() => null);
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };
    const onSelectNpc = (npc: INpc | null) => {
        
        if (!npc) {
            setNpc(null);
            setDialogueItemConstructor(() => null)
            return;
        }
        setNpc(npc);
        constructorActions.setSelectedNpc(npc.id);
        localStorage.setItem("SelectedNpcId", npc.id)
        setDialogueItemConstructor(() => <DeskImage image={npc.image} />)
    }

    function tabs() {
        return (
            <Box sx={{ bgcolor: 'background.paper' }}>
                <Box display='flex' flexDirection="row" justifyContent='space-between'>
                    <MenuAppBar />
                </Box>

                <AppBar position="static" >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab sx={{ fontWeight: 800 }} label="Actors" {...a11yProps(0)} />
                        <Tab sx={{ fontWeight: 800 }} label="Students" {...a11yProps(1)} />
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
            }}

            autoComplete="off" >


            {!npc
                ? tabs()
                : <NpcProfile npc={npc} onToList={() => onSelectNpc(null)} />
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