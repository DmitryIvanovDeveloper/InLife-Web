import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function AccessSettingsInsrtuction() {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Instructions
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        1 - Global publish - All not authorized users  have an access to the dialogue (in the game) 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        2 - Student publish - Authorized students have an access  to the dialogue (in the game)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        3 - You always have an access to the dialogue (in the game) 
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}