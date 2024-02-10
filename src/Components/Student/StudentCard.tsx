import { Avatar, Card, CardActionArea, Typography } from "@mui/material";
import IStudentModel from "../../ThereGame.Business/Models/IStudentModel";
import { useNavigate } from "react-router-dom";
import { Routes } from '../../Routes';
import { useDialogueStatistic } from "../../Data/useDialogueStatistic";
import useDialogueStatisticApi from "../../ThereGame.Api/Queries/DialogueStatisticApi";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";


export interface IStudentCardProps {
    student: IStudentModel;
}
export default function StudentCard(props: IStudentCardProps) {
    const navigate = useNavigate();
    const dialogueStatisticApi = useDialogueStatisticApi();

    const openStudentPage = async () => {
        const status = await dialogueStatisticApi.get(props.student.id);
        console.log(status);
        if (status == Status.OK) {
            navigate({
                pathname: Routes.student,
                search: `id=${props.student.id}`
            })
        }
       
    }
    return (
        <CardActionArea
            onClick={() => openStudentPage()}
            sx={{ width: '300px', maxWidth: "400px" }}
        >
            <Card
                sx={{ p: 2 }}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1 }} src={props.student.avatar} />
                <Typography>{props.student?.name}&nbsp;{props.student?.lastName}</Typography>
                <Typography>{props.student.email}</Typography>
            </Card>
        </CardActionArea>
    )
}