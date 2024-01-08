import React, { useState } from "react";
import AvatarEditor from "./AvatarEditor";
import { Avatar, Box } from "@mui/material";

export default function ProfileAvatar() {
  const [imageFile, setImageFile] = useState<File>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  return (
    <Box display='flex' justifyContent='center'>
      <div style={{ height: "30px" }} />
      <AvatarEditor image={imageFile} width={250} height={250} />
    </Box>
  );
}
