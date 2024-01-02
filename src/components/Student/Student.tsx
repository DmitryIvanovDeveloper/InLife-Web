import { Box, Button, Typography } from "@mui/material";
import IStudentModel from "../../ThereGame.Business/Models/IStudentModel";

export interface IStudentProps {
    student: IStudentModel;
}
export default function Student(props: IStudentProps) {
    return (
        <Box
            display='flex'
            alignItems='center'
            flexDirection='column'
        >
            <Typography color="text.secondary">{props.student?.name}&nbsp;{props.student?.lastName}</Typography>
            <Button>{props.student.email}</Button>
        </Box>
    )
}