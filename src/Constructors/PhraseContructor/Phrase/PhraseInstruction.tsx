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
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        Insered a phrase the actor should to say.
                        The phrase will be generated to audio voice by AI.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        A student can see and hear the phrase in the game.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       For example:
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    height="140"
                    image={Phrase}
                    alt="green iguana"
                />

            </CardActionArea>
        </Card>
    );
}