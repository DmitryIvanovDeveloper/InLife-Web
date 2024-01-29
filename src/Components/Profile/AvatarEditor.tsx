import { Avatar } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

type AvatarEditorProps = {
    image: string | File | undefined;
    scale?: number;
    rotate?: number;
    preview?: {
        img: string;
        rect: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        scale: number;
        width: number;
        height: number;
        borderRadius: number;
    };
    width: number;
    height: number;
    disableCanvasRotation?: boolean;
    isTransparent?: boolean;
    backgroundColor?: string;
    showGrid?: boolean;
};

export default function MyEditor({ image, width, height }: AvatarEditorProps) {
    const editor = useRef<AvatarEditor | null>(null);
    const [croppedImg, setCroppedImg] = useState<any>(null);

    const getImageUrl = async ({ editor }: { editor: AvatarEditor }) => {
        const dataUrl = editor.getImage().toDataURL();
        const result = await fetch(dataUrl);
        const blob = await result.blob();

        return window.URL.createObjectURL(blob);
    };

    if (!image) return null;

    return (
        <Avatar
        sizes="100px"
        >
            <AvatarEditor
                ref={editor}
                image={image}
                width={width}
                height={height}
                border={50}
                borderRadius={999}
                scale={1.2}
                rotate={0}
            />
            <br />
            <button
                onClick={async () => {
                    if (editor.current) {
                        const imageUrl = await getImageUrl({ editor: editor.current });
                        setCroppedImg(imageUrl);
                    }
                }}
            >
                Save
            </button>
            <br />
            <div>result:</div>
            <br />
            {croppedImg ? <img src={croppedImg} alt="croppedImg" /> : null}
        </Avatar>

    );
}
