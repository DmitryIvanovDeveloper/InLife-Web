import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Translates from '../../../Images/Instructions/Translates.png';

export default function TranslatesInstructions() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Add  translates to the possible answers as hint to a student  [if needed]
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       It will help to find correct asnswer
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        A student can find it in the game
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        For exapmle:
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image={Translates}
                    alt="green iguana"
                />
            </CardActionArea>
        </Card>
    );
}