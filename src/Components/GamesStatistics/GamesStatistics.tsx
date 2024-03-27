import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ReactElement } from 'react';

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
                    {children}
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

export interface IGamesStatisticsTabsProps {
    quizle: ReactElement;
    buildWords: ReactElement;
    translatesWords: ReactElement;
}

export default function GamesStatisticsTabs(props: IGamesStatisticsTabsProps) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: "100%" }}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Quizl Game" {...a11yProps(0)} />
                    <Tab label="Build Words Game" {...a11yProps(1)} />
                    <Tab label="Translate Words Game" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                fullWidth
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel 
                 value={value} index={0} dir={theme.direction}>
                    {props.quizle}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    {props.buildWords}
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    {props.translatesWords}
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}
