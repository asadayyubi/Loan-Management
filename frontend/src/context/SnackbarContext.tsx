import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar } from "../components/Snackbar";

interface SnackbarContextType {
  showSnackbar: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

// Create a variable to hold the global show function
let globalShowSnackbar: (message: string) => void = () => {};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    visible: boolean;
  }>({
    message: "",
    visible: false,
  });

  const showSnackbar = useCallback((message: string) => {
    setSnackbar({ message, visible: true });
  }, []);

  // Assign the showSnackbar function to the global variable
  globalShowSnackbar = showSnackbar;

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.visible && (
        <Snackbar message={snackbar.message} onClose={handleClose} />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

// Export the global function for use outside components
export const showGlobalSnackbar = (message: string) => {
  globalShowSnackbar(message);
};
