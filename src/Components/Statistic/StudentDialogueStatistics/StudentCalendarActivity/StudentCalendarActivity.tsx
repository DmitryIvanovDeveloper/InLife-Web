import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickersDayProps, PickersDay } from '@mui/x-date-pickers';
import { isSameDay } from "date-fns";
import 'react-calendar/dist/Calendar.css';
import './css/StudentCalendarActivity.css';

export interface IStudentCalendarActivityProps {
    onChange: (date: Date) => void;
    highlightDates: Date[];
    date: Date;
    label: string;
}
export default function StudentCalendarActivity(props: IStudentCalendarActivityProps) {
    const [highlightedDays, setHighlightedDaysб] = useState<Date[]>(props.highlightDates)

    const CustomDay = (props: PickersDayProps<Date>) => {
        const hasHighlight = highlightedDays.find(highlightedDay => isSameDay(new Date(props.day), highlightedDay))
        return <PickersDay {...props} sx={{ backgroundColor: hasHighlight ? "#8bc34a" : "", color: hasHighlight ? "white" : "" }} />;
    };

    useEffect(() => {
        setHighlightedDaysб(props.highlightDates);
    }, [props.highlightDates]);

    return (
        <Box
            display='flex'
            justifyContent='end'
            margin="5px"
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    onChange={event => props.onChange(event as Date)}
                    label={props.label}
                    openTo="day"
                    format="DD-MM-YYYY"
                    views={["year", "month", "day"]}
                    slots={{ day: CustomDay }}
                />
            </LocalizationProvider>
        </Box>
    )
}