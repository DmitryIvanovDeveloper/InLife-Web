import { Box, Fab } from "@mui/material";
import Switcher from "../../../Components/Button/Switcher";
import StudentList1 from "../../../Components/StudentList";
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
            <Box sx={{ mt: 3 }}>
                <Switcher setIsChecked={props.publish} checked={props.isPublished} />

                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                >
                    <StudentList1
                        studentList={props.studentsId}
                        setStudentList={props.setStudentList}
                    />

                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'end' }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                    // sx={buttonSx}
                    // onClick={() => props.onClick()}
                    // disabled={props.isDisabled}
                    >
                    </Fab>
                </Box>
            </Box>
        </Box>


    )
}