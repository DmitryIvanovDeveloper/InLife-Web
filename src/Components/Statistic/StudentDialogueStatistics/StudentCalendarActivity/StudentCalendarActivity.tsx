import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './css/StudentCalendarActivity.css';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { PickersDayProps, PickersDay } from '@mui/x-date-pickers';
import { isSameDay } from "date-fns";

export interface IStudentCalendarActivityProps {
    onChange: (date: Date) => void;
    highlightDates: Date[];
    date: Date;
}
export default function StudentCalendarActivity(props: IStudentCalendarActivityProps) {
    const today = dayjs();

    const [highlightedDays, setHighlitedDays] = useState(props.highlightDates)

    const CustomDay = (props: PickersDayProps<Date>) => {
        const matchedStyles = highlightedDays.reduce((a, v) => {
            const hasHighlight = highlightedDays
                .find(highlightedDay => isSameDay(new Date(props.day), highlightedDay)) && 
                !isSameDay(new Date(props.day), new Date())
            ;
            return hasHighlight ? { backgroundColor: "#c8e6c9", } : a;
        }, {});

        return <PickersDay {...props} sx={{ ...matchedStyles }} />;
    };

    useEffect(() => {
        props.onChange(new Date());
    }, []);
    
    return (
        <Box
            display='flex'
            justifyContent='end'
            margin="5px"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    onChange={event => props.onChange(event as Date)}
                    openTo="day"
                    // value={value}
                    slots={{ day: CustomDay }}


                />
            </LocalizationProvider>
        </Box>
    )
}