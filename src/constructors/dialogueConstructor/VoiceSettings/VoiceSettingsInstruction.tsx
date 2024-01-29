import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function VoiceSettingsInstruction() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Select voice to the person
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        WARNING: You can save a voice only once to the dialogue
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}