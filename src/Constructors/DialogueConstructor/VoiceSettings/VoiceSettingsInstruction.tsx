import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function VoiceSettingsInstruction() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        (WARNING: You can select a voice only once to the scene)
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}