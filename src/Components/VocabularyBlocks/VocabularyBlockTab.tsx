import { Avatar, Box, Tab, Typography } from "@mui/material";
import { useDialogue } from "../../Data/useDialogues";
import { Locations } from "../../Data/Locations";
import { useEffect, useState } from "react";

export interface IVocabularyBlockTabProps {
    dialogueId: string;
    name: string;
    createdAt: Date;
    value: string;
}
export default function VocabularyBlockTab(props: IVocabularyBlockTabProps) {
    const dialogueRecoil = useDialogue(props.dialogueId);

    const [avatarUrl, setAvatarUrl] = useState<string>("");

    useEffect(() => {
        if (!dialogueRecoil) {
            return;
        }

        var url = Locations.find(npc => npc.id == dialogueRecoil?.levelId)?.avatar;
        if (!url) {
            return;  
        }
        // 
        setAvatarUrl(url);
    }, [dialogueRecoil]);

    function BlockName(name: string, date: Date) {
        var updatedDate = new Date(date);

        return (
            <Box>
                <Typography>{name}</Typography>
                {/* <Typography>{`${updatedDate.toISOString().substring(0, 10)}`}</Typography> */}
            </Box>
        )
    }

    return (
        <Box display='flex'>
            {!avatarUrl
                ? null
                : <Avatar src={avatarUrl} />
            }

            <Tab
                label={BlockName(props.name, props.createdAt)}
                {...props}
            />
        </Box>

    )
}