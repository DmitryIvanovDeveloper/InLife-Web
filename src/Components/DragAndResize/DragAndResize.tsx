import { Box, Typography } from '@mui/material';
import { Resizable } from 're-resizable';
import { ReactElement, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

export interface IDragAndResizeProps {
    element: ReactElement
}

export default function DragAndResize(props: IDragAndResizeProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDraging, setIsDragging] = useState<boolean>(false);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    useEffect(() => {
        var data = localStorage.getItem(`Position`);
        if (!data) {
            return;
        }
        var lastPosition = JSON.parse(data)
        setPosition(lastPosition);
    }, []);

    const eventLogger = (event: any) => {
        setPosition({ x: event.x, y: event.y })
        
        localStorage.setItem(`Position`, JSON.stringify(position));
    };


    return (
        <Draggable
            allowAnyClick={false}
            // disabled={!isResizing}
            onDrag={event => eventLogger(event)}
            onStart={() => setIsDragging(true)}
            onStop={() => setIsDragging(false)}
            // position={position}
        >

            {/* <Resizable
                enable={{ 
                    top: !isDraging,
                    right: !isDraging,
                    bottom: !isDraging,
                    left: !isDraging,
                    topRight: !isDraging,
                    bottomRight: !isDraging,
                    bottomLeft: !isDraging,
                    topLeft: !isDraging,
                }}
                onResizeStart={() => setIsResizing(true)}
                onResizeStop={() => setIsResizing(false)}
                
                defaultSize={{
                    width: "100px",
                    height: "700px"
                }}
            >  */}

            <Box sx={{ border: '1px solid' }}>
                {props.element}
            </Box>
            {/* </Resizable> */}
        </Draggable>
    )
}