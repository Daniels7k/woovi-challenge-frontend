import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// alertType: o tipo de erro que é apresentado ( success, warning, info, error )
// alertText: o texto que sera apresentado no componente

export default function SnackbarAlert(props: any) {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleAlert}
      >
        <Alert
          onClose={props.handleAlert}
          severity={props.alertType}
          sx={{ width: "100%" }}
        >
          {props.alertText}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
