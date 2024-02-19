import { Box } from "@mui/material";

export interface IDeskImageProps {
    image: string;
}
export default function DeskImage(props: IDeskImageProps) {
    return (
        <Box component="form"
            sx={{
                mt: 2,
                ml: 2,
                '& > :not(style)': { m: 1, width: '90%', height: "100%" },
                display: "flex",
            }}
            justifyContent='center'

        >
            <img style={{borderRadius: 5, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",}} width="100%" src={props.image}></img>
        </Box>
    )
}