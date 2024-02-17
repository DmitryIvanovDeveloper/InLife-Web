import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TensesListAnswer from '../../../Images/Instructions/TensesListAnswer.png';

export default function DialogueLineTensesListInstruction() {
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
                    <Typography variant="body2" color="text.secondary">
                        Possible tenseses for the possible answers
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}