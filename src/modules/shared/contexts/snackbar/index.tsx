import { AlertColor } from "@mui/material";
import React, { createContext, useContext, useState, ReactNode } from "react";

type SnackbarData = {
  message: string;
  action?: React.ReactNode;
  severity?: AlertColor;
};

type SnackbarContextType = {
  // eslint-disable-next-line no-unused-vars
  openSnackbar: (data: SnackbarData) => void;
  closeSnackbar: () => void;
  snackbarData: SnackbarData | null;
  isOpen: boolean;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData | null>(null);

  const openSnackbar = (data: SnackbarData): void => {
    setSnackbarData(data);
    setIsOpen(true);
  };

  const closeSnackbar = (): void => {
    setIsOpen(false);
    setSnackbarData(null);
  };

  return (
    <SnackbarContext.Provider
      value={{ openSnackbar, closeSnackbar, snackbarData, isOpen }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
