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
                <CardMedia
                    component="img"
                    height="218"
                    image={Translates}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Add the possible answers translates
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}