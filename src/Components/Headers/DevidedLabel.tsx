import { Box, Divider, Typography } from "@mui/material";

const styles = {
    value: {
        borderTop: "1px solid #e1e1e1",
        color: "#899499"
    }
};
export interface IDevidedLabelProps {
    name: string;
}

export default function DevidedLabel(props: IDevidedLabelProps) {
    return (
        <Box>
            <Divider variant="fullWidth" />
            <Typography align='center' 
            style={styles.value}>{props.name}</Typography>
        </Box>
    )
}