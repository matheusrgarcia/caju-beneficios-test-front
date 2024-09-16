import React from "react";
import { default as MaterialSnackbar } from "@mui/material/Snackbar";

import { useSnackbar } from "../../contexts/index";

export const Snackbar: React.FC = () => {
  const { isOpen, closeSnackbar, snackbarData } = useSnackbar();

  if (!snackbarData) return null;

  return (
    <MaterialSnackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      message={snackbarData.message}
      action={snackbarData.action}
    />
  );
};
