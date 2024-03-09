import { Box, Fab } from "@mui/material";
import Switcher from "../../../Components/Button/Switcher";
import AcessStudentList from "../../../Components/AccessStudentList";
import DevidedLabel from "../../../Components/Headers/DevidedLabel";

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
                {/* <Switcher setIsChecked={props.publish} checked={props.isPublished} /> */}
                {/* <DevidedLabel name={""} /> */}
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                >
                    <AcessStudentList
                        accessStudentList={props.studentsId}
                        setAccessStudentList={props.setStudentList}
                    />

                </Box>
            </Box>
        </Box>


    )
}