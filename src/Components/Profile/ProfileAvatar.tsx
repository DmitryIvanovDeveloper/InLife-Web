import { Box } from "@mui/material";
import React, { useState } from "react";
import AvatarEditor from "./AvatarEditor";

export default function ProfileAvatar() {

  return (
    <Box display='flex' justifyContent='center'>
      <div style={{ height: "30px" }} />
      <AvatarEditor image={""} width={250} height={250} />
    </Box>
  );
}
