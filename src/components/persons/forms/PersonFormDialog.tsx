import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useCreatePersonMutation, useUpdatePersonMutation } from "../../../features/persons/PersonsApi";
import type { CreatePersonDto, TPerson } from "../../../types/person.types";
import PersonForm from "./PersonForm";


type TProps = {
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  editData?: TPerson | null;
  onSuccess?: () => void;
};

const PersonFormDialog: React.FC<TProps> = ({
  open,
  handleClose,
  isEdit,
  editData = null,
  onSuccess,
}) => {
  const [createPerson, { isLoading: isCreating}] =
    useCreatePersonMutation();

  const [updatePerson, { isLoading: isUpdating}] =
    useUpdatePersonMutation();

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });


  const isLoading = isCreating || isUpdating;


  const handleSubmit = async (formData: CreatePersonDto) => {
    try {
      if (isEdit && editData?.id) {
        await updatePerson({
          id: editData.id,
          ...formData,
        }).unwrap();

        setSnackbar({
          open: true,
          message: "شخص با موفقیت ویرایش شد",
          severity: "success",
        });
      } else {
        await createPerson(formData).unwrap();

        setSnackbar({
          open: true,
          message: "شخص با موفقیت ایجاد شد",
          severity: "success",
        });
      }

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: (error as any)?.message || "عملیات با خطا مواجه شد",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDialogClose = () => {
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={isLoading ? undefined : handleDialogClose}
        aria-labelledby="person-form-dialog-title"
      >
        <DialogContent>
          <PersonForm
            onSubmit={handleSubmit}
            onCancel={isLoading ? undefined : handleDialogClose}
            isLoading={isLoading}
            initialData={isEdit ? editData : null}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default PersonFormDialog;