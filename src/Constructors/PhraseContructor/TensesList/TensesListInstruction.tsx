import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TensesListPhrase from '../../../Images/Instructions/TensesListPhrase.png';

export default function TensesListInstruction() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        Select the tenseses to the phrase if needed
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
                    height="218"
                    image={TensesListPhrase}
                    alt="green iguana"
                />
            </CardActionArea>
        </Card>
    );
}