import { Box } from "@mui/material";
import Switcher from "../../../Components/Button/Switcher";
import StudentList from "../../../Components/StudentList";
import AccessSettingsInsrtuction from "./AccessSettingsInstruction";

export interface IAccessSettingsInfoProps {
    studentsId: string[]
    setStudentList: (studentsId: string[]) => void;
    publish: () => void;
    isPublished: boolean;
}
export default function AccessSettingsInfo(props: IAccessSettingsInfoProps) {
    return (
        <Box>
            <AccessSettingsInsrtuction />
            <Box sx={{ mt: 3 }}>
                <Switcher setIsChecked={props.publish} checked={props.isPublished} />

                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                >
                    <StudentList
                        studentList={props.studentsId}
                        setStudentList={props.setStudentList}
                    />
                </Box>
            </Box>

        </Box>


    )
}