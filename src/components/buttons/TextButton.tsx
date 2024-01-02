import React from "react";
import { Button } from "@mui/material";

interface ITextButtonProps {
  children: any;
  onClick: (event: any) => void;
}

export default function TextButton(props: ITextButtonProps) {
  return <Button
    disableRipple
    variant="text"
    onClick={props.onClick}
    sx={{
      display:"flex",
      justifyContent:"flex-start",
      textAlign: "left"
    }}>
    {props.children}
  </Button>
}