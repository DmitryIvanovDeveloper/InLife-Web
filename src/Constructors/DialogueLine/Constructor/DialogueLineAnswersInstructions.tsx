import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Answers from '../../../Images/Instructions/Answers.png';

export default function DialogueLineAnswersInstructions() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Add possible answers a student may to answer  [on the actor phrase]
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        If correct the actor say next phrase (Need to create next one)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        You can create new 'Story Line' to change the conversation to specific scenario
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image={Answers}
                    alt="green iguana"
                />

            </CardActionArea>
        </Card>
    );
}