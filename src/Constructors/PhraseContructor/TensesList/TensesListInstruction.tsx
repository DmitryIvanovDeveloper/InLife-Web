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
                <CardMedia
                    component="img"
                    height="218"
                    image={TensesListPhrase}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Select tenseses used in the phrase
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}