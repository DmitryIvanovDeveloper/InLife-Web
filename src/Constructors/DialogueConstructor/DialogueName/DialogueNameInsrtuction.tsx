import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function DialogueNameInsrtuction() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Dialogue root name
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}