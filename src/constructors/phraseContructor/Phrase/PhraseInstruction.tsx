import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Phrase from '../../../Images/Instructions/Phrase.png';

export default function PhraseInstruction() {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={Phrase}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Phrase
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The phrase text will be generated to audio voice by AI.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}