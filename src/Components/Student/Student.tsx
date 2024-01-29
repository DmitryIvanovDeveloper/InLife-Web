import { Avatar, Card, Typography } from "@mui/material";
import IStudentModel from "../../ThereGame.Business/Models/IStudentModel";

export interface IStudentCardProps {
    student: IStudentModel;
}
export default function StudentCard(props: IStudentCardProps) {
    return (
        <Card 
            sx={{p: 2}}
            style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                flexDirection: 'column', 
                alignItems: 'center',
            }}>
            <Avatar sx={{m: 1}} src={props.student.avatar} />
            <Typography>{props.student?.name}&nbsp;{props.student?.lastName}</Typography>
            <Typography>{props.student.email}</Typography>
        </Card>
    )
}