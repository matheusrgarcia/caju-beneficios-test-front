import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import { useModal } from "../../contexts/index";
import { Button } from "../buttons/button";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, string>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertDialog: React.FC = () => {
  const { isOpen, closeModal, modalData } = useModal();

  if (!modalData) return null;

  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeModal}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{modalData.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {modalData.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="error" variant="contained">
          Cancelar
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            modalData.onConfirm();
            closeModal();
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
