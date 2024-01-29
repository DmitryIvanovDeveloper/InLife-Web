import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import { useDialogues } from '../../Data/useDialogues';
import { IDialogueModel } from '../../ThereGame.Business/Models/IDialogueModel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export interface IDialoguesSelectProps {
    setDialogue: (dialogue: IDialogueModel) => void;
}

export default function DialoguesSelect(props: IDialoguesSelectProps) {
    const theme = useTheme();
    const [dialogues] = useDialogues();

    const handleChange = (event: any) => {
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    onChange={handleChange}
                >
                      {dialogues.map((dialogue) => (
                        <MenuItem
                            key={dialogue.id}
                            value={dialogue.name}
                        >
                            {dialogue.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}