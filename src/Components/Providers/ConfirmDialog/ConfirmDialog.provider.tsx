import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import React, {createContext, useCallback, useState} from 'react';

interface ConfirmationProviderProps {
  children: React.ReactNode;
}

interface ConfirmationContextType {
  confirm: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
}

export const ConfirmationContext = createContext<ConfirmationContextType>({
  confirm: () => {},
});

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({ children }) => {
  const [confirmation, setConfirmation] = useState<{
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  } | null>(null);

  const confirm = useCallback(
    (message: string, onConfirm: () => void, onCancel?: () => void) => {
      setConfirmation({ message, onConfirm, onCancel });
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    if (confirmation) {
      confirmation.onConfirm();
      setConfirmation(null);
    }
  }, [confirmation]);

  const handleCancel = useCallback(() => {
    if (confirmation && confirmation.onCancel) {
      confirmation.onCancel();
    }
    setConfirmation(null);
  }, [confirmation]);

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      {confirmation && (
        <Dialog open={true} onClose={handleCancel}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>{confirmation.message}</DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>
      )}
    </ConfirmationContext.Provider>
  );
};
