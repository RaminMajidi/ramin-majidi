import { useState } from "react";
import Swal from "sweetalert2";
import {
  useDeletePersonMutation,
  useGetPersonsQuery,
} from "../features/persons/PersonsApi";
import type { TGetPersonsParams, TPerson } from "../types/person.types";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Snackbar,
  Button,
  LinearProgress,
} from "@mui/material";

import {
  Person as PersonIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import PersonFormDialog from "../components/persons/PersonFormDialog";
import ErrorBoundary from "../components/ErrorBoundary";

import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

const Persons = () => {
  const [params, setParams] = useState<TGetPersonsParams>({
    page: 1,
    page_size: 10,
    ordering: "",
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<TPerson | null>(null);
  const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
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

  const [deletePersonMutation, { isLoading: isDeleting }] =
    useDeletePersonMutation();

  // ****************************************************
  const handlePageChange = (_: unknown, page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };
  // ****************************************************
  const handleCodeOrderingChange = (_: unknown, ordering: string) => {
    setParams((prev) => ({ ...prev, ordering }));
  };

  // ****************************************************
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    personId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPersonId(personId);
  };

  // ****************************************************
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPersonId(null);
  };

  // ****************************************************
  const handleDelete = async (id: number) => {
    try {
      // بستن منو
      handleMenuClose();

      // نمایش confirm dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        // اجرای mutation
        await deletePersonMutation(id).unwrap();

        // نمایش پیام موفقیت
        setSnackbar({
          open: true,
          message: "Person deleted successfully",
          severity: "success",
        });

        // refresh داده‌ها
        refetch();

        // نمایش SweetAlert موفقیت
        await Swal.fire({
          title: "Deleted!",
          text: "Person has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err: any) {
      console.error("Failed to delete person:", err);

      // نمایش خطا
      setSnackbar({
        open: true,
        message: err?.data?.message || "Failed to delete person",
        severity: "error",
      });

      // نمایش SweetAlert خطا
      await Swal.fire({
        title: "Error!",
        text: err?.data?.message || "Failed to delete person",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // ****************************************************
  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // ****************************************************
  const handelCloseForm = () => {
    setEditData(null);
    setOpenForm(false);
  };
  // ****************************************************
  const handelOpenForm = (isEdit: boolean = false, person?: TPerson) => {
    setOpenForm(true);
    setIsEdit(isEdit);
    if (person) setEditData(person);
  };

  if (isLoading) {
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
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading persons: {error?.toString()}
      </Alert>
    );
  }

  // بررسی اینکه آیا داده وجود دارد
  const persons = personsResponse?.results || [];
  const totalPages = personsResponse?.count
    ? Math.ceil(personsResponse.count / params.page_size!)
    : 0;

  return (
    <Box sx={{ maxWidth: 1200, marginBlock: 10, marginInline: "auto" }}>
      <ErrorBoundary>
        <PersonFormDialog
          handleClose={handelCloseForm}
          isEdit={isEdit}
          open={openForm}
          editData={editData}
        />
      </ErrorBoundary>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Persons
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Total: {personsResponse?.count || 0}
        </Typography>
        <Button variant="outlined" onClick={() => handelOpenForm()}>
          Add Person
        </Button>
      </Box>

      {/* Persons Table */}
      <TableContainer component={Paper}>
        {isFetching && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell
                align="center"
              >
                Name
                {params.ordering == "-code" ? (
                  <NorthIcon
                    fontSize="small"
                    onClick={(e) => handleCodeOrderingChange(e, "code")}
                  />
                ) : (
                  <SouthIcon
                    fontSize="small"
                    onClick={(e) => handleCodeOrderingChange(e, "-code")}
                  />
                )}
              </TableCell>
              <TableCell
                align="center"
              >
                Code
                {params.ordering == "-name" ? (
                  <NorthIcon
                    fontSize="small"
                    onClick={(e) => handleCodeOrderingChange(e, "name")}
                  />
                ) : (
                  <SouthIcon
                    fontSize="small"
                    onClick={(e) => handleCodeOrderingChange(e, "-name")}
                  />
                )}
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="textSecondary" py={3}>
                    No persons found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              persons.map((person) => (
                <TableRow key={person.id} hover>
                  <TableCell align="center">
                    <Typography variant="body2">{person.id}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                    >
                      <PersonIcon
                        sx={{ fontSize: 24, color: "action.active" }}
                      />
                      <Box>
                        <Typography variant="body1">
                          {person.display_name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{person.code}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, person.id)}
                      disabled={isDeleting}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 0 && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          p={2}
        >
          <Typography variant="body2" color="textSecondary">
            Showing {persons.length} of {personsResponse?.count || 0} persons
          </Typography>
          <Pagination
            count={totalPages}
            page={params.page}
            onChange={handlePageChange}
            color="primary"
            disabled={isLoading}
          />
        </Box>
      )}

      {/* Menu for person actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>
          <Typography variant="body2">ID: {selectedPersonId}</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            const person = persons.find((p) => p.id === selectedPersonId);
            if (person) {
              handelOpenForm(true, person);
              handleMenuClose();
            }
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedPersonId) {
              handleDelete(selectedPersonId);
            }
          }}
          disabled={isDeleting}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          {isDeleting ? "Deleting..." : "Delete"}
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default Persons;