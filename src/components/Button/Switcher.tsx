import { Box, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';


const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export interface ISwitcherProps {
    checked: boolean;
    setIsChecked: (isChecked: boolean) => void
}
export default function Switcher(props: ISwitcherProps) {
    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-end' alignItems='flex-end'>
            <Typography>Global Publish</Typography>
            <Switch
                checked={props.checked}
                onChange={(event) => props.setIsChecked(event.target.checked)}
                {...label} 
            />
        </Box>
    );
}