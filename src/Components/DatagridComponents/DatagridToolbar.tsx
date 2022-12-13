import React from "react";
import {Box, Grid, useMediaQuery} from "@mui/material";
import {GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton} from "@mui/x-data-grid";
import {useTheme} from "@mui/material/styles";


function CustomGridToolbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={1} sx={{display: 'flex'}}>
      <Grid container spacing={2}>
        {!isMobile && <Grid item>
          <GridToolbarFilterButton sx={{borderRadius: '8px'}}/>
        </Grid>}
        <Grid item>
          <GridToolbarDensitySelector sx={{borderRadius: '8px'}}/>
        </Grid>
        {!isMobile && <Grid item>
          <GridToolbarExport translate="yes" sx={{borderRadius: '8px'}}/>
        </Grid>}
      </Grid>
    </Box>
  );
}


export default CustomGridToolbar;