import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function AccessSettingsInsrtuction() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Select a student[s] can play the scenario in the game
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       Select 'Global Publish' all users can play the scenario
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        (You always can play the scenario if signed-in as teacher account in the game)
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}