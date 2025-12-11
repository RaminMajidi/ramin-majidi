import { useState } from "react";
import Swal from "sweetalert2";
import {
  useDeletePersonMutation,
  useGetPersonsQuery,
} from "../../features/persons/PersonsApi";
import type { TGetPersonsParams, TPerson } from "../../types/person.types";

import { Box, CircularProgress, Alert } from "@mui/material";
import PersonFormDialog from "./forms/PersonFormDialog";
import ErrorBoundary from "../ErrorBoundary";

import PersonsHeader from "./table/PersonsHeader";
import PersonsTable from "./table/PersonsTable";
import PersonsPagination from "./table/PersonsPagination";
import SnackbarAlert from "./SnackbarAlert";

const PersonsPage = () => {
  const [params, setParams] = useState<TGetPersonsParams>({
    page: 1,
    page_size: 10,
    ordering: "",
  });

  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<TPerson | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const {
    data: personsResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetPersonsQuery(params);

  const [deletePerson, { isLoading: isDeleting }] = useDeletePersonMutation();

  const persons = personsResponse?.results || [];
  const totalPages = personsResponse?.count
    ? Math.ceil(personsResponse.count / params.page_size!)
    : 0;

  const handleOpenForm = (isEditParam = false, person?: TPerson) => {
    setOpenForm(true);
    setIsEdit(isEditParam);
    setEditData(person || null);
  };

  const handleCloseForm = () => setOpenForm(false);

  const handleDelete = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
      });

      if (result.isConfirmed) {
        await deletePerson(id).unwrap();

        setSnackbar({
          open: true,
          message: "Person deleted successfully",
          severity: "success",
        });

        refetch();
      }
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: err?.data?.message || "Failed to delete person",
        severity: "error",
      });
    }
  };

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Alert severity="error">Error loading persons: {error?.toString()}</Alert>
    );

  return (
    <Box sx={{ maxWidth: 1200, marginInline: "auto", marginTop: 10 }}>
      <ErrorBoundary>
        <PersonFormDialog
          open={openForm}
          handleClose={handleCloseForm}
          isEdit={isEdit}
          editData={editData}
        />
      </ErrorBoundary>

      <PersonsHeader
        total={personsResponse?.count || 0}
        onAdd={() => handleOpenForm()}
      />

      <PersonsTable
        persons={persons}
        isFetching={isFetching}
        onEdit={(p: TPerson) => handleOpenForm(true, p)}
        onDelete={handleDelete}
        params={params}
        setParams={setParams}
        isDeleting={isDeleting}
      />

      <PersonsPagination
        totalPages={totalPages}
        page={params.page}
        onChange={(page: number) => setParams((prev) => ({ ...prev, page }))}
        totalCount={personsResponse?.count || 0}
        currentItems={persons.length}
      />

      <SnackbarAlert snackbar={snackbar} setSnackbar={setSnackbar} />
    </Box>
  );
};

export default PersonsPage;