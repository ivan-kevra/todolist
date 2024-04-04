import { errorSelector } from "@/app/model/app.selector";
import { appActions } from "@/app/model/app.slice";
import { useActions } from "@/common/hooks/useActions";
import { useAppSelector } from "@/common/hooks/useAppDispatch";
import { Snackbar, Alert } from "@mui/material";
import React from "react";

export const ErrorSnackbar = () => {
  const error = useAppSelector(errorSelector);

  const { setAppError } = useActions(appActions);

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setAppError({ error: null });
  };
  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} message={error}>
      <Alert
        severity="error"
        variant="filled"
        onClose={handleClose}
        sx={{
          width: "100%",
        }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};
