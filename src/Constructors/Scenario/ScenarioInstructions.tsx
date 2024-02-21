import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ScenarioInstructions() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        Create your own scenario to student you want!
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}