import { Typography, Box } from "@mui/material";

export default function Hint() {
    return (
        <Box
            width="100%"
            display='flex'
            justifyContent='center'
            sx={{ backgroundColor: '#e1f5fe', borderRadius: 1, mb: 1 }}
        >
            <Typography color='grey'>You can edit any scene while playing in the game! Check it</Typography>
        </Box>
    )
}