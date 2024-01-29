import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Comments from '../../../Images/Instructions/Comments.png';

export default function CommentsInstruction() {
    return (
        <Card >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="275"
                    image={Comments}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Add some comments to the phrase or something else
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}