import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function AccessSettingsInsrtuction() {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            AccessSettings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Descriptions
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}