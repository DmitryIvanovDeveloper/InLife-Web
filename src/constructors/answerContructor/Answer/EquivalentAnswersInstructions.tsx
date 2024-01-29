import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Answers from '../../../Images/Instructions/Answers.png';

export default function EquivalentAnswersInstructions() {
    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="300"
                    image={Answers}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Add answers to next specific phrase
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}