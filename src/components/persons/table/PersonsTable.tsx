import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  LinearProgress,
  TableBody,
} from "@mui/material";
import PersonRow from "./PersonRow";

const PersonsTable = ({
  persons,
  isFetching,
  onEdit,
  onDelete,
  isDeleting,
}: any) => (
  <TableContainer component={Paper}>
    {isFetching && <LinearProgress />}
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">ID</TableCell>
          <TableCell align="center">Name</TableCell>
          <TableCell align="center">Code</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {persons.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} align="center">
              No persons found
            </TableCell>
          </TableRow>
        ) : (
          persons.map((p: any) => (
            <PersonRow
              key={p.id}
              person={p}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PersonsTable;
