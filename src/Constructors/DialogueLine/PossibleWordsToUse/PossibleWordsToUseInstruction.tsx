import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PossibleWords from '../../../Images/Instructions/PossibleWords.png';

export default function PossibleWordsToUseInstruction() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        Type possible words that a student can to use for an answer [if needed]
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       It will help to find correct asnswer
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        A student can find it in the game
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        For exapmle:
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image={PossibleWords}
                    alt="green iguana"
                />

            </CardActionArea>
        </Card>
    );
}