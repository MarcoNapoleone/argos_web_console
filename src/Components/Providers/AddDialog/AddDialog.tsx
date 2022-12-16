import React, {createContext, FC, useContext, useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  LinearProgress,
  Typography,
  useMediaQuery
} from "@mui/material";

export const useAddDialogContext = createContext({
  openAddDialog: false,
  setOpenAddDialog: (open: boolean) => {
  },
});

export function AddDialogProvider(props: { children?: React.ReactNode }) {
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const addDialogValue = {openAddDialog, setOpenAddDialog}
  return (
    <useAddDialogContext.Provider value={addDialogValue}>
      {props.children}
    </useAddDialogContext.Provider>
  );
}

type AddDialogProps = {
  title: string,
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  loading?: boolean,
  onClose?: () => void,
  onDialogRender?: () => void,
  submitButtonText?: string,
  children?: React.ReactNode,
}

const AddDialog: FC<AddDialogProps> = (
  {
    title,
    handleSubmit,
    loading,
    children,
    onClose,
    onDialogRender,
    submitButtonText,
  }) => {

  const theme = useTheme();
  const {openAddDialog, setOpenAddDialog} = useContext(useAddDialogContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpenAddDialog(false)
    if (onClose) onClose();
  }

  useEffect(() => {
    if (onDialogRender) onDialogRender();
  }, []);

  return (
    <Dialog
      open={openAddDialog}
      onClose={handleClose}
      fullWidth
      disableEscapeKeyDown
      PaperProps={{
        sx: {
          boxShadow: 0,
          borderRadius: !isMobile && theme.spacing(4),
        }
      }}
      scroll="paper"
      TransitionComponent={Fade}
      fullScreen={isMobile}
    >
      {loading && <LinearProgress color="primary"/>}
      <DialogTitle>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box component="form" id="dialogForm" noValidate onSubmit={handleSubmit}>
            {children}
          </Box>
        </DialogContentText>
      </DialogContent>
      <Box pr={2} pb={2}>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            <Box mx={2}>annulla</Box>
          </Button>
          <Button
            color="primary"
            type="submit"
            form="dialogForm"
          >
            <Box mx={2}>
              {Boolean(submitButtonText) ? submitButtonText : 'Crea'}
            </Box>
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default AddDialog;