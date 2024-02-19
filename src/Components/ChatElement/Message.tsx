//@ts-nocheck

import { MessageBox } from "react-chat-elements";

export interface IChatElement {
    title: string;
    position: string;
    type: string;
    text: string;
    avatar?: string;
}
export default function Message(props: IChatElement) {
    return (
        <MessageBox
            title={props.title}
            position={props.position}
            type={props.type}
            text={props.text}
            avatar={props.avatar}
        />
    )
}