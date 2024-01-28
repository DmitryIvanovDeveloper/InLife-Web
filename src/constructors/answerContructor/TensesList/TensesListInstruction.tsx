import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TensesListAnswer from '../../../Images/Instructions/TensesListAnswer.png';

export default function TensesListInstruction() {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="218"
          image={TensesListAnswer}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            TensesList
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tenses list for answer
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}