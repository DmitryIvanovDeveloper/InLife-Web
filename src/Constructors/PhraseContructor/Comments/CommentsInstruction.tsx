import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Comments from '../../../Images/Instructions/Comments.png';

export default function CommentsInstruction() {
    return (
        <Card >
            <CardActionArea>
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        Add some comments to the phrase or some text you want
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        A student can find it in the game.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        For example:
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    height="275"
                    image={Comments}
                    alt="green iguana"
                />

            </CardActionArea>
        </Card>
    );
}