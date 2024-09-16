import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalData = {
  title: string;
  message: string;
  onConfirm: () => void;
};

type ModalContextType = {
  // eslint-disable-next-line no-unused-vars
  openModal: (data: ModalData) => void;
  closeModal: () => void;
  modalData: ModalData | null;
  isOpen: boolean;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (data: ModalData): void => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalData, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
