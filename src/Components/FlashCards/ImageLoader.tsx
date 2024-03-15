import { Box, Button, IconButton, List, ListItem, Stack } from '@mui/material';
import React from 'react';
import ImageUploading from 'react-images-uploading';

export interface IImageCardUploaderProps {
    setImage: (images: string) => void;
}
export default function ImageCardUploader(props: IImageCardUploaderProps) {

    const onChange = (imageList) => {
        props.setImage(imageList[0]);
    };

    return (
        <div className="App">
            <ImageUploading
                value={[]}
                onChange={onChange}
                dataURLKey="data_url"
                resolutionType='absolute'
            >
                {({
                    onImageUpload,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <Box className="upload__image-wrapper">
                        <Button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </Button>
                    </Box>
                )}
            </ImageUploading>
        </div>
    );
}