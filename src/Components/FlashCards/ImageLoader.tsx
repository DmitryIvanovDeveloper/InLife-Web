import { Avatar, Box, Button, IconButton, List, ListItem, Stack } from '@mui/material';
import React from 'react';
import ImageUploading from 'react-images-uploading';
import UploadIco from '../../Images/photo.png';

export interface IImageCardUploaderProps {
    setImage: (images: string) => void
}
export default function ImageCardUploader(props: IImageCardUploaderProps) {

    const onChange = (imageList) => {
        props.setImage(imageList[0]);
    };

    return (
        <Box
            display='flex' 
            justifyContent='flex-end'
        >
       
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
                           sx={{
                            backgroundImage:   `url(${UploadIco})`,
                            backgroundRepeat: "no-repeat",
                            height: '65px',
                            width: '50px',
                            backgroundSize: 'cover'
                        }}
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            
                        </Button>
                    </Box>
                )}
            </ImageUploading>
        </Box>
    );
}