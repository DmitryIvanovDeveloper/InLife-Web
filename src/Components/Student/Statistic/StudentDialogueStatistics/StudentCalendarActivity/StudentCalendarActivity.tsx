import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './css/StudentCalendarActivity.css';
import { Box } from '@mui/material';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface IStudentCalendarActivityProps {
    onChange: (date: Date) => void;
    date: Date;
}
export default function StudentCalendarActivity(props: IStudentCalendarActivityProps) {

    return (
        <Box display='flex' justifyContent='center'>
            <Calendar onChange={event => props.onChange(event as Date)} value={props.date as Value} />
        </Box>
    )
}