import LinkIcon from '@mui/icons-material/Link';
import { Button, Grid, Snackbar } from '@mui/material';
import { useState } from 'react';

export interface ICopyToClipboardButtonProps {
    link: string;
}
export default function CopyToClipboardButton(props: ICopyToClipboardButtonProps) {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(props.link);
    }

    return (
        <>
            <Grid display='flex' justifyContent='center' alignItems='center'>
                <LinkIcon />
                <Button variant='text' onClick={handleClick}>Copy Invite link</Button>
            </Grid>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
            />
        </>
    )
}
