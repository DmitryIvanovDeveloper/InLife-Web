import { Button, Snackbar } from '@mui/material'
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
          <Button onClick={handleClick}>Invite link</Button>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}
