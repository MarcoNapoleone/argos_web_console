import {GridOverlay} from "@mui/x-data-grid";
import React from "react";
import {createStyles, makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import NoContentIcon from "../NoContentIcon/NoContentIcon";
import {Box, Stack, Typography} from "@mui/material";

const defaultTheme = createTheme();
const useStyles = makeStyles((theme) => createStyles({
  label: {
    marginTop: theme.spacing(1),
  },
}), {defaultTheme},);

function NoRowsOverlay() {
  const classes = useStyles();
  return (
    <Box py={6}>
      <GridOverlay>
        <Stack>
          <NoContentIcon/>
          <Typography variant="caption" color="text.scondary" align="center" className={classes.label}>No
            Elements</Typography>
        </Stack>
      </GridOverlay>
    </Box>
  );
}

export default NoRowsOverlay;
