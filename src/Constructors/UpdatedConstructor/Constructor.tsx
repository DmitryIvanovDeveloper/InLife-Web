//@ts-nocheck
import { Box } from "@mui/material";
import { MessageBox } from "react-chat-elements";
import { useDialogue } from "../../Data/useDialogues";

export interface IConstructorProps {
    dialogueId: string;
}

export default function Constructor(props: IConstructorProps) {
    const dialogue = useDialogue(props.dialogueId);

    return (
        <Box
            sx={{
                backgroundColor: "#e0f2f1",
                borderRadius: 1,
                padding: 2,
                margin: 2,
            }}
        >

            <MessageBox
                title={``}
                position={"left"}
                type={"text"}
                text={dialogue.phrase.text}
            />
            
            {dialogue.phrase.answers.map(answer => (

                <Box>
                    <Box>
                        {answer.texts.map(text => (
                            <MessageBox
                                title={``}
                                position={"right"}
                                type={"text"}
                                text={text}
                            />
                        ))}
                    </Box>
                    <Box>
                        {answer.phrases.map(phrase => (
                            <MessageBox
                                title={`student`}
                                position={"left"}
                                type={"text"}
                                text={dialogue.phrase.text}
                            />
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    )
};