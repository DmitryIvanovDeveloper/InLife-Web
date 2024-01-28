import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function EquivalentAnswersInstructions() {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="218"
          // image={PossibleAnswers}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Possible Answers
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Possible Answers
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}