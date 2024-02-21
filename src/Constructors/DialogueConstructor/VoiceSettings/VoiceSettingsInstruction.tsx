import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function VoiceSettingsInstruction() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        Select a specific voice to the actor you like!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        (WARNING: You can select asn save a voice only once to the dialogue)
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}