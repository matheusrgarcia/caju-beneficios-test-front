import React from "react";
import { default as MaterialSnackbar } from "@mui/material/Snackbar";

import { useSnackbar } from "../../contexts/index";
import { Alert } from "@mui/material";

export const Snackbar: React.FC = () => {
  const { isOpen, closeSnackbar, snackbarData } = useSnackbar();

  if (!snackbarData) return null;

  return (
    <MaterialSnackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      message={snackbarData.message}
      action={snackbarData.action}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbarData.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbarData.message}
      </Alert>
    </MaterialSnackbar>
  );
};
