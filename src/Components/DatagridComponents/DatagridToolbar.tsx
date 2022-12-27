import React, {useContext} from "react";
import {Box, Button, Grid, useMediaQuery} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  GridColumnMenuProps,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import {useTheme} from "@mui/material/styles";
import { useAddDialogContext } from "../Providers/AddDialog/AddDialog";


function CustomGridToolbar(props: GridColumnMenuProps & { allowAdd?: boolean, onAdd?: () => void }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {openAddDialog, setOpenAddDialog} = useContext(useAddDialogContext);
  return (
    <Box p={1} sx={{display: 'flex'}}>
      <Grid container spacing={2}>
        {props.allowAdd
          ? <Grid item>
            <Button
              size="small"
              sx={{borderRadius: '8px'}}
              startIcon={<AddIcon/>}
              onClick={Boolean(props.onAdd) ? props.onAdd : () => setOpenAddDialog(true)}
            >
              Add
            </Button>
          </Grid>
          : null
        }
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