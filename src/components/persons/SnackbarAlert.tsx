import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ snackbar, setSnackbar }: any) => (
  <Snackbar
    open={snackbar.open}
    autoHideDuration={6000}
    onClose={() => setSnackbar((p: any) => ({ ...p, open: false }))}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
  </Snackbar>
);

export default SnackbarAlert;