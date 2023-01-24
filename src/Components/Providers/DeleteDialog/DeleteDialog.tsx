import React, {createContext, useContext, useState} from "react";
import {
  alpha,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export const useDeleteDialogContext = createContext({
  openDeleteDialog: false,
  setOpenDeleteDialog: (open: boolean) => {
  },
});

export function DeleteDialogProvider(props: { children?: React.ReactNode }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const deleteDialogValue = {openDeleteDialog, setOpenDeleteDialog}
  return (
    <useDeleteDialogContext.Provider value={deleteDialogValue}>
      {props.children}
    </useDeleteDialogContext.Provider>
  );
}

type DeleteDialogProps = {
  handleDelete: (e: any) => void,
  title: string,
}
const DeleteDialog: React.FC<DeleteDialogProps> = (
  {
    handleDelete,
    title
  }
) => {
  const {openDeleteDialog, setOpenDeleteDialog} = useContext(useDeleteDialogContext);
  const theme = useTheme();

  return (
    <Dialog
      open={openDeleteDialog}
      onClose={() => setOpenDeleteDialog(false)}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0,0,0,0.2)',
        }
      }}
      PaperProps={{
        sx: {
          boxShadow: 0,
          borderRadius: '32px',
        }
      }}
      TransitionComponent={Fade}
      maxWidth="xl"
    >
      <DialogTitle>{"Delete " + title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-slide-description">
          You are about to delete this {title}. Are you sure you want to continue?
        </DialogContentText>
      </DialogContent>
      <Box pr={2} pb={2}>
        <DialogActions>
          <Button color="inherit" onClick={() => setOpenDeleteDialog(false)}>
            <Box mx={2}>
              cancel
            </Box>
          </Button>
          <Button
            color="error"
            sx={{
              backgroundColor: alpha(theme.palette.error.main, 0.2),
              "&:hover": {
                backgroundColor: alpha(theme.palette.error.main, 0.25),
              },
            }}
            onClick={handleDelete}
          >
            <Box mx={2}>
              delete
            </Box>
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default DeleteDialog;