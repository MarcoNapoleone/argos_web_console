import {Box, Typography} from "@mui/material";
import React from "react";

function DialogFormLabel(props: { title: string }) {
  return <Box py={1} px={1}>
    <Typography component="span" variant="caption">
      {props.title}
    </Typography>
  </Box>;
}

export default DialogFormLabel;