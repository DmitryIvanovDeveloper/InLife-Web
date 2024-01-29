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
                <CardMedia
                    component="img"
                    height="218"
                    image={PossibleWords}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Possible words
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Add words than a student can use to an answer
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}