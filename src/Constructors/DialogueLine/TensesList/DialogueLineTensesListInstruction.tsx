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
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        Select tenseses for the possible answers as hint to a student [if needed]
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
                    image={TensesListAnswer}
                    alt="green iguana"
                />

            </CardActionArea>
        </Card>
    );
}