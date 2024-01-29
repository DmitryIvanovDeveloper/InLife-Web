import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Answers from '../../../Images/Instructions/Answers.png'

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
                    <Typography gutterBottom variant="h5" component="div">
                        Possible Answers
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Add answers that student can get an access to specific phrase
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}